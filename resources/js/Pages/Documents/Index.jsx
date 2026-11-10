import React, { useState } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import PreviewModal from "./Modals/PreviewModal";
import {
    Search,
    Plus,
    Eye,
    Download,
    Edit3,
    Trash2,
    Users,
    MapPin,
} from "lucide-react";

export default function Index({
    documents,
    beneficiaries = [],
    totalCapacityMB,
    totalFiles,
    totalAssetValue = 0,
    filters = {},
}) {
    const { flash } = usePage().props;
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [documentToPreview, setDocumentToPreview] = useState(null);
    const [documentToEdit, setDocumentToEdit] = useState(null);
    const [documentToDelete, setDocumentToDelete] = useState(null);

    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const activeCategory = filters.category || "all";
    const activeBeneficiary = filters.beneficiary_id || "all";

    const applyFilters = (newCategory, newBeneficiary, newSearch) => {
        router.get(
            "/dashboard",
            {
                category: newCategory,
                beneficiary_id: newBeneficiary,
                search: newSearch,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters(activeCategory, activeBeneficiary, searchQuery);
    };

    const formatRupiah = (number) => {
        if (!number || number <= 0) return "-";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(number);
    };

    const categoryBadges = {
        sertifikat_tanah: "bg-amber-50 text-amber-700 border-amber-200",
        bpkb: "bg-blue-50 text-blue-700 border-blue-200",
        wasiat: "bg-purple-50 text-purple-700 border-purple-200",
        lainnya: "bg-slate-100 text-slate-700 border-slate-200",
    };

    return (
        <AuthenticatedLayout>
            <Head title="Brankas Dokumen & Warisan" />

            {/* Kumpulan Komponen Modal Interaktif */}
            <AddModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                beneficiaries={beneficiaries}
            />

            <PreviewModal
                isOpen={!!documentToPreview}
                onClose={() => setDocumentToPreview(null)}
                document={documentToPreview}
            />

            <EditModal
                isOpen={!!documentToEdit}
                onClose={() => setDocumentToEdit(null)}
                document={documentToEdit}
                beneficiaries={beneficiaries}
            />

            <DeleteModal
                isOpen={!!documentToDelete}
                onClose={() => setDocumentToDelete(null)}
                document={documentToDelete}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                {/* Header & Button Trigger Add Modal */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                            Brankas Dokumen & Arsip Warisan
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Penyimpanan terenkripsi AES-256 beserta pemetaan
                            ahli waris keluarga.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/beneficiaries"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-xs text-slate-700 transition"
                        >
                            <Users size={16} />
                            Kelola Ahli Waris
                        </Link>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-sm text-white shadow-[0_8px_16px_rgba(14,165,233,0.25)] hover:brightness-110 transition transform hover:-translate-y-0.5"
                        >
                            <Plus size={18} strokeWidth={2.5} />
                            Upload Dokumen
                        </button>
                    </div>
                </div>

                {flash?.success && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-sm">
                        {flash.success}
                    </div>
                )}

                {/* Statistik Berkas & Valuasi Warisan */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                            Total Dokumen Tersimpan
                        </span>
                        <h4 className="text-3xl font-black text-slate-800 mt-2">
                            {totalFiles}{" "}
                            <span className="text-sm font-bold text-slate-400">
                                Berkas ({totalCapacityMB} MB)
                            </span>
                        </h4>
                    </div>

                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                            Estimasi Nilai Aset Terdata
                        </span>
                        <h4 className="text-2xl font-black text-emerald-600 mt-2">
                            {formatRupiah(totalAssetValue) === "-"
                                ? "Rp 0"
                                : formatRupiah(totalAssetValue)}
                        </h4>
                    </div>

                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                            Ahli Waris Terdaftar
                        </span>
                        <div className="flex items-center justify-between mt-2">
                            <h4 className="text-3xl font-black text-sky-600">
                                {beneficiaries.length}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Orang
                                </span>
                            </h4>
                            <Link
                                href="/beneficiaries"
                                className="text-xs font-extrabold text-sky-600 hover:underline"
                            >
                                Lihat Semua &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bar Filter Kategori, Filter Ahli Waris, & Pencarian */}
                <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                        {[
                            { key: "all", label: "Semua Berkas" },
                            {
                                key: "sertifikat_tanah",
                                label: "Sertifikat Tanah",
                            },
                            { key: "bpkb", label: "BPKB" },
                            { key: "wasiat", label: "Surat Wasiat" },
                            { key: "lainnya", label: "Lainnya" },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() =>
                                    applyFilters(
                                        tab.key,
                                        activeBeneficiary,
                                        searchQuery,
                                    )
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

                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                        <select
                            value={activeBeneficiary}
                            onChange={(e) =>
                                applyFilters(
                                    activeCategory,
                                    e.target.value,
                                    searchQuery,
                                )
                            }
                            className="w-full sm:w-52 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer"
                        >
                            <option value="all">Semua Ahli Waris</option>
                            <option value="unassigned">
                                Belum Dialokasikan
                            </option>
                            {beneficiaries.map((b) => (
                                <option key={b.id} value={b.id}>
                                    Warisan: {b.name}
                                </option>
                            ))}
                        </select>

                        <form
                            onSubmit={handleSearch}
                            className="relative w-full sm:w-64"
                        >
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari dokumen atau lokasi..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                            />
                            <Search
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                        </form>
                    </div>
                </div>

                {/* Tabel Dokumen */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    {documents.data.length === 0 ? (
                        <div className="text-center py-20 px-4">
                            <h3 className="text-lg font-black text-slate-800">
                                Tidak Ada Dokumen Ditemukan
                            </h3>
                            <p className="text-sm font-medium text-slate-500 mt-2">
                                Mulai amankan sertifikat tanah, BPKB, atau
                                berkas wasiat Anda ke dalam brankas.
                            </p>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="mt-6 px-6 py-2.5 bg-sky-50 text-sky-600 font-bold text-sm rounded-xl hover:bg-sky-100 transition"
                            >
                                + Simpan Dokumen Baru
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-black uppercase tracking-widest text-slate-400">
                                        <th className="py-5 px-6">
                                            Identitas Dokumen & Lokasi
                                        </th>
                                        <th className="py-5 px-6">Kategori</th>
                                        <th className="py-5 px-6">
                                            Alokasi Ahli Waris
                                        </th>
                                        <th className="py-5 px-6">
                                            Estimasi Nilai
                                        </th>
                                        <th className="py-5 px-6 text-right">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm font-semibold">
                                    {documents.data.map((doc) => (
                                        <tr
                                            key={doc.id}
                                            className="hover:bg-slate-50/80 transition group"
                                        >
                                            <td className="py-4 px-6">
                                                <span className="font-extrabold text-slate-800 block text-base">
                                                    {doc.title}
                                                </span>
                                                <div className="flex items-center gap-3 text-xs font-medium text-slate-400 mt-0.5">
                                                    <span>
                                                        {doc.original_filename}
                                                    </span>
                                                    {doc.asset_location && (
                                                        <span className="inline-flex items-center gap-1 text-sky-600 font-bold">
                                                            <MapPin size={12} />{" "}
                                                            {doc.asset_location}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span
                                                    className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg border ${
                                                        categoryBadges[
                                                            doc.category
                                                        ] ||
                                                        categoryBadges.lainnya
                                                    }`}
                                                >
                                                    {doc.category.replace(
                                                        "_",
                                                        " ",
                                                    )}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                {doc.beneficiary ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 text-xs font-extrabold">
                                                        <Users size={13} />{" "}
                                                        {doc.beneficiary.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs font-bold text-slate-400 italic">
                                                        Belum ditentukan
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 font-extrabold text-emerald-600 text-xs">
                                                {formatRupiah(
                                                    doc.estimated_value,
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                <button
                                                    onClick={() =>
                                                        setDocumentToPreview(
                                                            doc,
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 text-xs font-bold transition"
                                                >
                                                    <Eye size={14} /> Lihat
                                                </button>
                                                <a
                                                    href={`/documents/${doc.id}/download`}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 text-xs font-bold transition"
                                                >
                                                    <Download size={14} /> Unduh
                                                </a>
                                                <button
                                                    onClick={() =>
                                                        setDocumentToEdit(doc)
                                                    }
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 text-xs font-bold transition"
                                                >
                                                    <Edit3 size={14} /> Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setDocumentToDelete(doc)
                                                    }
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition"
                                                >
                                                    <Trash2 size={14} /> Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {documents.links && documents.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-1.5 bg-slate-50/40">
                            {documents.links.map((link, idx) => (
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
