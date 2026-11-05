import React from "react";
import { X, Download, ShieldCheck, FileText, ExternalLink } from "lucide-react";

export default function PreviewModal({ isOpen, onClose, document }) {
    if (!isOpen || !document) return null;

    const previewUrl = `/documents/${document.id}/preview`;
    const downloadUrl = `/documents/${document.id}/download`;
    const isImage = document.mime_type?.startsWith("image/");
    const isPdf = document.mime_type === "application/pdf";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-4xl overflow-hidden border border-white/50 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-5 sm:p-6 border-b border-slate-100 bg-slate-50/60 shrink-0">
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-sky-500 text-white rounded-2xl shadow-md shrink-0">
                            <FileText size={22} strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-lg font-black text-slate-800 truncate">
                                {document.title}
                            </h2>
                            <p className="text-xs font-semibold text-slate-400 truncate">
                                {document.original_filename} •{" "}
                                {(document.file_size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <a
                            href={previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition"
                            title="Buka di Tab Baru"
                        >
                            <ExternalLink size={18} />
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition"
                        >
                            <X size={20} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Body Pratinjau & Metadata */}
                <div className="p-6 overflow-y-auto space-y-5 bg-slate-50/40 flex-1">
                    {/* Layar Dekripsi Visual */}
                    <div className="bg-slate-900/5 border border-slate-200/80 rounded-2xl overflow-hidden flex items-center justify-center min-h-[320px] max-h-[480px]">
                        {isImage ? (
                            <img
                                src={previewUrl}
                                alt={document.title}
                                className="max-h-[460px] w-auto object-contain rounded-xl"
                            />
                        ) : isPdf ? (
                            <iframe
                                src={previewUrl}
                                title={document.title}
                                className="w-full h-[460px] border-0"
                            />
                        ) : (
                            <div className="text-center p-10">
                                <p className="text-sm font-bold text-slate-600">
                                    Pratinjau langsung tidak tersedia untuk
                                    format ini.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Metadata & Catatan Rahasia */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-sm">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                                Catatan Rahasia (Terenkripsi)
                            </span>
                            <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                                {document.notes ||
                                    "Tidak ada catatan tambahan pada dokumen ini."}
                            </p>
                        </div>

                        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 shadow-sm">
                            <div className="flex items-center gap-1.5 text-emerald-700 font-black text-[10px] uppercase tracking-widest mb-1">
                                <ShieldCheck size={14} /> Checksum SHA-256 Asli
                            </div>
                            <code className="text-[11px] font-mono text-emerald-900 break-all block">
                                {document.file_hash}
                            </code>
                        </div>
                    </div>
                </div>

                {/* Footer Modal */}
                <div className="p-5 border-t border-slate-100 bg-white flex justify-between items-center shrink-0">
                    <span className="text-xs font-bold text-slate-400">
                        Nomor Dokumen:{" "}
                        <strong className="text-slate-700 font-mono">
                            {document.document_number || "-"}
                        </strong>
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-xs transition"
                        >
                            Tutup
                        </button>
                        <a
                            href={downloadUrl}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 text-xs shadow-md transition"
                        >
                            <Download size={15} /> Unduh Salinan
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
