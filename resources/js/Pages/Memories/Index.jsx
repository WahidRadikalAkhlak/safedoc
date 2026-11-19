import React, { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import PreviewModal from "./Modals/PreviewModal";
import {
    Film,
    Image as ImageIcon,
    Plus,
    Search,
    Eye,
    Download,
    Edit3,
    Trash2,
    Calendar,
    MapPin,
    Users,
    HardDrive,
} from "lucide-react";

export default function Index({
    memories,
    beneficiaries = [],
    filters = {},
    stats = {},
}) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [memoryToPreview, setMemoryToPreview] = useState(null);
    const [memoryToEdit, setMemoryToEdit] = useState(null);
    const [memoryToDelete, setMemoryToDelete] = useState(null);

    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const activeMediaType = filters.media_type || "all";
    const activeCategory = filters.category || "all";
    const activeBeneficiary = filters.beneficiary_id || "all";

    const applyFilter = (
        newMediaType,
        newCategory,
        newBeneficiary,
        newSearch,
    ) => {
        router.get(
            "/memories",
            {
                media_type: newMediaType,
                category: newCategory,
                beneficiary_id: newBeneficiary,
                search: newSearch,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilter(
            activeMediaType,
            activeCategory,
            activeBeneficiary,
            searchQuery,
        );
    };

    const categoryBadges = {
        keluarga: {
            label: "Momen Keluarga",
            style: "bg-sky-50 text-sky-700 border-sky-200",
        },
        acara_spesial: {
            label: "Acara Spesial",
            style: "bg-amber-50 text-amber-700 border-amber-200",
        },
        perjalanan: {
            label: "Perjalanan",
            style: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        pesan_kenangan: {
            label: "Pesan Kenangan",
            style: "bg-indigo-50 text-indigo-700 border-indigo-200",
        },
    };

    const items = memories?.data || [];

    return (
        <AuthenticatedLayout>
            <Head title="Foto & Video Kenangan Keluarga" />

            <AddModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                beneficiaries={beneficiaries}
            />
            <PreviewModal
                isOpen={!!memoryToPreview}
                onClose={() => setMemoryToPreview(null)}
                memory={memoryToPreview}
            />
            <EditModal
                isOpen={!!memoryToEdit}
                onClose={() => setMemoryToEdit(null)}
                memory={memoryToEdit}
                beneficiaries={beneficiaries}
            />
            <DeleteModal
                isOpen={!!memoryToDelete}
                onClose={() => setMemoryToDelete(null)}
                memory={memoryToDelete}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Header Halaman */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-7 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                            Galeri Foto & Video Kenangan Keluarga
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Simpan foto berharga, rekaman video keluarga, dan
                            pesan kenangan di dalam ruang privat yang aman.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-sm text-white shadow-[0_8px_16px_rgba(14,165,233,0.25)] hover:brightness-110 transition shrink-0"
                    >
                        <Plus size={18} strokeWidth={2.5} />
                        Simpan Foto / Video
                    </button>
                </div>

                {/* 3 Kartu Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Foto Kenangan
                            </span>
                            <h4 className="text-3xl font-black text-sky-600 mt-2">
                                {stats.totalPhotos || 0}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Foto
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-sky-50 text-sky-600">
                            <ImageIcon size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Video Kenangan
                            </span>
                            <h4 className="text-3xl font-black text-indigo-600 mt-2">
                                {stats.totalVideos || 0}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Video
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600">
                            <Film size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Total Penyimpanan Media
                            </span>
                            <h4 className="text-2xl font-black text-slate-800 mt-2">
                                {stats.totalSizeMB || 0}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    MB
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                            <HardDrive size={28} strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* Bar Filter Tipe Media, Kategori, Anggota Keluarga & Pencarian */}
                <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                        {[
                            { key: "all", label: "Semua Media" },
                            { key: "photo", label: "Hanya Foto" },
                            { key: "video", label: "Hanya Video" },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() =>
                                    applyFilter(
                                        tab.key,
                                        activeCategory,
                                        activeBeneficiary,
                                        searchQuery,
                                    )
                                }
                                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                                    activeMediaType === tab.key
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
                            value={activeCategory}
                            onChange={(e) =>
                                applyFilter(
                                    activeMediaType,
                                    e.target.value,
                                    activeBeneficiary,
                                    searchQuery,
                                )
                            }
                            className="w-full sm:w-44 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer"
                        >
                            <option value="all">Semua Kategori</option>
                            <option value="keluarga">Momen Keluarga</option>
                            <option value="acara_spesial">Acara Spesial</option>
                            <option value="perjalanan">Perjalanan</option>
                            <option value="pesan_kenangan">
                                Pesan Kenangan
                            </option>
                        </select>

                        <select
                            value={activeBeneficiary}
                            onChange={(e) =>
                                applyFilter(
                                    activeMediaType,
                                    activeCategory,
                                    e.target.value,
                                    searchQuery,
                                )
                            }
                            className="w-full sm:w-48 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer"
                        >
                            <option value="all">Semua Keluarga</option>
                            <option value="unassigned">Seluruh Keluarga</option>
                            {beneficiaries.map((b) => (
                                <option key={b.id} value={b.id}>
                                    Terkait: {b.name}
                                </option>
                            ))}
                        </select>

                        <form
                            onSubmit={handleSearch}
                            className="relative w-full sm:w-60"
                        >
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari judul atau lokasi..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none"
                            />
                            <Search
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                        </form>
                    </div>
                </div>

                {/* Grid Kartu Foto & Video Kenangan */}
                {items.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm text-center py-20 px-4">
                        <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                            <Film size={36} />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">
                            Belum Ada Foto atau Video Kenangan Tersimpan
                        </h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-md mx-auto">
                            Mulai simpan momen berharga bersama keluarga atau
                            pesan video kenangan agar tersimpan aman di dalam
                            brankas.
                        </p>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="mt-6 px-6 py-2.5 bg-sky-50 text-sky-600 font-bold text-sm rounded-xl hover:bg-sky-100 transition"
                        >
                            + Simpan Foto / Video Pertama
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => {
                            const badge =
                                categoryBadges[item.category] ||
                                categoryBadges.keluarga;
                            const isVideo = item.media_type === "video";

                            return (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group"
                                >
                                    <div>
                                        {/* Area Thumbnail Foto / Indikator Video */}
                                        <div
                                            onClick={() =>
                                                setMemoryToPreview(item)
                                            }
                                            className="h-52 bg-slate-900 relative overflow-hidden cursor-pointer flex items-center justify-center"
                                        >
                                            {isVideo ? (
                                                <div className="flex flex-col items-center justify-center text-white space-y-2 p-6 text-center">
                                                    <div className="p-4 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 group-hover:scale-110 transition-transform">
                                                        <Film size={32} />
                                                    </div>
                                                    <span className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
                                                        Video Kenangan • Klik
                                                        untuk Memutar
                                                    </span>
                                                </div>
                                            ) : (
                                                <img
                                                    src={`/memories/${item.id}/preview`}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            )}

                                            <span
                                                className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-xl border backdrop-blur-md ${badge.style}`}
                                            >
                                                {badge.label}
                                            </span>
                                        </div>

                                        {/* Informasi Momen */}
                                        <div className="p-6 space-y-3">
                                            <h3 className="font-extrabold text-base text-slate-900 line-clamp-1">
                                                {item.title}
                                            </h3>

                                            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-400">
                                                {item.memory_date && (
                                                    <span className="inline-flex items-center gap-1">
                                                        <Calendar
                                                            size={12}
                                                            className="text-sky-500"
                                                        />
                                                        {item.memory_date}
                                                    </span>
                                                )}
                                                {item.location_name && (
                                                    <span className="inline-flex items-center gap-1 truncate max-w-[150px]">
                                                        <MapPin
                                                            size={12}
                                                            className="text-emerald-500"
                                                        />
                                                        {item.location_name}
                                                    </span>
                                                )}
                                            </div>

                                            {item.beneficiary && (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            applyFilter(
                                                                activeMediaType,
                                                                activeCategory,
                                                                item.beneficiary
                                                                    .id,
                                                                searchQuery,
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-extrabold"
                                                    >
                                                        <Users size={11} />{" "}
                                                        {item.beneficiary.name}
                                                    </button>
                                                </div>
                                            )}

                                            {item.story_notes && (
                                                <p className="text-xs font-medium text-slate-500 line-clamp-2 leading-relaxed">
                                                    {item.story_notes}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tombol Aksi */}
                                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() =>
                                                    setMemoryToPreview(item)
                                                }
                                                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-extrabold transition"
                                            >
                                                <Eye size={14} />{" "}
                                                {isVideo ? "Putar" : "Lihat"}
                                            </button>
                                            <a
                                                href={`/memories/${item.id}/download`}
                                                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-extrabold transition"
                                                title="Unduh File Asli"
                                            >
                                                <Download size={14} />
                                            </a>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() =>
                                                    setMemoryToEdit(item)
                                                }
                                                className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
                                                title="Ubah Cerita"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setMemoryToDelete(item)
                                                }
                                                className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                                                title="Hapus"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {memories?.links && memories.links.length > 3 && (
                    <div className="bg-white px-6 py-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-end gap-1.5">
                        {memories.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || "#"}
                                preserveScroll
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                                    link.active
                                        ? "bg-sky-600 text-white shadow-sm"
                                        : link.url
                                          ? "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                                          : "text-slate-300 pointer-events-none"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
