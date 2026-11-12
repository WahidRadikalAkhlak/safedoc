import React, { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, UploadCloud, CheckCircle2, ShieldCheck } from "lucide-react";

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
                toast.success("Dokumen berhasil diamankan ke dalam brankas!");
                closeModal();
            },
            onError: () => {
                toast.error(
                    "Gagal menyimpan dokumen. Mohon periksa isian Anda.",
                );
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-3xl overflow-hidden border border-white/60 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal Premium */}
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl shadow-inner">
                            <UploadCloud size={26} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                                Penyimpanan Brankas Baru
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                                Simpan Dokumen & Tentukan Warisan
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X size={22} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body Modal dengan Ruang Lega */}
                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar bg-slate-50/40 flex-1">
                    <form
                        id="addDocumentForm"
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        {/* Baris 1: Nama Dokumen (Full Width) */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-1.5">
                                    Nama Dokumen atau Harta Aset{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <p className="text-xs font-medium text-slate-400 mb-3">
                                    Tuliskan nama yang jelas agar mudah dikenali
                                    keluarga (contoh: Sertifikat Rumah Palu
                                    Timur).
                                </p>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                    placeholder="Contoh: Sertifikat Hak Milik (SHM) Tanah Kavling Jl. Garuda"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-rose-500 text-xs font-bold mt-2">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            {/* Baris 2: Jenis Dokumen & Nomor Surat (2 Kolom Lega) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Jenis Dokumen{" "}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none cursor-pointer"
                                    >
                                        <option value="sertifikat_tanah">
                                            Sertifikat Tanah / Rumah (SHM/HGB)
                                        </option>
                                        <option value="bpkb">
                                            BPKB Kendaraan Bermotor
                                        </option>
                                        <option value="wasiat">
                                            Surat Wasiat / Akta Notaris
                                        </option>
                                        <option value="lainnya">
                                            Dokumen Penting Lainnya
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Nomor Sertifikat / Nomor BPKB
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
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-mono font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                        placeholder="Contoh: SHM No. 01428 / BPKB M-99281"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Baris 3: Pembagian Warisan & Nilai Aset (2 Kolom Lega) */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div className="border-b border-slate-100 pb-3">
                                <h3 className="text-sm font-black text-slate-800">
                                    Informasi Pembagian Warisan & Nilai Harta
                                </h3>
                                <p className="text-xs font-medium text-slate-400 mt-0.5">
                                    Tentukan siapa anggota keluarga yang berhak
                                    menerima aset ini beserta perkiraan
                                    nilainya.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Diwariskan Kepada Siapa?
                                    </label>
                                    <select
                                        value={data.beneficiary_id}
                                        onChange={(e) =>
                                            setData(
                                                "beneficiary_id",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none cursor-pointer"
                                    >
                                        <option value="">
                                            -- Belum Ditentukan / Milik Bersama
                                            --
                                        </option>
                                        {beneficiaries.map((b) => (
                                            <option key={b.id} value={b.id}>
                                                {b.name} (
                                                {b.relationship.replace(
                                                    "_",
                                                    "/",
                                                )}
                                                )
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Perkiraan Nilai Harta Saat Ini (Rupiah)
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
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-emerald-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                        placeholder="Contoh: 850000000 (Tanpa titik/koma)"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Alamat atau Lokasi Fisik Harta / Tanah
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
                                    placeholder="Contoh: Jl. Sisingamangaraja No. 14, Kec. Palu Timur, Kota Palu"
                                />
                            </div>
                        </div>

                        {/* Baris 4: Unggah File & Catatan Penyimpanan Fisik */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-1.5">
                                    Pilih File Dokumen (PDF, Foto JPG, atau PNG
                                    - Maksimal 5 MB){" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <p className="text-xs font-medium text-slate-400 mb-3">
                                    File yang Anda pilih akan langsung dikunci
                                    dengan sandi rahasia AES-256 secara
                                    otomatis.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInput}
                                    onChange={(e) =>
                                        setData(
                                            "document_file",
                                            e.target.files[0],
                                        )
                                    }
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 transition cursor-pointer border border-slate-200 rounded-2xl p-2 bg-slate-50"
                                    required
                                />
                                {errors.document_file && (
                                    <p className="text-rose-500 text-xs font-bold mt-2">
                                        {errors.document_file}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Catatan Letak Berkas Asli & Pesan untuk
                                    Keluarga
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-medium text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none leading-relaxed"
                                    placeholder="Contoh: Sertifikat fisik yang asli disimpan di dalam map biru di brankas kamar utama..."
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Modal */}
                <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <ShieldCheck size={16} /> Dijamin Aman dengan Enkripsi
                        AES-256
                    </span>
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            form="addDocumentForm"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-[0_8px_20px_rgba(14,165,233,0.3)] transition disabled:opacity-50"
                        >
                            <CheckCircle2 size={18} strokeWidth={2.5} />
                            {isSubmitting
                                ? "Sedang Mengamankan..."
                                : "Simpan ke Brankas"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
