import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { ShieldCheck, Smartphone, Lock, LogOut } from "lucide-react";

export default function TwoFactorChallenge() {
    const { data, setData, post, processing, errors } = useForm({
        code: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/2fa/verify");
    };

    return (
        <div className="min-h-screen bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            <Head title="Verifikasi Kode OTP HP (2FA)" />

            <div className="absolute top-0 right-1/3 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden border border-white/80 relative z-10">
                {/* Header */}
                <div className="p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white text-center space-y-3">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-300 flex items-center justify-center">
                        <Smartphone size={28} strokeWidth={2.5} />
                    </div>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                            Pintu Keamanan Tahap 2 (Wajib)
                        </span>
                        <h1 className="text-2xl font-black tracking-tight mt-1">
                            Masukkan 6 Angka Kode OTP
                        </h1>
                        <p className="text-xs font-medium text-slate-300 mt-1">
                            Buka aplikasi <strong>Google Authenticator</strong>{" "}
                            di HP Anda, lalu ketik 6 angka yang tampil saat ini.
                        </p>
                    </div>
                </div>

                {/* Form OTP */}
                <form onSubmit={submit} className="p-8 space-y-6 bg-white">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 text-center mb-3">
                            6 Digit Kode Rahasia dari HP Anda
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength="6"
                            value={data.code}
                            onChange={(e) =>
                                setData(
                                    "code",
                                    e.target.value.replace(/\D/g, ""),
                                )
                            }
                            placeholder="000000"
                            className="w-full text-center text-3xl tracking-[0.5em] font-mono font-black py-4 px-6 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-900 focus:bg-white focus:ring-4 focus:ring-sky-500/15 focus:border-sky-500 outline-none transition"
                            autoFocus
                            required
                        />
                        {errors.code && (
                            <p className="text-rose-600 text-xs font-extrabold text-center mt-3">
                                {errors.code}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing || data.code.length !== 6}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-[0_10px_25px_rgba(14,165,233,0.3)] transition disabled:opacity-50"
                    >
                        <Lock size={17} />
                        {processing
                            ? "Memverifikasi Kode..."
                            : "Buka Kunci Brankas Sekarang"}
                    </button>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                        <span className="flex items-center gap-1.5 text-emerald-600">
                            <ShieldCheck size={15} /> Proteksi Anti-Pembobolan
                            Aktif
                        </span>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="inline-flex items-center gap-1 text-rose-600 hover:underline font-extrabold"
                        >
                            <LogOut size={13} /> Batalkan & Keluar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
