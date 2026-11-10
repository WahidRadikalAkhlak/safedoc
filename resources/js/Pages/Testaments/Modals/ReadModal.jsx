import React from "react";
import { X, Printer, ShieldCheck, Users, Calendar } from "lucide-react";

export default function ReadModal({
    isOpen,
    onClose,
    testament,
    formatRupiah,
}) {
    if (!isOpen || !testament) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-3xl overflow-hidden border border-white/50 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/70">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-slate-900 text-white rounded-xl">
                            <ShieldCheck size={20} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-600 block">
                                Dokumen Amanat Terdekripsi • SafeDoc Vault
                            </span>
                            <h2 className="text-lg font-black text-slate-900">
                                {testament.title}
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-extrabold transition"
                        >
                            <Printer size={15} /> Cetak Lembar Amanat
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-rose-500 rounded-xl"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Isi Surat Wasiat */}
                <div className="p-6 sm:p-10 overflow-y-auto space-y-6 bg-slate-50/30 flex-1">
                    <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100 text-xs font-bold text-slate-500">
                            <div className="flex items-center gap-2">
                                <Users size={15} className="text-sky-600" />
                                <span>
                                    Penerima Amanat:{" "}
                                    <strong className="text-slate-800">
                                        {testament.beneficiary
                                            ? testament.beneficiary.name
                                            : "Seluruh Keluarga / Ahli Waris"}
                                    </strong>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar
                                    size={15}
                                    className="text-indigo-500"
                                />
                                <span>
                                    Dicatat pada:{" "}
                                    {new Date(
                                        testament.created_at,
                                    ).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        </div>

                        {(testament.counterparty_name ||
                            testament.nominal_amount > 0) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                                {testament.counterparty_name && (
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                            Pihak Terkait / Saksi / Debitur
                                        </span>
                                        <span className="text-sm font-extrabold text-slate-800">
                                            {testament.counterparty_name}
                                        </span>
                                    </div>
                                )}
                                {testament.nominal_amount > 0 && (
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                                            Nilai Nominal Terkait
                                        </span>
                                        <span className="text-sm font-black text-emerald-600">
                                            {formatRupiah(
                                                testament.nominal_amount,
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="prose max-w-none">
                            <p className="text-sm sm:text-base font-medium text-slate-800 whitespace-pre-line leading-relaxed">
                                {testament.content}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-slate-100 bg-white flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs transition"
                    >
                        Tutup Lembar Amanat
                    </button>
                </div>
            </div>
        </div>
    );
}
