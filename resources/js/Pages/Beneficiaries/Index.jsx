import React, { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
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
    KeyRound,
    BookOpen,
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
            <Head title="Keluarga & Penerima Waris" />

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Header Halaman */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-7 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                            Daftar Keluarga & Penerima Waris
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Daftarkan nama istri, anak, atau notaris yang berhak
                            menerima dokumen sertifikat, nomor rekening, dan
                            pesan wasiat Anda.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-sm text-white shadow-[0_8px_16px_rgba(14,165,233,0.25)] hover:brightness-110 transition transform hover:-translate-y-0.5 shrink-0"
                    >
                        <UserPlus size={18} strokeWidth={2.5} />
                        Tambah Anggota Keluarga
                    </button>
                </div>

                {/* 3 Kartu Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Keluarga Terdaftar
                            </span>
                            <h4 className="text-3xl font-black text-slate-800 mt-2">
                                {summary.totalBeneficiaries}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Orang
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-sky-50 text-sky-600">
                            <Users size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Total Nilai Aset Dokumen
                            </span>
                            <h4 className="text-2xl font-black text-emerald-600 mt-2">
                                {formatRupiah(summary.totalEstateValue)}
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                            <Coins size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Pembagian Berkas
                            </span>
                            <h4 className="text-2xl font-black text-slate-800 mt-2">
                                {summary.allocatedDocumentsCount} Sudah Dibagi{" "}
                                <span className="text-xs font-bold text-amber-500 block mt-0.5">
                                    ({summary.unallocatedDocumentsCount} Belum
                                    Ditentukan)
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600">
                            <CheckCircle2 size={28} strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* Bar Pencarian */}
                <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">
                        Klik pada kartu keluarga untuk melihat seluruh hak
                        warisnya
                    </span>
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full sm:w-80"
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama anggota keluarga..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                        />
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </form>
                </div>

                {/* Grid Kartu Keluarga */}
                {beneficiaries.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm text-center py-20 px-4">
                        <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                            <Users size={36} />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">
                            Belum Ada Anggota Keluarga Terdaftar
                        </h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-md mx-auto">
                            Tambahkan nama istri, anak, atau notaris agar setiap
                            sertifikat tanah, rekening bank, dan surat wasiat
                            memiliki penerima yang jelas.
                        </p>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="mt-6 px-6 py-2.5 bg-sky-50 text-sky-600 font-bold text-sm rounded-xl hover:bg-sky-100 transition"
                        >
                            + Daftarkan Keluarga Pertama
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
                                    className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:border-sky-100 transition-all"
                                >
                                    <div>
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-sky-800 text-white font-black text-lg flex items-center justify-center shadow-md">
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

                                        {/* 3 Pintasan Terintegrasi (Berkas, PIN, Wasiat) */}
                                        <div className="mt-5 grid grid-cols-3 gap-2">
                                            <Link
                                                href={`/dashboard?beneficiary_id=${person.id}`}
                                                className="p-3 rounded-2xl bg-sky-50/70 hover:bg-sky-100/80 border border-sky-100 text-center transition"
                                                title="Lihat Dokumen Sertifikat"
                                            >
                                                <FileText
                                                    size={16}
                                                    className="mx-auto text-sky-600 mb-1"
                                                />
                                                <span className="text-sm font-black text-slate-900 block">
                                                    {person.documents_count ||
                                                        0}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-500">
                                                    Berkas
                                                </span>
                                            </Link>

                                            <Link
                                                href={`/credentials?beneficiary_id=${person.id}`}
                                                className="p-3 rounded-2xl bg-amber-50/70 hover:bg-amber-100/80 border border-amber-100 text-center transition"
                                                title="Lihat Rekening & PIN"
                                            >
                                                <KeyRound
                                                    size={16}
                                                    className="mx-auto text-amber-600 mb-1"
                                                />
                                                <span className="text-sm font-black text-slate-900 block">
                                                    {person.credentials_count ||
                                                        0}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-500">
                                                    Rekening/PIN
                                                </span>
                                            </Link>

                                            <Link
                                                href={`/testaments?beneficiary_id=${person.id}`}
                                                className="p-3 rounded-2xl bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-100 text-center transition"
                                                title="Lihat Surat Wasiat"
                                            >
                                                <BookOpen
                                                    size={16}
                                                    className="mx-auto text-indigo-600 mb-1"
                                                />
                                                <span className="text-sm font-black text-slate-900 block">
                                                    {person.testaments_count ||
                                                        0}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-500">
                                                    Wasiat
                                                </span>
                                            </Link>
                                        </div>

                                        {/* Total Nilai Rupiah */}
                                        <div className="mt-3 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex justify-between items-center">
                                            <span className="text-[11px] font-bold text-emerald-800">
                                                Estimasi Nilai Warisan:
                                            </span>
                                            <span className="text-xs font-black text-emerald-700">
                                                {formatRupiah(
                                                    person.total_allocated_value,
                                                )}
                                            </span>
                                        </div>

                                        {person.allocation_notes && (
                                            <p className="mt-3 text-xs font-medium text-slate-600 italic line-clamp-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
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
                                                className="px-3.5 py-2 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-extrabold transition flex items-center gap-1"
                                            >
                                                <Eye size={14} /> Rincian
                                                Lengkap
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setPersonToEdit(person)
                                                }
                                                className="p-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
                                                title="Ubah Data"
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
