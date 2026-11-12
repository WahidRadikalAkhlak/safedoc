<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Models\VaultCredential;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VaultCredentialController extends Controller
{
    public function index(Request $request): Response
    {
        $user = auth()->user();
        $category = $request->query('category', 'all');
        $beneficiaryId = $request->query('beneficiary_id', 'all');
        $search = $request->query('search', '');

        $query = VaultCredential::where('user_id', $user->id)
            ->with('beneficiary:id,name,relationship')
            ->latest();

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
                    ->orWhere('institution_name', 'like', '%' . $search . '%');
            });
        }

        $credentials = $query->get();

        $beneficiaries = Beneficiary::where('user_id', $user->id)
            ->select('id', 'name', 'relationship')
            ->orderBy('name')
            ->get();

        $baseQuery = VaultCredential::where('user_id', $user->id);

        return Inertia::render('Credentials/Index', [
            'credentials' => $credentials,
            'beneficiaries' => $beneficiaries,
            'filters' => [
                'category' => $category,
                'beneficiary_id' => $beneficiaryId,
                'search' => $search,
            ],
            'stats' => [
                'totalCredentials' => (clone $baseQuery)->count(),
                'bankAndInsuranceCount' => (clone $baseQuery)->whereIn('category', ['rekening_bank', 'polis_asuransi'])->count(),
                'physicalSafeCount' => (clone $baseQuery)->where('category', 'brankas_fisik')->count(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:rekening_bank,polis_asuransi,brankas_fisik,investasi,akun_digital',
            'beneficiary_id' => 'nullable|exists:beneficiaries,id',
            'institution_name' => 'nullable|string|max:255',
            'account_identifier' => 'required|string|max:500',
            'secret_pin_or_password' => 'required|string|max:500',
            'access_instructions' => 'nullable|string|max:2000',
        ], [
            'title.required' => 'Nama rekening, polis, atau brankas wajib diisi.',
            'account_identifier.required' => 'Nomor rekening, nomor polis, atau ID akun wajib diisi.',
            'secret_pin_or_password.required' => 'Kode PIN, kata sandi, atau kombinasi kunci wajib diisi.',
        ]);

        $credential = VaultCredential::create([
            'user_id' => auth()->id(),
            'beneficiary_id' => $validated['beneficiary_id'] ?: null,
            'title' => $validated['title'],
            'category' => $validated['category'],
            'institution_name' => $validated['institution_name'] ?? null,
            'account_identifier' => $validated['account_identifier'],
            'secret_pin_or_password' => $validated['secret_pin_or_password'],
            'access_instructions' => $validated['access_instructions'] ?? null,
        ]);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($credential)
            ->event('uploaded')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'credential_title' => $credential->title,
                'category' => $credential->category,
            ])
            ->log("Menyimpan data rekening/PIN rahasia: {$credential->title}");

        return redirect()->back()->with('success', 'Data rekening & PIN berhasil diamankan ke dalam brankas!');
    }

    public function update(Request $request, VaultCredential $credential)
    {
        if ($credential->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|in:rekening_bank,polis_asuransi,brankas_fisik,investasi,akun_digital',
            'beneficiary_id' => 'nullable|exists:beneficiaries,id',
            'institution_name' => 'nullable|string|max:255',
            'account_identifier' => 'required|string|max:500',
            'secret_pin_or_password' => 'required|string|max:500',
            'access_instructions' => 'nullable|string|max:2000',
        ]);

        $credential->update([
            'beneficiary_id' => $validated['beneficiary_id'] ?: null,
            'title' => $validated['title'],
            'category' => $validated['category'],
            'institution_name' => $validated['institution_name'] ?? null,
            'account_identifier' => $validated['account_identifier'],
            'secret_pin_or_password' => $validated['secret_pin_or_password'],
            'access_instructions' => $validated['access_instructions'] ?? null,
        ]);

        activity('vault')
            ->causedBy(auth()->user())
            ->performedOn($credential)
            ->event('updated')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'credential_title' => $credential->title,
            ])
            ->log("Memperbarui data rekening/PIN: {$credential->title}");

        return redirect()->back()->with('success', 'Data rekening & PIN berhasil diperbarui!');
    }

    public function destroy(Request $request, VaultCredential $credential)
    {
        if ($credential->user_id !== auth()->id()) {
            abort(403, 'Akses Ditolak.');
        }

        $title = $credential->title;
        $credential->delete();

        activity('vault')
            ->causedBy(auth()->user())
            ->event('deleted')
            ->withProperties([
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'credential_title' => $title,
            ])
            ->log("Menghapus permanen rekening/PIN dari brankas: {$title}");

        return redirect()->back()->with('success', 'Data rekening & PIN berhasil dihapus.');
    }
}
