<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VaultCredential extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'beneficiary_id',
        'title',
        'category',
        'institution_name',
        'account_identifier',
        'secret_pin_or_password',
        'access_instructions',
    ];

    protected function casts(): array
    {
        return [
            'account_identifier' => 'encrypted',
            'secret_pin_or_password' => 'encrypted',
            'access_instructions' => 'encrypted',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function beneficiary(): BelongsTo
    {
        return $this->belongsTo(Beneficiary::class);
    }
}
