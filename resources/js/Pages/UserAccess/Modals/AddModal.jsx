import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, UserPlus, CheckCircle2 } from "lucide-react";

export default function AddModal({ isOpen, onClose }) {
    const { data, setData, post, errors, reset, clearErrors } = useForm({
        name: "",
        email: "",
        password: "",
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

        post("/user-access", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Akses akun baru berhasil dibuat!");
                closeModal();
            },
            onError: () => toast.error("Periksa kembali isian formulir."),
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-2xl overflow-hidden border border-white/60 animate-in zoom-in-95">
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-sky-950 text-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl">
                            <UserPlus size={26} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                                Registrasi Backdoor
                            </span>
                            <h2 className="text-xl font-black mt-0.5">
                                Buka Akses Brankas Baru
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

                <div className="p-6 sm:p-8 bg-slate-50/40">
                    <form
                        id="addUserForm"
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Nama Pengguna Baru{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none"
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
                                    Alamat Email Login{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-rose-500 text-xs font-bold mt-2">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Buat Kata Sandi Awal{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Minimal 8 karakter..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-rose-500 text-xs font-bold mt-2">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
                    <button
                        onClick={closeModal}
                        type="button"
                        className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        form="addUserForm"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-lg disabled:opacity-50"
                    >
                        <CheckCircle2 size={18} />
                        {isSubmitting ? "Menyimpan..." : "Beri Akses Sistem"}
                    </button>
                </div>
            </div>
        </div>
    );
}
