import React, { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import {
    KeyRound,
    Plus,
    Search,
    Eye,
    EyeOff,
    Copy,
    Edit3,
    Trash2,
    Building2,
    Lock,
    CreditCard,
    Users,
} from "lucide-react";

export default function Index({
    credentials,
    beneficiaries = [],
    filters = {},
    stats,
}) {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [visiblePins, setVisiblePins] = useState({});
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const activeCategory = filters.category || "all";
    const activeBeneficiary = filters.beneficiary_id || "all";

    const togglePinVisibility = (id) => {
        setVisiblePins((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} berhasil disalin!`);
    };

    const applyFilter = (newCategory, newBeneficiary, newSearch) => {
        router.get(
            "/credentials",
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

    const categoryBadges = {
        rekening_bank: {
            label: "Rekening Bank / Deposito",
            style: "bg-blue-50 text-blue-700 border-blue-200",
        },
        polis_asuransi: {
            label: "Polis Asuransi Keluarga",
            style: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        brankas_fisik: {
            label: "Kunci Brankas Rumah / SDB",
            style: "bg-amber-50 text-amber-700 border-amber-200",
        },
        investasi: {
            label: "Akun Investasi / Emas",
            style: "bg-purple-50 text-purple-700 border-purple-200",
        },
        akun_digital: {
            label: "Akun & Sandi Penting",
            style: "bg-slate-100 text-slate-700 border-slate-200",
        },
    };

    return (
        <AuthenticatedLayout>
            <Head title="Rekening, Polis Asuransi & PIN Brankas" />

            <AddModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                beneficiaries={beneficiaries}
            />
            <EditModal
                isOpen={!!itemToEdit}
                onClose={() => setItemToEdit(null)}
                credential={itemToEdit}
                beneficiaries={beneficiaries}
            />
            <DeleteModal
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                credential={itemToDelete}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-7 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                            Rekening Bank, Polis Asuransi & PIN Brankas
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Tempat menyimpan nomor rekening, nomor polis
                            asuransi jiwa, dan kombinasi kunci brankas rumah
                            agar keluarga mudah mengurus klaim.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href="/beneficiaries"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-xs text-slate-700 transition"
                        >
                            <Users size={16} />
                            Data Keluarga
                        </Link>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-sm text-white shadow-[0_8px_16px_rgba(14,165,233,0.25)] hover:brightness-110 transition transform hover:-translate-y-0.5"
                        >
                            <Plus size={18} strokeWidth={2.5} />
                            Simpan Rekening / PIN
                        </button>
                    </div>
                </div>

                {/* 3 Kartu Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Total Data Tersimpan
                            </span>
                            <h4 className="text-3xl font-black text-slate-800 mt-2">
                                {stats.totalCredentials}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Akun / PIN
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-sky-50 text-sky-600">
                            <KeyRound size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Rekening Bank & Asuransi
                            </span>
                            <h4 className="text-3xl font-black text-emerald-600 mt-2">
                                {stats.bankAndInsuranceCount}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Terdata
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                            <CreditCard size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Kunci Brankas Fisik / SDB
                            </span>
                            <h4 className="text-3xl font-black text-amber-600 mt-2">
                                {stats.physicalSafeCount}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Kunci
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-amber-50 text-amber-600">
                            <Lock size={28} strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* Filter Kategori, Filter Ahli Waris & Pencarian */}
                <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                        {[
                            { key: "all", label: "Semua" },
                            { key: "rekening_bank", label: "Rekening Bank" },
                            { key: "polis_asuransi", label: "Polis Asuransi" },
                            {
                                key: "brankas_fisik",
                                label: "Brankas Rumah / SDB",
                            },
                            { key: "investasi", label: "Investasi" },
                            { key: "akun_digital", label: "Akun Digital" },
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
                                    Penerima: {b.name}
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
                                placeholder="Cari nama bank atau akun..."
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                            />
                            <Search
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                        </form>
                    </div>
                </div>

                {/* Daftar Kartu Kredensial */}
                {credentials.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm text-center py-20 px-4">
                        <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                            <KeyRound size={36} />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">
                            Belum Ada Rekening atau PIN Tersimpan
                        </h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-md mx-auto">
                            Simpan nomor polis asuransi, nomor rekening
                            deposito, serta kode kombinasi brankas fisik agar
                            keluarga tidak kesulitan mencairkan haknya.
                        </p>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="mt-6 px-6 py-2.5 bg-sky-50 text-sky-600 font-bold text-sm rounded-xl hover:bg-sky-100 transition"
                        >
                            + Simpan Rekening / PIN Pertama
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {credentials.map((cred) => {
                            const badge =
                                categoryBadges[cred.category] ||
                                categoryBadges.akun_digital;
                            const isPinVisible = !!visiblePins[cred.id];

                            return (
                                <div
                                    key={cred.id}
                                    className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:shadow-xl transition-all"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <span
                                                    className={`inline-block px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border ${badge.style}`}
                                                >
                                                    {badge.label}
                                                </span>
                                                <h3 className="font-extrabold text-lg text-slate-900 mt-2">
                                                    {cred.title}
                                                </h3>
                                                {cred.institution_name && (
                                                    <p className="text-xs font-bold text-slate-400 flex items-center gap-1.5 mt-0.5">
                                                        <Building2
                                                            size={13}
                                                            className="text-sky-500"
                                                        />
                                                        {cred.institution_name}
                                                    </p>
                                                )}
                                            </div>

                                            {cred.beneficiary ? (
                                                <button
                                                    onClick={() =>
                                                        applyFilter(
                                                            activeCategory,
                                                            cred.beneficiary.id,
                                                            searchQuery,
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[11px] font-extrabold shrink-0 transition"
                                                    title="Saring khusus penerima ini"
                                                >
                                                    <Users size={13} />{" "}
                                                    {cred.beneficiary.name}
                                                </button>
                                            ) : (
                                                <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-xl border border-slate-100">
                                                    Seluruh Keluarga
                                                </span>
                                            )}
                                        </div>

                                        {/* Kotak Nomor Rekening / ID & PIN Terenkripsi */}
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                                        Nomor Rekening / Polis /
                                                        ID Akun
                                                    </span>
                                                    <span className="font-mono text-sm font-bold text-slate-800">
                                                        {
                                                            cred.account_identifier
                                                        }
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        copyToClipboard(
                                                            cred.account_identifier,
                                                            "Nomor Rekening/Polis",
                                                        )
                                                    }
                                                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-600 border border-slate-200/80 text-xs font-bold flex items-center gap-1 transition"
                                                >
                                                    <Copy size={13} /> Salin
                                                </button>
                                            </div>

                                            <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between gap-2">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 block">
                                                        Kode PIN / Kata Sandi /
                                                        Kombinasi Kunci
                                                    </span>
                                                    <span className="font-mono text-sm font-black text-slate-900 tracking-wider">
                                                        {isPinVisible
                                                            ? cred.secret_pin_or_password
                                                            : "••••••••••••"}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <button
                                                        onClick={() =>
                                                            togglePinVisibility(
                                                                cred.id,
                                                            )
                                                        }
                                                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 text-slate-600 hover:text-amber-700 border border-slate-200/80 text-xs font-bold flex items-center gap-1 transition"
                                                    >
                                                        {isPinVisible ? (
                                                            <EyeOff size={13} />
                                                        ) : (
                                                            <Eye size={13} />
                                                        )}
                                                        {isPinVisible
                                                            ? "Tutup"
                                                            : "Lihat PIN"}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            copyToClipboard(
                                                                cred.secret_pin_or_password,
                                                                "Kode PIN",
                                                            )
                                                        }
                                                        className="p-2 rounded-xl bg-white hover:bg-sky-50 text-slate-500 hover:text-sky-600 border border-slate-200/80 transition"
                                                        title="Salin PIN"
                                                    >
                                                        <Copy size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {cred.access_instructions && (
                                            <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-100 text-xs font-medium text-slate-600 leading-relaxed">
                                                <strong className="font-extrabold text-amber-800 block mb-0.5">
                                                    Petunjuk Klaim / Letak Kunci
                                                    Fisik:
                                                </strong>
                                                {cred.access_instructions}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                                            <Lock size={12} /> Dijaga Enkripsi
                                            AES-256
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    setItemToEdit(cred)
                                                }
                                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 text-xs font-bold transition"
                                            >
                                                <Edit3 size={14} /> Ubah
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setItemToDelete(cred)
                                                }
                                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold transition"
                                            >
                                                <Trash2 size={14} /> Hapus
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
