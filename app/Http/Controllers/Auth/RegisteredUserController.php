<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use PragmaRX\Google2FA\Google2FA;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return view('auth.register');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'phone_number' => ['required', 'string', 'max:20'],
            'nik' => ['required', 'string', 'size:16'],
            'address' => ['required', 'string', 'max:255'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Generate Kunci Rahasia 2FA
        $google2fa = new Google2FA();
        $secretKey = $google2fa->generateSecretKey();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'nik' => $request->nik,
            'address' => $request->address,
            'password' => Hash::make($request->password),
            'google2fa_secret' => $secretKey,
            'google2fa_enabled' => false,
        ]);

        event(new Registered($user));
        Auth::login($user);

        // Arahkan langsung ke halaman konfigurasi 2FA Authenticator
        return redirect()->route('2fa.setup');
    }
}
