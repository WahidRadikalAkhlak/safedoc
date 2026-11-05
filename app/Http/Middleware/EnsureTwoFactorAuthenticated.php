<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTwoFactorAuthenticated
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user) {
            // Jika user belum setting 2FA, paksa ke halaman setup barcode
            if (!$user->google2fa_enabled && !$request->routeIs('2fa.setup', '2fa.enable', 'logout')) {
                return redirect()->route('2fa.setup');
            }

            // Jika 2FA aktif namun sesi login belum diverifikasi
            if ($user->google2fa_enabled && !session('2fa_verified') && !$request->routeIs('2fa.challenge', '2fa.verify', 'logout')) {
                return redirect()->route('2fa.challenge');
            }
        }

        return $next($request);
    }
}
