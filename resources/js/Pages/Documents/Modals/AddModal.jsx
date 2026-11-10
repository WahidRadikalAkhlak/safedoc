import React, { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function AddModal({ isOpen, onClose, beneficiaries = [] }) {
    const fileInput = useRef(null);
    const { data, setData, post, errors, reset, clearErrors } = useForm({
        title: "",
        category: "sertifikat_tanah",
        beneficiary_id: "",
        estimated_value: "",
        asset_location: "",
        document_number: "",
        document_file: null,
        notes: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const closeModal = () => {
        reset();
        clearErrors();
        onClose();
    };

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        post("/documents", {
            onSuccess: () => {
                toast.success("Dokumen & alokasi warisan berhasil dienkripsi!");
                closeModal();
            },
            onError: () => {
                toast.error(
                    "Gagal menyimpan dokumen. Periksa kembali form Anda.",
                );
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-2xl overflow-hidden border border-white/50 flex flex-col max-h-[95vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 shrink-0 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-sky-500 text-white rounded-2xl shadow-[0_8px_16px_rgba(14,165,233,0.2)]">
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
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                Simpan Dokumen & Alokasi Warisan
                            </h2>
                            <p className="text-sm font-medium text-slate-500 mt-0.5">
                                Enkripsi militer (AES-256) otomatis aktif.
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
                        id="addDocumentForm"
                        onSubmit={submit}
                        className="space-y-5 relative z-10"
                    >
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Nama Dokumen / Aset{" "}
                                <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                placeholder="cth: Sertifikat Hak Milik Rumah Palu"
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
                                    Kategori Dokumen{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none cursor-pointer"
                                >
                                    <option value="sertifikat_tanah">
                                        Sertifikat Tanah / Properti
                                    </option>
                                    <option value="bpkb">
                                        BPKB / Kendaraan
                                    </option>
                                    <option value="wasiat">
                                        Surat Wasiat / Akta Notaris
                                    </option>
                                    <option value="lainnya">
                                        Dokumen Rahasia Lainnya
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Alokasikan ke Ahli Waris
                                </label>
                                <select
                                    value={data.beneficiary_id}
                                    onChange={(e) =>
                                        setData(
                                            "beneficiary_id",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none cursor-pointer"
                                >
                                    <option value="">
                                        -- Belum Dialokasikan / Umum --
                                    </option>
                                    {beneficiaries.map((b) => (
                                        <option key={b.id} value={b.id}>
                                            {b.name} (
                                            {b.relationship.replace("_", "/")})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Estimasi Nilai Aset (Rp)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.estimated_value}
                                    onChange={(e) =>
                                        setData(
                                            "estimated_value",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                    placeholder="cth: 850000000"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Lokasi Fisik Aset
                                </label>
                                <input
                                    type="text"
                                    value={data.asset_location}
                                    onChange={(e) =>
                                        setData(
                                            "asset_location",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                    placeholder="cth: Kec. Palu Timur"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Nomor Dokumen
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                    placeholder="No. SHM / BPKB"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Pilih File (PDF, JPG, PNG - Maks 5 MB){" "}
                                <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="file"
                                ref={fileInput}
                                onChange={(e) =>
                                    setData("document_file", e.target.files[0])
                                }
                                accept=".pdf,.jpg,.jpeg,.png"
                                className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 transition cursor-pointer border border-slate-200 rounded-2xl p-1 bg-white"
                                required
                            />
                            {errors.document_file && (
                                <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                    {errors.document_file}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Catatan Wasiat / Instruksi Khusus (Dienkripsi)
                            </label>
                            <textarea
                                rows="2"
                                value={data.notes}
                                onChange={(e) =>
                                    setData("notes", e.target.value)
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                placeholder="Catatan mengenai letak brankas fisik atau pesan untuk ahli waris..."
                            />
                        </div>
                    </form>
                </div>

                {/* Footer Modal */}
                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0 relative z-20">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                        Batalkan
                    </button>
                    <button
                        type="submit"
                        form="addDocumentForm"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-[0_8px_16px_rgba(14,165,233,0.25)] transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? "Mengenkripsi..." : "Enkripsi & Simpan"}
                    </button>
                </div>
            </div>
        </div>
    );
}
