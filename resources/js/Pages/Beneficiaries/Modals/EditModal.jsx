import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, Edit3, CheckCircle2 } from "lucide-react";

export default function EditModal({ isOpen, onClose, beneficiary }) {
    const { data, setData, put, errors, reset, clearErrors } = useForm({
        name: "",
        relationship: "anak",
        nik: "",
        phone_number: "",
        email: "",
        allocation_notes: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (beneficiary) {
            setData({
                name: beneficiary.name || "",
                relationship: beneficiary.relationship || "anak",
                nik: beneficiary.nik || "",
                phone_number: beneficiary.phone_number || "",
                email: beneficiary.email || "",
                allocation_notes: beneficiary.allocation_notes || "",
            });
        }
    }, [beneficiary]);

    if (!isOpen || !beneficiary) return null;

    const closeModal = () => {
        reset();
        clearErrors();
        onClose();
    };

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        put(`/beneficiaries/${beneficiary.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Data ahli waris berhasil diperbarui!");
                closeModal();
            },
            onError: () => {
                toast.error("Gagal memperbarui data ahli waris.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-2xl overflow-hidden border border-white/50 flex flex-col max-h-[95vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-6 md:p-8 border-b border-slate-100 bg-amber-50/30 shrink-0 relative overflow-hidden">
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl shadow-lg">
                            <Edit3 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                Edit Data Ahli Waris
                            </h2>
                            <p className="text-sm font-medium text-slate-500 mt-0.5">
                                Perbarui rincian identitas atau amanat wasiat
                                untuk {beneficiary.name}.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body Modal */}
                <div className="p-6 md:p-8 overflow-y-auto bg-slate-50/30 flex-1">
                    <form
                        id="editBeneficiaryForm"
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
                                    required
                                />
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none cursor-pointer"
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none font-mono text-sm"
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
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
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
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
                        form="editBeneficiaryForm"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 shadow-lg transition-all disabled:opacity-50"
                    >
                        <CheckCircle2 size={18} strokeWidth={2.5} />
                        {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </div>
        </div>
    );
}
