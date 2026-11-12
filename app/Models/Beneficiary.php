<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Beneficiary extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'relationship',
        'nik',
        'phone_number',
        'email',
        'Allocation_notes',
    ];

    protected function casts(): array
    {
        return [
            'nik' => 'encrypted',
            'Allocation_notes' => 'encrypted',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    public function credentials(): HasMany
    {
        return $this->hasMany(VaultCredential::class);
    }

    public function testaments(): HasMany
    {
        return $this->hasMany(Testament::class);
    }
}
