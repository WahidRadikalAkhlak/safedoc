import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { Trash2 } from "lucide-react";

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
                toast.success("Catatan wasiat berhasil dihapus.");
                onClose();
            },
            onError: () => {
                toast.error("Gagal menghapus catatan wasiat.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-lg overflow-hidden border border-white/50 flex flex-col animate-in zoom-in-95 fade-in duration-300">
                <div className="flex items-center gap-4 p-6 border-b border-slate-100 bg-rose-50/50">
                    <div className="p-3 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl shadow-lg animate-pulse">
                        <Trash2 size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-rose-700 tracking-tight">
                            Hapus Catatan Amanat
                        </h2>
                        <p className="text-xs font-bold text-rose-500 mt-0.5">
                            Konfirmasi penghapusan dokumen wasiat
                        </p>
                    </div>
                </div>

                <div className="p-6 sm:p-8 text-center space-y-4">
                    <p className="text-sm font-medium text-slate-600">
                        Apakah Anda yakin ingin menghapus catatan amanat wasiat
                        berikut?
                    </p>
                    <div className="p-4 bg-white border border-slate-200 rounded-2xl font-black text-lg text-slate-900 shadow-sm">
                        {testament.title}
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
                        className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-red-600 hover:brightness-110 shadow-lg text-sm transition disabled:opacity-50"
                    >
                        {isSubmitting ? "Menghapus..." : "Ya, Hapus"}
                    </button>
                </div>
            </div>
        </div>
    );
}
