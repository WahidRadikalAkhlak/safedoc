import React, { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { Trash2, AlertTriangle, X } from "lucide-react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy("/profile", {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => {
                toast.error("Kata sandi salah!");
                passwordInput.current?.focus();
            },
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-5 ${className}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-600 shrink-0">
                        <Trash2 size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-rose-700 tracking-tight">
                            3. Tutup & Hapus Seluruh Brankas Permanen
                        </h2>
                        <p className="mt-1 text-sm font-medium text-slate-500">
                            Menghapus akun akan menghancurkan seluruh berkas
                            sertifikat, daftar ahli waris, dan catatan wasiat
                            Anda. Pastikan Anda sudah mengunduh semua berkas
                            sebelum melakukan tindakan ini.
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => setConfirmingUserDeletion(true)}
                    className="px-6 py-3.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white font-black text-xs uppercase tracking-wider rounded-2xl border border-rose-200 transition shrink-0"
                >
                    Hapus Akun Brankas
                </button>
            </div>

            {confirmingUserDeletion && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md transition-all">
                    <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-xl overflow-hidden border border-white/60 animate-in zoom-in-95">
                        <div className="p-6 sm:p-7 bg-gradient-to-r from-rose-950 to-slate-900 text-white flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-rose-500/20 border border-rose-400/30 text-rose-300 rounded-2xl">
                                    <AlertTriangle
                                        size={24}
                                        strokeWidth={2.5}
                                    />
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-300 block">
                                        Tindakan Permanen
                                    </span>
                                    <h2 className="text-xl font-black mt-0.5">
                                        Konfirmasi Penghapusan Seluruh Brankas
                                    </h2>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-2 text-slate-300 hover:text-white rounded-xl"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={deleteUser}
                            className="p-6 sm:p-8 space-y-5 bg-slate-50/40"
                        >
                            <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                Seluruh dokumen sertifikat, rekening, dan surat
                                wasiat di dalam brankas akan dihapus selamanya.
                                Masukkan kata sandi utama Anda untuk
                                mengonfirmasi:
                            </p>

                            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Kata Sandi Utama Brankas{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    ref={passwordInput}
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 outline-none"
                                    placeholder="Ketik kata sandi Anda..."
                                    autoFocus
                                    required
                                />
                                {errors.password && (
                                    <p className="text-rose-500 text-xs font-bold mt-2">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-7 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-rose-600 to-red-600 hover:brightness-110 shadow-lg text-sm disabled:opacity-50"
                                >
                                    {processing
                                        ? "Menghapus..."
                                        : "Ya, Hancurkan Seluruh Brankas"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
