import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, KeyRound, ArrowLeft, Send } from "lucide-react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/forgot-password");
    };

    return (
        <div className="min-h-screen bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            <Head title="Pemulihan Kata Sandi Brankas" />

            <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden border border-white/80 relative z-10">
                <div className="p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white text-center space-y-3">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-300 flex items-center justify-center">
                        <KeyRound size={26} strokeWidth={2.5} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                            Bantuan Akses Pemilik
                        </span>
                        <h1 className="text-2xl font-black tracking-tight mt-1">
                            Lupa Kata Sandi Brankas?
                        </h1>
                        <p className="text-xs font-medium text-slate-300 mt-1 leading-relaxed">
                            Masukkan alamat email yang terdaftar. Kami akan
                            mengirimkan tautan resmi untuk membuat kata sandi
                            baru.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="p-8 space-y-5 bg-white">
                    {status && (
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                            {status}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Alamat Email Terdaftar
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
                                placeholder="Ketik email Anda..."
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

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-lg transition disabled:opacity-50"
                    >
                        <Send size={16} />
                        {processing
                            ? "Mengirim Tautan..."
                            : "Kirim Tautan Pemulihan Sandi"}
                    </button>

                    <div className="pt-4 border-t border-slate-100 text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-600 hover:text-sky-600"
                        >
                            <ArrowLeft size={14} /> Kembali ke Halaman Masuk
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
