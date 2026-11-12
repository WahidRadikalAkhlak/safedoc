import React from "react";
import {
    X,
    Download,
    ShieldCheck,
    FileText,
    ExternalLink,
    Users,
    MapPin,
    Coins,
} from "lucide-react";

export default function PreviewModal({ isOpen, onClose, document }) {
    if (!isOpen || !document) return null;

    const previewUrl = `/documents/${document.id}/preview`;
    const downloadUrl = `/documents/${document.id}/download`;
    const isImage = document.mime_type?.startsWith("image/");
    const isPdf = document.mime_type === "application/pdf";

    const formatRupiah = (number) => {
        if (!number || number <= 0) return "Belum diisi";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(number);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-5xl overflow-hidden border border-white/60 flex flex-col max-h-[94vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal Mewah */}
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shrink-0">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="p-3.5 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl shrink-0">
                            <FileText size={26} strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                                Layar Baca Berkas Asli • Brankas SafeDoc
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black truncate mt-0.5">
                                {document.title}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <a
                            href={previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-extrabold text-sky-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition"
                            title="Buka Ukuran Penuh di Tab Baru"
                        >
                            <ExternalLink size={16} />
                            <span className="hidden sm:inline">
                                Layar Penuh
                            </span>
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                        >
                            <X size={22} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Body Pratinjau & Informasi Harta */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-50/50 flex-1">
                    {/* 3 Kartu Ringkas Info Warisan (Lega & Tidak Berdempetan) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
                            <div className="p-3 rounded-xl bg-sky-50 text-sky-600 shrink-0">
                                <Users size={20} />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                    Penerima Waris
                                </span>
                                <p className="text-sm font-black text-slate-800 truncate mt-0.5">
                                    {document.beneficiary
                                        ? document.beneficiary.name
                                        : "Belum Ditentukan"}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
                            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                                <Coins size={20} />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                    Perkiraan Nilai Harta
                                </span>
                                <p className="text-sm font-black text-emerald-600 truncate mt-0.5">
                                    {formatRupiah(document.estimated_value)}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3.5">
                            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                                <MapPin size={20} />
                            </div>
                            <div className="min-w-0">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                    Lokasi Fisik Harta
                                </span>
                                <p className="text-sm font-bold text-slate-700 truncate mt-0.5">
                                    {document.asset_location ||
                                        "Tidak dicantumkan"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Layar Tampilan Dokumen */}
                    <div className="bg-slate-900/5 border border-slate-200/90 rounded-[2rem] overflow-hidden flex items-center justify-center min-h-[380px] max-h-[540px] shadow-inner">
                        {isImage ? (
                            <img
                                src={previewUrl}
                                alt={document.title}
                                className="max-h-[520px] w-auto object-contain rounded-xl p-2"
                            />
                        ) : isPdf ? (
                            <iframe
                                src={previewUrl}
                                title={document.title}
                                className="w-full h-[520px] border-0"
                            />
                        ) : (
                            <div className="text-center p-12">
                                <p className="text-sm font-bold text-slate-600">
                                    Tampilan langsung tidak tersedia untuk
                                    format ini. Silakan klik tombol Unduh di
                                    bawah.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Catatan & Segel Keaslian (2 Kolom Lega) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2">
                                Catatan Penyimpanan Fisik & Pesan Keluarga
                            </span>
                            <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                {document.notes ||
                                    "Tidak ada catatan tambahan pada dokumen ini."}
                            </p>
                        </div>

                        <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 shadow-sm">
                            <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-widest mb-2">
                                <ShieldCheck size={16} /> Kode Segel Keaslian
                                File (SHA-256)
                            </div>
                            <code className="text-xs font-mono text-emerald-950 break-all bg-white/80 p-3 rounded-xl border border-emerald-100 block">
                                {document.file_hash}
                            </code>
                        </div>
                    </div>
                </div>

                {/* Footer Modal */}
                <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <div className="text-xs font-bold text-slate-500">
                        Nomor Sertifikat / Dokumen:{" "}
                        <strong className="text-slate-800 font-mono">
                            {document.document_number || "-"}
                        </strong>
                        <span className="mx-2">•</span>
                        Ukuran: {(document.file_size / 1024).toFixed(1)} KB
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm transition"
                        >
                            Tutup Layar
                        </button>
                        <a
                            href={downloadUrl}
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 text-sm shadow-lg transition"
                        >
                            <Download size={17} /> Unduh Berkas Asli
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
