import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, Edit3, CheckCircle2 } from "lucide-react";

export default function EditModal({
    isOpen,
    onClose,
    testament,
    beneficiaries = [],
}) {
    const { data, setData, put, reset, clearErrors } = useForm({
        title: "",
        category: "amanat_keluarga",
        beneficiary_id: "",
        counterparty_name: "",
        nominal_amount: 0,
        content: "",
        status: "aktif",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (testament) {
            setData({
                title: testament.title || "",
                category: testament.category || "amanat_keluarga",
                beneficiary_id: testament.beneficiary_id || "",
                counterparty_name: testament.counterparty_name || "",
                nominal_amount: testament.nominal_amount || 0,
                content: testament.content || "",
                status: testament.status || "aktif",
            });
        }
    }, [testament]);

    if (!isOpen || !testament) return null;

    const closeModal = () => {
        reset();
        clearErrors();
        onClose();
    };

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        put(`/testaments/${testament.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Surat wasiat / catatan berhasil diperbarui!");
                closeModal();
            },
            onError: () => {
                toast.error("Gagal memperbarui catatan.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-3xl overflow-hidden border border-white/60 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-2xl">
                            <Edit3 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                                Perbarui Lembar Wasiat
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                                Ubah Isi Surat Wasiat / Catatan
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

                <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50/40 flex-1">
                    <form
                        id="editTestamentForm"
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Judul Surat Wasiat / Pokok Catatan{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:border-amber-500 outline-none transition"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Jenis Catatan
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-amber-500 outline-none cursor-pointer"
                                    >
                                        <option value="amanat_keluarga">
                                            Pesan Wasiat Keluarga
                                        </option>
                                        <option value="instruksi_bisnis">
                                            Petunjuk Kelanjutan Usaha / Bisnis
                                        </option>
                                        <option value="piutang_klaim">
                                            Uang Piutang (Hak Tagih Keluarga)
                                        </option>
                                        <option value="kewajiban_utang">
                                            Tanggungan Utang (Wajib Dilunasi)
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Ditujukan Kepada Siapa?
                                    </label>
                                    <select
                                        value={data.beneficiary_id}
                                        onChange={(e) =>
                                            setData(
                                                "beneficiary_id",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-amber-500 outline-none cursor-pointer"
                                    >
                                        <option value="">
                                            -- Untuk Seluruh Keluarga --
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
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Nama Pihak Terkait / Saksi / Peminjam
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
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-amber-500 outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Jumlah Uang Terkait (Rupiah)
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
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-emerald-700 focus:bg-white focus:border-amber-500 outline-none transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Status Catatan Saat Ini
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-amber-500 outline-none cursor-pointer"
                                >
                                    <option value="aktif">
                                        Masih Berlaku Aktif
                                    </option>
                                    <option value="rahasia_penuh">
                                        Sangat Rahasia (Buka Saat Darurat)
                                    </option>
                                    <option value="selesai">
                                        Sudah Lunas / Sudah Diselesaikan
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Isi Lengkap Pesan Wasiat / Rincian
                                    Kesepakatan{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    rows="6"
                                    value={data.content}
                                    onChange={(e) =>
                                        setData("content", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 font-medium text-slate-800 focus:bg-white focus:border-amber-500 outline-none transition leading-relaxed"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm transition"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        form="editTestamentForm"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 shadow-lg transition disabled:opacity-50"
                    >
                        <CheckCircle2 size={18} strokeWidth={2.5} />
                        {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </div>
        </div>
    );
}
