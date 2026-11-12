import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, BookOpen, CheckCircle2, ShieldCheck } from "lucide-react";

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
                toast.success("Surat wasiat / catatan berhasil disimpan!");
                closeModal();
            },
            onError: () => {
                toast.error("Gagal menyimpan catatan wasiat.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-3xl overflow-hidden border border-white/60 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl">
                            <BookOpen size={26} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                                Lembar Amanat & Catatan Keluarga
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                                Tulis Surat Wasiat atau Catatan Utang-Piutang
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

                {/* Body Modal Lega */}
                <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50/40 flex-1">
                    <form
                        id="addTestamentForm"
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-1.5">
                                    Judul Surat Wasiat / Pokok Catatan{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:border-sky-500 outline-none transition"
                                    placeholder="Contoh: Amanat Pembagian Rumah Keluarga / Piutang Pinjaman Modal Bpk. Surya"
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
                                        Jenis Catatan{" "}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none cursor-pointer"
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
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none cursor-pointer"
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

                        {/* Kotak Rincian Pihak & Nominal (2 Kolom Lega, Tidak Berdempetan) */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-1.5">
                                        Nama Pihak Terkait / Saksi / Peminjam
                                    </label>
                                    <p className="text-xs font-medium text-slate-400 mb-2">
                                        Isi nama orang/instansi terkait atau
                                        nama Notaris saksi.
                                    </p>
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
                                        placeholder="Contoh: Bpk. H. Surya / Notaris Hendra, S.H."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-1.5">
                                        Jumlah Uang Terkait (Rupiah)
                                    </label>
                                    <p className="text-xs font-medium text-slate-400 mb-2">
                                        Isi nominal jika ini adalah catatan
                                        Piutang atau Utang.
                                    </p>
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
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-emerald-700 focus:bg-white focus:border-sky-500 outline-none transition"
                                        placeholder="Contoh: 150000000 (Kosongkan jika bukan uang)"
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none cursor-pointer"
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 font-medium text-slate-800 focus:bg-white focus:border-sky-500 outline-none transition leading-relaxed"
                                    placeholder="Tuliskan secara lengkap isi pesan wasiat Anda, tanggal kejadian, letak bukti kuitansi, atau cara penyelesaiannya..."
                                    required
                                />
                                {errors.content && (
                                    <p className="text-rose-500 text-xs font-bold mt-2">
                                        {errors.content}
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Modal */}
                <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <ShieldCheck size={16} /> Isi Surat Wasiat Dienkripsi
                        Penuh
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
                            form="addTestamentForm"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-lg transition disabled:opacity-50"
                        >
                            <CheckCircle2 size={18} strokeWidth={2.5} />
                            {isSubmitting
                                ? "Menyimpan..."
                                : "Simpan Surat Wasiat"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
