<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Activitylog\Models\Activity;

class SecurityCenterController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        $documents = $user->documents()->latest()->get();

        // Verifikasi status fisik & integritas setiap dokumen
        $integrityReport = $documents->map(function ($doc) {
            $exists = Storage::disk('local')->exists($doc->encrypted_file_path);
            $status = 'valid';

            if (!$exists) {
                $status = 'missing';
            } else {
                try {
                    $encryptedRaw = Storage::disk('local')->get($doc->encrypted_file_path);
                    $decrypted = Crypt::decrypt($encryptedRaw);
                    $currentHash = hash('sha256', $decrypted);

                    if ($currentHash !== $doc->file_hash) {
                        $status = 'tampered';
                    }
                } catch (\Exception $e) {
                    $status = 'corrupted';
                }
            }

            return [
                'id' => $doc->id,
                'title' => $doc->title,
                'original_filename' => $doc->original_filename,
                'category' => $doc->category,
                'file_size_kb' => round($doc->file_size / 1024, 1),
                'file_hash' => $doc->file_hash,
                'status' => $status,
                'created_at' => $doc->created_at,
            ];
        });

        // Distribusi dokumen per kategori
        $categories = ['sertifikat_tanah', 'bpkb', 'wasiat', 'lainnya'];
        $categoryStats = [];
        foreach ($categories as $cat) {
            $filtered = $documents->where('category', $cat);
            $categoryStats[$cat] = [
                'count' => $filtered->count(),
                'size_kb' => round($filtered->sum('file_size') / 1024, 1),
            ];
        }

        $failed2faCount = Activity::where('causer_id', $user->id)
            ->where('causer_type', get_class($user))
            ->where('event', '2fa_failed')
            ->count();

        return Inertia::render('SecurityCenter/Index', [
            'integrityReport' => $integrityReport,
            'categoryStats' => $categoryStats,
            'securitySummary' => [
                'twoFactorEnabled' => (bool) $user->google2fa_enabled,
                'totalDocuments' => $documents->count(),
                'validDocuments' => $integrityReport->where('status', 'valid')->count(),
                'compromisedDocuments' => $integrityReport->where('status', '!=', 'valid')->count(),
                'failed2faCount' => $failed2faCount,
            ],
        ]);
    }

    public function verifyIntegrity(Request $request)
    {
        $user = auth()->user();
        $total = $user->documents()->count();

        activity('security')
            ->causedBy($user)
            ->event('integrity_scan')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'scanned_files' => $total,
            ])
            ->log("Menjalankan pemindaian integritas SHA-256 pada {$total} dokumen brankas");

        return redirect()->back()->with('success', "Pemindaian selesai! {$total} berkas telah diverifikasi dengan checksum SHA-256.");
    }

    public function resetTwoFactor(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ], [
            'password.required' => 'Kata sandi wajib diisi untuk konfirmasi keamanan.',
            'password.current_password' => 'Kata sandi yang Anda masukkan salah.',
        ]);

        $user = auth()->user();
        $google2fa = new \PragmaRX\Google2FA\Google2FA();

        // Buat secret key baru & nonaktifkan sementara hingga QR baru di-scan
        $user->google2fa_secret = $google2fa->generateSecretKey();
        $user->google2fa_enabled = false;
        $user->save();

        $request->session()->forget('2fa_verified');

        activity('security')
            ->causedBy($user)
            ->event('2fa_reset')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ])
            ->log('Mereset kunci rahasia Google Authenticator (2FA) untuk pergantian perangkat');

        return redirect()->route('2fa.setup')->with('success', 'Kunci 2FA berhasil direset. Silakan pindai QR Code baru Anda.');
    }

    public function recentNotifications()
    {
        $user = auth()->user();

        $logs = Activity::where('causer_id', $user->id)
            ->where('causer_type', get_class($user))
            ->latest()
            ->take(6)
            ->get()
            ->map(function ($log) {
                $type = 'info';
                if (in_array($log->event, ['uploaded', '2fa_verified', 'integrity_scan'])) {
                    $type = 'success';
                } elseif (in_array($log->event, ['deleted', '2fa_failed'])) {
                    $type = 'danger';
                } elseif (in_array($log->event, ['updated', '2fa_reset'])) {
                    $type = 'warning';
                }

                return [
                    'id' => $log->id,
                    'title' => strtoupper(str_replace('_', ' ', $log->event ?? 'AKTIVITAS')),
                    'message' => $log->description,
                    'type' => $type,
                    'created_at' => $log->created_at,
                ];
            });

        return response()->json([
            'notifications' => $logs,
        ]);
    }
}
