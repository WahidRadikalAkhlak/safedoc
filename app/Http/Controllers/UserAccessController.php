<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserAccessController extends Controller
{
    public function index(Request $request): Response
    {
        // Pak Nyoman hanya dapat melihat user lain selain dirinya sendiri jika diperlukan
        $search = $request->query('search', '');

        $query = User::latest();

        if (!empty($search)) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%');
        }

        $users = $query->paginate(10)->withQueryString();

        $totalUsers = User::count();
        $total2FAEnabled = User::where('google2fa_enabled', true)->count();

        return Inertia::render('UserAccess/Index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
            ],
            'stats' => [
                'totalUsers' => $totalUsers,
                'total2FAEnabled' => $total2FAEnabled,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ], [
            'email.unique' => 'Email ini sudah memiliki akses ke dalam brankas.',
            'password.min' => 'Kata sandi minimal 8 karakter.',
        ]);

        $google2fa = new \PragmaRX\Google2FA\Google2FA();
        $secretKey = $google2fa->generateSecretKey();

        $newUser = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'google2fa_secret' => $secretKey,
            'google2fa_enabled' => false,
        ]);

        activity('security')
            ->causedBy(auth()->user())
            ->event('user_created')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'created_user_email' => $newUser->email,
            ])
            ->log("Membuka akses brankas baru untuk: {$newUser->name}");

        return redirect()->back()->with('success', 'Akses akun baru berhasil dibuat! Mereka wajib menyambungkan 2FA saat login.');
    }

    public function update(Request $request, User $userAccess)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $userAccess->id,
            'password' => 'nullable|string|min:8',
        ]);

        $userAccess->name = $validated['name'];
        $userAccess->email = $validated['email'];

        if (!empty($validated['password'])) {
            $userAccess->password = Hash::make($validated['password']);
        }

        $userAccess->save();

        activity('security')
            ->causedBy(auth()->user())
            ->event('user_updated')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'updated_user_email' => $userAccess->email,
            ])
            ->log("Memperbarui data / sandi akses untuk: {$userAccess->name}");

        return redirect()->back()->with('success', 'Data akses pengguna berhasil diperbarui!');
    }

    public function destroy(Request $request, User $userAccess)
    {
        if ($userAccess->id === auth()->id()) {
            return redirect()->back()->withErrors(['error' => 'Anda tidak bisa menghapus akun Anda sendiri dari halaman ini. Gunakan menu Profil.']);
        }

        $email = $userAccess->email;
        $userAccess->delete();

        activity('security')
            ->causedBy(auth()->user())
            ->event('user_deleted')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'deleted_user_email' => $email,
            ])
            ->log("Mencabut & menghapus akses brankas untuk email: {$email}");

        return redirect()->back()->with('success', 'Akses akun tersebut berhasil dihapus permanen.');
    }
}
