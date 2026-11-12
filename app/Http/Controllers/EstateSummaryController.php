<?php

namespace App\Http\Controllers;

use App\Models\Beneficiary;
use App\Models\Document;
use App\Models\Testament;
use App\Models\VaultCredential;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EstateSummaryController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();

        $documents = Document::where('user_id', $user->id)
            ->with('beneficiary:id,name,relationship')
            ->latest()
            ->get();

        $credentials = VaultCredential::where('user_id', $user->id)
            ->with('beneficiary:id,name,relationship')
            ->latest()
            ->get();

        $testaments = Testament::where('user_id', $user->id)
            ->with('beneficiary:id,name,relationship')
            ->latest()
            ->get();

        $beneficiaries = Beneficiary::where('user_id', $user->id)
            ->with(['documents', 'credentials', 'testaments'])
            ->orderBy('name')
            ->get()
            ->map(function ($person) {
                $docValue = $person->documents->sum('estimated_value');
                $receivableValue = $person->testaments
                    ->where('category', 'piutang_klaim')
                    ->sum('nominal_amount');

                return [
                    'id' => $person->id,
                    'name' => $person->name,
                    'relationship' => $person->relationship,
                    'phone_number' => $person->phone_number,
                    'email' => $person->email,
                    'allocation_notes' => $person->Allocation_notes,
                    'documents_count' => $person->documents->count(),
                    'credentials_count' => $person->credentials->count(),
                    'testaments_count' => $person->testaments->count(),
                    'total_value' => $docValue + $receivableValue,
                    'documents' => $person->documents->map(fn($d) => [
                        'id' => $d->id,
                        'title' => $d->title,
                        'category' => $d->category,
                        'estimated_value' => $d->estimated_value,
                        'asset_location' => $d->asset_location,
                        'document_number' => $d->document_number,
                    ]),
                    'credentials' => $person->credentials->map(fn($c) => [
                        'id' => $c->id,
                        'title' => $c->title,
                        'category' => $c->category,
                        'institution_name' => $c->institution_name,
                    ]),
                    'testaments' => $person->testaments->map(fn($t) => [
                        'id' => $t->id,
                        'title' => $t->title,
                        'category' => $t->category,
                        'nominal_amount' => $t->nominal_amount,
                    ]),
                ];
            });

        $totalDocumentValue = $documents->sum('estimated_value');
        $totalReceivables = $testaments->where('category', 'piutang_klaim')->sum('nominal_amount');
        $totalLiabilities = $testaments->where('category', 'kewajiban_utang')->sum('nominal_amount');
        $netEstateValue = ($totalDocumentValue + $totalReceivables) - $totalLiabilities;

        return Inertia::render('EstateSummary/Index', [
            'overview' => [
                'totalDocumentValue' => $totalDocumentValue,
                'totalReceivables' => $totalReceivables,
                'totalLiabilities' => $totalLiabilities,
                'netEstateValue' => $netEstateValue,
                'totalDocuments' => $documents->count(),
                'totalCredentials' => $credentials->count(),
                'totalTestaments' => $testaments->count(),
                'totalBeneficiaries' => $beneficiaries->count(),
                'unassignedDocuments' => $documents->whereNull('beneficiary_id')->count(),
            ],
            'beneficiaries' => $beneficiaries,
            'documents' => $documents,
            'credentials' => $credentials,
            'testaments' => $testaments,
        ]);
    }
}
