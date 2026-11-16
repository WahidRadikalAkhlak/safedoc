<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;
use PragmaRX\Google2FA\Google2FA;

class TwoFactorController extends Controller
{
    /**
     * Tampilkan halaman Setup QR Code 2FA.
     */
    public function setup(Request $request)
    {
        $user = auth()->user();
        $google2fa = new Google2FA();

        // Ambil secret key dengan aman (antisipasi jika data lama rusak/kosong)
        $secret = null;
        try {
            $secret = $user->google2fa_secret;
        } catch (\Throwable $e) {
            $secret = null;
        }

        // Jika kosong atau kurang dari 16 karakter, otomatis buatkan & simpan ke DB!
        if (empty($secret) || strlen($secret) < 16) {
            $secret = $google2fa->generateSecretKey();
            $user->google2fa_secret = $secret;
            $user->save();
        }

        $qrCodeUrl = $google2fa->getQRCodeUrl(
            config('app.name', 'SafeDoc Vault'),
            $user->email,
            $secret
        );

        // Render SVG jika BaconQrCode tersedia
        $qrCodeSvg = null;
        if (class_exists(\BaconQrCode\Renderer\ImageRenderer::class)) {
            $renderer = new \BaconQrCode\Renderer\ImageRenderer(
                new \BaconQrCode\Renderer\RendererStyle\RendererStyle(220),
                new \BaconQrCode\Renderer\Image\SvgImageBackEnd()
            );
            $writer = new \BaconQrCode\Writer($renderer);
            $qrCodeSvg = base64_encode($writer->writeString($qrCodeUrl));
        }

        return Inertia::render('Auth/TwoFactorSetup', [
            'qrCodeSvg' => $qrCodeSvg,
            'qrCodeUrl' => $qrCodeUrl,
            'secret' => $secret,
        ]);
    }

    /**
     * Aktifkan 2FA setelah user memindai QR Code Pertama Kali.
     */
    public function enable(Request $request)
    {
        $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ], [
            'code.required' => 'Masukkan 6 angka kode dari aplikasi Google Authenticator.',
            'code.size' => 'Kode OTP harus terdiri dari 6 angka.',
        ]);

        $user = auth()->user();
        $google2fa = new Google2FA();

        $secret = null;
        try {
            $secret = $user->google2fa_secret;
        } catch (\Throwable $e) {
            $secret = null;
        }

        // Pengaman ekstra agar tidak pernah crash SecretKeyTooShortException
        if (empty($secret) || strlen($secret) < 16) {
            $user->google2fa_secret = $google2fa->generateSecretKey();
            $user->save();

            return redirect()->route('2fa.setup')->withErrors([
                'code' => 'Kunci keamanan baru telah disiapkan ulang. Silakan pindai ulang Barcode QR di layar lalu masukkan 6 angka terbaru.',
            ]);
        }

        $valid = $google2fa->verifyKey($secret, $request->code);

        if (!$valid) {
            return back()->withErrors([
                'code' => 'Kode 6 angka belum sesuai. Pastikan Anda memindai Barcode QR terbaru di layar.',
            ]);
        }

        $user->google2fa_enabled = true;
        $user->save();

        $request->session()->put('2fa_verified', true);

        activity('security')
            ->causedBy($user)
            ->event('2fa_enabled')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ])
            ->log('Mengaktifkan pengaman Google Authenticator (2FA) pada perangkat HP');

        return redirect()->intended(route('dashboard'));
    }

    /**
     * Tampilkan layar input 6 angka OTP setiap kali Login.
     */
    public function challenge()
    {
        $user = auth()->user();

        if (!$user->google2fa_enabled || empty($user->google2fa_secret)) {
            return redirect()->route('2fa.setup');
        }

        return Inertia::render('Auth/TwoFactorChallenge');
    }

    /**
     * Verifikasi 6 angka OTP saat Login.
     */
    public function verify(Request $request)
    {
        $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ], [
            'code.required' => 'Masukkan 6 angka kode OTP Anda.',
            'code.size' => 'Kode OTP harus 6 angka.',
        ]);

        $user = auth()->user();
        $google2fa = new Google2FA();

        $secret = null;
        try {
            $secret = $user->google2fa_secret;
        } catch (\Throwable $e) {
            $secret = null;
        }

        if (empty($secret) || strlen($secret) < 16) {
            $user->google2fa_enabled = false;
            $user->save();
            return redirect()->route('2fa.setup');
        }

        $valid = $google2fa->verifyKey($secret, $request->code);

        if (!$valid) {
            activity('security')
                ->causedBy($user)
                ->event('2fa_failed')
                ->withProperties([
                    'ip' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                ])
                ->log('Gagal verifikasi kode OTP 2FA saat mencoba membuka brankas');

            return back()->withErrors([
                'code' => 'Kode OTP salah atau sudah kedaluwarsa. Silakan cek angka terbaru di HP Anda.',
            ]);
        }

        $request->session()->put('2fa_verified', true);

        activity('security')
            ->causedBy($user)
            ->event('2fa_verified')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ])
            ->log('Berhasil melewati verifikasi keamanan 2FA Google Authenticator');

        return redirect()->intended(route('dashboard'));
    }
}
