<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('memory_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('beneficiary_id')->nullable()->constrained('beneficiaries')->nullOnDelete();

            $table->string('title'); // Judul momen kenangan
            $table->string('media_type')->default('photo'); // photo atau video
            $table->string('category')->default('keluarga'); // keluarga, acara_spesial, perjalanan, pesan_kenangan
            $table->date('memory_date')->nullable(); // Tanggal momen terjadi
            $table->string('location_name')->nullable(); // Lokasi momen
            $table->text('story_notes')->nullable(); // Cerita / pesan di balik foto atau video

            // Metadata file media terenkripsi
            $table->string('original_filename');
            $table->string('stored_path');
            $table->string('mime_type');
            $table->unsignedBigInteger('file_size')->default(0);
            $table->string('file_hash');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('memory_items');
    }
};
