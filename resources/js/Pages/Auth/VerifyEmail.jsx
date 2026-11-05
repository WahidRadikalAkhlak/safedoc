import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "../../Layouts/GuestLayout";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm();

    const submit = (e) => {
        e.preventDefault();
        post("/email/verification-notification");
    };

    return (
        <GuestLayout>
            <Head title="Verifikasi Email" />

            <div className="mb-6 text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
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
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">
                    Cek Email Anda
                </h2>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Terima kasih telah mendaftar! Sebelum mulai, bisakah Anda
                    memverifikasi alamat email Anda dengan mengeklik tautan yang
                    baru saja kami kirimkan?
                </p>
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 font-medium text-sm text-green-600 text-center bg-green-50 p-3 rounded-xl border border-green-100">
                    Tautan verifikasi baru telah dikirim ke alamat email yang
                    Anda berikan saat pendaftaran.
                </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/30 transform transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                    {processing
                        ? "Mengirim ulang..."
                        : "Kirim Ulang Email Verifikasi"}
                </button>

                <div className="text-center pt-2">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="text-sm text-slate-500 hover:text-slate-700 underline transition"
                    >
                        Keluar Akun (Log Out)
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
