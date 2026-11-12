import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { UserCog, CheckCircle2 } from "lucide-react";

export default function UpdateProfileInformationForm({ className = "" }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        nik: user.nik || "",
    });

    const submit = (e) => {
        e.preventDefault();
        patch("/profile", {
            preserveScroll: true,
            onSuccess: () =>
                toast.success("Data profil pemilik brankas berhasil disimpan!"),
            onError: () =>
                toast.error("Gagal menyimpan profil. Periksa isian Anda."),
        });
    };

    return (
        <section className={className}>
            <header className="flex items-start gap-4 pb-6 border-b border-slate-100">
                <div className="p-3.5 rounded-2xl bg-sky-50 text-sky-600 shrink-0">
                    <UserCog size={24} strokeWidth={2.5} />
                </div>
                <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                        1. Identitas Diri Pemilik Brankas
                    </h2>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                        Nama dan email ini akan tercantum secara otomatis
                        sebagai pemilik sah pada saat Anda mencetak{" "}
                        <strong>Surat Induk Warisan</strong>.
                    </p>
                </div>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Nama Lengkap Pemilik (Sesuai KTP){" "}
                            <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                            required
                        />
                        {errors.name && (
                            <p className="text-rose-500 text-xs font-bold mt-2">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Alamat Email Resmi{" "}
                            <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                            required
                        />
                        {errors.email && (
                            <p className="text-rose-500 text-xs font-bold mt-2">
                                {errors.email}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Nomor Telepon / WhatsApp Pribadi
                        </label>
                        <input
                            type="text"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            placeholder="Contoh: 0811-xxxx-xxxx"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Nomor KTP / NIK Pemilik
                        </label>
                        <input
                            type="text"
                            value={data.nik}
                            onChange={(e) => setData("nik", e.target.value)}
                            placeholder="16 Angka NIK KTP"
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-mono font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 text-white text-sm font-black rounded-2xl shadow-lg transition disabled:opacity-50"
                    >
                        <CheckCircle2 size={18} />
                        {processing
                            ? "Menyimpan..."
                            : "Simpan Perubahan Identitas"}
                    </button>
                </div>
            </form>
        </section>
    );
}
