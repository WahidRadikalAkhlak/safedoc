import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Lock, Mail, KeyRound, ShieldCheck, ArrowRight } from "lucide-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post("/login", {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            <Head title="Masuk Brankas Digital SafeDoc" />

            <div className="absolute top-0 left-1/3 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden border border-white/80 relative z-10">
                {/* Header Kartu Login */}
                <div className="p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white text-center space-y-3">
                    <Link
                        href="/"
                        className="inline-block bg-white px-4 py-2 rounded-2xl shadow-md"
                    >
                        <img
                            src="/images/logo-safedoc.png"
                            alt="SafeDoc"
                            className="h-9 w-auto"
                        />
                    </Link>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                            Pintu Keamanan Tahap 1
                        </span>
                        <h1 className="text-2xl font-black tracking-tight mt-1">
                            Buka Brankas Pribadi Anda
                        </h1>
                        <p className="text-xs font-medium text-slate-300 mt-1">
                            Masukkan alamat email dan kata sandi utama brankas
                            Anda.
                        </p>
                    </div>
                </div>

                {/* Form Login */}
                <form onSubmit={submit} className="p-8 space-y-5 bg-white">
                    {status && (
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                            {status}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Alamat Email Pemilik Brankas
                        </label>
                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition"
                                placeholder="nama@email.com"
                                required
                                autoFocus
                            />
                        </div>
                        {errors.email && (
                            <p className="text-rose-500 text-xs font-bold mt-2">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-extrabold text-slate-800">
                                Kata Sandi Utama
                            </label>
                            {canResetPassword && (
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-extrabold text-sky-600 hover:underline"
                                >
                                    Lupa Kata Sandi?
                                </Link>
                            )}
                        </div>
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
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition"
                                placeholder="••••••••••••"
                                required
                            />
                        </div>
                        {errors.password && (
                            <p className="text-rose-500 text-xs font-bold mt-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                            />
                            <span className="text-xs font-bold text-slate-600">
                                Ingat perangkat saya
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-[0_10px_25px_rgba(14,165,233,0.3)] transition disabled:opacity-50"
                    >
                        <Lock size={17} />
                        {processing
                            ? "Memeriksa Sandi..."
                            : "Lanjut ke Verifikasi OTP 2FA"}
                        <ArrowRight size={17} />
                    </button>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1.5 text-emerald-600">
                            <ShieldCheck size={15} /> Terlindungi AES-256
                        </span>
                        <Link
                            href="/register"
                            className="text-sky-600 hover:underline font-extrabold"
                        >
                            Belum punya brankas? Daftar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
