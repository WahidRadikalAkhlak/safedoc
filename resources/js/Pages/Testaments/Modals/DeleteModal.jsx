import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { Trash2, X } from "lucide-react";

export default function DeleteModal({ isOpen, onClose, testament }) {
    const { delete: destroy } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !testament) return null;

    const handleDelete = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        destroy(`/testaments/${testament.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Surat wasiat / catatan berhasil dihapus.");
                onClose();
            },
            onError: () => {
                toast.error("Gagal menghapus catatan.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-xl overflow-hidden border border-white/60 flex flex-col animate-in zoom-in-95 fade-in duration-300">
                <div className="flex justify-between items-center p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-r from-rose-950 to-slate-900 text-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-rose-500/20 border border-rose-400/30 text-rose-300 rounded-2xl">
                            <Trash2 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-rose-300 block">
                                Konfirmasi Penghapusan Wasiat
                            </span>
                            <h2 className="text-xl font-black tracking-tight mt-0.5">
                                Hapus Surat Wasiat / Catatan Ini?
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-300 hover:text-white rounded-xl"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 sm:p-8 space-y-4 bg-slate-50/40">
                    <p className="text-sm font-medium text-slate-600">
                        Apakah Anda yakin ingin menghapus lembar surat wasiat
                        atau catatan keuangan berikut?
                    </p>
                    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
                        <span className="text-xs font-bold text-slate-400 block">
                            Judul Surat / Catatan:
                        </span>
                        <span className="font-black text-lg text-slate-900 block mt-0.5">
                            {testament.title}
                        </span>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm transition"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isSubmitting}
                        className="px-7 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-rose-600 to-red-600 hover:brightness-110 shadow-lg text-sm transition disabled:opacity-50"
                    >
                        {isSubmitting ? "Menghapus..." : "Ya, Hapus Surat Ini"}
                    </button>
                </div>
            </div>
        </div>
    );
}
