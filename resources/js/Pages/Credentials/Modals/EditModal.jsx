import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, Edit3, CheckCircle2 } from "lucide-react";

export default function EditModal({
    isOpen,
    onClose,
    credential,
    beneficiaries = [],
}) {
    const { data, setData, put, reset, clearErrors } = useForm({
        title: "",
        category: "rekening_bank",
        beneficiary_id: "",
        institution_name: "",
        account_identifier: "",
        secret_pin_or_password: "",
        access_instructions: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (credential) {
            setData({
                title: credential.title || "",
                category: credential.category || "rekening_bank",
                beneficiary_id: credential.beneficiary_id || "",
                institution_name: credential.institution_name || "",
                account_identifier: credential.account_identifier || "",
                secret_pin_or_password: credential.secret_pin_or_password || "",
                access_instructions: credential.access_instructions || "",
            });
        }
    }, [credential]);

    if (!isOpen || !credential) return null;

    const closeModal = () => {
        reset();
        clearErrors();
        onClose();
    };

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        put(`/credentials/${credential.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Kredensial berhasil diperbarui!");
                closeModal();
            },
            onError: () => {
                toast.error("Gagal memperbarui kredensial.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-2xl overflow-hidden border border-white/50 flex flex-col max-h-[95vh] animate-in zoom-in-95 fade-in duration-300">
                <div className="flex justify-between items-center p-6 md:p-8 border-b border-slate-100 bg-amber-50/30 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl shadow-lg">
                            <Edit3 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                Edit Kredensial & PIN
                            </h2>
                            <p className="text-sm font-medium text-slate-500 mt-0.5">
                                Perbarui rincian akses atau penerima waris.
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
                        id="editCredentialForm"
                        onSubmit={submit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Nama Akun / Brankas / Polis{" "}
                                <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-amber-500 outline-none transition"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Kategori Kredensial
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-amber-500 outline-none cursor-pointer"
                                >
                                    <option value="rekening_bank">
                                        Rekening Bank / Deposito
                                    </option>
                                    <option value="polis_asuransi">
                                        Polis Asuransi Jiwa / Kesehatan
                                    </option>
                                    <option value="brankas_fisik">
                                        Brankas Fisik / Safe Deposit Box
                                    </option>
                                    <option value="investasi">
                                        Akun Saham / Kripto / Emas
                                    </option>
                                    <option value="akun_digital">
                                        Akun Digital / Email Master
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Diwariskan Kepada
                                </label>
                                <select
                                    value={data.beneficiary_id}
                                    onChange={(e) =>
                                        setData(
                                            "beneficiary_id",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-amber-500 outline-none cursor-pointer"
                                >
                                    <option value="">
                                        -- Seluruh Keluarga / Umum --
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Nama Institusi / Lokasi
                                </label>
                                <input
                                    type="text"
                                    value={data.institution_name}
                                    onChange={(e) =>
                                        setData(
                                            "institution_name",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-amber-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                    Nomor Rekening / Polis / Username{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.account_identifier}
                                    onChange={(e) =>
                                        setData(
                                            "account_identifier",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-mono font-bold text-slate-700 focus:bg-white focus:border-amber-500 outline-none transition"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                PIN Rahasia / Password / Kombinasi Kunci{" "}
                                <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.secret_pin_or_password}
                                onChange={(e) =>
                                    setData(
                                        "secret_pin_or_password",
                                        e.target.value,
                                    )
                                }
                                className="w-full bg-amber-50/40 border border-amber-200 rounded-2xl py-3.5 px-4 font-mono font-bold text-slate-800 focus:bg-white focus:border-amber-500 outline-none transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                                Panduan Akses / Letak Kunci Fisik
                            </label>
                            <textarea
                                rows="3"
                                value={data.access_instructions}
                                onChange={(e) =>
                                    setData(
                                        "access_instructions",
                                        e.target.value,
                                    )
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-amber-500 outline-none transition"
                            />
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
                        form="editCredentialForm"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 shadow-lg transition disabled:opacity-50"
                    >
                        <CheckCircle2 size={18} strokeWidth={2.5} />
                        {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </div>
        </div>
    );
}
