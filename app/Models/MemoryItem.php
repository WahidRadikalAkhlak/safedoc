<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MemoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'beneficiary_id',
        'title',
        'media_type',
        'category',
        'memory_date',
        'location_name',
        'story_notes',
        'original_filename',
        'stored_path',
        'mime_type',
        'file_size',
        'file_hash',
    ];

    protected function casts(): array
    {
        return [
            'memory_date' => 'date:Y-m-d',
            'story_notes' => 'encrypted',
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
