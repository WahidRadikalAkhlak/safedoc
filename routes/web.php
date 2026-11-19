<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\BeneficiaryController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\EstateSummaryController;
use App\Http\Controllers\MemoryItemController;
use App\Http\Controllers\PersonnelRecordController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SecurityCenterController;
use App\Http\Controllers\TestamentController;
use App\Http\Controllers\UserAccessController;
use App\Http\Controllers\VaultCredentialController;
use App\Http\Controllers\Auth\TwoFactorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/2fa/setup', [TwoFactorController::class, 'setup'])->name('2fa.setup');
    Route::post('/2fa/enable', [TwoFactorController::class, 'enable'])->name('2fa.enable');
    Route::get('/2fa/challenge', [TwoFactorController::class, 'challenge'])->name('2fa.challenge');
    Route::post('/2fa/verify', [TwoFactorController::class, 'verify'])->name('2fa.verify');
});

Route::middleware(['auth', 'verified', '2fa'])->group(function () {
    Route::get('/dashboard', [DocumentController::class, 'index'])->name('dashboard');
    Route::get('/estate-summary', [EstateSummaryController::class, 'index'])->name('estate.summary');

    Route::resource('documents', DocumentController::class)->except(['show', 'edit']);
    Route::get('documents/{document}/preview', [DocumentController::class, 'preview'])->name('documents.preview');
    Route::get('documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');

    Route::resource('personnel-records', PersonnelRecordController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('personnel-records/{personnelRecord}/preview', [PersonnelRecordController::class, 'preview'])->name('personnel-records.preview');
    Route::get('personnel-records/{personnelRecord}/download', [PersonnelRecordController::class, 'download'])->name('personnel-records.download');

    // Rute Baru: Galeri Foto & Video Kenangan Keluarga
    Route::resource('memories', MemoryItemController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('memories/{memory}/preview', [MemoryItemController::class, 'preview'])->name('memories.preview');
    Route::get('memories/{memory}/download', [MemoryItemController::class, 'download'])->name('memories.download');

    Route::resource('beneficiaries', BeneficiaryController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('credentials', VaultCredentialController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('testaments', TestamentController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('user-access', UserAccessController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::get('/security-center', [SecurityCenterController::class, 'index'])->name('security.index');
    Route::post('/security-center/verify-integrity', [SecurityCenterController::class, 'verifyIntegrity'])->name('security.verify-integrity');
    Route::post('/security-center/reset-2fa', [SecurityCenterController::class, 'resetTwoFactor'])->name('security.reset-2fa');
    Route::get('/vault-notifications', [SecurityCenterController::class, 'recentNotifications'])->name('vault.notifications');

    Route::get('/activity-logs', [ActivityLogController::class, 'index'])->name('activity-logs.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
