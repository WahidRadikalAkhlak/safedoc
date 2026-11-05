import React, { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import DetailModal from "./Modals/DetailModal";
import {
    Activity,
    ShieldAlert,
    Eye,
    Download,
    UploadCloud,
    Trash2,
    LogIn,
    LogOut,
    KeyRound,
    Edit3,
    Search,
    Globe,
    Monitor,
} from "lucide-react";

export default function Index({ logs, filters, stats }) {
    const [selectedLog, setSelectedLog] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const activeFilter = filters.filter || "all";

    const handleFilterChange = (newFilter) => {
        router.get(
            "/activity-logs",
            { filter: newFilter, search: searchQuery },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/activity-logs",
            { filter: activeFilter, search: searchQuery },
            { preserveState: true, preserveScroll: true },
        );
    };

    // Helper untuk mendeteksi nama Browser & OS secara ringkas dari User-Agent
    const parseUserAgent = (ua) => {
        if (!ua) return "Perangkat Tidak Dikenal";
        let browser = "Browser";
        let os = "OS";

        if (ua.includes("Edg/")) browser = "Edge";
        else if (ua.includes("Chrome/")) browser = "Chrome";
        else if (ua.includes("Firefox/")) browser = "Firefox";
        else if (ua.includes("Safari/") && !ua.includes("Chrome/"))
            browser = "Safari";

        if (ua.includes("Windows")) os = "Windows";
        else if (ua.includes("Macintosh") || ua.includes("Mac OS"))
            os = "macOS";
        else if (ua.includes("Android")) os = "Android";
        else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
        else if (ua.includes("Linux")) os = "Linux";

        return `${browser} • ${os}`;
    };

    // Helper untuk menentukan warna badge dan ikon berdasarkan event
    const getEventStyle = (event) => {
        switch (event) {
            case "uploaded":
                return {
                    label: "ENKRIPSI BARU",
                    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    iconBg: "bg-emerald-100 text-emerald-600",
                    Icon: UploadCloud,
                };
            case "downloaded":
                return {
                    label: "UNDUH BERKAS",
                    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
                    iconBg: "bg-indigo-100 text-indigo-600",
                    Icon: Download,
                };
            case "previewed":
                return {
                    label: "LIHAT BERKAS",
                    badge: "bg-sky-50 text-sky-700 border-sky-200",
                    iconBg: "bg-sky-100 text-sky-600",
                    Icon: Eye,
                };
            case "updated":
                return {
                    label: "EDIT METADATA",
                    badge: "bg-amber-50 text-amber-700 border-amber-200",
                    iconBg: "bg-amber-100 text-amber-600",
                    Icon: Edit3,
                };
            case "deleted":
                return {
                    label: "DIHANCURKAN",
                    badge: "bg-rose-50 text-rose-700 border-rose-200",
                    iconBg: "bg-rose-100 text-rose-600",
                    Icon: Trash2,
                };
            case "2fa_failed":
                return {
                    label: "2FA GAGAL",
                    badge: "bg-rose-100 text-rose-800 border-rose-300 animate-pulse",
                    iconBg: "bg-rose-500 text-white",
                    Icon: ShieldAlert,
                };
            case "2fa_verified":
            case "2fa_enabled":
                return {
                    label: "2FA TERVERIFIKASI",
                    badge: "bg-teal-50 text-teal-700 border-teal-200",
                    iconBg: "bg-teal-100 text-teal-600",
                    Icon: KeyRound,
                };
            case "login":
                return {
                    label: "SESI MASUK",
                    badge: "bg-blue-50 text-blue-700 border-blue-200",
                    iconBg: "bg-blue-100 text-blue-600",
                    Icon: LogIn,
                };
            case "logout":
                return {
                    label: "KUNCI BRANKAS",
                    badge: "bg-slate-100 text-slate-700 border-slate-200",
                    iconBg: "bg-slate-200 text-slate-600",
                    Icon: LogOut,
                };
            default:
                return {
                    label: (event || "SISTEM").toUpperCase(),
                    badge: "bg-slate-100 text-slate-600 border-slate-200",
                    iconBg: "bg-slate-100 text-slate-600",
                    Icon: Activity,
                };
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Riwayat Aktivitas & Audit" />

            <DetailModal
                isOpen={!!selectedLog}
                onClose={() => setSelectedLog(null)}
                log={selectedLog}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                {/* Header Halaman */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                            Riwayat Aktivitas & Audit Trail
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Rekam jejak komprehensif setiap akses dokumen,
                            enkripsi, dan autentikasi 2FA.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-extrabold tracking-wider uppercase shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        Live Audit Aktif
                    </div>
                </div>

                {/* Kartu Statistik Keamanan */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                            Total Jejak terekam
                        </span>
                        <h4 className="text-4xl font-black text-slate-800 mt-2">
                            {stats.totalLogs}{" "}
                            <span className="text-sm font-bold text-slate-400">
                                Aktivitas
                            </span>
                        </h4>
                    </div>

                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                            Dekripsi & Akses Berkas
                        </span>
                        <h4 className="text-4xl font-black text-sky-600 mt-2">
                            {stats.vaultAccessCount}{" "}
                            <span className="text-sm font-bold text-slate-400">
                                Kali Dibuka
                            </span>
                        </h4>
                    </div>

                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                            Aksi Kritis / Gagal 2FA
                        </span>
                        <h4
                            className={`text-4xl font-black mt-2 ${stats.criticalAlertsCount > 0 ? "text-rose-600" : "text-emerald-600"}`}
                        >
                            {stats.criticalAlertsCount}{" "}
                            <span className="text-sm font-bold text-slate-400">
                                Kejadian
                            </span>
                        </h4>
                    </div>
                </div>

                {/* Bar Filter & Pencarian */}
                <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                        {[
                            { key: "all", label: "Semua Log" },
                            { key: "vault", label: "Akses Dokumen" },
                            { key: "security", label: "Keamanan & 2FA" },
                            { key: "critical", label: "Peringatan Kritis" },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => handleFilterChange(tab.key)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                                    activeFilter === tab.key
                                        ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/20"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="relative w-full md:w-72"
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari aktivitas atau dokumen..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                        />
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </form>
                </div>

                {/* Daftar Tabel Log Aktivitas */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    {logs.data.length === 0 ? (
                        <div className="text-center py-20 px-4">
                            <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                                <Activity size={32} />
                            </div>
                            <h3 className="text-lg font-black text-slate-800">
                                Belum Ada Riwayat Tercatat
                            </h3>
                            <p className="text-sm font-medium text-slate-500 mt-1">
                                Setiap aktivitas di dalam brankas akan otomatis
                                terekam di halaman ini.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                        <th className="py-4 px-6">
                                            Tipe Kejadian
                                        </th>
                                        <th className="py-4 px-6">
                                            Rincian Aktivitas
                                        </th>
                                        <th className="py-4 px-6">
                                            Alamat IP & Perangkat
                                        </th>
                                        <th className="py-4 px-6">Waktu</th>
                                        <th className="py-4 px-6 text-right">
                                            Inspeksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm font-semibold">
                                    {logs.data.map((log) => {
                                        const style = getEventStyle(log.event);
                                        const EventIcon = style.Icon;
                                        const props = log.properties || {};

                                        return (
                                            <tr
                                                key={log.id}
                                                className="hover:bg-slate-50/80 transition"
                                            >
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`p-2.5 rounded-xl ${style.iconBg}`}
                                                        >
                                                            <EventIcon
                                                                size={18}
                                                                strokeWidth={
                                                                    2.5
                                                                }
                                                            />
                                                        </div>
                                                        <span
                                                            className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${style.badge}`}
                                                        >
                                                            {style.label}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="font-bold text-slate-800 block max-w-md truncate">
                                                        {log.description}
                                                    </span>
                                                    {props.original_filename && (
                                                        <span className="text-xs font-medium text-slate-400 block">
                                                            File:{" "}
                                                            {
                                                                props.original_filename
                                                            }
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600">
                                                        <Globe
                                                            size={13}
                                                            className="text-sky-500"
                                                        />
                                                        {props.ip ||
                                                            "127.0.0.1"}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                                                        <Monitor size={12} />
                                                        {parseUserAgent(
                                                            props.user_agent,
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-500">
                                                    {new Date(
                                                        log.created_at,
                                                    ).toLocaleString("id-ID", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() =>
                                                            setSelectedLog(log)
                                                        }
                                                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-600 text-xs font-bold transition"
                                                    >
                                                        Detail
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {logs.links && logs.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-1.5 bg-slate-50/40">
                            {logs.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || "#"}
                                    preserveScroll
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                                        link.active
                                            ? "bg-sky-600 text-white shadow-sm"
                                            : link.url
                                              ? "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                              : "text-slate-300 pointer-events-none"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
