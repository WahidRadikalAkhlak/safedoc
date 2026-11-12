import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { MailCheck, Send, LogOut } from "lucide-react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post("/email/verification-notification");
    };

    return (
        <div className="min-h-screen bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-4 sm:p-6">
            <Head title="Verifikasi Alamat Email" />

            <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden border border-white/80">
                <div className="p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white text-center space-y-3">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-300 flex items-center justify-center">
                        <MailCheck size={28} />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight">
                        Verifikasi Email Pemilik Brankas
                    </h1>
                    <p className="text-xs font-medium text-slate-300 leading-relaxed">
                        Silakan klik tautan verifikasi yang baru saja kami
                        kirimkan ke kotak masuk email Anda.
                    </p>
                </div>

                <div className="p-8 space-y-5 bg-white">
                    {status === "verification-link-sent" && (
                        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                            Tautan verifikasi baru telah berhasil dikirim ke
                            alamat email Anda.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-lg transition disabled:opacity-50"
                        >
                            <Send size={16} />
                            {processing
                                ? "Mengirim Ulang..."
                                : "Kirim Ulang Email Verifikasi"}
                        </button>
                    </form>

                    <div className="pt-4 border-t border-slate-100 text-center">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-600 hover:underline"
                        >
                            <LogOut size={14} /> Keluar dari Sesi
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
