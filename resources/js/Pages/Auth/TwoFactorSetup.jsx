import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { QrCode, Smartphone, CheckCircle2, LogOut } from "lucide-react";

export default function TwoFactorSetup({ qrCodeSvg, secret }) {
    const { data, setData, post, processing, errors } = useForm({
        code: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/2fa/enable");
    };

    return (
        <div className="min-h-screen bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            <Head title="Hubungkan HP Pengaman (Google Authenticator)" />

            <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden border border-white/80 relative z-10">
                {/* Header */}
                <div className="p-7 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl">
                            <QrCode size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                                Pengamanan Wajib Brankas Digital
                            </span>
                            <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                                Hubungkan HP Anda dengan Brankas
                            </h1>
                        </div>
                    </div>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition text-xs font-bold flex items-center gap-1"
                    >
                        <LogOut size={16} /> Keluar
                    </Link>
                </div>

                {/* Body Langkah Mudah Scan QR */}
                <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
                            <img
                                src={`data:image/svg+xml;base64,${qrCodeSvg}`}
                                alt="QR Code 2FA"
                                className="w-48 h-48 object-contain rounded-xl bg-white p-2 shadow-sm"
                            />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-3">
                                Kode Manual:{" "}
                                <strong className="text-slate-700 font-mono">
                                    {secret}
                                </strong>
                            </span>
                        </div>

                        <div className="space-y-3 text-xs font-medium text-slate-600 leading-relaxed">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-50 text-sky-700 font-black uppercase tracking-wider text-[10px]">
                                <Smartphone size={13} /> Cara Menghubungkan HP:
                            </div>
                            <p>
                                <strong>1.</strong> Unduh aplikasi{" "}
                                <strong>Google Authenticator</strong> di Play
                                Store (Android) atau App Store (iPhone).
                            </p>
                            <p>
                                <strong>2.</strong> Buka aplikasinya, tekan
                                tombol <strong>"+" (Tambah)</strong> lalu pilih{" "}
                                <strong>"Pindai Kode QR"</strong>.
                            </p>
                            <p>
                                <strong>3.</strong> Arahkan kamera HP Anda ke
                                kotak Barcode di samping, lalu masukkan 6 angka
                                yang muncul pada kolom di bawah ini.
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={submit}
                        className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4"
                    >
                        <label className="block text-sm font-extrabold text-slate-800 text-center">
                            Ketik 6 Angka dari Aplikasi Google Authenticator
                            Anda:
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
                            className="w-full text-center text-2xl tracking-[0.5em] font-mono font-black py-3.5 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:bg-white focus:ring-4 focus:ring-sky-500/15 focus:border-sky-500 outline-none transition"
                            required
                        />
                        {errors.code && (
                            <p className="text-rose-600 text-xs font-extrabold text-center">
                                {errors.code}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={processing || data.code.length !== 6}
                            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-lg transition disabled:opacity-50"
                        >
                            <CheckCircle2 size={18} />
                            {processing
                                ? "Mengaktifkan Pengaman..."
                                : "Aktifkan Pengaman & Buka Brankas"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
