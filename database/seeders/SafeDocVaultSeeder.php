<?php

namespace Database\Seeders;

use App\Models\Beneficiary;
use App\Models\Testament;
use App\Models\User;
use App\Models\VaultCredential;
use Illuminate\Database\Seeder;

class SafeDocVaultSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();

        if (!$user) {
            return;
        }

        // 1. Contoh Data Anggota Keluarga & Notaris
        $istri = Beneficiary::create([
            'user_id' => $user->id,
            'name' => 'Ny. Sari Damayansa',
            'relationship' => 'istri_suami',
            'nik' => '7271015408780001',
            'phone_number' => '08114502889',
            'email' => 'sari.damayansa@keluarga.id',
            'Allocation_notes' => 'Pemegang wewenang utama atas pengelolaan rumah induk keluarga, pencairan deposito hari tua, dan pengawasan pendidikan anak-anak.',
        ]);

        $anakPertama = Beneficiary::create([
            'user_id' => $user->id,
            'name' => 'Raka Pratama Damayansa',
            'relationship' => 'anak',
            'nik' => '7271011205010002',
            'phone_number' => '081245990011',
            'email' => 'raka.pratama@keluarga.id',
            'Allocation_notes' => 'Diamanatkan untuk melanjutkan operasional usaha properti keluarga dan menjaga aset tanah kavling di Palu Timur.',
        ]);

        $notaris = Beneficiary::create([
            'user_id' => $user->id,
            'name' => 'Hendra Wijaya, S.H., M.Kn.',
            'relationship' => 'notaris',
            'nik' => '7271030911720004',
            'phone_number' => '08114567123',
            'email' => 'notaris.hendra@legalpalu.co.id',
            'Allocation_notes' => 'Notaris resmi keluarga yang menyimpan salinan fisik akta wasiat dan mendampingi proses balik nama sertifikat.',
        ]);

        // 2. Contoh Data Rekening, Polis & PIN Brankas Fisik
        VaultCredential::create([
            'user_id' => $user->id,
            'beneficiary_id' => $istri->id,
            'title' => 'Rekening Deposito Utama Keluarga',
            'category' => 'rekening_bank',
            'institution_name' => 'Bank Mandiri Prioritas KCU Palu',
            'account_identifier' => '151-00-0988271-9',
            'secret_pin_or_password' => '789456',
            'access_instructions' => 'Bilyet deposito asli tersimpan di dalam map kulit coklat di brankas kamar utama. Hubungi Relationship Manager Ibu Diana.',
        ]);

        VaultCredential::create([
            'user_id' => $user->id,
            'beneficiary_id' => $istri->id,
            'title' => 'Polis Asuransi Jiwa Warisan Keluarga',
            'category' => 'polis_asuransi',
            'institution_name' => 'Prudential Indonesia',
            'account_identifier' => 'PRU-99281742-ID',
            'secret_pin_or_password' => 'PruKeluarga2026!',
            'access_instructions' => 'Buku polis fisik ada di lemari kerja lantai 2. Klaim dapat diajukan langsung melalui agen resmi Bpk. Surya.',
        ]);

        VaultCredential::create([
            'user_id' => $user->id,
            'beneficiary_id' => $anakPertama->id,
            'title' => 'Kombinasi Brankas Besi Ruang Kerja',
            'category' => 'brankas_fisik',
            'institution_name' => 'Brankas ChubbSafes Lantai 2',
            'account_identifier' => 'CHUBB-SAFE-01',
            'secret_pin_or_password' => 'Kanan 42 - Kiri 18 - Kanan 77 (PIN Digital: 240899)',
            'access_instructions' => 'Kunci cadangan manual disimpan di dalam kotak jam tangan di laci meja rias kamar utama.',
        ]);

        // 3. Contoh Surat Wasiat, Piutang & Kewajiban
        Testament::create([
            'user_id' => $user->id,
            'beneficiary_id' => null,
            'title' => 'Amanat Utama Kerukunan & Pembagian Rumah Induk',
            'category' => 'amanat_keluarga',
            'counterparty_name' => 'Disaksikan Notaris Hendra Wijaya, S.H.',
            'nominal_amount' => 0,
            'content' => "Kepada istri dan anak-anakku tercinta,\n\nRumah induk keluarga kita di Kota Palu tidak diperkenankan untuk dijual dan tetap menjadi tempat berkumpul seluruh keluarga besar. Seluruh bilyet deposito di Bank Mandiri digunakan terlebih dahulu untuk memastikan biaya pendidikan tuntas hingga selesai.",
            'status' => 'aktif',
        ]);

        Testament::create([
            'user_id' => $user->id,
            'beneficiary_id' => $anakPertama->id,
            'title' => 'Piutang Pinjaman Modal Kerjasama Proyek',
            'category' => 'piutang_klaim',
            'counterparty_name' => 'Bpk. H. Darmawan (CV Mitra Bangun)',
            'nominal_amount' => 350000000,
            'content' => 'Terdapat sisa dana pinjaman modal proyek sebesar Rp 350.000.000 yang jatuh tempo pada Desember 2026. Bukti surat perjanjian bermeterai dan kuitansi asli tersimpan di dalam brankas fisik ruang kerja.',
            'status' => 'aktif',
        ]);

        Testament::create([
            'user_id' => $user->id,
            'beneficiary_id' => $istri->id,
            'title' => 'Pelunasan Sisa Cicilan Kendaraan Operasional',
            'category' => 'kewajiban_utang',
            'counterparty_name' => 'BCA Finance Cabang Palu',
            'nominal_amount' => 45000000,
            'content' => 'Apabila masih terdapat sisa kewajiban administrasi kendaraan, mohon segera dilunasi menggunakan dana cair pada rekening operasional sebelum membagikan sisa hasil usaha.',
            'status' => 'aktif',
        ]);
    }
}
