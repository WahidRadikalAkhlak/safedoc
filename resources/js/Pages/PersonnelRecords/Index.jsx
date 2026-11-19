import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import PreviewModal from "./Modals/PreviewModal";
import SummaryPdfModal from "./Modals/SummaryPdfModal";
import {
    Briefcase,
    Plus,
    Search,
    Eye,
    Download,
    Edit3,
    Trash2,
    Printer,
    Award,
    FileCheck,
    Building2,
    Calendar,
} from "lucide-react";

export default function Index({
    records = [],
    allRecords = [],
    filters = {},
    stats = {},
}) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isSummaryPdfOpen, setIsSummaryPdfOpen] = useState(false);
    const [recordToPreview, setRecordToPreview] = useState(null);
    const [recordToEdit, setRecordToEdit] = useState(null);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const activeCategory = filters.category || "all";

    const applyFilter = (newCategory, newSearch) => {
        router.get(
            "/personnel-records",
            { category: newCategory, search: newSearch },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilter(activeCategory, searchQuery);
    };

    const categoryBadges = {
        sk_cpns_pns: {
            label: "SK CPNS / PNS",
            style: "bg-indigo-50 text-indigo-700 border-indigo-200",
        },
        sk_pangkat: {
            label: "SK Kenaikan Pangkat",
            style: "bg-amber-50 text-amber-700 border-amber-200",
        },
        sk_jabatan: {
            label: "SK Jabatan",
            style: "bg-sky-50 text-sky-700 border-sky-200",
        },
        kgb: {
            label: "Kenaikan Gaji Berkala",
            style: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        diklat_sertifikat: {
            label: "Diklat & Sertifikat",
            style: "bg-purple-50 text-purple-700 border-purple-200",
        },
        penghargaan_lainnya: {
            label: "Penghargaan / Lainnya",
            style: "bg-slate-100 text-slate-700 border-slate-200",
        },
    };

    return (
        <AuthenticatedLayout>
            <Head title="Arsip Kepegawaian & Backup SIMPEG" />

            <AddModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
            <EditModal
                isOpen={!!recordToEdit}
                onClose={() => setRecordToEdit(null)}
                record={recordToEdit}
            />
            <DeleteModal
                isOpen={!!recordToDelete}
                onClose={() => setRecordToDelete(null)}
                record={recordToDelete}
            />
            <PreviewModal
                isOpen={!!recordToPreview}
                onClose={() => setRecordToPreview(null)}
                record={recordToPreview}
            />
            <SummaryPdfModal
                isOpen={isSummaryPdfOpen}
                onClose={() => setIsSummaryPdfOpen(false)}
                allRecords={allRecords}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Header Halaman */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-7 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                            Arsip Kepegawaian & Cadangan SIMPEG
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Simpan seluruh SK Pangkat, SK Jabatan, KGB, dan
                            Sertifikat Diklat sebagai cadangan aman apabila
                            server SIMPEG pusat sedang bermasalah.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <button
                            onClick={() => setIsSummaryPdfOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-900 hover:bg-slate-800 rounded-2xl font-bold text-xs text-white shadow-md transition"
                        >
                            <Printer size={16} className="text-amber-400" />
                            Cetak / Download PDF Rekap Riwayat
                        </button>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-sm text-white shadow-[0_8px_16px_rgba(14,165,233,0.25)] hover:brightness-110 transition"
                        >
                            <Plus size={18} strokeWidth={2.5} />
                            Tambah Berkas SK
                        </button>
                    </div>
                </div>

                {/* 3 Kartu Ringkasan Karier */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Total Berkas SIMPEG Tersimpan
                            </span>
                            <h4 className="text-3xl font-black text-slate-800 mt-2">
                                {stats.totalRecords || 0}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Dokumen
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-sky-50 text-sky-600">
                            <FileCheck size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div className="min-w-0 pr-2">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Pangkat / Golongan Terakhir
                            </span>
                            <h4 className="text-lg font-black text-amber-600 mt-2 truncate">
                                {stats.latestRank}
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-amber-50 text-amber-600 shrink-0">
                            <Award size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div className="min-w-0 pr-2">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Jabatan / Unit Terakhir
                            </span>
                            <h4 className="text-base font-black text-indigo-600 mt-2 truncate">
                                {stats.latestPosition}
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600 shrink-0">
                            <Building2 size={28} strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* Filter & Pencarian */}
                <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                        {[
                            { key: "all", label: "Semua Berkas" },
                            { key: "sk_cpns_pns", label: "SK CPNS/PNS" },
                            { key: "sk_pangkat", label: "SK Pangkat" },
                            { key: "sk_jabatan", label: "SK Jabatan" },
                            { key: "kgb", label: "KGB" },
                            {
                                key: "diklat_sertifikat",
                                label: "Diklat/Sertifikat",
                            },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() =>
                                    applyFilter(tab.key, searchQuery)
                                }
                                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                                    activeCategory === tab.key
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
                        className="relative w-full lg:w-72"
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nomor SK, pangkat, jabatan..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none"
                        />
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </form>
                </div>

                {/* Tabel Riwayat SK Kepegawaian */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    {records.length === 0 ? (
                        <div className="text-center py-20 px-4">
                            <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                                <Briefcase size={36} />
                            </div>
                            <h3 className="text-lg font-black text-slate-800">
                                Belum Ada Arsip Kepegawaian Tersimpan
                            </h3>
                            <p className="text-sm font-medium text-slate-500 mt-1 max-w-md mx-auto">
                                Mulai cadangkan SK CPNS, SK Pangkat, KGB, dan
                                sertifikat diklat Anda agar tetap aman meskipun
                                server SIMPEG sedang gangguan.
                            </p>
                            <button
                                onClick={() => setIsAddOpen(true)}
                                className="mt-6 px-6 py-2.5 bg-sky-50 text-sky-600 font-bold text-sm rounded-xl hover:bg-sky-100 transition"
                            >
                                + Tambah Berkas SK Pertama
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                        <th className="py-5 px-6">
                                            Nama SK & Nomor
                                        </th>
                                        <th className="py-5 px-6">Kategori</th>
                                        <th className="py-5 px-6">
                                            Pangkat / Jabatan
                                        </th>
                                        <th className="py-5 px-6">
                                            TMT Berlaku
                                        </th>
                                        <th className="py-5 px-6 text-right">
                                            Aksi & Unduh PDF
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm font-semibold">
                                    {records.map((item) => {
                                        const cat =
                                            categoryBadges[item.category] ||
                                            categoryBadges.penghargaan_lainnya;
                                        return (
                                            <tr
                                                key={item.id}
                                                className="hover:bg-slate-50/80 transition"
                                            >
                                                <td className="py-4 px-6">
                                                    <span className="font-extrabold text-slate-900 block text-base">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-xs font-mono text-slate-400">
                                                        No. SK:{" "}
                                                        {item.decree_number ||
                                                            "-"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span
                                                        className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg border ${cat.style}`}
                                                    >
                                                        {cat.label}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="font-bold text-slate-800 block text-xs">
                                                        {item.rank_grade || "-"}
                                                    </span>
                                                    <span className="text-xs text-slate-400 block max-w-xs truncate">
                                                        {item.position_unit ||
                                                            ""}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-xs font-bold text-slate-600">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Calendar
                                                            size={13}
                                                            className="text-sky-500"
                                                        />
                                                        {item.effective_date ||
                                                            "-"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right space-x-2">
                                                    <button
                                                        onClick={() =>
                                                            setRecordToPreview(
                                                                item,
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-extrabold transition"
                                                    >
                                                        <Eye size={14} /> Lihat
                                                        SK
                                                    </button>
                                                    {item.stored_path && (
                                                        <a
                                                            href={`/personnel-records/${item.id}/download`}
                                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-extrabold transition"
                                                        >
                                                            <Download
                                                                size={14}
                                                            />{" "}
                                                            Unduh PDF
                                                        </a>
                                                    )}
                                                    <button
                                                        onClick={() =>
                                                            setRecordToEdit(
                                                                item,
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-extrabold transition"
                                                    >
                                                        <Edit3 size={14} /> Ubah
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setRecordToDelete(
                                                                item,
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-extrabold transition"
                                                    >
                                                        <Trash2 size={14} />{" "}
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
