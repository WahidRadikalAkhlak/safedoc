<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpFoundation\Response;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = auth()->user()->documents()->latest()->paginate(10);
        return view('documents.index', compact('documents'));
    }

    public function create()
    {
        return view('documents.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:sertifikat_tanah,bpkb,wasiat,lainnya',
            'document_number' => 'nullable|string|max:100',
            'notes' => 'nullable|string|max:1000',
            'document_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120', // Maksimal 5MB
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

        auth()->user()->documents()->create([
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

        return redirect()->route('dashboard')->with('success', 'Dokumen berhasil dienkripsi dan disimpan di brankas!');
    }

    // Menampilkan Pratinjau Dokumen di Tab Baru Browser
    public function preview(Document $document): Response
    {
        if ($document->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak: Anda bukan pemilik sah berkas ini.');
        }

        if (!Storage::disk('local')->exists($document->encrypted_file_path)) {
            abort(404, 'File fisik tidak ditemukan pada vault server.');
        }

        $encryptedRaw = Storage::disk('local')->get($document->encrypted_file_path);
        $decryptedContents = Crypt::decrypt($encryptedRaw);

        return response($decryptedContents, 200, [
            'Content-Type' => $document->mime_type,
            'Content-Disposition' => 'inline; filename="' . $document->original_filename . '"',
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma' => 'no-cache',
        ]);
    }

    // Mengunduh Dokumen Hasil Dekripsi
    public function download(Document $document): StreamedResponse
    {
        if ($document->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak: Anda bukan pemilik sah berkas ini.');
        }

        if (!Storage::disk('local')->exists($document->encrypted_file_path)) {
            abort(404, 'File fisik tidak ditemukan pada vault server.');
        }

        $encryptedRaw = Storage::disk('local')->get($document->encrypted_file_path);
        $decryptedContents = Crypt::decrypt($encryptedRaw);

        return response()->streamDownload(function () use ($decryptedContents) {
            echo $decryptedContents;
        }, $document->original_filename, [
            'Content-Type' => $document->mime_type,
            'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma' => 'no-cache',
        ]);
    }

    public function destroy(Document $document)
    {
        if ($document->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        if (Storage::disk('local')->exists($document->encrypted_file_path)) {
            Storage::disk('local')->delete($document->encrypted_file_path);
        }

        $document->forceDelete();

        return redirect()->route('dashboard')->with('success', 'Dokumen berhasil dihapus permanen.');
    }
}
