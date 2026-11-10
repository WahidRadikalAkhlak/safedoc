import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import DetailModal from "./Modals/DetailModal";
import {
    Users,
    UserPlus,
    Search,
    Eye,
    Edit3,
    Trash2,
    FileText,
    Phone,
    Coins,
    CheckCircle2,
} from "lucide-react";

export default function Index({ beneficiaries, filters, summary }) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [personToView, setPersonToView] = useState(null);
    const [personToEdit, setPersonToEdit] = useState(null);
    const [personToDelete, setPersonToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/beneficiaries",
            { search: searchQuery },
            { preserveState: true, preserveScroll: true },
        );
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(number || 0);
    };

    const relationshipBadges = {
        istri_suami: {
            label: "Istri / Suami Sah",
            style: "bg-rose-50 text-rose-700 border-rose-200",
        },
        anak: {
            label: "Anak Kandung",
            style: "bg-sky-50 text-sky-700 border-sky-200",
        },
        saudara: {
            label: "Keluarga / Saudara",
            style: "bg-indigo-50 text-indigo-700 border-indigo-200",
        },
        notaris: {
            label: "Notaris / Kuasa Hukum",
            style: "bg-amber-50 text-amber-700 border-amber-200",
        },
        lainnya: {
            label: "Penerima Wasiat",
            style: "bg-slate-100 text-slate-700 border-slate-200",
        },
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Ahli Waris & Wasiat" />

            <AddModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
            <DetailModal
                isOpen={!!personToView}
                onClose={() => setPersonToView(null)}
                beneficiary={personToView}
                formatRupiah={formatRupiah}
            />
            <EditModal
                isOpen={!!personToEdit}
                onClose={() => setPersonToEdit(null)}
                beneficiary={personToEdit}
            />
            <DeleteModal
                isOpen={!!personToDelete}
                onClose={() => setPersonToDelete(null)}
                beneficiary={personToDelete}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                {/* Header Halaman */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                            Daftar Ahli Waris & Distribusi Wasiat
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Kelola daftar penerima waris, pesan amanat rahasia,
                            dan pemetaan aset keluarga.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-sm text-white shadow-[0_8px_16px_rgba(14,165,233,0.25)] hover:brightness-110 transition transform hover:-translate-y-0.5"
                    >
                        <UserPlus size={18} strokeWidth={2.5} />
                        Tambah Ahli Waris
                    </button>
                </div>

                {/* 3 Kartu Statistik Portofolio Warisan */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Terdaftar di Brankas
                            </span>
                            <h4 className="text-3xl font-black text-slate-800 mt-2">
                                {summary.totalBeneficiaries}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Ahli Waris
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-sky-50 text-sky-600">
                            <Users size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Total Nilai Aset Terdata
                            </span>
                            <h4 className="text-2xl font-black text-emerald-600 mt-2">
                                {formatRupiah(summary.totalEstateValue)}
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                            <Coins size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Status Alokasi Berkas
                            </span>
                            <h4 className="text-2xl font-black text-slate-800 mt-2">
                                {summary.allocatedDocumentsCount} Terpetakan{" "}
                                <span className="text-xs font-bold text-amber-500 block mt-0.5">
                                    ({summary.unallocatedDocumentsCount} Belum
                                    Dialokasikan)
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600">
                            <CheckCircle2 size={28} strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* Pencarian */}
                <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">
                        Kartu Keluarga & Kuasa Wasiat
                    </span>
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full sm:w-80"
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama ahli waris..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                        />
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </form>
                </div>

                {/* Grid Kartu Ahli Waris */}
                {beneficiaries.length === 0 ? (
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm text-center py-20 px-4">
                        <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                            <Users size={36} />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">
                            Belum Ada Ahli Waris Terdaftar
                        </h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-md mx-auto">
                            Tambahkan anggota keluarga atau notaris agar setiap
                            sertifikat tanah, BPKB, dan surat wasiat memiliki
                            tujuan alokasi yang jelas.
                        </p>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="mt-6 px-6 py-2.5 bg-sky-50 text-sky-600 font-bold text-sm rounded-xl hover:bg-sky-100 transition"
                        >
                            + Daftarkan Ahli Waris Pertama
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {beneficiaries.map((person) => {
                            const rel =
                                relationshipBadges[person.relationship] ||
                                relationshipBadges.lainnya;
                            return (
                                <div
                                    key={person.id}
                                    className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col justify-between hover:shadow-lg transition-all group"
                                >
                                    <div>
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white font-black text-lg flex items-center justify-center shadow-md">
                                                    {person.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                                                        {person.name}
                                                    </h3>
                                                    <span
                                                        className={`inline-block mt-1 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-lg border ${rel.style}`}
                                                    >
                                                        {rel.label}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ringkasan Alokasi Aset */}
                                        <div className="mt-5 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-slate-500 flex items-center gap-1.5">
                                                    <FileText
                                                        size={14}
                                                        className="text-sky-500"
                                                    />{" "}
                                                    Dokumen Diwariskan
                                                </span>
                                                <span className="font-black text-slate-800">
                                                    {person.documents_count}{" "}
                                                    Berkas
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-slate-500 flex items-center gap-1.5">
                                                    <Coins
                                                        size={14}
                                                        className="text-emerald-500"
                                                    />{" "}
                                                    Estimasi Nilai
                                                </span>
                                                <span className="font-black text-emerald-600">
                                                    {formatRupiah(
                                                        person.total_allocated_value,
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {person.allocation_notes && (
                                            <p className="mt-4 text-xs font-medium text-slate-500 italic line-clamp-2 bg-amber-50/50 p-3 rounded-xl border border-amber-100/80">
                                                "{person.allocation_notes}"
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                                            <Phone size={12} />{" "}
                                            {person.phone_number ||
                                                "Tanpa No. HP"}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <button
                                                onClick={() =>
                                                    setPersonToView(person)
                                                }
                                                className="px-3 py-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 text-xs font-bold transition flex items-center gap-1"
                                            >
                                                <Eye size={14} /> Rincian
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setPersonToEdit(person)
                                                }
                                                className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
                                                title="Edit"
                                            >
                                                <Edit3 size={14} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setPersonToDelete(person)
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
