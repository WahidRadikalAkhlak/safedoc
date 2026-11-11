import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
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

    const togglePinVisibility = (id) => {
        setVisiblePins((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} berhasil disalin ke clipboard!`);
    };

    const applyFilter = (newCategory, newSearch) => {
        router.get(
            "/credentials",
            { category: newCategory, search: newSearch },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilter(activeCategory, searchQuery);
    };

    const categoryBadges = {
        rekening_bank: {
            label: "Rekening Bank / Deposito",
            style: "bg-blue-50 text-blue-700 border-blue-200",
        },
        polis_asuransi: {
            label: "Polis Asuransi",
            style: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        brankas_fisik: {
            label: "Brankas Fisik / SDB",
            style: "bg-amber-50 text-amber-700 border-amber-200",
        },
        investasi: {
            label: "Portofolio Investasi",
            style: "bg-purple-50 text-purple-700 border-purple-200",
        },
        akun_digital: {
            label: "Akun Digital Penting",
            style: "bg-slate-100 text-slate-700 border-slate-200",
        },
    };

    return (
        <AuthenticatedLayout>
            <Head title="Brankas Kredensial, Polis & PIN" />

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                            Brankas Kredensial, Polis & PIN Rahasia
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Simpan nomor rekening, polis asuransi, dan kombinasi
                            kunci brankas fisik dengan enkripsi AES-256.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-sm text-white shadow-[0_8px_16px_rgba(14,165,233,0.25)] hover:brightness-110 transition transform hover:-translate-y-0.5"
                    >
                        <Plus size={18} strokeWidth={2.5} />
                        Simpan Kredensial Baru
                    </button>
                </div>

                {/* 3 Kartu Statistik */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Total Kredensial Tersimpan
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

                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Rekening Bank & Polis Asuransi
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

                    <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Kombinasi Brankas Fisik / SDB
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

                {/* Filter & Pencarian */}
                <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col lg:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
                        {[
                            { key: "all", label: "Semua Kredensial" },
                            { key: "rekening_bank", label: "Rekening Bank" },
                            { key: "polis_asuransi", label: "Polis Asuransi" },
                            {
                                key: "brankas_fisik",
                                label: "Brankas Fisik / SDB",
                            },
                            { key: "investasi", label: "Investasi" },
                            { key: "akun_digital", label: "Akun Digital" },
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
                            placeholder="Cari akun atau nama bank..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                        />
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </form>
                </div>

                {/* Daftar Kartu Kredensial */}
                {credentials.length === 0 ? (
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm text-center py-20 px-4">
                        <div className="w-20 h-20 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                            <KeyRound size={36} />
                        </div>
                        <h3 className="text-lg font-black text-slate-800">
                            Belum Ada Kredensial atau PIN Tersimpan
                        </h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-md mx-auto">
                            Simpan nomor polis asuransi, nomor rekening
                            deposito, serta kode kombinasi brankas fisik agar
                            ahli waris tidak kehilangan akses.
                        </p>
                        <button
                            onClick={() => setIsAddOpen(true)}
                            className="mt-6 px-6 py-2.5 bg-sky-50 text-sky-600 font-bold text-sm rounded-xl hover:bg-sky-100 transition"
                        >
                            + Tambah Kredensial Pertama
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
                                    className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col justify-between space-y-5 hover:shadow-lg transition-all"
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

                                            {cred.beneficiary && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 text-sky-700 border border-sky-100 text-[11px] font-extrabold shrink-0">
                                                    <Users size={13} />{" "}
                                                    {cred.beneficiary.name}
                                                </span>
                                            )}
                                        </div>

                                        {/* Kotak Nomor Rekening / ID & PIN Terenkripsi */}
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                                        Nomor Akun / Polis / ID
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
                                                            "Nomor Akun",
                                                        )
                                                    }
                                                    className="p-2 rounded-xl bg-white hover:bg-sky-50 text-slate-500 hover:text-sky-600 border border-slate-200/80 transition"
                                                    title="Salin Nomor Akun"
                                                >
                                                    <Copy size={15} />
                                                </button>
                                            </div>

                                            <div className="pt-2.5 border-t border-slate-200/60 flex items-center justify-between gap-2">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 block">
                                                        PIN / Kata Sandi /
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
                                                        className="p-2 rounded-xl bg-white hover:bg-amber-50 text-slate-500 hover:text-amber-600 border border-slate-200/80 transition"
                                                        title={
                                                            isPinVisible
                                                                ? "Sembunyikan PIN"
                                                                : "Tampilkan PIN"
                                                        }
                                                    >
                                                        {isPinVisible ? (
                                                            <EyeOff size={15} />
                                                        ) : (
                                                            <Eye size={15} />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            copyToClipboard(
                                                                cred.secret_pin_or_password,
                                                                "PIN / Sandi",
                                                            )
                                                        }
                                                        className="p-2 rounded-xl bg-white hover:bg-sky-50 text-slate-500 hover:text-sky-600 border border-slate-200/80 transition"
                                                        title="Salin PIN / Sandi"
                                                    >
                                                        <Copy size={15} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {cred.access_instructions && (
                                            <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 text-xs font-medium text-slate-600 leading-relaxed">
                                                <strong className="font-extrabold text-amber-800 block mb-0.5">
                                                    Instruksi Akses / Lokasi
                                                    Kunci:
                                                </strong>
                                                {cred.access_instructions}
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                                            <Lock size={12} /> Terenkripsi
                                            AES-256
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    setItemToEdit(cred)
                                                }
                                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-100 text-xs font-bold transition"
                                            >
                                                <Edit3 size={14} /> Edit
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
