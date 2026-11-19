<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'nik',
        'address',
        'password',
        'google2fa_secret',
        'google2fa_enabled',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'google2fa_secret',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'google2fa_enabled' => 'boolean',
        'google2fa_secret' => 'encrypted',
        'nik' => 'encrypted',
        'address' => 'encrypted',
    ];

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    public function beneficiaries(): HasMany
    {
        return $this->hasMany(Beneficiary::class);
    }

    public function credentials(): HasMany
    {
        return $this->hasMany(VaultCredential::class);
    }

    public function testaments(): HasMany
    {
        return $this->hasMany(Testament::class);
    }

    public function personnelRecords(): HasMany
    {
        return $this->hasMany(PersonnelRecord::class);
    }

    public function memoryItems(): HasMany
    {
        return $this->hasMany(MemoryItem::class);
    }
}
