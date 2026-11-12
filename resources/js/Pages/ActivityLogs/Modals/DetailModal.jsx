import React from "react";
import { X, ShieldCheck, Globe, Monitor, Clock, FileText } from "lucide-react";

export default function DetailModal({ isOpen, onClose, log }) {
    if (!isOpen || !log) return null;

    const props = log.properties || {};

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-2xl overflow-hidden border border-white/60 flex flex-col max-h-[90vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl">
                            <ShieldCheck size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                                Bukti Rekaman Keamanan #{log.id}
                            </span>
                            <h2 className="text-xl font-black tracking-tight mt-0.5">
                                Rincian Aktivitas di Dalam Brankas
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body Modal */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-5 bg-slate-50/40">
                    <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                            Apa yang Dilakukan?
                        </span>
                        <p className="text-base font-black text-slate-900">
                            {log.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3.5">
                            <Globe
                                size={20}
                                className="text-sky-500 shrink-0 mt-0.5"
                            />
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                    Nomor Jaringan Internet (IP)
                                </span>
                                <span className="font-mono text-sm font-black text-slate-800 mt-1 block">
                                    {props.ip || "127.0.0.1"}
                                </span>
                            </div>
                        </div>

                        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3.5">
                            <Clock
                                size={20}
                                className="text-indigo-500 shrink-0 mt-0.5"
                            />
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                    Tanggal & Jam Kejadian
                                </span>
                                <span className="text-xs font-black text-slate-800 mt-1 block">
                                    {new Date(log.created_at).toLocaleString(
                                        "id-ID",
                                        {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                        },
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {props.user_agent && (
                        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3.5">
                            <Monitor
                                size={20}
                                className="text-emerald-500 shrink-0 mt-0.5"
                            />
                            <div className="min-w-0 flex-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                                    Perangkat & Browser yang Membuka
                                </span>
                                <p className="font-mono text-xs text-slate-600 break-words leading-relaxed">
                                    {props.user_agent}
                                </p>
                            </div>
                        </div>
                    )}

                    {(props.document_title ||
                        props.sha256_hash ||
                        props.original_filename) && (
                        <div className="p-5 bg-sky-50/60 rounded-2xl border border-sky-200/80 space-y-2">
                            <div className="flex items-center gap-2 text-sky-800 font-black text-xs uppercase tracking-widest">
                                <FileText size={16} /> Informasi Berkas yang
                                Diakses
                            </div>
                            {props.document_title && (
                                <p className="text-xs text-slate-700">
                                    <span className="font-bold">
                                        Nama Dokumen:
                                    </span>{" "}
                                    {props.document_title}
                                </p>
                            )}
                            {props.original_filename && (
                                <p className="text-xs text-slate-700">
                                    <span className="font-bold">
                                        Nama File Asli:
                                    </span>{" "}
                                    {props.original_filename}
                                </p>
                            )}
                            {props.sha256_hash && (
                                <div className="pt-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">
                                        Kode Segel Keaslian (SHA-256)
                                    </span>
                                    <code className="text-xs font-mono text-sky-900 break-all bg-white p-2.5 rounded-xl border border-sky-100 block mt-1">
                                        {props.sha256_hash}
                                    </code>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Modal */}
                <div className="p-5 border-t border-slate-100 bg-white flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all text-xs"
                    >
                        Tutup Bukti Rekaman
                    </button>
                </div>
            </div>
        </div>
    );
}
