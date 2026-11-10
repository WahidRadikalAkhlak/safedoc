<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'beneficiary_id',
        'title',
        'category',
        'estimated_value',
        'asset_location',
        'document_number',
        'encrypted_file_path',
        'original_filename',
        'mime_type',
        'file_size',
        'file_hash',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'document_number' => 'encrypted',
            'notes' => 'encrypted',
            'estimated_value' => 'integer',
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
