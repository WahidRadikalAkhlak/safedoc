import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";
import { ShieldCheck, KeyRound, Activity } from "lucide-react";

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <AuthenticatedLayout>
            <Head title="Profil Pemilik & Ganti Kata Sandi" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Hero Banner Identitas Pemilik Brankas */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white p-8 rounded-[2.5rem] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 p-[2px] shadow-lg shrink-0">
                            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-2xl font-black text-sky-300">
                                {user?.name
                                    ? user.name.charAt(0).toUpperCase()
                                    : "U"}
                            </div>
                        </div>
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-black uppercase tracking-widest">
                                <ShieldCheck size={13} /> Pemilik Sah Brankas
                                Utama
                            </span>
                            <h2 className="font-black text-2xl sm:text-3xl text-white mt-1.5">
                                {user?.name}
                            </h2>
                            <p className="text-xs font-semibold text-slate-300 mt-0.5">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/security-center"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold border border-white/15 transition"
                        >
                            <KeyRound size={15} className="text-amber-300" />
                            Atur HP Google Authenticator
                        </Link>
                        <Link
                            href="/activity-logs"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-extrabold border border-white/15 transition"
                        >
                            <Activity size={15} className="text-sky-300" />
                            Lihat Riwayat Masuk
                        </Link>
                    </div>
                </div>

                {/* Form 1: Identitas Diri Pemilik Brankas */}
                <div className="p-7 sm:p-9 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                {/* Form 2: Ganti Kata Sandi Utama */}
                <div className="p-7 sm:p-9 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <UpdatePasswordForm />
                </div>

                {/* Form 3: Penutupan Akun Permanen */}
                <div className="p-7 sm:p-9 bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-rose-100">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
