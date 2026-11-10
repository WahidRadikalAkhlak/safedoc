<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BeneficiaryController extends Controller
{
    public function index(Request $request): Response
    {
        $user = auth()->user();
        $search = $request->query('search', '');

        $query = Beneficiary::where('user_id', $user->id)
            ->with(['documents' => function ($q) {
                $q->select('id', 'beneficiary_id', 'title', 'category', 'estimated_value', 'asset_location', 'original_filename');
            }])
            ->latest();

        if (!empty($search)) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        $beneficiaries = $query->get()->map(function ($person) {
            return [
                'id' => $person->id,
                'name' => $person->name,
                'relationship' => $person->relationship,
                'nik' => $person->nik,
                'phone_number' => $person->phone_number,
                'email' => $person->email,
                'allocation_notes' => $person->Allocation_notes,
                'documents_count' => $person->documents->count(),
                'total_allocated_value' => $person->documents->sum('estimated_value'),
                'documents' => $person->documents,
                'created_at' => $person->created_at,
            ];
        });

        $totalEstateValue = $user->documents()->sum('estimated_value');
        $allocatedDocumentsCount = $user->documents()->whereNotNull('beneficiary_id')->count();
        $unallocatedDocumentsCount = $user->documents()->whereNull('beneficiary_id')->count();

        return Inertia::render('Beneficiaries/Index', [
            'beneficiaries' => $beneficiaries,
            'filters' => [
                'search' => $search,
            ],
            'summary' => [
                'totalBeneficiaries' => $beneficiaries->count(),
                'totalEstateValue' => $totalEstateValue,
                'allocatedDocumentsCount' => $allocatedDocumentsCount,
                'unallocatedDocumentsCount' => $unallocatedDocumentsCount,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'relationship' => 'required|string|in:istri_suami,anak,saudara,notaris,lainnya',
            'nik' => 'nullable|string|max:32',
            'phone_number' => 'nullable|string|max:30',
            'email' => 'nullable|email|max:255',
            'allocation_notes' => 'nullable|string|max:2000',
        ], [
            'name.required' => 'Nama lengkap ahli waris wajib diisi.',
            'relationship.required' => 'Pilih hubungan keluarga/status.',
        ]);

        $beneficiary = Beneficiary::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'relationship' => $validated['relationship'],
            'nik' => $validated['nik'] ?? null,
            'phone_number' => $validated['phone_number'] ?? null,
            'email' => $validated['email'] ?? null,
            'Allocation_notes' => $validated['allocation_notes'] ?? null,
        ]);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($beneficiary)
            ->event('beneficiary_added')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'beneficiary_name' => $beneficiary->name,
                'relationship' => $beneficiary->relationship,
            ])
            ->log("Menambahkan data ahli waris baru: {$beneficiary->name}");

        return redirect()->back()->with('success', 'Data ahli waris berhasil didaftarkan ke dalam brankas!');
    }

    public function update(Request $request, Beneficiary $beneficiary)
    {
        if ($beneficiary->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'relationship' => 'required|string|in:istri_suami,anak,saudara,notaris,lainnya',
            'nik' => 'nullable|string|max:32',
            'phone_number' => 'nullable|string|max:30',
            'email' => 'nullable|email|max:255',
            'allocation_notes' => 'nullable|string|max:2000',
        ]);

        $beneficiary->update([
            'name' => $validated['name'],
            'relationship' => $validated['relationship'],
            'nik' => $validated['nik'] ?? null,
            'phone_number' => $validated['phone_number'] ?? null,
            'email' => $validated['email'] ?? null,
            'Allocation_notes' => $validated['allocation_notes'] ?? null,
        ]);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($beneficiary)
            ->event('beneficiary_updated')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'beneficiary_name' => $beneficiary->name,
            ])
            ->log("Memperbarui data ahli waris: {$beneficiary->name}");

        return redirect()->back()->with('success', 'Data ahli waris berhasil diperbarui!');
    }

    public function destroy(Request $request, Beneficiary $beneficiary)
    {
        if ($beneficiary->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        $name = $beneficiary->name;
        $beneficiary->delete();

        activity('vault')
            ->causedBy(auth()->user())
            ->event('beneficiary_deleted')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'beneficiary_name' => $name,
            ])
            ->log("Menghapus ahli waris dari daftar brankas: {$name}");

        return redirect()->back()->with('success', 'Data ahli waris berhasil dihapus.');
    }
}
