import React, { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, Film, CheckCircle2, ShieldCheck } from "lucide-react";

export default function AddModal({ isOpen, onClose, beneficiaries = [] }) {
    const fileInput = useRef(null);
    const { data, setData, post, errors, reset, clearErrors } = useForm({
        title: "",
        category: "keluarga",
        beneficiary_id: "",
        memory_date: "",
        location_name: "",
        story_notes: "",
        media_file: null,
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

        post("/memories", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    "Foto / video kenangan berhasil disimpan ke brankas!",
                );
                closeModal();
            },
            onError: () => {
                toast.error(
                    "Gagal menyimpan kenangan. Mohon periksa isian Anda.",
                );
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-3xl overflow-hidden border border-white/60 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl">
                            <Film size={26} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                                Album Rahasia Keluarga
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                                Simpan Foto atau Video Kenangan
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                    >
                        <X size={22} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar bg-slate-50/40 flex-1">
                    <form
                        id="addMemoryForm"
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Judul Momen Kenangan{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none"
                                    placeholder="Contoh: Liburan Keluarga Besar di Pantai / Pesan Video untuk Anak"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-rose-500 text-xs font-bold mt-2">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Kategori Kenangan{" "}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none cursor-pointer"
                                    >
                                        <option value="keluarga">
                                            Momen Bersama Keluarga
                                        </option>
                                        <option value="acara_spesial">
                                            Acara Spesial / Wisuda / Pernikahan
                                        </option>
                                        <option value="perjalanan">
                                            Perjalanan / Tempat Berkesan
                                        </option>
                                        <option value="pesan_kenangan">
                                            Pesan Kenangan Khusus
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Tautkan ke Anggota Keluarga
                                    </label>
                                    <select
                                        value={data.beneficiary_id}
                                        onChange={(e) =>
                                            setData(
                                                "beneficiary_id",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none cursor-pointer"
                                    >
                                        <option value="">
                                            -- Kenangan Seluruh Keluarga --
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
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Tanggal Momen
                                    </label>
                                    <input
                                        type="date"
                                        value={data.memory_date}
                                        onChange={(e) =>
                                            setData(
                                                "memory_date",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Lokasi Momen
                                    </label>
                                    <input
                                        type="text"
                                        value={data.location_name}
                                        onChange={(e) =>
                                            setData(
                                                "location_name",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none"
                                        placeholder="Contoh: Palu / Yogyakarta / Rumah Induk"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-1.5">
                                    Pilih Foto (JPG, PNG, WEBP) atau Video (MP4,
                                    MOV, WEBM){" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <p className="text-xs font-medium text-slate-400 mb-3">
                                    Ukuran maksimal 50 MB. File akan dikunci
                                    aman di dalam penyimpanan brankas.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInput}
                                    onChange={(e) =>
                                        setData("media_file", e.target.files[0])
                                    }
                                    accept=".jpg,.jpeg,.png,.webp,.mp4,.mov,.webm"
                                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 transition cursor-pointer border border-slate-200 rounded-2xl p-2 bg-slate-50"
                                    required
                                />
                                {errors.media_file && (
                                    <p className="text-rose-500 text-xs font-bold mt-2">
                                        {errors.media_file}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Cerita Singkat atau Pesan Kenangan
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.story_notes}
                                    onChange={(e) =>
                                        setData("story_notes", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-medium text-slate-700 focus:bg-white focus:border-sky-500 outline-none leading-relaxed"
                                    placeholder="Tuliskan cerita di balik momen ini atau pesan hangat untuk keluarga..."
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <ShieldCheck size={16} /> Tersimpan Aman di Brankas
                        Pribadi
                    </span>
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            form="addMemoryForm"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-lg disabled:opacity-50"
                        >
                            <CheckCircle2 size={18} />
                            {isSubmitting ? "Menyimpan..." : "Simpan Kenangan"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
