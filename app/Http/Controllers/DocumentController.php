<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $documents = $user->documents()->latest()->paginate(10);

        $totalCapacityBytes = $user->documents()->sum('file_size');
        $totalCapacityMB = round($totalCapacityBytes / 1024 / 1024, 2);

        return Inertia::render('Documents/Index', [
            'documents' => $documents,
            'totalCapacityMB' => $totalCapacityMB,
            'totalFiles' => $user->documents()->count(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:sertifikat_tanah,bpkb,wasiat,lainnya',
            'document_number' => 'nullable|string|max:100',
            'notes' => 'nullable|string|max:1000',
            'document_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ], [
            'title.required' => 'Nama/keterangan dokumen wajib diisi.',
            'category.required' => 'Pilih salah satu kategori dokumen.',
            'document_file.required' => 'Silakan pilih berkas dokumen yang akan diunggah.',
            'document_file.mimes' => 'Format file harus berupa PDF, JPG, JPEG, atau PNG.',
            'document_file.max' => 'Ukuran file melebihi batas maksimal 5 MB.',
        ]);

        $file = $request->file('document_file');
        $rawContents = file_get_contents($file->getRealPath());

        $fileHash = hash('sha256', $rawContents);
        $encryptedContents = Crypt::encrypt($rawContents);

        $vaultFolder = 'vault/' . auth()->id();
        $randomFileName = Str::uuid() . '.enc';
        $filePath = $vaultFolder . '/' . $randomFileName;

        Storage::disk('local')->put($filePath, $encryptedContents);

        $document = auth()->user()->documents()->create([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'document_number' => $validated['document_number'] ?? null,
            'encrypted_file_path' => $filePath,
            'original_filename' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
            'file_hash' => $fileHash,
            'notes' => $validated['notes'] ?? null,
        ]);

        // Catat Log Aktivitas Upload & Enkripsi
        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($document)
            ->event('uploaded')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $document->title,
                'original_filename' => $document->original_filename,
                'category' => $document->category,
                'file_size_kb' => round($document->file_size / 1024, 1),
                'sha256_hash' => $fileHash,
            ])
            ->log("Mengenkripsi & menyimpan dokumen baru: {$document->title}");

        return redirect()->route('dashboard')->with('success', 'Dokumen berhasil dienkripsi dan disimpan di brankas!');
    }

    public function update(Request $request, Document $document)
    {
        if ($document->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:sertifikat_tanah,bpkb,wasiat,lainnya',
            'document_number' => 'nullable|string|max:100',
            'notes' => 'nullable|string|max:1000',
        ]);

        $oldTitle = $document->title;
        $document->update($validated);

        // Catat Log Aktivitas Edit Metadata
        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($document)
            ->event('updated')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'old_title' => $oldTitle,
                'new_title' => $document->title,
                'category' => $document->category,
            ])
            ->log("Memperbarui informasi metadata dokumen: {$document->title}");

        return redirect()->back()->with('success', 'Informasi dokumen berhasil diperbarui!');
    }

    public function preview(Request $request, Document $document): Response
    {
        if ($document->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak: Anda bukan pemilik sah berkas ini.');
        }

        if (!Storage::disk('local')->exists($document->encrypted_file_path)) {
            abort(404, 'File fisik tidak ditemukan pada vault server.');
        }

        $encryptedRaw = Storage::disk('local')->get($document->encrypted_file_path);
        $decryptedContents = Crypt::decrypt($encryptedRaw);

        // Catat Log Aktivitas Pratinjau (Dekripsi di Memori)
        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($document)
            ->event('previewed')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $document->title,
                'original_filename' => $document->original_filename,
            ])
            ->log("Membuka & mendekripsi pratinjau dokumen: {$document->title}");

        return response($decryptedContents, 200, [
            'Content-Type' => $document->mime_type,
            'Content-Disposition' => 'inline; filename="' . $document->original_filename . '"',
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma' => 'no-cache',
        ]);
    }

    public function download(Request $request, Document $document): StreamedResponse
    {
        if ($document->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak: Anda bukan pemilik sah berkas ini.');
        }

        if (!Storage::disk('local')->exists($document->encrypted_file_path)) {
            abort(404, 'File fisik tidak ditemukan pada vault server.');
        }

        $encryptedRaw = Storage::disk('local')->get($document->encrypted_file_path);
        $decryptedContents = Crypt::decrypt($encryptedRaw);

        // Catat Log Aktivitas Unduh Dokumen
        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($document)
            ->event('downloaded')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $document->title,
                'original_filename' => $document->original_filename,
                'file_size_kb' => round($document->file_size / 1024, 1),
            ])
            ->log("Mengunduh salinan terdekripsi dari dokumen: {$document->title}");

        return response()->streamDownload(function () use ($decryptedContents) {
            echo $decryptedContents;
        }, $document->original_filename, [
            'Content-Type' => $document->mime_type,
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma' => 'no-cache',
        ]);
    }

    public function destroy(Request $request, Document $document)
    {
        if ($document->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        $docTitle = $document->title;
        $docFilename = $document->original_filename;
        $docCategory = $document->category;

        if (Storage::disk('local')->exists($document->encrypted_file_path)) {
            Storage::disk('local')->delete($document->encrypted_file_path);
        }

        $document->forceDelete();

        // Catat Log Aktivitas Penghancuran Dokumen
        activity('vault')
            ->causedBy(auth()->user())
            ->event('deleted')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $docTitle,
                'original_filename' => $docFilename,
                'category' => $docCategory,
            ])
            ->log("Menghancurkan dokumen secara permanen dari server: {$docTitle}");

        return redirect()->route('dashboard')->with('success', 'Dokumen berhasil dihapus permanen.');
    }
}
