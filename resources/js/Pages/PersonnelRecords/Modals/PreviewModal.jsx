import React from "react";
import {
    X,
    Download,
    FileText,
    ExternalLink,
    Award,
    Calendar,
    Building2,
} from "lucide-react";

export default function PreviewModal({ isOpen, onClose, record }) {
    if (!isOpen || !record) return null;

    const previewUrl = `/personnel-records/${record.id}/preview`;
    const downloadUrl = `/personnel-records/${record.id}/download`;
    const isImage = record.mime_type?.startsWith("image/");
    const isPdf = record.mime_type === "application/pdf";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md transition-all">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-5xl overflow-hidden border border-white/60 flex flex-col max-h-[94vh] animate-in zoom-in-95">
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shrink-0">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="p-3.5 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl shrink-0">
                            <FileText size={26} strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                                Layar Baca SK & Berkas SIMPEG
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black truncate mt-0.5">
                                {record.title}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        {record.stored_path && (
                            <a
                                href={previewUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-extrabold text-sky-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition"
                            >
                                <ExternalLink size={16} />
                                <span className="hidden sm:inline">
                                    Layar Penuh
                                </span>
                            </a>
                        )}
                        <button
                            onClick={onClose}
                            className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl"
                        >
                            <X size={22} />
                        </button>
                    </div>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-50/50 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
                            <div className="p-3 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                                <Award size={20} />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                    Pangkat / Golongan
                                </span>
                                <p className="text-sm font-black text-slate-800 truncate mt-0.5">
                                    {record.rank_grade || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
                            <div className="p-3 rounded-xl bg-sky-50 text-sky-600 shrink-0">
                                <Calendar size={20} />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                    TMT Berlaku
                                </span>
                                <p className="text-sm font-black text-slate-800 truncate mt-0.5">
                                    {record.effective_date || "-"}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
                            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                                <Building2 size={20} />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                    Jabatan / Unit
                                </span>
                                <p className="text-sm font-bold text-slate-700 truncate mt-0.5">
                                    {record.position_unit || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {record.stored_path ? (
                        <div className="bg-slate-900/5 border border-slate-200/90 rounded-[2rem] overflow-hidden flex items-center justify-center min-h-[380px] max-h-[540px] shadow-inner">
                            {isImage ? (
                                <img
                                    src={previewUrl}
                                    alt={record.title}
                                    className="max-h-[520px] w-auto object-contain rounded-xl p-2"
                                />
                            ) : isPdf ? (
                                <iframe
                                    src={previewUrl}
                                    title={record.title}
                                    className="w-full h-[520px] border-0"
                                />
                            ) : (
                                <p className="p-10 text-sm font-bold text-slate-600">
                                    Gunakan tombol Unduh di bawah untuk membuka
                                    berkas ini.
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="p-10 bg-white rounded-2xl border border-dashed border-slate-300 text-center text-sm font-bold text-slate-500">
                            Arsip ini belum memiliki lampiran file scan SK. Anda
                            dapat mengunggahnya melalui tombol Ubah.
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <div className="text-xs font-bold text-slate-500">
                        Nomor SK:{" "}
                        <strong className="text-slate-800 font-mono">
                            {record.decree_number || "-"}
                        </strong>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm"
                        >
                            Tutup Layar
                        </button>
                        {record.stored_path && (
                            <a
                                href={downloadUrl}
                                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 text-sm shadow-lg"
                            >
                                <Download size={17} /> Unduh PDF / Berkas SK
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
