import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, UserPlus, CheckCircle2 } from "lucide-react";

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
                toast.success("Ahli waris berhasil ditambahkan ke brankas!");
                closeModal();
            },
            onError: () => {
                toast.error("Gagal menyimpan data ahli waris.");
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
                        <div className="p-3 bg-gradient-to-br from-blue-600 to-sky-500 text-white rounded-2xl shadow-[0_8px_16px_rgba(14,165,233,0.25)]">
                            <UserPlus size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                Daftarkan Ahli Waris / Penerima Wasiat
                            </h2>
                            <p className="text-sm font-medium text-slate-500 mt-0.5">
                                Data identitas dan pesan wasiat dienkripsi penuh
                                dengan AES-256.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors relative z-10"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body Modal */}
                <div className="p-6 md:p-8 overflow-y-auto bg-slate-50/30 flex-1">
                    <form
                        id="addBeneficiaryForm"
                        onSubmit={submit}
                        className="space-y-5"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Nama Lengkap Sesuai KTP{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                    placeholder="cth: Putu Adi Pratama"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Hubungan Keluarga / Status{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={data.relationship}
                                    onChange={(e) =>
                                        setData("relationship", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none cursor-pointer"
                                >
                                    <option value="istri_suami">
                                        Istri / Suami Sah
                                    </option>
                                    <option value="anak">Anak Kandung</option>
                                    <option value="saudara">
                                        Keluarga / Saudara
                                    </option>
                                    <option value="notaris">
                                        Notaris / Kuasa Hukum
                                    </option>
                                    <option value="lainnya">
                                        Penerima Wasiat Lainnya
                                    </option>
                                </select>
                                {errors.relationship && (
                                    <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                        {errors.relationship}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    NIK KTP (Dienkripsi)
                                </label>
                                <input
                                    type="text"
                                    value={data.nik}
                                    onChange={(e) =>
                                        setData("nik", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none font-mono text-sm"
                                    placeholder="16 Digit NIK"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Nomor Telepon / WA
                                </label>
                                <input
                                    type="text"
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                    placeholder="0812xxxx"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Alamat Email
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                    placeholder="email@keluarga.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Amanat Khusus / Pesan Wasiat (Dienkripsi)
                            </label>
                            <textarea
                                rows="3"
                                value={data.allocation_notes}
                                onChange={(e) =>
                                    setData("allocation_notes", e.target.value)
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                                placeholder="Tuliskan pesan rahasia, instruksi pembagian aset, atau amanat khusus untuk ahli waris ini..."
                            />
                        </div>
                    </form>
                </div>

                {/* Footer Modal */}
                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                        Batalkan
                    </button>
                    <button
                        type="submit"
                        form="addBeneficiaryForm"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-[0_8px_16px_rgba(14,165,233,0.25)] transition-all disabled:opacity-50"
                    >
                        <CheckCircle2 size={18} strokeWidth={2.5} />
                        {isSubmitting ? "Menyimpan..." : "Simpan Ahli Waris"}
                    </button>
                </div>
            </div>
        </div>
    );
}
