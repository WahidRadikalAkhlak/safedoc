<?php

namespace App\Http\Controllers\Auth; // Namespace sudah disesuaikan ke folder Auth

use App\Http\Controllers\Controller; // Tambahkan ini karena pindah folder
use Illuminate\Http\Request;
use PragmaRX\Google2FAQRCode\Google2FA;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Inertia\Inertia;
use Inertia\Response;

class TwoFactorController extends Controller
{
    // Menampilkan Barcode QR Code untuk di-scan via Inertia
    public function setup()
    {
        $user = auth()->user();

        if ($user->google2fa_enabled) {
            return redirect()->route('dashboard');
        }

        $google2fa = new \PragmaRX\Google2FA\Google2FA();

        // Buat URL QR Code Authenticator
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

        // Ubah dari view() menjadi Inertia::render()
        return Inertia::render('Auth/TwoFactorSetup', [
            'qrCodeSvg' => $qrCodeSvg,
            'secret' => $user->google2fa_secret,
        ]);
    }

    // Mengaktifkan 2FA setelah user memasukkan kode verifikasi pertama kali
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

            return redirect()->route('dashboard')->with('success', 'Keamanan 2FA Authenticator aktif. Akun SafeDoc Anda kini terlindungi penuh.');
        }

        return back()->withErrors(['code' => 'Kode OTP salah atau telah kadaluarsa. Silakan coba lagi.']);
    }

    // Layar input 6-digit OTP saat login via Inertia
    public function challenge()
    {
        // Ubah dari view() menjadi Inertia::render()
        return Inertia::render('Auth/TwoFactorChallenge');
    }

    // Verifikasi kode saat login
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
            return redirect()->intended(route('dashboard'));
        }

        return back()->withErrors(['code' => 'Kode autentikasi tidak valid. Periksa aplikasi Authenticator Anda.']);
    }
}
