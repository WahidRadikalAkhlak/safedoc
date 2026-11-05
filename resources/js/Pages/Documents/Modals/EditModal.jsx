import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function EditModal({ isOpen, onClose, document }) {
    const { data, setData, put, errors, reset, clearErrors } = useForm({
        title: "",
        category: "",
        document_number: "",
        notes: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mengisi form dengan data dokumen yang diklik
    useEffect(() => {
        if (document) {
            setData({
                title: document.title || "",
                category: document.category || "lainnya",
                document_number: document.document_number || "",
                notes: document.notes || "",
            });
        }
    }, [document]);

    if (!isOpen || !document) return null;

    const closeModal = () => {
        reset();
        clearErrors();
        onClose();
    };

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Menggunakan metode PUT untuk update data
        put(`/documents/${document.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Informasi dokumen berhasil diperbarui!");
                closeModal();
            },
            onError: () => {
                toast.error("Gagal memperbarui dokumen. Periksa input Anda.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-2xl overflow-hidden border border-white/50 flex flex-col max-h-[95vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal - Nuansa Edit (Amber) */}
                <div className="flex justify-between items-center p-6 md:p-8 border-b border-slate-100 bg-amber-50/30 shrink-0 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl shadow-[0_8px_16px_rgba(245,158,11,0.2)]">
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                Edit Informasi Dokumen
                            </h2>
                            <p className="text-sm font-medium text-slate-500 mt-0.5">
                                Ubah metadata tanpa menyentuh file enkripsi
                                fisik.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors relative z-10"
                    >
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Body Modal */}
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-slate-50/30 flex-1 relative">
                    <form
                        id="editDocumentForm"
                        onSubmit={submit}
                        className="space-y-6 relative z-10"
                    >
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Nama Dokumen / Keterangan{" "}
                                <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
                                required
                            />
                            {errors.title && (
                                <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Kategori{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none appearance-none cursor-pointer"
                                >
                                    <option value="sertifikat_tanah">
                                        Sertifikat Tanah / Properti
                                    </option>
                                    <option value="bpkb">
                                        BPKB / Kendaraan
                                    </option>
                                    <option value="wasiat">
                                        Surat Wasiat / Akta
                                    </option>
                                    <option value="lainnya">
                                        Dokumen Lainnya
                                    </option>
                                </select>
                                {errors.category && (
                                    <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                        {errors.category}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Nomor Identifikasi Dokumen
                                </label>
                                <input
                                    type="text"
                                    value={data.document_number}
                                    onChange={(e) =>
                                        setData(
                                            "document_number",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
                                />
                                {errors.document_number && (
                                    <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                        {errors.document_number}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Catatan Tambahan Khusus
                            </label>
                            <textarea
                                rows="3"
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
                            />
                            {errors.notes && (
                                <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                    {errors.notes}
                                </p>
                            )}
                        </div>
                    </form>
                </div>

                {/* Footer Modal */}
                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0 relative z-20">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-800 transition-all"
                    >
                        Batalkan
                    </button>
                    <button
                        type="submit"
                        form="editDocumentForm"
                        disabled={isSubmitting}
                        className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white transition-all duration-300 ${isSubmitting ? "bg-slate-400 cursor-not-allowed shadow-none" : "bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 shadow-[0_8px_16px_rgba(245,158,11,0.25)] hover:shadow-[0_8px_20px_rgba(245,158,11,0.4)] hover:-translate-y-0.5"}`}
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
                                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                                />
                            </svg>
                        )}
                        {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </div>
        </div>
    );
}
