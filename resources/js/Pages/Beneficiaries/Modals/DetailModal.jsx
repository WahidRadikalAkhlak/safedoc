import React from "react";
import { Link } from "@inertiajs/react";
import {
    X,
    Users,
    FileText,
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-2xl overflow-hidden border border-white/50 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/60">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-sky-500 text-white rounded-2xl shadow-md">
                            <Users size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800">
                                {beneficiary.name}
                            </h2>
                            <p className="text-xs font-extrabold uppercase tracking-widest text-sky-600 mt-0.5">
                                Portofolio Alokasi Warisan & Amanat
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body Modal */}
                <div className="p-6 overflow-y-auto space-y-5 bg-slate-50/30 flex-1">
                    {/* Identitas & Kontak */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3.5 bg-white rounded-2xl border border-slate-200/70">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                                <CreditCard size={12} /> NIK (Terenkripsi)
                            </span>
                            <p className="text-xs font-mono font-bold text-slate-700 mt-1">
                                {beneficiary.nik || "Tidak dicantumkan"}
                            </p>
                        </div>
                        <div className="p-3.5 bg-white rounded-2xl border border-slate-200/70">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                                <Phone size={12} /> Nomor Kontak
                            </span>
                            <p className="text-xs font-bold text-slate-700 mt-1">
                                {beneficiary.phone_number || "-"}
                            </p>
                        </div>
                        <div className="p-3.5 bg-white rounded-2xl border border-slate-200/70">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                                <Mail size={12} /> Email
                            </span>
                            <p className="text-xs font-bold text-slate-700 truncate mt-1">
                                {beneficiary.email || "-"}
                            </p>
                        </div>
                    </div>

                    {/* Amanat Wasiat Khusus */}
                    <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl">
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block mb-1">
                            Amanat & Pesan Wasiat Khusus Pak Nyoman
                        </span>
                        <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                            {beneficiary.allocation_notes ||
                                "Belum ada pesan atau instruksi khusus yang ditambahkan."}
                        </p>
                    </div>

                    {/* Daftar Dokumen & Aset yang Diwariskan */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">
                                Daftar Dokumen Aset yang Dialokasikan (
                                {beneficiary.documents_count})
                            </h4>
                            <span className="text-xs font-black text-emerald-600">
                                Total:{" "}
                                {formatRupiah(
                                    beneficiary.total_allocated_value,
                                )}
                            </span>
                        </div>

                        {beneficiary.documents?.length === 0 ? (
                            <div className="p-8 bg-white rounded-2xl border border-slate-200/60 text-center">
                                <p className="text-xs font-bold text-slate-400">
                                    Belum ada dokumen di brankas yang ditautkan
                                    ke ahli waris ini.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                {beneficiary.documents.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4 shadow-sm"
                                    >
                                        <div className="flex items-start gap-3 min-w-0">
                                            <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 shrink-0">
                                                <FileText size={18} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-black text-slate-800 truncate">
                                                    {doc.title}
                                                </p>
                                                <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400 mt-0.5">
                                                    <span className="uppercase">
                                                        {doc.category.replace(
                                                            "_",
                                                            " ",
                                                        )}
                                                    </span>
                                                    {doc.asset_location && (
                                                        <span className="flex items-center gap-1 text-slate-500">
                                                            <MapPin size={11} />{" "}
                                                            {doc.asset_location}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="text-xs font-black text-emerald-600 block">
                                                {formatRupiah(
                                                    doc.estimated_value,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Modal */}
                <div className="p-5 border-t border-slate-100 bg-white flex justify-between items-center">
                    <Link
                        href={`/dashboard?beneficiary_id=${beneficiary.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-sky-600 hover:underline"
                    >
                        <ExternalLink size={14} /> Buka Semua Berkas{" "}
                        {beneficiary.name} di Brankas
                    </Link>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs transition"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
