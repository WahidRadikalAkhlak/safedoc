<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use PragmaRX\Google2FA\Google2FA;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $google2fa = new Google2FA();
        $secretKey = $google2fa->generateSecretKey();

        User::updateOrCreate(
            ['email' => 'ullulazmia.l@gmail.com'],
            [
                'name' => 'Pemilik Brankas SafeDoc',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'google2fa_secret' => $secretKey,
                'google2fa_enabled' => false,
            ]
        );

        $this->call([
            SafeDocVaultSeeder::class,
        ]);
    }
}
