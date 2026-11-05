import React, { useState } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import PreviewModal from "./Modals/PreviewModal";
import { Search, Plus, Eye, Download, Edit3, Trash2 } from "lucide-react";

export default function Index({
    documents,
    totalCapacityMB,
    totalFiles,
    filters = {},
}) {
    const { flash } = usePage().props;
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [documentToPreview, setDocumentToPreview] = useState(null);
    const [documentToEdit, setDocumentToEdit] = useState(null);
    const [documentToDelete, setDocumentToDelete] = useState(null);

    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const activeCategory = filters.category || "all";

    const handleCategoryFilter = (cat) => {
        router.get(
            "/dashboard",
            { category: cat, search: searchQuery },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/dashboard",
            { category: activeCategory, search: searchQuery },
            { preserveState: true, preserveScroll: true },
        );
    };

    const categoryBadges = {
        sertifikat_tanah: "bg-amber-50 text-amber-700 border-amber-200",
        bpkb: "bg-blue-50 text-blue-700 border-blue-200",
        wasiat: "bg-purple-50 text-purple-700 border-purple-200",
        lainnya: "bg-slate-100 text-slate-700 border-slate-200",
    };

    return (
        <AuthenticatedLayout>
            <Head title="Brankas Dokumen" />

            {/* Kumpulan Komponen Modal Interaktif */}
            <AddModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
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
                            Brankas Dokumen Rahasia
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Data tersimpan dengan proteksi enkripsi AES-256
                            end-to-end.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-sm text-white shadow-[0_8px_16px_rgba(14,165,233,0.25)] hover:shadow-[0_8px_20px_rgba(14,165,233,0.4)] transition transform hover:-translate-y-0.5"
                    >
                        <Plus size={18} strokeWidth={2.5} />
                        Upload Dokumen
                    </button>
                </div>

                {flash?.success && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-sm">
                        {flash.success}
                    </div>
                )}

                {/* Statistik Berkas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400 relative z-10">
                            Total Berkas
                        </span>
                        <h4 className="text-4xl font-black text-slate-800 mt-2 relative z-10">
                            {totalFiles}
                        </h4>
                    </div>
                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400 relative z-10">
                            Kapasitas Terpakai
                        </span>
                        <h4 className="text-4xl font-black text-slate-800 mt-2 relative z-10">
                            {totalCapacityMB}{" "}
                            <span className="text-lg font-bold text-slate-400">
                                MB
                            </span>
                        </h4>
                    </div>
                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform"></div>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400 relative z-10">
                            Status Proteksi
                        </span>
                        <div className="flex items-center gap-2 mt-2 relative z-10">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]"></span>
                            <h4 className="text-2xl font-black text-slate-800">
                                AES-256 Aktif
                            </h4>
                        </div>
                    </div>
                </div>

                {/* Bar Filter Kategori & Pencarian Cepat */}
                <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
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
                                onClick={() => handleCategoryFilter(tab.key)}
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
                        className="relative w-full md:w-72"
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama dokumen atau file..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                        />
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </form>
                </div>

                {/* Tabel Dokumen */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    {documents.data.length === 0 ? (
                        <div className="text-center py-20 px-4">
                            <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    className="w-10 h-10 text-slate-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-black text-slate-800">
                                Tidak Ada Dokumen Ditemukan
                            </h3>
                            <p className="text-sm font-medium text-slate-500 mt-2">
                                Mulai amankan sertifikat tanah, BPKB, atau
                                berkas privat Anda ke dalam brankas.
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
                                            Identitas Dokumen
                                        </th>
                                        <th className="py-5 px-6">Kategori</th>
                                        <th className="py-5 px-6">Nomor</th>
                                        <th className="py-5 px-6">Ukuran</th>
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
                                                <span className="text-xs font-medium text-slate-400">
                                                    {doc.original_filename}
                                                </span>
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
                                            <td className="py-4 px-6 font-mono text-slate-500">
                                                {doc.document_number || "-"}
                                            </td>
                                            <td className="py-4 px-6 text-slate-500">
                                                {(doc.file_size / 1024).toFixed(
                                                    1,
                                                )}{" "}
                                                KB
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
