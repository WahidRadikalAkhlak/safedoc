<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PersonnelRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'category',
        'decree_number',
        'decree_date',
        'effective_date',
        'rank_grade',
        'position_unit',
        'issuing_authority',
        'notes',
        'original_filename',
        'stored_path',
        'mime_type',
        'file_size',
        'file_hash',
    ];

    protected function casts(): array
    {
        return [
            'decree_date' => 'date:Y-m-d',
            'effective_date' => 'date:Y-m-d',
            'notes' => 'encrypted',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
