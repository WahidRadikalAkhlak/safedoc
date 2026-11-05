import React from "react";
import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "../../Layouts/GuestLayout";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/reset-password");
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-slate-800">
                    Buat Password Baru
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                    Pastikan Anda menggunakan kata sandi yang kuat.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 outline-none"
                        readOnly
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        className="block text-sm font-semibold text-slate-700 mb-1"
                        htmlFor="password"
                    >
                        Password Baru
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

                <div>
                    <label
                        className="block text-sm font-semibold text-slate-700 mb-1"
                        htmlFor="password_confirmation"
                    >
                        Konfirmasi Password Baru
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all outline-none"
                        required
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-bold rounded-xl shadow-lg shadow-sky-500/30 transform transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                    {processing ? "Menyimpan..." : "Simpan Password Baru"}
                </button>
            </form>
        </GuestLayout>
    );
}
