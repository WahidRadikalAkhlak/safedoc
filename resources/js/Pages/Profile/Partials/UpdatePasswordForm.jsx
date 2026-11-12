import React, { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { KeyRound, CheckCircle2 } from "lucide-react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put("/password", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Kata sandi utama brankas berhasil diperbarui!");
                reset();
            },
            onError: (err) => {
                toast.error("Gagal mengganti kata sandi. Periksa isian Anda.");
                if (err.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }
                if (err.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="flex items-start gap-4 pb-6 border-b border-slate-100">
                <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600 shrink-0">
                    <KeyRound size={24} strokeWidth={2.5} />
                </div>
                <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                        2. Ganti Kata Sandi Utama Brankas
                    </h2>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                        Gunakan kata sandi minimal 8 karakter yang mudah Anda
                        ingat namun sulit ditebak orang lain.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                        Kata Sandi Saat Ini (Sandi Lama){" "}
                        <span className="text-rose-500">*</span>
                    </label>
                    <input
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        placeholder="Masukkan kata sandi yang sedang Anda gunakan..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
                    />
                    {errors.current_password && (
                        <p className="text-rose-500 text-xs font-bold mt-2">
                            {errors.current_password}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Kata Sandi Baru{" "}
                            <span className="text-rose-500">*</span>
                        </label>
                        <input
                            ref={passwordInput}
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Minimal 8 karakter..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
                        />
                        {errors.password && (
                            <p className="text-rose-500 text-xs font-bold mt-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Ulangi Kata Sandi Baru{" "}
                            <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            placeholder="Ketik ulang kata sandi baru..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
                        />
                        {errors.password_confirmation && (
                            <p className="text-rose-500 text-xs font-bold mt-2">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-white text-sm font-black rounded-2xl shadow-lg transition disabled:opacity-50"
                    >
                        <CheckCircle2 size={18} />
                        {processing ? "Menyimpan..." : "Simpan Kata Sandi Baru"}
                    </button>
                </div>
            </form>
        </section>
    );
}
