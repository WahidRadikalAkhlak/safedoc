import React, { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import ReadModal from "./Modals/ReadModal";
import {
    BookOpen,
    Plus,
    Search,
    Eye,
    Edit3,
    Trash2,
    Users,
    Coins,
    Scale,
    Layers,
} from "lucide-react";

export default function Index({
    testaments,
    beneficiaries = [],
    filters = {},
    stats,
}) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [itemToRead, setItemToRead] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const activeCategory = filters.category || "all";
    const activeBeneficiary = filters.beneficiary_id || "all";

    const applyFilter = (newCategory, newBeneficiary, newSearch) => {
        router.get(
            "/testaments",
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
        applyFilter(activeCategory, activeBeneficiary, searchQuery);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(number || 0);
    };

    const categoryBadges = {
        amanat_keluarga: {
            label: "Pesan Wasiat Keluarga",
            style: "bg-sky-50 text-sky-700 border-sky-200",
        },
        instruksi_bisnis: {
            label: "Pesan Usaha / Bisnis",
            style: "bg-indigo-50 text-indigo-700 border-indigo-200",
        },
        piutang_klaim: {
            label: "Uang Piutang (Hak Tagih Keluarga)",
            style: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        kewajiban_utang: {
            label: "Tanggungan Utang (Wajib Lunas)",
            style: "bg-rose-50 text-rose-700 border-rose-200",
        },
    };

    return (
        <AuthenticatedLayout>
            <Head title="Surat Wasiat & Catatan Utang-Piutang" />

            <AddModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                beneficiaries={beneficiaries}
            />
            <ReadModal
                isOpen={!!itemToRead}
                onClose={() => setItemToRead(null)}
                testament={itemToRead}
                formatRupiah={formatRupiah}
            />
            <EditModal
                isOpen={!!itemToEdit}
                onClose={() => setItemToEdit(null)}
                testament={itemToEdit}
                beneficiaries={beneficiaries}
            />
            <DeleteModal
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                testament={itemToDelete}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-7 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                            Surat Wasiat & Catatan Utang-Piutang
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Tuliskan pesan wasiat untuk keluarga, petunjuk
                            usaha, serta daftar uang piutang dan tanggungan
                            utang secara jelas.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href="/estate-summary"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-xs text-slate-700 transition"
                        >
                            <Layers size={16} />
                            Lihat Ringkasan Harta
                        </Link>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-sm text-white shadow-[0_8px_16px_rgba(14,165,233,0.25)] hover:brightness-110 transition transform hover:-translate-y-0.5"
                        >
                            <Plus size={18} strokeWidth={2.5} />
                            Tulis Wasiat / Catatan
                        </button>
                    </div>
                </div>

                {/* 3 Kartu Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Total Surat & Catatan
                            </span>
                            <h4 className="text-3xl font-black text-slate-800 mt-2">
                                {stats.totalTestaments}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Catatan
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-sky-50 text-sky-600">
                            <BookOpen size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Total Piutang (Hak Tagih)
                            </span>
                            <h4 className="text-2xl font-black text-emerald-600 mt-2">
                                {formatRupiah(stats.totalReceivables)}
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                            <Coins size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Tanggungan Utang Tercatat
                            </span>
                            <h4 className="text-2xl font-black text-rose-600 mt-2">
                                {formatRupiah(stats.totalLiabilities)}
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-rose-50 text-rose-600">
                            <Scale size={28} strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* Filter Kategori, Filter Ahli Waris & Pencarian */}
                <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                        {[
                            { key: "all", label: "Semua Catatan" },
                            { key: "amanat_keluarga", label: "Pesan Keluarga" },
                            { key: "instruksi_bisnis", label: "Pesan Bisnis" },
                            { key: "piutang_klaim", label: "Uang Piutang" },
                            {
                                key: "kewajiban_utang",
                                label: "Tanggungan Utang",
                            },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() =>
                                    applyFilter(
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
                                applyFilter(
                                    activeCategory,
                                    e.target.value,
                                    searchQuery,
                                )
                            }
                            className="w-full sm:w-52 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none cursor-pointer"
                        >
                            <option value="all">Semua Anggota Keluarga</option>
                            <option value="unassigned">
                                Untuk Seluruh Keluarga
                            </option>
                            {beneficiaries.map((b) => (
                                <option key={b.id} value={b.id}>
                                    Ditujukan: {b.name}
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
                                placeholder="Cari judul atau nama orang..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                            />
                            <Search
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                        </form>
                    </div>
                </div>

                {/* Daftar Amanat & Wasiat */}
                {testaments.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm text-center py-20 px-4">
                        <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                            <BookOpen size={36} />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">
                            Belum Ada Surat Wasiat atau Catatan
                        </h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-md mx-auto">
                            Tuliskan pesan wasiat untuk keluarga, petunjuk
                            usaha, atau catatan piutang agar keluarga memiliki
                            pedoman yang jelas.
                        </p>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="mt-6 px-6 py-2.5 bg-sky-50 text-sky-600 font-bold text-sm rounded-xl hover:bg-sky-100 transition"
                        >
                            + Tulis Pesan Wasiat Pertama
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {testaments.map((item) => {
                            const badge =
                                categoryBadges[item.category] ||
                                categoryBadges.amanat_keluarga;
                            return (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <span
                                                className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${badge.style}`}
                                            >
                                                {badge.label}
                                            </span>
                                            {item.beneficiary ? (
                                                <button
                                                    onClick={() =>
                                                        applyFilter(
                                                            activeCategory,
                                                            item.beneficiary.id,
                                                            searchQuery,
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[11px] font-extrabold transition"
                                                >
                                                    <Users size={12} />{" "}
                                                    {item.beneficiary.name}
                                                </button>
                                            ) : (
                                                <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-xl border border-slate-100">
                                                    Seluruh Keluarga
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-extrabold text-lg text-slate-900 leading-snug">
                                            {item.title}
                                        </h3>

                                        {(item.counterparty_name ||
                                            item.nominal_amount > 0) && (
                                            <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs">
                                                {item.counterparty_name && (
                                                    <span className="font-bold text-slate-600">
                                                        Nama Pihak / Saksi:{" "}
                                                        <strong className="text-slate-900">
                                                            {
                                                                item.counterparty_name
                                                            }
                                                        </strong>
                                                    </span>
                                                )}
                                                {item.nominal_amount > 0 && (
                                                    <span
                                                        className={`font-black text-sm ${item.category === "kewajiban_utang" ? "text-rose-600" : "text-emerald-600"}`}
                                                    >
                                                        {formatRupiah(
                                                            item.nominal_amount,
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        <p className="text-xs font-medium text-slate-500 line-clamp-3 leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                                            Status:{" "}
                                            {item.status.replace("_", " ")}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    setItemToRead(item)
                                                }
                                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-extrabold transition"
                                            >
                                                <Eye size={14} /> Baca & Cetak
                                                Surat
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setItemToEdit(item)
                                                }
                                                className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
                                                title="Ubah"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setItemToDelete(item)
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
            </div>
        </AuthenticatedLayout>
    );
}
