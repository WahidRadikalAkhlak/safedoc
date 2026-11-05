import React from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "../../Layouts/GuestLayout";

export default function TwoFactorSetup({ qrCodeSvg, secret }) {
    const { data, setData, post, processing, errors } = useForm({
        code: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/2fa/enable");
    };

    return (
        <GuestLayout>
            <Head title="Aktifkan Dua Faktor (2FA)" />

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
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                    Aktifkan Dua Faktor (2FA)
                </h2>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Scan barcode ini menggunakan aplikasi{" "}
                    <strong>Google/Microsoft Authenticator</strong> di HP Anda.
                </p>
            </div>

            <div className="flex justify-center p-4 bg-white/50 border border-slate-200 rounded-2xl mb-4 shadow-inner">
                {/* Asumsi qrCodeSvg dikirim sebagai base64 dari backend seperti format Wahid */}
                <img
                    src={`data:image/svg+xml;base64,${qrCodeSvg}`}
                    alt="2FA QR Code"
                    className="w-48 h-48"
                />
            </div>

            <div className="text-center mb-6">
                <p className="text-[11px] text-slate-500 mb-2">
                    Atau masukkan kode kunci rahasia secara manual:
                </p>
                <code className="text-xs font-mono font-bold text-slate-800 bg-white/80 border border-slate-200 px-4 py-2 rounded-lg select-all shadow-sm">
                    {secret}
                </code>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label
                        className="block text-sm font-semibold text-slate-700 mb-2 text-center"
                        htmlFor="code"
                    >
                        Masukkan 6 Digit Angka
                    </label>
                    <input
                        id="code"
                        type="text"
                        name="code"
                        value={data.code}
                        onChange={(e) => setData("code", e.target.value)}
                        className="block w-full text-center text-2xl tracking-[0.3em] font-mono font-bold py-3 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all outline-none"
                        maxLength="6"
                        autoFocus
                        required
                        placeholder="000000"
                    />
                    {errors.code && (
                        <p className="text-red-500 text-xs mt-2 text-center">
                            {errors.code}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/30 transform transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing
                        ? "Memproses..."
                        : "Verifikasi & Masuk ke Brankas"}
                </button>
            </form>
        </GuestLayout>
    );
}
