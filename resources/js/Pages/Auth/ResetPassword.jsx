import React from "react";
import { Head, useForm } from "@inertiajs/react";
import { KeyRound, Mail, CheckCircle2 } from "lucide-react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email || "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/reset-password", {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            <Head title="Atur Ulang Kata Sandi Brankas" />

            <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden border border-white/80 relative z-10">
                <div className="p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white text-center space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                        Pembaruan Kredensial
                    </span>
                    <h1 className="text-2xl font-black tracking-tight">
                        Buat Kata Sandi Baru
                    </h1>
                </div>

                <form onSubmit={submit} className="p-8 space-y-5 bg-white">
                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Alamat Email
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
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none"
                                required
                            />
                        </div>
                        {errors.email && (
                            <p className="text-rose-500 text-xs font-bold mt-2">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Kata Sandi Baru
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
                                placeholder="Minimal 8 karakter"
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

                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Ulangi Kata Sandi Baru
                        </label>
                        <div className="relative">
                            <KeyRound
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 focus:bg-white focus:border-sky-500 outline-none"
                                placeholder="Ketik ulang kata sandi"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-lg transition disabled:opacity-50"
                    >
                        <CheckCircle2 size={18} />
                        {processing ? "Menyimpan..." : "Simpan Kata Sandi Baru"}
                    </button>
                </form>
            </div>
        </div>
    );
}
