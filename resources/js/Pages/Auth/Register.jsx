import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    UserPlus,
    Mail,
    KeyRound,
    User,
    Phone,
    CreditCard,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone_number: "",
        nik: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/register", {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 font-['Plus_Jakarta_Sans',sans-serif] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            <Head title="Buat Brankas Digital Baru" />

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.55)] overflow-hidden border border-white/80 relative z-10">
                {/* Header */}
                <div className="p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white text-center space-y-2.5">
                    <Link
                        href="/"
                        className="inline-block bg-white px-4 py-2 rounded-2xl shadow-md"
                    >
                        <img
                            src="/images/logo-safedoc.png"
                            alt="SafeDoc"
                            className="h-8 w-auto"
                        />
                    </Link>
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                            Registrasi Kepemilikan Brankas
                        </span>
                        <h1 className="text-2xl font-black tracking-tight mt-1">
                            Daftarkan Brankas Pribadi & Keluarga
                        </h1>
                        <p className="text-xs font-medium text-slate-300 mt-1">
                            Lengkapi identitas Anda untuk mengaktifkan lemari
                            enkripsi AES-256 dan pengaman 2FA.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="p-6 sm:p-8 space-y-5 bg-white"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                Nama Lengkap Sesuai KTP{" "}
                                <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition"
                                    placeholder="Nama Lengkap Anda"
                                    required
                                    autoFocus
                                />
                            </div>
                            {errors.name && (
                                <p className="text-rose-500 text-xs font-bold mt-1.5">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                Alamat Email Aktif{" "}
                                <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition"
                                    placeholder="nama@email.com"
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-rose-500 text-xs font-bold mt-1.5">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                Nomor KTP / NIK (Opsional)
                            </label>
                            <div className="relative">
                                <CreditCard
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="text"
                                    value={data.nik}
                                    onChange={(e) =>
                                        setData("nik", e.target.value)
                                    }
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-mono font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition"
                                    placeholder="16 Angka NIK"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                Nomor HP / WhatsApp
                            </label>
                            <div className="relative">
                                <Phone
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="text"
                                    value={data.phone_number}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition"
                                    placeholder="0812-xxxx-xxxx"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                Buat Kata Sandi Utama{" "}
                                <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <KeyRound
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition"
                                    placeholder="Minimal 8 karakter"
                                    required
                                />
                            </div>
                            {errors.password && (
                                <p className="text-rose-500 text-xs font-bold mt-1.5">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                Ulangi Kata Sandi Utama{" "}
                                <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <KeyRound
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition"
                                    placeholder="Ketik ulang kata sandi"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-[0_10px_25px_rgba(14,165,233,0.3)] transition disabled:opacity-50"
                    >
                        <UserPlus size={18} />
                        {processing
                            ? "Menyiapkan Brankas..."
                            : "Aktifkan Brankas Digital Saya"}
                        <ArrowRight size={17} />
                    </button>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1.5 text-emerald-600">
                            <ShieldCheck size={15} /> Kunci Enkripsi Otomatis
                        </span>
                        <Link
                            href="/login"
                            className="text-sky-600 hover:underline font-extrabold"
                        >
                            Sudah punya akun? Masuk di sini
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
