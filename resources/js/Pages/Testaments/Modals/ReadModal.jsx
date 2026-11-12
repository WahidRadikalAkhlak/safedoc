import React from "react";
import { usePage } from "@inertiajs/react";
import { X, Printer, ShieldCheck, Users, Calendar } from "lucide-react";

export default function ReadModal({
    isOpen,
    onClose,
    testament,
    formatRupiah,
}) {
    const { auth } = usePage().props;
    const owner = auth?.user;

    if (!isOpen || !testament) return null;

    const handlePrint = () => {
        window.print();
    };

    const categoryTitles = {
        amanat_keluarga: "SURAT AMANAT & PESAN WASIAT KELUARGA",
        instruksi_bisnis: "LEMBAR INSTRUKSI KELANJUTAN USAHA & ASET",
        piutang_klaim: "BUKTI CATATAN PIUTANG (HAK TAGIH KELUARGA)",
        kewajiban_utang: "CATATAN TANGGUNGAN UTANG YANG WAJIB DILUNASI",
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-4xl overflow-hidden border border-white/60 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Action Bar */}
                <div className="flex justify-between items-center p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shrink-0">
                    <div className="flex items-center gap-3.5">
                        <div className="p-3 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                                Lembar Resmi Terdekripsi • Brankas SafeDoc
                            </span>
                            <h2 className="text-lg sm:text-xl font-black mt-0.5">
                                {testament.title}
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md hover:brightness-105 transition"
                        >
                            <Printer size={15} /> Cetak Lembar Ini
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Isi Naskah Surat */}
                <div className="p-6 sm:p-10 overflow-y-auto bg-slate-100/70 flex-1">
                    <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8">
                        {/* Kop Surat */}
                        <div className="text-center border-b-2 border-slate-800 pb-6 space-y-1">
                            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-sky-700">
                                DOKUMEN RESMI BRANKAS DIGITAL SAFEDOC
                            </p>
                            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900">
                                {categoryTitles[testament.category] ||
                                    "SURAT AMANAT & WASIAT KELUARGA"}
                            </h1>
                            <p className="text-xs font-semibold text-slate-500">
                                Judul Pokok: "{testament.title}"
                            </p>
                        </div>

                        {/* Metadata Penerima & Tanggal (2 Kolom Lega) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-600">
                            <div className="flex items-center gap-2.5">
                                <Users
                                    size={16}
                                    className="text-sky-600 shrink-0"
                                />
                                <span>
                                    Ditujukan Kepada:{" "}
                                    <strong className="text-slate-900">
                                        {testament.beneficiary
                                            ? testament.beneficiary.name
                                            : "Seluruh Anggota Keluarga"}
                                    </strong>
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Calendar
                                    size={16}
                                    className="text-indigo-500 shrink-0"
                                />
                                <span>
                                    Tanggal Ditulis:{" "}
                                    <strong className="text-slate-900">
                                        {new Date(
                                            testament.created_at,
                                        ).toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </strong>
                                </span>
                            </div>

                            {testament.counterparty_name && (
                                <div className="pt-2 border-t border-slate-200/60">
                                    Nama Pihak Terkait / Saksi:{" "}
                                    <strong className="text-slate-900">
                                        {testament.counterparty_name}
                                    </strong>
                                </div>
                            )}

                            {testament.nominal_amount > 0 && (
                                <div className="pt-2 border-t border-slate-200/60">
                                    Nilai Uang Terkait:{" "}
                                    <strong
                                        className={
                                            testament.category ===
                                            "kewajiban_utang"
                                                ? "text-rose-600 font-black"
                                                : "text-emerald-600 font-black"
                                        }
                                    >
                                        {formatRupiah(testament.nominal_amount)}
                                    </strong>
                                </div>
                            )}
                        </div>

                        {/* Isi Pesan Wasiat */}
                        <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/30 border border-amber-200/60">
                            <p className="text-sm sm:text-base font-medium text-slate-800 whitespace-pre-line leading-relaxed">
                                {testament.content}
                            </p>
                        </div>

                        {/* Tanda Tangan */}
                        <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs font-bold text-slate-500">
                            <div>
                                <span className="block">Status Dokumen:</span>
                                <span className="text-emerald-600 font-black uppercase">
                                    {testament.status?.replace("_", " ")} •
                                    Dijaga Enkripsi AES-256
                                </span>
                            </div>
                            <div className="text-right space-y-10">
                                <p>Ditulis & Disahkan Oleh,</p>
                                <p className="font-black text-slate-900 underline text-sm">
                                    {owner?.name || "Pemilik Brankas"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-slate-100 bg-white flex justify-end shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs transition"
                    >
                        Tutup Lembar Surat
                    </button>
                </div>
            </div>
        </div>
    );
}
