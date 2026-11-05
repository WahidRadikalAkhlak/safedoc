import React from "react";
import { X, ShieldCheck, Globe, Monitor, Clock, FileText } from "lucide-react";

export default function DetailModal({ isOpen, onClose, log }) {
    if (!isOpen || !log) return null;

    const props = log.properties || {};

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-xl overflow-hidden border border-white/50 flex flex-col max-h-[90vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-sky-500 text-white rounded-2xl shadow-[0_8px_16px_rgba(14,165,233,0.2)]">
                            <ShieldCheck size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                Detail Jejak Audit
                            </h2>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-0.5">
                                ID Log #{log.id} • {log.log_name?.toUpperCase()}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors relative z-10"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body Modal */}
                <div className="p-6 overflow-y-auto space-y-5 bg-slate-50/30">
                    <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                            Deskripsi Aktivitas
                        </span>
                        <p className="text-base font-extrabold text-slate-800">
                            {log.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                            <Globe
                                size={18}
                                className="text-sky-500 shrink-0 mt-0.5"
                            />
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                    Alamat IP
                                </span>
                                <span className="font-mono text-sm font-bold text-slate-700">
                                    {props.ip || "Tidak tercatat"}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                            <Clock
                                size={18}
                                className="text-indigo-500 shrink-0 mt-0.5"
                            />
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                    Waktu Kejadian
                                </span>
                                <span className="text-xs font-bold text-slate-700">
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
                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-start gap-3">
                            <Monitor
                                size={18}
                                className="text-emerald-500 shrink-0 mt-0.5"
                            />
                            <div className="min-w-0 flex-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                                    Identitas Perangkat & Browser (User-Agent)
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
                        <div className="p-4 bg-sky-50/50 rounded-2xl border border-sky-100 space-y-2">
                            <div className="flex items-center gap-2 text-sky-700 font-black text-xs uppercase tracking-widest">
                                <FileText size={15} /> Metadata Objek Dokumen
                            </div>
                            {props.document_title && (
                                <p className="text-xs text-slate-700">
                                    <span className="font-bold">Judul:</span>{" "}
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
                                <div className="pt-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                        Checksum Integritas (SHA-256)
                                    </span>
                                    <code className="text-[11px] font-mono text-sky-800 break-all bg-white px-2 py-1 rounded border border-sky-100 block mt-1">
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
                        className="px-6 py-2.5 rounded-2xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all text-sm"
                    >
                        Tutup Detail
                    </button>
                </div>
            </div>
        </div>
    );
}
