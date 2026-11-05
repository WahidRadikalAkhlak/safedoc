import React, { useRef } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put("/password", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Password Vault berhasil diperbarui!");
                reset();
            },
            onError: (errors) => {
                toast.error("Gagal memperbarui password.");
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">
                    Keamanan Vault (Password)
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                    Pastikan akun brankas Anda menggunakan kata sandi panjang
                    dan acak agar tetap aman.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                        Password Saat Ini
                    </label>
                    <input
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                    />
                    {errors.current_password && (
                        <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                            {errors.current_password}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                            Password Baru
                        </label>
                        <input
                            ref={passwordInput}
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                        />
                        {errors.password && (
                            <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                            Konfirmasi Password Baru
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                        />
                        {errors.password_confirmation && (
                            <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-sm font-bold rounded-xl shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        {processing ? "Menyimpan..." : "Perbarui Password"}
                    </button>
                </div>
            </form>
        </section>
    );
}
