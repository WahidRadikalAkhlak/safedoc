import React from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "../../Layouts/GuestLayout";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/forgot-password");
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-slate-800">
                    Lupa Password?
                </h2>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Tidak masalah. Masukkan alamat email Anda dan kami akan
                    mengirimkan tautan untuk mengatur ulang kata sandi brankas
                    Anda.
                </p>
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600 text-center bg-green-50 p-3 rounded-xl border border-green-100">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label
                        className="block text-sm font-semibold text-slate-700 mb-1"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all outline-none"
                        autoFocus
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/30 transform transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                    {processing ? "Mengirim..." : "Kirim Tautan Reset"}
                </button>
            </form>
        </GuestLayout>
    );
}
