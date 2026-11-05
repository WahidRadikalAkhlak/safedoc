<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'title',
        'category',
        'document_number',
        'encrypted_file_path',
        'original_filename',
        'mime_type',
        'file_size',
        'file_hash',
        'notes',
    ];

    protected $casts = [
        'document_number' => 'encrypted', // Enkripsi otomatis nomor identitas dokumen
        'notes' => 'encrypted',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
