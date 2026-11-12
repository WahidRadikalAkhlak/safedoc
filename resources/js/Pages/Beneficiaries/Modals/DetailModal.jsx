import React from "react";
import { Link } from "@inertiajs/react";
import {
    X,
    Users,
    FileText,
    KeyRound,
    BookOpen,
    MapPin,
    Phone,
    Mail,
    CreditCard,
    ExternalLink,
} from "lucide-react";

export default function DetailModal({
    isOpen,
    onClose,
    beneficiary,
    formatRupiah,
}) {
    if (!isOpen || !beneficiary) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.65)] w-full max-w-3xl overflow-hidden border border-white/50 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-sky-950 text-white">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-300 font-black text-xl flex items-center justify-center">
                            {beneficiary.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-black">
                                {beneficiary.name}
                            </h2>
                            <p className="text-xs font-bold uppercase tracking-widest text-sky-300 mt-0.5">
                                Rincian Hak Waris, Akses Rekening & Pesan Wasiat
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body Modal */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-50/40 flex-1">
                    {/* Identitas & Kontak */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-sm">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                <CreditCard
                                    size={13}
                                    className="text-sky-500"
                                />{" "}
                                Nomor KTP (NIK)
                            </span>
                            <p className="text-xs font-mono font-bold text-slate-800 mt-1">
                                {beneficiary.nik || "Belum diisi"}
                            </p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-sm">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                <Phone size={13} className="text-emerald-500" />{" "}
                                Telepon / WhatsApp
                            </span>
                            <p className="text-xs font-bold text-slate-800 mt-1">
                                {beneficiary.phone_number || "Belum diisi"}
                            </p>
                        </div>
                        <div className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-sm">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                                <Mail size={13} className="text-indigo-500" />{" "}
                                Alamat Email
                            </span>
                            <p className="text-xs font-bold text-slate-800 truncate mt-1">
                                {beneficiary.email || "Belum diisi"}
                            </p>
                        </div>
                    </div>

                    {/* Pesan Khusus Pak Nyoman */}
                    <div className="p-5 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 block mb-1">
                            Pesan & Amanat Pribadi untuk {beneficiary.name}:
                        </span>
                        <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                            {beneficiary.allocation_notes ||
                                "Tidak ada catatan khusus."}
                        </p>
                    </div>

                    {/* 1. Daftar Dokumen Sertifikat & BPKB */}
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                                <FileText size={15} className="text-sky-600" />
                                1. Dokumen Sertifikat & BPKB (
                                {beneficiary.documents_count || 0})
                            </h4>
                            <Link
                                href={`/dashboard?beneficiary_id=${beneficiary.id}`}
                                className="text-xs font-extrabold text-sky-600 hover:underline flex items-center gap-1"
                            >
                                Buka di Lemari Dokumen{" "}
                                <ExternalLink size={12} />
                            </Link>
                        </div>

                        {!beneficiary.documents ||
                        beneficiary.documents.length === 0 ? (
                            <p className="text-xs text-slate-400 italic bg-white p-4 rounded-2xl border border-slate-200/60">
                                Belum ada dokumen sertifikat/BPKB yang
                                ditautkan.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {beneficiary.documents.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="p-3.5 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-xs font-black text-slate-800 truncate">
                                                {doc.title}
                                            </p>
                                            {doc.asset_location && (
                                                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mt-0.5">
                                                    <MapPin size={11} />{" "}
                                                    {doc.asset_location}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs font-black text-emerald-600 shrink-0">
                                            {formatRupiah(doc.estimated_value)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 2. Daftar Rekening, Polis & PIN */}
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                                <KeyRound
                                    size={15}
                                    className="text-amber-600"
                                />
                                2. Akses Rekening, Polis & PIN (
                                {beneficiary.credentials_count || 0})
                            </h4>
                            <Link
                                href={`/credentials?beneficiary_id=${beneficiary.id}`}
                                className="text-xs font-extrabold text-amber-600 hover:underline flex items-center gap-1"
                            >
                                Lihat PIN & Nomor Rekening{" "}
                                <ExternalLink size={12} />
                            </Link>
                        </div>

                        {!beneficiary.credentials ||
                        beneficiary.credentials.length === 0 ? (
                            <p className="text-xs text-slate-400 italic bg-white p-4 rounded-2xl border border-slate-200/60">
                                Belum ada akses rekening atau PIN khusus untuk
                                ahli waris ini.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {beneficiary.credentials.map((cred) => (
                                    <div
                                        key={cred.id}
                                        className="p-3.5 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-xs font-black text-slate-800 truncate">
                                                {cred.title}
                                            </p>
                                            <p className="text-[11px] font-semibold text-slate-400 truncate">
                                                {cred.institution_name ||
                                                    cred.category.replace(
                                                        "_",
                                                        " ",
                                                    )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 3. Daftar Surat Wasiat & Catatan Piutang */}
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                                <BookOpen
                                    size={15}
                                    className="text-indigo-600"
                                />
                                3. Surat Wasiat & Amanat (
                                {beneficiary.testaments_count || 0})
                            </h4>
                            <Link
                                href={`/testaments?beneficiary_id=${beneficiary.id}`}
                                className="text-xs font-extrabold text-indigo-600 hover:underline flex items-center gap-1"
                            >
                                Baca Surat Wasiat <ExternalLink size={12} />
                            </Link>
                        </div>

                        {!beneficiary.testaments ||
                        beneficiary.testaments.length === 0 ? (
                            <p className="text-xs text-slate-400 italic bg-white p-4 rounded-2xl border border-slate-200/60">
                                Belum ada surat wasiat khusus yang ditujukan
                                kepada ahli waris ini.
                            </p>
                        ) : (
                            <div className="space-y-2">
                                {beneficiary.testaments.map((testament) => (
                                    <div
                                        key={testament.id}
                                        className="p-3.5 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between"
                                    >
                                        <span className="text-xs font-black text-slate-800 truncate">
                                            {testament.title}
                                        </span>
                                        {testament.nominal_amount > 0 && (
                                            <span className="text-xs font-black text-emerald-600">
                                                {formatRupiah(
                                                    testament.nominal_amount,
                                                )}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Modal */}
                <div className="p-5 border-t border-slate-100 bg-white flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500">
                        Total Nilai Diwariskan:{" "}
                        <strong className="text-emerald-600 font-black">
                            {formatRupiah(beneficiary.total_allocated_value)}
                        </strong>
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs transition"
                    >
                        Tutup Rincian
                    </button>
                </div>
            </div>
        </div>
    );
}
