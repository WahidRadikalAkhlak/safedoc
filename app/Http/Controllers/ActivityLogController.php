<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    public function index(Request $request): Response
    {
        $user = auth()->user();
        $filter = $request->query('filter', 'all');
        $search = $request->query('search', '');

        $query = Activity::where('causer_id', $user->id)
            ->where('causer_type', get_class($user))
            ->latest();

        if ($filter === 'vault') {
            $query->where('log_name', 'vault');
        } elseif ($filter === 'security') {
            $query->where('log_name', 'security');
        } elseif ($filter === 'critical') {
            $query->whereIn('event', ['deleted', '2fa_failed']);
        }

        if (!empty($search)) {
            $query->where('description', 'like', '%' . $search . '%');
        }

        $logs = $query->paginate(15)->withQueryString();

        // Statistik Audit Trail
        $baseQuery = Activity::where('causer_id', $user->id)
            ->where('causer_type', get_class($user));

        $totalLogs = (clone $baseQuery)->count();
        $vaultAccessCount = (clone $baseQuery)->whereIn('event', ['previewed', 'downloaded'])->count();
        $criticalAlertsCount = (clone $baseQuery)->whereIn('event', ['deleted', '2fa_failed'])->count();

        return Inertia::render('ActivityLogs/Index', [
            'logs' => $logs,
            'filters' => [
                'filter' => $filter,
                'search' => $search,
            ],
            'stats' => [
                'totalLogs' => $totalLogs,
                'vaultAccessCount' => $vaultAccessCount,
                'criticalAlertsCount' => $criticalAlertsCount,
            ],
        ]);
    }
}
