<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title'); // Label dokumen (misal: "Sertifikat Rumah Palu")
            $table->string('category'); // sertifikat_tanah, bpkb, wasiat, lainnya
            $table->text('document_number')->nullable(); // Terenkripsi (misal: No BPKB / NIK)
            $table->string('encrypted_file_path'); // Path penyimpanan file terenkripsi
            $table->string('original_filename');
            $table->string('mime_type');
            $table->unsignedBigInteger('file_size'); // Dalam bytes
            $table->string('file_hash', 64); // SHA-256 untuk verifikasi integritas file
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
