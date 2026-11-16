import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, Edit3, CheckCircle2 } from "lucide-react";

export default function EditModal({ isOpen, onClose, user }) {
    const { data, setData, put, reset, clearErrors } = useForm({
        name: "",
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setData({ name: user.name, email: user.email, password: "" });
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const closeModal = () => {
        reset();
        clearErrors();
        onClose();
    };

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        put(`/user-access/${user.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Data & akses berhasil diperbarui!");
                closeModal();
            },
            onError: () => toast.error("Gagal menyimpan perubahan."),
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-2xl overflow-hidden border border-white/60 animate-in zoom-in-95">
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-2xl">
                            <Edit3 size={24} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                                Edit Akses Pengguna
                            </span>
                            <h2 className="text-xl font-black mt-0.5">
                                Ubah Data Login & Sandi
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="p-6 sm:p-8 bg-slate-50/40">
                    <form
                        id="editUserForm"
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Nama Pengguna{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none"
                                    required
                                />
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Ganti Kata Sandi (Kosongkan jika tidak
                                    diubah)
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Ketik sandi baru..."
                                    className="w-full bg-amber-50/50 border border-amber-200 rounded-2xl py-3.5 px-4 font-bold focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none"
                                />
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
                        form="editUserForm"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 shadow-lg disabled:opacity-50"
                    >
                        <CheckCircle2 size={18} />
                        {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </div>
        </div>
    );
}
