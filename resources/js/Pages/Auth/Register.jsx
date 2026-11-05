import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "../../Layouts/GuestLayout";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone_number: "",
        nik: "",
        address: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/register");
    };

    return (
        <GuestLayout>
            <Head title="Daftar Akun Brankas" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Pendaftaran Akun Brankas
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                    Lengkapi data verifikasi identitas Anda untuk perlindungan
                    dokumen maksimal.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label
                        className="block text-sm font-semibold text-slate-700 mb-1"
                        htmlFor="name"
                    >
                        Nama Lengkap (Sesuai KTP)
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="block w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all text-sm outline-none"
                        placeholder="cth: Ahmad Fauzi"
                        required
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            className="block text-sm font-semibold text-slate-700 mb-1"
                            htmlFor="email"
                        >
                            Alamat Email Aktif
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="block w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all text-sm outline-none"
                            placeholder="nama@email.com"
                            required
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
                            htmlFor="phone_number"
                        >
                            Nomor WhatsApp / HP
                        </label>
                        <input
                            id="phone_number"
                            type="text"
                            name="phone_number"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            className="block w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all text-sm outline-none"
                            placeholder="081234567890"
                            required
                        />
                        {errors.phone_number && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.phone_number}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            className="block text-sm font-semibold text-slate-700 mb-1"
                            htmlFor="nik"
                        >
                            Nomor Induk Kependudukan (NIK)
                        </label>
                        <input
                            id="nik"
                            type="text"
                            name="nik"
                            value={data.nik}
                            onChange={(e) => setData("nik", e.target.value)}
                            className="block w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all text-sm outline-none"
                            maxLength="16"
                            placeholder="16 digit NIK resmi"
                            required
                        />
                        {errors.nik && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.nik}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            className="block text-sm font-semibold text-slate-700 mb-1"
                            htmlFor="address"
                        >
                            Alamat Domisili Sesuai KTP
                        </label>
                        <input
                            id="address"
                            type="text"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="block w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all text-sm outline-none"
                            placeholder="Kota, Provinsi"
                            required
                        />
                        {errors.address && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.address}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            className="block text-sm font-semibold text-slate-700 mb-1"
                            htmlFor="password"
                        >
                            Password Vault
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="block w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all text-sm outline-none"
                            placeholder="Min. 8 karakter"
                            required
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
                            Ulangi Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="block w-full px-4 py-2.5 rounded-xl bg-white/50 border border-slate-200 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all text-sm outline-none"
                            required
                        />
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                    <Link
                        href="/login"
                        className="text-xs text-sky-600 hover:text-sky-800 font-medium underline"
                    >
                        Sudah punya akun? Masuk
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#0052CC] to-[#00A3FF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md shadow-sky-500/25 transition disabled:opacity-50"
                    >
                        {processing ? "Memproses..." : "Daftar & Pasang 2FA →"}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
