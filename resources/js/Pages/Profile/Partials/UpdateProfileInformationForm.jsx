import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
        // Tambahan field khusus sesuai sistem Brankas SafeDoc
        phone_number: user.phone_number || "",
        nik: user.nik || "",
        address: user.address || "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch("/profile", {
            preserveScroll: true,
            onSuccess: () =>
                toast.success("Informasi profil berhasil diperbarui!"),
            onError: () =>
                toast.error("Gagal memperbarui profil. Periksa form."),
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-black text-slate-800 tracking-tight">
                    Informasi Profil
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                    Perbarui informasi akun dan alamat email Anda. Pastikan data
                    sesuai KTP.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                        required
                    />
                    {errors.name && (
                        <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                            Email Aktif
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                            required
                        />
                        {errors.email && (
                            <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                            Nomor HP/WA
                        </label>
                        <input
                            type="text"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                        />
                        {errors.phone_number && (
                            <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                {errors.phone_number}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold rounded-xl shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        {processing ? "Menyimpan..." : "Simpan Profil"}
                    </button>
                </div>
            </form>
        </section>
    );
}
