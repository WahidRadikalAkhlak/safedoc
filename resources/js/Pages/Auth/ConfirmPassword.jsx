import React from "react";
import { Head, useForm } from "@inertiajs/react";
import { ShieldCheck, KeyRound } from "lucide-react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/confirm-password", {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-4 sm:p-6">
            <Head title="Konfirmasi Keamanan Brankas" />

            <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden border border-white/80">
                <div className="p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white text-center space-y-2">
                    <ShieldCheck
                        size={32}
                        className="mx-auto text-emerald-400"
                    />
                    <h1 className="text-2xl font-black">
                        Konfirmasi Kata Sandi
                    </h1>
                    <p className="text-xs text-slate-300">
                        Ini adalah area rahasia brankas. Mohon masukkan kata
                        sandi Anda sebelum melanjutkan.
                    </p>
                </div>

                <form onSubmit={submit} className="p-8 space-y-5 bg-white">
                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Kata Sandi Utama
                        </label>
                        <div className="relative">
                            <KeyRound
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 focus:bg-white focus:border-sky-500 outline-none"
                                required
                                autoFocus
                            />
                        </div>
                        {errors.password && (
                            <p className="text-rose-500 text-xs font-bold mt-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-lg transition disabled:opacity-50"
                    >
                        {processing
                            ? "Memverifikasi..."
                            : "Konfirmasi & Lanjutkan"}
                    </button>
                </form>
            </div>
        </div>
    );
}
