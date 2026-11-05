import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import DeleteUserForm from "./Partials/DeleteUserForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Profil & Keamanan" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
                {/* Header Profil */}
                <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                        Pengaturan Profil & Keamanan
                    </h2>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                        Kelola identitas, kata sandi, dan visibilitas brankas
                        Anda.
                    </p>
                </div>

                {/* Form Update Info */}
                <div className="p-6 md:p-8 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="relative z-10"
                    />
                </div>

                {/* Form Update Password */}
                <div className="p-6 md:p-8 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <UpdatePasswordForm className="relative z-10" />
                </div>

                {/* Form Hapus Akun */}
                <div className="p-6 md:p-8 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-rose-50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <DeleteUserForm className="relative z-10" />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
