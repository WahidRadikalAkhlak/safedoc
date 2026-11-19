import React from "react";
import {
    X,
    Download,
    Film,
    Image as ImageIcon,
    Calendar,
    MapPin,
    Users,
} from "lucide-react";

export default function PreviewModal({ isOpen, onClose, memory }) {
    if (!isOpen || !memory) return null;

    const previewUrl = `/memories/${memory.id}/preview`;
    const downloadUrl = `/memories/${memory.id}/download`;
    const isVideo =
        memory.media_type === "video" || memory.mime_type?.startsWith("video/");

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md transition-all">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-4xl overflow-hidden border border-white/60 flex flex-col max-h-[94vh] animate-in zoom-in-95">
                <div className="flex justify-between items-center p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shrink-0">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="p-3 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl shrink-0">
                            {isVideo ? (
                                <Film size={24} />
                            ) : (
                                <ImageIcon size={24} />
                            )}
                        </div>
                        <div className="min-w-0">
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                                {isVideo
                                    ? "Pemutar Video Kenangan"
                                    : "Galeri Foto Kenangan"}{" "}
                                • SafeDoc
                            </span>
                            <h2 className="text-xl font-black truncate mt-0.5">
                                {memory.title}
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-50/50 flex-1">
                    <div className="bg-slate-950 rounded-[2rem] overflow-hidden flex items-center justify-center min-h-[320px] max-h-[520px] shadow-inner">
                        {isVideo ? (
                            <video
                                src={previewUrl}
                                controls
                                className="w-full max-h-[500px] object-contain"
                            />
                        ) : (
                            <img
                                src={previewUrl}
                                alt={memory.title}
                                className="max-h-[500px] w-auto object-contain p-2"
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center gap-3">
                            <Calendar
                                size={18}
                                className="text-sky-600 shrink-0"
                            />
                            <div className="min-w-0">
                                <span className="text-[10px] font-black uppercase text-slate-400 block">
                                    Tanggal Momen
                                </span>
                                <span className="text-xs font-extrabold text-slate-800">
                                    {memory.memory_date || "Tidak dicatat"}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center gap-3">
                            <MapPin
                                size={18}
                                className="text-emerald-600 shrink-0"
                            />
                            <div className="min-w-0">
                                <span className="text-[10px] font-black uppercase text-slate-400 block">
                                    Lokasi
                                </span>
                                <span className="text-xs font-extrabold text-slate-800 truncate block">
                                    {memory.location_name || "Tidak dicatat"}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 flex items-center gap-3">
                            <Users
                                size={18}
                                className="text-indigo-600 shrink-0"
                            />
                            <div className="min-w-0">
                                <span className="text-[10px] font-black uppercase text-slate-400 block">
                                    Terkait Keluarga
                                </span>
                                <span className="text-xs font-extrabold text-slate-800 truncate block">
                                    {memory.beneficiary
                                        ? memory.beneficiary.name
                                        : "Seluruh Keluarga"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {memory.story_notes && (
                        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 space-y-1.5">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                Cerita & Pesan Kenangan
                            </span>
                            <p className="text-sm font-medium text-slate-700 whitespace-pre-line leading-relaxed">
                                {memory.story_notes}
                            </p>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <span className="text-xs font-bold text-slate-400 truncate">
                        File: {memory.original_filename} (
                        {(memory.file_size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm"
                        >
                            Tutup
                        </button>
                        <a
                            href={downloadUrl}
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 text-sm shadow-lg"
                        >
                            <Download size={17} /> Unduh File Asli
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
