<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
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
}
