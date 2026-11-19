<?php

namespace App\Http\Controllers;

use App\Models\PersonnelRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PersonnelRecordController extends Controller
{
    public function index(Request $request): Response
    {
        $user = auth()->user();
        $category = $request->query('category', 'all');
        $search = $request->query('search', '');

        $query = PersonnelRecord::where('user_id', $user->id)
            ->orderByDesc('effective_date')
            ->latest();

        if ($category !== 'all') {
            $query->where('category', $category);
        }

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                    ->orWhere('decree_number', 'like', '%' . $search . '%')
                    ->orWhere('rank_grade', 'like', '%' . $search . '%')
                    ->orWhere('position_unit', 'like', '%' . $search . '%');
            });
        }

        $records = $query->get();

        // Ambil seluruh arsip tanpa filter untuk kebutuhan cetak rekap PDF lengkap
        $allRecords = PersonnelRecord::where('user_id', $user->id)
            ->orderBy('effective_date', 'asc')
            ->get();

        $latestRankRecord = PersonnelRecord::where('user_id', $user->id)
            ->whereNotNull('rank_grade')
            ->where('rank_grade', '!=', '')
            ->orderByDesc('effective_date')
            ->first();

        $latestPositionRecord = PersonnelRecord::where('user_id', $user->id)
            ->whereNotNull('position_unit')
            ->where('position_unit', '!=', '')
            ->orderByDesc('effective_date')
            ->first();

        return Inertia::render('PersonnelRecords/Index', [
            'records' => $records,
            'allRecords' => $allRecords,
            'filters' => [
                'category' => $category,
                'search' => $search,
            ],
            'stats' => [
                'totalRecords' => $allRecords->count(),
                'skCount' => $allRecords->whereIn('category', ['sk_cpns_pns', 'sk_pangkat', 'sk_jabatan', 'kgb'])->count(),
                'latestRank' => $latestRankRecord?->rank_grade ?? 'Belum Diisi',
                'latestPosition' => $latestPositionRecord?->position_unit ?? 'Belum Diisi',
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:sk_cpns_pns,sk_pangkat,sk_jabatan,kgb,diklat_sertifikat,penghargaan_lainnya',
            'decree_number' => 'nullable|string|max:255',
            'decree_date' => 'nullable|date',
            'effective_date' => 'nullable|date',
            'rank_grade' => 'nullable|string|max:255',
            'position_unit' => 'nullable|string|max:255',
            'issuing_authority' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:2000',
            'document_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ], [
            'title.required' => 'Nama SK / Berkas Kepegawaian wajib diisi.',
            'document_file.mimes' => 'Format file harus PDF, JPG, atau PNG.',
            'document_file.max' => 'Ukuran file maksimal 5 MB.',
        ]);

        $fileData = [
            'original_filename' => null,
            'stored_path' => null,
            'mime_type' => null,
            'file_size' => 0,
            'file_hash' => null,
        ];

        if ($request->hasFile('document_file')) {
            $file = $request->file('document_file');
            $rawContent = file_get_contents($file->getRealPath());
            $hash = hash('sha256', $rawContent);
            $encryptedContent = Crypt::encryptString($rawContent);

            $storedPath = 'vault_personnel/' . auth()->id() . '/' . Str::uuid() . '.enc';
            Storage::disk('local')->put($storedPath, $encryptedContent);

            $fileData = [
                'original_filename' => $file->getClientOriginalName(),
                'stored_path' => $storedPath,
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'file_hash' => $hash,
            ];
        }

        $record = PersonnelRecord::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'category' => $validated['category'],
            'decree_number' => $validated['decree_number'] ?? null,
            'decree_date' => $validated['decree_date'] ?? null,
            'effective_date' => $validated['effective_date'] ?? null,
            'rank_grade' => $validated['rank_grade'] ?? null,
            'position_unit' => $validated['position_unit'] ?? null,
            'issuing_authority' => $validated['issuing_authority'] ?? null,
            'notes' => $validated['notes'] ?? null,
            ...$fileData,
        ]);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($record)
            ->event('uploaded')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $record->title,
                'original_filename' => $record->original_filename,
                'sha256_hash' => $record->file_hash,
            ])
            ->log("Menyimpan arsip kepegawaian SIMPEG: {$record->title}");

        return redirect()->back()->with('success', 'Data & berkas kepegawaian berhasil diamankan!');
    }

    public function update(Request $request, PersonnelRecord $personnelRecord)
    {
        if ($personnelRecord->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:sk_cpns_pns,sk_pangkat,sk_jabatan,kgb,diklat_sertifikat,penghargaan_lainnya',
            'decree_number' => 'nullable|string|max:255',
            'decree_date' => 'nullable|date',
            'effective_date' => 'nullable|date',
            'rank_grade' => 'nullable|string|max:255',
            'position_unit' => 'nullable|string|max:255',
            'issuing_authority' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:2000',
            'document_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ]);

        if ($request->hasFile('document_file')) {
            if ($personnelRecord->stored_path && Storage::disk('local')->exists($personnelRecord->stored_path)) {
                Storage::disk('local')->delete($personnelRecord->stored_path);
            }

            $file = $request->file('document_file');
            $rawContent = file_get_contents($file->getRealPath());
            $hash = hash('sha256', $rawContent);
            $encryptedContent = Crypt::encryptString($rawContent);

            $storedPath = 'vault_personnel/' . auth()->id() . '/' . Str::uuid() . '.enc';
            Storage::disk('local')->put($storedPath, $encryptedContent);

            $personnelRecord->original_filename = $file->getClientOriginalName();
            $personnelRecord->stored_path = $storedPath;
            $personnelRecord->mime_type = $file->getMimeType();
            $personnelRecord->file_size = $file->getSize();
            $personnelRecord->file_hash = $hash;
        }

        $personnelRecord->title = $validated['title'];
        $personnelRecord->category = $validated['category'];
        $personnelRecord->decree_number = $validated['decree_number'] ?? null;
        $personnelRecord->decree_date = $validated['decree_date'] ?? null;
        $personnelRecord->effective_date = $validated['effective_date'] ?? null;
        $personnelRecord->rank_grade = $validated['rank_grade'] ?? null;
        $personnelRecord->position_unit = $validated['position_unit'] ?? null;
        $personnelRecord->issuing_authority = $validated['issuing_authority'] ?? null;
        $personnelRecord->notes = $validated['notes'] ?? null;
        $personnelRecord->save();

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($personnelRecord)
            ->event('updated')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $personnelRecord->title,
            ])
            ->log("Memperbarui arsip kepegawaian SIMPEG: {$personnelRecord->title}");

        return redirect()->back()->with('success', 'Data arsip kepegawaian berhasil diperbarui!');
    }

    public function preview(Request $request, PersonnelRecord $personnelRecord)
    {
        if ($personnelRecord->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        if (!$personnelRecord->stored_path || !Storage::disk('local')->exists($personnelRecord->stored_path)) {
            abort(404, 'File scan SK belum diunggah atau tidak ditemukan.');
        }

        $encryptedContent = Storage::disk('local')->get($personnelRecord->stored_path);
        $decryptedContent = Crypt::decryptString($encryptedContent);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($personnelRecord)
            ->event('previewed')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $personnelRecord->title,
                'original_filename' => $personnelRecord->original_filename,
            ])
            ->log("Melihat pratinjau berkas kepegawaian: {$personnelRecord->title}");

        return response($decryptedContent)
            ->header('Content-Type', $personnelRecord->mime_type)
            ->header('Content-Disposition', 'inline; filename="' . $personnelRecord->original_filename . '"');
    }

    public function download(Request $request, PersonnelRecord $personnelRecord)
    {
        if ($personnelRecord->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        if (!$personnelRecord->stored_path || !Storage::disk('local')->exists($personnelRecord->stored_path)) {
            abort(404, 'File scan SK belum diunggah atau tidak ditemukan.');
        }

        $encryptedContent = Storage::disk('local')->get($personnelRecord->stored_path);
        $decryptedContent = Crypt::decryptString($encryptedContent);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($personnelRecord)
            ->event('downloaded')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $personnelRecord->title,
                'original_filename' => $personnelRecord->original_filename,
            ])
            ->log("Mengunduh berkas asli kepegawaian: {$personnelRecord->title}");

        return response($decryptedContent)
            ->header('Content-Type', $personnelRecord->mime_type)
            ->header('Content-Disposition', 'attachment; filename="' . $personnelRecord->original_filename . '"');
    }

    public function destroy(Request $request, PersonnelRecord $personnelRecord)
    {
        if ($personnelRecord->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        if ($personnelRecord->stored_path && Storage::disk('local')->exists($personnelRecord->stored_path)) {
            Storage::disk('local')->delete($personnelRecord->stored_path);
        }

        $title = $personnelRecord->title;
        $personnelRecord->delete();

        activity('vault')
            ->causedBy(auth()->user())
            ->event('deleted')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'document_title' => $title,
            ])
            ->log("Menghapus arsip kepegawaian SIMPEG: {$title}");

        return redirect()->back()->with('success', 'Arsip kepegawaian berhasil dihapus.');
    }
}
