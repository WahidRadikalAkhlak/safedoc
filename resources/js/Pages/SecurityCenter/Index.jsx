import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import ResetTwoFactorModal from "./Modals/ResetTwoFactorModal";
import {
    ShieldCheck,
    ShieldAlert,
    RefreshCw,
    KeyRound,
    CheckCircle2,
    XCircle,
    Lock,
    HardDrive,
    FileCheck,
} from "lucide-react";

export default function Index({
    integrityReport,
    categoryStats,
    securitySummary,
}) {
    const [isScanning, setIsScanning] = useState(false);
    const [isReset2faOpen, setIsReset2faOpen] = useState(false);

    const runIntegrityScan = () => {
        setIsScanning(true);
        router.post(
            "/security-center/verify-integrity",
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(
                        "Pemindaian SHA-256 selesai! Semua berkas telah diverifikasi.",
                    );
                },
                onFinish: () => setIsScanning(false),
            },
        );
    };

    const categoryLabels = {
        sertifikat_tanah: {
            name: "Sertifikat Tanah / Properti",
            color: "bg-amber-500",
        },
        bpkb: { name: "BPKB / Bukti Kendaraan", color: "bg-blue-500" },
        wasiat: { name: "Surat Wasiat / Akta Notaris", color: "bg-purple-500" },
        lainnya: { name: "Dokumen Rahasia Lainnya", color: "bg-slate-600" },
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pusat Keamanan & Integritas" />

            <ResetTwoFactorModal
                isOpen={isReset2faOpen}
                onClose={() => setIsReset2faOpen(false)}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                {/* Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                            Pusat Keamanan & Integritas Brankas
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Verifikasi keaslian fisik berkas terenkripsi
                            (SHA-256) dan kelola kunci 2FA Anda.
                        </p>
                    </div>
                    <button
                        onClick={runIntegrityScan}
                        disabled={isScanning}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-sm text-white shadow-[0_8px_16px_rgba(14,165,233,0.25)] hover:brightness-110 transition transform hover:-translate-y-0.5 disabled:opacity-60"
                    >
                        <RefreshCw
                            size={18}
                            className={isScanning ? "animate-spin" : ""}
                        />
                        {isScanning
                            ? "Memindai Vault..."
                            : "Pindai Integritas SHA-256"}
                    </button>
                </div>

                {/* 3 Kartu Status Keamanan */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Integritas Fisik Berkas
                            </span>
                            <h4 className="text-3xl font-black text-emerald-600 mt-2">
                                {securitySummary.validDocuments} /{" "}
                                {securitySummary.totalDocuments}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Valid
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                            <FileCheck size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Otentikasi Dua Faktor
                            </span>
                            <h4 className="text-2xl font-black text-slate-800 mt-2">
                                {securitySummary.twoFactorEnabled
                                    ? "Google 2FA Aktif"
                                    : "Belum Aktif"}
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-sky-50 text-sky-600">
                            <Lock size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Percobaan Gagal 2FA
                            </span>
                            <h4
                                className={`text-3xl font-black mt-2 ${securitySummary.failed2faCount > 0 ? "text-rose-600" : "text-slate-800"}`}
                            >
                                {securitySummary.failed2faCount}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Insiden
                                </span>
                            </h4>
                        </div>
                        <div
                            className={`p-4 rounded-2xl ${securitySummary.failed2faCount > 0 ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"}`}
                        >
                            <ShieldAlert size={28} strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* Grid Manajemen 2FA & Distribusi Kategori */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Panel Manajemen 2FA */}
                    <div className="p-6 sm:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 text-xs font-black uppercase tracking-wider">
                                <KeyRound size={15} /> Proteksi Perangkat OTP
                            </div>
                            <h3 className="text-xl font-black text-slate-800">
                                Konfigurasi Google Authenticator
                            </h3>
                            <p className="text-sm font-medium text-slate-500 leading-relaxed">
                                Setiap kali Anda masuk ke SafeDoc, sistem
                                mewajibkan 6 digit kode OTP dari perangkat
                                ponsel Anda. Jika Anda berganti HP baru, Anda
                                dapat mereset dan membuat ulang QR Code rahasia
                                di sini.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                                <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                                    Tersinkronisasi Penuh
                                </span>
                            </div>
                            <button
                                onClick={() => setIsReset2faOpen(true)}
                                className="px-5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-xs transition"
                            >
                                Ganti Perangkat / Reset QR
                            </button>
                        </div>
                    </div>

                    {/* Panel Distribusi Kategori Dokumen */}
                    <div className="p-6 sm:p-8 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                <HardDrive size={20} className="text-sky-500" />
                                Komposisi Kategori Brankas
                            </h3>
                            <span className="text-xs font-bold text-slate-400">
                                Total {securitySummary.totalDocuments} Berkas
                            </span>
                        </div>

                        <div className="space-y-3.5 pt-2">
                            {Object.entries(categoryLabels).map(
                                ([key, info]) => {
                                    const stat = categoryStats[key] || {
                                        count: 0,
                                        size_kb: 0,
                                    };
                                    const percentage =
                                        securitySummary.totalDocuments > 0
                                            ? Math.round(
                                                  (stat.count /
                                                      securitySummary.totalDocuments) *
                                                      100,
                                              )
                                            : 0;

                                    return (
                                        <div key={key} className="space-y-1.5">
                                            <div className="flex justify-between text-xs font-bold">
                                                <span className="text-slate-700">
                                                    {info.name}
                                                </span>
                                                <span className="text-slate-500">
                                                    {stat.count} Berkas (
                                                    {stat.size_kb} KB)
                                                </span>
                                            </div>
                                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${info.color}`}
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabel Laporan Integritas SHA-256 */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-black text-slate-800">
                                Status Checksum & Enkripsi Berkas (SHA-256)
                            </h3>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">
                                Memastikan tidak ada perubahan bit (tampering)
                                pada file fisik di dalam server vault.
                            </p>
                        </div>
                    </div>

                    {integrityReport.length === 0 ? (
                        <div className="text-center py-16 px-4">
                            <ShieldCheck
                                size={36}
                                className="mx-auto text-slate-300 mb-3"
                            />
                            <p className="text-sm font-bold text-slate-600">
                                Belum ada berkas untuk diverifikasi.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                        <th className="py-4 px-6">
                                            Nama Dokumen
                                        </th>
                                        <th className="py-4 px-6">
                                            Sidik Jari Digital (SHA-256)
                                        </th>
                                        <th className="py-4 px-6">Ukuran</th>
                                        <th className="py-4 px-6 text-right">
                                            Status Integritas
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm font-semibold">
                                    {integrityReport.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-slate-50/80 transition"
                                        >
                                            <td className="py-4 px-6">
                                                <span className="font-bold text-slate-800 block">
                                                    {item.title}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    {item.original_filename}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <code className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                                                    {item.file_hash
                                                        ? `${item.file_hash.substring(0, 16)}...${item.file_hash.slice(-12)}`
                                                        : "-"}
                                                </code>
                                            </td>
                                            <td className="py-4 px-6 text-xs text-slate-500">
                                                {item.file_size_kb} KB
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                {item.status === "valid" ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-extrabold">
                                                        <CheckCircle2
                                                            size={14}
                                                        />{" "}
                                                        TERVERIFIKASI UTUH
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-extrabold">
                                                        <XCircle size={14} />{" "}
                                                        FILE RUSAK / HILANG
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
