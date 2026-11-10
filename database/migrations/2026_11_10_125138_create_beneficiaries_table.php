<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Tabel Ahli Waris / Penerima Wasiat
        Schema::create('beneficiaries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('relationship'); // istri_suami, anak, saudara, notaris, lainnya
            $table->text('nik')->nullable(); // Dienkripsi di model
            $table->string('phone_number')->nullable();
            $table->string('email')->nullable();
            $table->text('Allocation_notes')->nullable(); // Pesan amanat / instruksi wasiat (Dienkripsi)
            $table->timestamps();
        });

        // 2. Tambahkan Kolom Alokasi Warisan & Nilai Aset pada Tabel Documents
        Schema::table('documents', function (Blueprint $table) {
            $table->foreignId('beneficiary_id')
                ->nullable()
                ->after('user_id')
                ->constrained('beneficiaries')
                ->nullOnDelete();
            $table->unsignedBigInteger('estimated_value')->default(0)->after('category');
            $table->string('asset_location')->nullable()->after('estimated_value');
        });
    }

    public function down(): void
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropForeign(['beneficiary_id']);
            $table->dropColumn(['beneficiary_id', 'estimated_value', 'asset_location']);
        });

        Schema::dropIfExists('beneficiaries');
    }
};
