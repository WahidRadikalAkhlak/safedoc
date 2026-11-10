import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, BookOpen, CheckCircle2 } from "lucide-react";

export default function AddModal({ isOpen, onClose, beneficiaries = [] }) {
    const { data, setData, post, errors, reset, clearErrors } = useForm({
        title: "",
        category: "amanat_keluarga",
        beneficiary_id: "",
        counterparty_name: "",
        nominal_amount: "",
        content: "",
        status: "aktif",
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

        post("/testaments", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    "Amanat wasiat berhasil dienkripsi dan disimpan!",
                );
                closeModal();
            },
            onError: () => {
                toast.error("Gagal menyimpan amanat wasiat.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-2xl overflow-hidden border border-white/50 flex flex-col max-h-[95vh] animate-in zoom-in-95 fade-in duration-300">
                <div className="flex justify-between items-center p-6 md:p-8 border-b border-slate-100 bg-slate-50/50 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-sky-500 text-white rounded-2xl shadow-lg">
                            <BookOpen size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                Tulis Amanat Wasiat / Catatan Piutang
                            </h2>
                            <p className="text-sm font-medium text-slate-500 mt-0.5">
                                Seluruh isi pesan amanat dienkripsi secara penuh
                                di dalam database.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto bg-slate-50/30 flex-1">
                    <form
                        id="addTestamentForm"
                        onSubmit={submit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Judul Amanat / Surat Wasiat{" "}
                                <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                                placeholder="cth: Amanat Pembagian Usaha Keluarga / Piutang Proyek Bpk. Surya"
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
                                    Kategori Catatan{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none cursor-pointer"
                                >
                                    <option value="amanat_keluarga">
                                        Amanat Keluarga & Pesan Wasiat
                                    </option>
                                    <option value="instruksi_bisnis">
                                        Instruksi Suksesi Bisnis / Aset
                                    </option>
                                    <option value="piutang_klaim">
                                        Catatan Piutang (Hak Tagih Keluarga)
                                    </option>
                                    <option value="kewajiban_utang">
                                        Catatan Kewajiban / Utang Harus Lunas
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Ditujukan Khusus Kepada
                                </label>
                                <select
                                    value={data.beneficiary_id}
                                    onChange={(e) =>
                                        setData(
                                            "beneficiary_id",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none cursor-pointer"
                                >
                                    <option value="">
                                        -- Seluruh Ahli Waris / Keluarga --
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
                                    Pihak Terkait / Saksi / Debitur
                                </label>
                                <input
                                    type="text"
                                    value={data.counterparty_name}
                                    onChange={(e) =>
                                        setData(
                                            "counterparty_name",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                                    placeholder="Nama Notaris / Rekan"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Nominal Terkait (Rp)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.nominal_amount}
                                    onChange={(e) =>
                                        setData(
                                            "nominal_amount",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                                    placeholder="Isi jika Piutang/Utang"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Status Amanat
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none cursor-pointer"
                                >
                                    <option value="aktif">Aktif Berlaku</option>
                                    <option value="rahasia_penuh">
                                        Rahasia Penuh
                                    </option>
                                    <option value="selesai">
                                        Sudah Diselesaikan
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Isi Lengkap Surat Wasiat / Rincian Amanat
                                (Dienkripsi){" "}
                                <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                rows="6"
                                value={data.content}
                                onChange={(e) =>
                                    setData("content", e.target.value)
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-medium text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition leading-relaxed"
                                placeholder="Tuliskan secara terperinci isi wasiat, pesan keluarga, atau bukti rincian piutang/kewajiban..."
                                required
                            />
                            {errors.content && (
                                <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                    {errors.content}
                                </p>
                            )}
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition"
                    >
                        Batalkan
                    </button>
                    <button
                        type="submit"
                        form="addTestamentForm"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-lg transition disabled:opacity-50"
                    >
                        <CheckCircle2 size={18} strokeWidth={2.5} />
                        {isSubmitting ? "Mengenkripsi..." : "Simpan Amanat"}
                    </button>
                </div>
            </div>
        </div>
    );
}
