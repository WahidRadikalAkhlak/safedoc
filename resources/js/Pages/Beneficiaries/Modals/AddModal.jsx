import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, UserPlus, CheckCircle2, ShieldCheck } from "lucide-react";

export default function AddModal({ isOpen, onClose }) {
    const { data, setData, post, errors, reset, clearErrors } = useForm({
        name: "",
        relationship: "anak",
        nik: "",
        phone_number: "",
        email: "",
        allocation_notes: "",
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

        post("/beneficiaries", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Data anggota keluarga berhasil disimpan!");
                closeModal();
            },
            onError: () => {
                toast.error("Gagal menyimpan data keluarga.");
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
                            <UserPlus size={26} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                                Pendaftaran Penerima Waris
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                                Tambah Anggota Keluarga / Ahli Waris
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

                {/* Body Modal Lega */}
                <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50/40 flex-1">
                    <form
                        id="addBeneficiaryForm"
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        {/* Kotak 1: Nama & Hubungan Keluarga (2 Kolom Lega) */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Nama Lengkap (Sesuai KTP){" "}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                        placeholder="Contoh: Ni Luh Putu Rahayu"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-rose-500 text-xs font-bold mt-2">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Status Hubungan Keluarga{" "}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.relationship}
                                        onChange={(e) =>
                                            setData(
                                                "relationship",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none cursor-pointer"
                                    >
                                        <option value="istri_suami">
                                            Istri / Suami Sah
                                        </option>
                                        <option value="anak">
                                            Anak Kandung
                                        </option>
                                        <option value="saudara">
                                            Saudara / Kerabat Keluarga
                                        </option>
                                        <option value="notaris">
                                            Notaris / Kuasa Hukum Keluarga
                                        </option>
                                        <option value="lainnya">
                                            Penerima Wasiat Lainnya
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* NIK & Nomor Telepon (2 Kolom Lega, Tidak Berdempetan) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Nomor KTP / NIK (16 Angka)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nik}
                                        onChange={(e) =>
                                            setData("nik", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-mono font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                        placeholder="Contoh: 727101xxxxxxxxxx"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Nomor HP / WhatsApp Aktif
                                    </label>
                                    <input
                                        type="text"
                                        value={data.phone_number}
                                        onChange={(e) =>
                                            setData(
                                                "phone_number",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                        placeholder="Contoh: 0812-xxxx-xxxx"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Alamat Email (Jika Ada)
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                    placeholder="Contoh: keluarga@email.com"
                                />
                            </div>
                        </div>

                        {/* Kotak 2: Pesan Wasiat Pribadi */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                            <label className="block text-sm font-extrabold text-slate-800 mb-1.5">
                                Pesan Wasiat atau Amanat Khusus untuk Orang Ini
                            </label>
                            <p className="text-xs font-medium text-slate-400 mb-3">
                                Pesan ini akan tampil di dalam rincian hak waris
                                dan ikut tercetak pada Surat Induk Warisan.
                            </p>
                            <textarea
                                rows="3"
                                value={data.allocation_notes}
                                onChange={(e) =>
                                    setData("allocation_notes", e.target.value)
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-medium text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none leading-relaxed"
                                placeholder="Tuliskan pesan pribadi, nasihat, atau instruksi pembagian harta untuk anggota keluarga ini..."
                            />
                        </div>
                    </form>
                </div>

                {/* Footer Modal */}
                <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <ShieldCheck size={16} /> Identitas & NIK Dienkripsi
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
                            form="addBeneficiaryForm"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-lg transition disabled:opacity-50"
                        >
                            <CheckCircle2 size={18} strokeWidth={2.5} />
                            {isSubmitting
                                ? "Menyimpan..."
                                : "Simpan Data Keluarga"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
