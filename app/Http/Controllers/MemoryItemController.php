<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Models\MemoryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class MemoryItemController extends Controller
{
    public function index(Request $request): Response
    {
        $user = auth()->user();
        $mediaType = $request->query('media_type', 'all');
        $category = $request->query('category', 'all');
        $beneficiaryId = $request->query('beneficiary_id', 'all');
        $search = $request->query('search', '');

        $query = MemoryItem::where('user_id', $user->id)
            ->with('beneficiary:id,name,relationship')
            ->orderByDesc('memory_date')
            ->latest();

        if ($mediaType !== 'all') {
            $query->where('media_type', $mediaType);
        }

        if ($category !== 'all') {
            $query->where('category', $category);
        }

        if ($beneficiaryId === 'unassigned') {
            $query->whereNull('beneficiary_id');
        } elseif ($beneficiaryId !== 'all') {
            $query->where('beneficiary_id', $beneficiaryId);
        }

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                    ->orWhere('location_name', 'like', '%' . $search . '%');
            });
        }

        $memories = $query->paginate(9)->withQueryString();

        $beneficiaries = Beneficiary::where('user_id', $user->id)
            ->select('id', 'name', 'relationship')
            ->orderBy('name')
            ->get();

        $baseQuery = MemoryItem::where('user_id', $user->id);
        $totalPhotos = (clone $baseQuery)->where('media_type', 'photo')->count();
        $totalVideos = (clone $baseQuery)->where('media_type', 'video')->count();
        $totalSizeBytes = (clone $baseQuery)->sum('file_size');

        return Inertia::render('Memories/Index', [
            'memories' => $memories,
            'beneficiaries' => $beneficiaries,
            'filters' => [
                'media_type' => $mediaType,
                'category' => $category,
                'beneficiary_id' => $beneficiaryId,
                'search' => $search,
            ],
            'stats' => [
                'totalMemories' => $totalPhotos + $totalVideos,
                'totalPhotos' => $totalPhotos,
                'totalVideos' => $totalVideos,
                'totalSizeMB' => round($totalSizeBytes / (1024 * 1024), 2),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:keluarga,acara_spesial,perjalanan,pesan_kenangan',
            'beneficiary_id' => 'nullable|exists:beneficiaries,id',
            'memory_date' => 'nullable|date',
            'location_name' => 'nullable|string|max:255',
            'story_notes' => 'nullable|string|max:3000',
            'media_file' => 'required|file|mimes:jpg,jpeg,png,webp,mp4,mov,webm|max:51200',
        ], [
            'title.required' => 'Judul foto atau video kenangan wajib diisi.',
            'media_file.required' => 'Pilih file foto atau video kenangan terlebih dahulu.',
            'media_file.mimes' => 'Format harus foto (JPG, PNG, WEBP) atau video (MP4, MOV, WEBM).',
            'media_file.max' => 'Ukuran file maksimal 50 MB.',
        ]);

        $file = $request->file('media_file');
        $mimeType = $file->getMimeType() ?: '';
        $detectedMediaType = str_starts_with($mimeType, 'video/') ? 'video' : 'photo';

        $rawContent = file_get_contents($file->getRealPath());
        $hash = hash('sha256', $rawContent);
        $encryptedContent = Crypt::encryptString($rawContent);

        $storedPath = 'vault_memories/' . auth()->id() . '/' . Str::uuid() . '.enc';
        Storage::disk('local')->put($storedPath, $encryptedContent);

        $memory = MemoryItem::create([
            'user_id' => auth()->id(),
            'beneficiary_id' => $validated['beneficiary_id'] ?: null,
            'title' => $validated['title'],
            'media_type' => $detectedMediaType,
            'category' => $validated['category'],
            'memory_date' => $validated['memory_date'] ?? null,
            'location_name' => $validated['location_name'] ?? null,
            'story_notes' => $validated['story_notes'] ?? null,
            'original_filename' => $file->getClientOriginalName(),
            'stored_path' => $storedPath,
            'mime_type' => $mimeType,
            'file_size' => $file->getSize(),
            'file_hash' => $hash,
        ]);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($memory)
            ->event('uploaded')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $memory->title,
                'original_filename' => $memory->original_filename,
                'sha256_hash' => $memory->file_hash,
            ])
            ->log("Menyimpan {$detectedMediaType} kenangan ke brankas: {$memory->title}");

        return redirect()->back()->with('success', 'Foto/video kenangan berhasil disimpan ke dalam brankas!');
    }

    public function update(Request $request, MemoryItem $memory)
    {
        if ($memory->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:keluarga,acara_spesial,perjalanan,pesan_kenangan',
            'beneficiary_id' => 'nullable|exists:beneficiaries,id',
            'memory_date' => 'nullable|date',
            'location_name' => 'nullable|string|max:255',
            'story_notes' => 'nullable|string|max:3000',
        ]);

        $memory->update([
            'beneficiary_id' => $validated['beneficiary_id'] ?: null,
            'title' => $validated['title'],
            'category' => $validated['category'],
            'memory_date' => $validated['memory_date'] ?? null,
            'location_name' => $validated['location_name'] ?? null,
            'story_notes' => $validated['story_notes'] ?? null,
        ]);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($memory)
            ->event('updated')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $memory->title,
            ])
            ->log("Memperbarui cerita/informasi kenangan: {$memory->title}");

        return redirect()->back()->with('success', 'Cerita dan informasi kenangan berhasil diperbarui!');
    }

    public function preview(Request $request, MemoryItem $memory)
    {
        if ($memory->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        if (!$memory->stored_path || !Storage::disk('local')->exists($memory->stored_path)) {
            abort(404, 'File media kenangan tidak ditemukan.');
        }

        $encryptedContent = Storage::disk('local')->get($memory->stored_path);
        $decryptedContent = Crypt::decryptString($encryptedContent);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($memory)
            ->event('previewed')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $memory->title,
                'original_filename' => $memory->original_filename,
            ])
            ->log("Membuka {$memory->media_type} kenangan: {$memory->title}");

        return response($decryptedContent)
            ->header('Content-Type', $memory->mime_type)
            ->header('Accept-Ranges', 'bytes')
            ->header('Content-Disposition', 'inline; filename="' . $memory->original_filename . '"');
    }

    public function download(Request $request, MemoryItem $memory)
    {
        if ($memory->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        if (!$memory->stored_path || !Storage::disk('local')->exists($memory->stored_path)) {
            abort(404, 'File media kenangan tidak ditemukan.');
        }

        $encryptedContent = Storage::disk('local')->get($memory->stored_path);
        $decryptedContent = Crypt::decryptString($encryptedContent);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($memory)
            ->event('downloaded')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $memory->title,
                'original_filename' => $memory->original_filename,
            ])
            ->log("Mengunduh file kenangan: {$memory->title}");

        return response($decryptedContent)
            ->header('Content-Type', $memory->mime_type)
            ->header('Content-Disposition', 'attachment; filename="' . $memory->original_filename . '"');
    }

    public function destroy(Request $request, MemoryItem $memory)
    {
        if ($memory->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        if ($memory->stored_path && Storage::disk('local')->exists($memory->stored_path)) {
            Storage::disk('local')->delete($memory->stored_path);
        }

        $title = $memory->title;
        $memory->delete();

        activity('vault')
            ->causedBy(auth()->user())
            ->event('deleted')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $title,
            ])
            ->log("Menghapus kenangan dari brankas: {$title}");

        return redirect()->back()->with('success', 'Foto/video kenangan berhasil dihapus.');
    }
}
