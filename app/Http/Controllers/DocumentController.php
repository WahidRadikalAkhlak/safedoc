<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\StreamedResponse;

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
            'document_file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:10240', // Max 10MB
        ]);

        $file = $request->file('document_file');
        $rawContents = file_get_contents($file->getRealPath());

        // 1. Hitung SHA-256 Hash sebelum dienkripsi (Integritas Data)
        $fileHash = hash('sha256', $rawContents);

        // 2. Enkripsi konten file secara penuh (AES-256-CBC bawaan Laravel Crypt)
        $encryptedContents = Crypt::encrypt($rawContents);

        // 3. Simpan ke direktori terisolasi non-publik
        $vaultFolder = 'vault/' . auth()->id();
        $randomFileName = Str::uuid() . '.enc';
        $filePath = $vaultFolder . '/' . $randomFileName;

        Storage::disk('local')->put($filePath, $encryptedContents);

        // 4. Catat Metadata ke Database
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

        return redirect()->route('documents.index')->with('success', 'Dokumen berhasil dienkripsi dan disimpan.');
    }

    public function download(Document $document): StreamedResponse
    {
        // Validasi kepemilikan file
        $this->authorize('view', $document);

        if (!Storage::disk('local')->exists($document->encrypted_file_path)) {
            abort(404, 'File fisik tidak ditemukan.');
        }

        // Ambil data terenkripsi dan dekripsi on-the-fly
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
        $this->authorize('delete', $document);

        // Hapus file fisik
        if (Storage::disk('local')->exists($document->encrypted_file_path)) {
            Storage::disk('local')->delete($document->encrypted_file_path);
        }

        $document->forceDelete();

        return redirect()->route('documents.index')->with('success', 'Dokumen berhasil dihapus permanen.');
    }
}
