<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Models\Testament;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestamentController extends Controller
{
    public function index(Request $request): Response
    {
        $user = auth()->user();
        $category = $request->query('category', 'all');
        $search = $request->query('search', '');

        $query = Testament::where('user_id', $user->id)
            ->with('beneficiary:id,name,relationship')
            ->latest();

        if ($category !== 'all') {
            $query->where('category', $category);
        }

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                    ->orWhere('counterparty_name', 'like', '%' . $search . '%');
            });
        }

        $testaments = $query->get();

        $beneficiaries = Beneficiary::where('user_id', $user->id)
            ->select('id', 'name', 'relationship')
            ->orderBy('name')
            ->get();

        $baseQuery = Testament::where('user_id', $user->id);
        $totalReceivables = (clone $baseQuery)->where('category', 'piutang_klaim')->sum('nominal_amount');
        $totalLiabilities = (clone $baseQuery)->where('category', 'kewajiban_utang')->sum('nominal_amount');

        return Inertia::render('Testaments/Index', [
            'testaments' => $testaments,
            'beneficiaries' => $beneficiaries,
            'filters' => [
                'category' => $category,
                'search' => $search,
            ],
            'stats' => [
                'totalTestaments' => (clone $baseQuery)->count(),
                'totalReceivables' => $totalReceivables,
                'totalLiabilities' => $totalLiabilities,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:amanat_keluarga,instruksi_bisnis,piutang_klaim,kewajiban_utang',
            'beneficiary_id' => 'nullable|exists:beneficiaries,id',
            'counterparty_name' => 'nullable|string|max:255',
            'nominal_amount' => 'nullable|numeric|min:0',
            'content' => 'required|string|max:10000',
            'status' => 'required|string|in:aktif,rahasia_penuh,selesai',
        ], [
            'title.required' => 'Judul surat wasiat/amanat wajib diisi.',
            'content.required' => 'Isi pesan amanat atau rincian wasiat tidak boleh kosong.',
        ]);

        $testament = Testament::create([
            'user_id' => auth()->id(),
            'beneficiary_id' => $validated['beneficiary_id'] ?: null,
            'title' => $validated['title'],
            'category' => $validated['category'],
            'counterparty_name' => $validated['counterparty_name'] ?? null,
            'nominal_amount' => $validated['nominal_amount'] ?: 0,
            'content' => $validated['content'],
            'status' => $validated['status'],
        ]);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($testament)
            ->event('uploaded')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'testament_title' => $testament->title,
                'category' => $testament->category,
            ])
            ->log("Menulis amanat wasiat / catatan baru: {$testament->title}");

        return redirect()->back()->with('success', 'Amanat wasiat berhasil dienkripsi dan disimpan!');
    }

    public function update(Request $request, Testament $testament)
    {
        if ($testament->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:amanat_keluarga,instruksi_bisnis,piutang_klaim,kewajiban_utang',
            'beneficiary_id' => 'nullable|exists:beneficiaries,id',
            'counterparty_name' => 'nullable|string|max:255',
            'nominal_amount' => 'nullable|numeric|min:0',
            'content' => 'required|string|max:10000',
            'status' => 'required|string|in:aktif,rahasia_penuh,selesai',
        ]);

        $testament->update([
            'beneficiary_id' => $validated['beneficiary_id'] ?: null,
            'title' => $validated['title'],
            'category' => $validated['category'],
            'counterparty_name' => $validated['counterparty_name'] ?? null,
            'nominal_amount' => $validated['nominal_amount'] ?: 0,
            'content' => $validated['content'],
            'status' => $validated['status'],
        ]);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($testament)
            ->event('updated')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'testament_title' => $testament->title,
            ])
            ->log("Memperbarui isi amanat wasiat: {$testament->title}");

        return redirect()->back()->with('success', 'Amanat wasiat berhasil diperbarui!');
    }

    public function destroy(Request $request, Testament $testament)
    {
        if ($testament->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        $title = $testament->title;
        $testament->delete();

        activity('vault')
            ->causedBy(auth()->user())
            ->event('deleted')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'testament_title' => $title,
            ])
            ->log("Menghapus catatan wasiat/amanat: {$title}");

        return redirect()->back()->with('success', 'Catatan amanat wasiat berhasil dihapus.');
    }
}
