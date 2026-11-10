<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vault_credentials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('beneficiary_id')->nullable()->constrained('beneficiaries')->nullOnDelete();
            $table->string('title');
            $table->string('category'); // rekening_bank, polis_asuransi, brankas_fisik, investasi, akun_digital
            $table->string('institution_name')->nullable(); // Nama Bank / Asuransi / Lokasi
            $table->text('account_identifier'); // No Rekening / No Polis / Username (Dienkripsi)
            $table->text('secret_pin_or_password'); // PIN / Password / Kombinasi Kunci (Dienkripsi)
            $table->text('access_instructions')->nullable(); // Instruksi klaim / letak kunci fisik (Dienkripsi)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vault_credentials');
    }
};
