import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { Trash2, X } from "lucide-react";

export default function DeleteModal({ isOpen, onClose, memory }) {
    const { delete: destroy } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !memory) return null;

    const handleDelete = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        destroy(`/memories/${memory.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Kenangan berhasil dihapus dari brankas.");
                onClose();
            },
            onError: () => {
                toast.error("Gagal menghapus kenangan.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-xl overflow-hidden border border-white/60 animate-in zoom-in-95">
                <div className="flex justify-between items-center p-6 sm:p-7 bg-gradient-to-r from-rose-950 to-slate-900 text-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-rose-500/20 border border-rose-400/30 text-rose-300 rounded-2xl">
                            <Trash2 size={24} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-rose-300 block">
                                Konfirmasi Penghapusan Kenangan
                            </span>
                            <h2 className="text-xl font-black mt-0.5">
                                Hapus Kenangan Ini?
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
                        Anda akan menghapus{" "}
                        {memory.media_type === "video" ? "video" : "foto"}{" "}
                        kenangan berikut secara permanen dari brankas:
                    </p>
                    <div className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm">
                        <span className="text-xs font-bold text-slate-400 block">
                            Judul Momen:
                        </span>
                        <span className="font-black text-lg text-slate-900 block mt-0.5">
                            {memory.title}
                        </span>
                        <span className="text-xs font-medium text-slate-400 block mt-1">
                            File: {memory.original_filename}
                        </span>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        type="button"
                        className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleDelete}
                        type="button"
                        disabled={isSubmitting}
                        className="px-7 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-rose-600 to-red-600 hover:brightness-110 shadow-lg text-sm disabled:opacity-50"
                    >
                        {isSubmitting
                            ? "Menghapus..."
                            : "Ya, Hapus Kenangan Ini"}
                    </button>
                </div>
            </div>
        </div>
    );
}
