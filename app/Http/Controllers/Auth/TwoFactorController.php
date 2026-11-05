<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Inertia\Inertia;

class TwoFactorController extends Controller
{
    public function setup()
    {
        $user = auth()->user();

        if ($user->google2fa_enabled) {
            return redirect()->route('dashboard');
        }

        $google2fa = new \PragmaRX\Google2FA\Google2FA();

        $qrCodeUrl = $google2fa->getQRCodeUrl(
            config('app.name'),
            $user->email,
            $user->google2fa_secret
        );

        $renderer = new ImageRenderer(
            new RendererStyle(220),
            new SvgImageBackEnd()
        );
        $writer = new Writer($renderer);
        $qrCodeSvg = base64_encode($writer->writeString($qrCodeUrl));

        return Inertia::render('Auth/TwoFactorSetup', [
            'qrCodeSvg' => $qrCodeSvg,
            'secret' => $user->google2fa_secret,
        ]);
    }

    public function enable(Request $request)
    {
        $request->validate([
            'code' => 'required|digits:6',
        ]);

        $user = auth()->user();
        $google2fa = new \PragmaRX\Google2FA\Google2FA();

        $valid = $google2fa->verifyKey($user->google2fa_secret, $request->code);

        if ($valid) {
            $user->google2fa_enabled = true;
            $user->save();

            session(['2fa_verified' => true]);

            activity('security')
                ->causedBy($user)
                ->event('2fa_enabled')
                ->withProperties([
                    'ip' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                ])
                ->log('Mengaktifkan proteksi Google Authenticator (2FA) untuk pertama kali');

            return redirect()->route('dashboard')->with('success', 'Keamanan 2FA Authenticator aktif. Akun SafeDoc Anda kini terlindungi penuh.');
        }

        activity('security')
            ->causedBy($user)
            ->event('2fa_failed')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'stage' => 'setup',
            ])
            ->log('Gagal verifikasi kode OTP saat mencoba mengaktifkan 2FA');

        return back()->withErrors(['code' => 'Kode OTP salah atau telah kadaluarsa. Silakan coba lagi.']);
    }

    public function challenge()
    {
        return Inertia::render('Auth/TwoFactorChallenge');
    }

    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|digits:6',
        ]);

        $user = auth()->user();
        $google2fa = new \PragmaRX\Google2FA\Google2FA();

        $valid = $google2fa->verifyKey($user->google2fa_secret, $request->code);

        if ($valid) {
            session(['2fa_verified' => true]);

            activity('security')
                ->causedBy($user)
                ->event('2fa_verified')
                ->withProperties([
                    'ip' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                ])
                ->log('Lolos verifikasi 2FA OTP dan membuka kunci Brankas');

            return redirect()->intended(route('dashboard'));
        }

        // Catat Peringatan Keamanan jika kode OTP salah
        activity('security')
            ->causedBy($user)
            ->event('2fa_failed')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'stage' => 'login_challenge',
            ])
            ->log('PERINGATAN: Percobaan gagal memasukkan kode OTP 2FA saat login');

        return back()->withErrors(['code' => 'Kode autentikasi tidak valid. Periksa aplikasi Authenticator Anda.']);
    }
}
