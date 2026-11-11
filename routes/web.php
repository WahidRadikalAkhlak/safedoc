<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\BeneficiaryController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SecurityCenterController;
use App\Http\Controllers\TestamentController;
use App\Http\Controllers\VaultCredentialController;
use App\Http\Controllers\Auth\TwoFactorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Halaman Depan / Landing Page Promosi SafeDoc
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Alur Setup & Verifikasi 2FA Authenticator
Route::middleware(['auth'])->group(function () {
    Route::get('/2fa/setup', [TwoFactorController::class, 'setup'])->name('2fa.setup');
    Route::post('/2fa/enable', [TwoFactorController::class, 'enable'])->name('2fa.enable');
    Route::get('/2fa/challenge', [TwoFactorController::class, 'challenge'])->name('2fa.challenge');
    Route::post('/2fa/verify', [TwoFactorController::class, 'verify'])->name('2fa.verify');
});

// Area Terproteksi Penuh (Wajib Login, Email Verified, dan 2FA Valid)
Route::middleware(['auth', 'verified', '2fa'])->group(function () {
    Route::get('/dashboard', [DocumentController::class, 'index'])->name('dashboard');

    // Rute Dokumen Brankas
    Route::resource('documents', DocumentController::class)->except(['show', 'edit']);
    Route::get('documents/{document}/preview', [DocumentController::class, 'preview'])->name('documents.preview');
    Route::get('documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');

    // Rute Manajemen Ahli Waris & Alokasi Warisan
    Route::resource('beneficiaries', BeneficiaryController::class)->only(['index', 'store', 'update', 'destroy']);

    // Rute Manajemen Kredensial, Polis & PIN Brankas
    Route::resource('credentials', VaultCredentialController::class)->only(['index', 'store', 'update', 'destroy']);

    // Rute Manajemen Surat Wasiat, Amanat & Catatan Piutang/Kewajiban
    Route::resource('testaments', TestamentController::class)->only(['index', 'store', 'update', 'destroy']);

    // Rute Pusat Keamanan & Integritas
    Route::get('/security-center', [SecurityCenterController::class, 'index'])->name('security.index');
    Route::post('/security-center/verify-integrity', [SecurityCenterController::class, 'verifyIntegrity'])->name('security.verify-integrity');
    Route::post('/security-center/reset-2fa', [SecurityCenterController::class, 'resetTwoFactor'])->name('security.reset-2fa');

    // Endpoint JSON untuk Lonceng Notifikasi di Header
    Route::get('/vault-notifications', [SecurityCenterController::class, 'recentNotifications'])->name('vault.notifications');

    // Rute Riwayat Aktivitas & Audit Trail
    Route::get('/activity-logs', [ActivityLogController::class, 'index'])->name('activity-logs.index');

    // Rute Profil & Keamanan
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
