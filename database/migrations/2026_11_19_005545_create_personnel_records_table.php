<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('personnel_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title'); // Contoh: SK Kenaikan Pangkat Pembina (IV/a)
            $table->string('category')->default('sk_pangkat'); // sk_cpns_pns, sk_pangkat, sk_jabatan, kgb, diklat_sertifikat, penghargaan_lainnya
            $table->string('decree_number')->nullable(); // Nomor SK / Sertifikat
            $table->date('decree_date')->nullable(); // Tanggal Ditetapkan SK
            $table->date('effective_date')->nullable(); // TMT (Terhitung Mulai Tanggal)
            $table->string('rank_grade')->nullable(); // Pangkat / Golongan Ruang (misal: Penata Tk. I / III/d)
            $table->string('position_unit')->nullable(); // Jabatan & Unit Kerja
            $table->string('issuing_authority')->nullable(); // Pejabat / Instansi yang Menetapkan
            $table->text('notes')->nullable(); // Catatan & letak berkas fisik asli

            // File Scan SK / Sertifikat Terenkripsi
            $table->string('original_filename')->nullable();
            $table->string('stored_path')->nullable();
            $table->string('mime_type')->nullable();
            $table->unsignedBigInteger('file_size')->default(0);
            $table->string('file_hash')->nullable(); // Segel SHA-256

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('personnel_records');
    }
};
