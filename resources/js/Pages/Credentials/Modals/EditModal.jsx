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
                toast.success("Data rekening & PIN berhasil diperbarui!");
                closeModal();
            },
            onError: () => {
                toast.error("Gagal memperbarui data.");
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
                                Perbarui Data Rahasia
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                                Ubah Rincian Rekening, Polis & PIN
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
                        id="editCredentialForm"
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Nama Tabungan / Polis Asuransi / Brankas{" "}
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
                                        Jenis Data Rahasia
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-amber-500 outline-none cursor-pointer"
                                    >
                                        <option value="rekening_bank">
                                            Rekening Bank / Deposito
                                        </option>
                                        <option value="polis_asuransi">
                                            Polis Asuransi Jiwa / Kesehatan
                                        </option>
                                        <option value="brankas_fisik">
                                            Kunci Brankas Besi / SDB Bank
                                        </option>
                                        <option value="investasi">
                                            Akun Investasi / Saham / Emas
                                        </option>
                                        <option value="akun_digital">
                                            Akun Penting Lainnya
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Diwariskan / Dikuasakan Kepada Siapa?
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
                                        Nama Bank / Perusahaan Asuransi / Lokasi
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
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Nomor Rekening / Nomor Polis / ID Akun{" "}
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
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-mono font-bold text-slate-800 focus:bg-white focus:border-amber-500 outline-none transition"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-amber-800 mb-2">
                                    Kode PIN / Kata Sandi / Angka Kombinasi
                                    Brankas{" "}
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
                                    className="w-full bg-amber-50/50 border border-amber-200 rounded-2xl py-3.5 px-4 font-mono font-black text-slate-900 focus:bg-white focus:border-amber-500 outline-none transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Petunjuk Pencairan / Letak Buku Tabungan &
                                    Kunci Cadangan
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-medium text-slate-700 focus:bg-white focus:border-amber-500 outline-none transition leading-relaxed"
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
                        form="editCredentialForm"
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
