import React from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "../../Layouts/GuestLayout";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/confirm-password");
    };

    return (
        <GuestLayout>
            <Head title="Konfirmasi Password" />

            <div className="mb-6 text-center">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
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
                <h2 className="text-xl font-bold text-slate-800">
                    Area Terproteksi
                </h2>
                <p className="text-sm text-slate-500 mt-2">
                    Ini adalah area aman pada aplikasi. Harap konfirmasi
                    password Anda sebelum melanjutkan.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label
                        className="block text-sm font-semibold text-slate-700 mb-1"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all outline-none"
                        required
                        autoFocus
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3.5 px-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                    {processing ? "Memeriksa..." : "Konfirmasi"}
                </button>
            </form>
        </GuestLayout>
    );
}
