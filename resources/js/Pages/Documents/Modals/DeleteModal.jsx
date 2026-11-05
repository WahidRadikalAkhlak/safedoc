import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function DeleteModal({ isOpen, onClose, document }) {
    const { delete: destroy } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !document) return null;

    const handleDelete = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        destroy(`/documents/${document.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Dokumen telah dihancurkan dari Vault!");
                onClose();
            },
            onError: () => {
                toast.error("Gagal menghapus dokumen.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-lg overflow-hidden border border-white/50 flex flex-col animate-in zoom-in-95 fade-in duration-300">
                {/* Header Kritis */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-rose-50/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl shadow-[0_8px_16px_rgba(225,29,72,0.2)] animate-pulse">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-rose-700 tracking-tight">
                                Hapus Dokumen
                            </h2>
                            <p className="text-sm font-medium text-rose-500/80 mt-0.5">
                                Tindakan ini bersifat permanen.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body Pesan Konfirmasi */}
                <div className="p-6 sm:p-8 bg-slate-50/30 text-center relative">
                    <p className="text-slate-600 font-medium leading-relaxed">
                        Anda yakin ingin menghancurkan file terenkripsi dari{" "}
                        <br />
                        <strong className="text-slate-900 font-black text-lg block mt-2 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                            "{document.title}"
                        </strong>
                    </p>
                    <p className="text-xs font-bold text-rose-500 mt-4 flex items-center justify-center gap-1.5 bg-rose-50 py-2 rounded-lg border border-rose-100">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        File fisik dan data enkripsi akan terhapus dari server.
                    </p>
                </div>

                {/* Footer Modal */}
                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-800 transition-all"
                    >
                        Batalkan
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isSubmitting}
                        className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white transition-all duration-300 ${isSubmitting ? "bg-slate-400 cursor-not-allowed shadow-none" : "bg-gradient-to-r from-rose-500 to-red-600 hover:brightness-110 shadow-[0_8px_16px_rgba(225,29,72,0.25)] hover:shadow-[0_8px_20px_rgba(225,29,72,0.4)] hover:-translate-y-0.5"}`}
                    >
                        {isSubmitting ? (
                            <svg
                                className="w-5 h-5 animate-spin"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        )}
                        {isSubmitting ? "Menghapus..." : "Ya, Hancurkan!"}
                    </button>
                </div>
            </div>
        </div>
    );
}
