<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testaments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('beneficiary_id')->nullable()->constrained('beneficiaries')->nullOnDelete();
            $table->string('title');
            $table->string('category'); // amanat_keluarga, instruksi_bisnis, piutang_klaim, kewajiban_utang
            $table->string('counterparty_name')->nullable(); // Nama Pihak Terkait / Debitur / Notaris
            $table->unsignedBigInteger('nominal_amount')->default(0); // Nilai Rupiah jika Piutang/Utang
            $table->text('content'); // Isi pesan wasiat / rincian amanat (Dienkripsi)
            $table->string('status')->default('aktif'); // aktif, rahasia_penuh, selesai
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testaments');
    }
};
