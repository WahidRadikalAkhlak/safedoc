import React from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import GuestLayout from "../../Layouts/GuestLayout";

export default function TwoFactorChallenge() {
    const { data, setData, post, processing, errors } = useForm({
        code: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/2fa/verify");
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi 2FA" />

            <div className="text-center mb-6">
                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                    Pemeriksaan Keamanan 2 Langkah
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                    Buka aplikasi Authenticator di ponsel Anda dan masukkan kode
                    6-digit.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <input
                        id="code"
                        type="text"
                        name="code"
                        value={data.code}
                        onChange={(e) => setData("code", e.target.value)}
                        className="block w-full text-center text-3xl tracking-[0.3em] font-mono font-bold py-3 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all outline-none"
                        maxLength="6"
                        autoFocus
                        required
                        placeholder="000000"
                    />
                    {errors.code && (
                        <p className="mt-2 text-center text-red-500 text-xs">
                            {errors.code}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3 bg-gradient-to-r from-[#0052CC] to-[#00A3FF] hover:brightness-110 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/25 transition disabled:opacity-50"
                >
                    {processing ? "Memverifikasi..." : "Konfirmasi Masuk"}
                </button>

                <div className="text-center pt-2">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        type="button"
                        className="text-xs text-slate-400 hover:text-slate-600 underline"
                    >
                        Batal & Keluar
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
