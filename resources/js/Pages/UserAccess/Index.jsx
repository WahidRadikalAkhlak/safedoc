import React, { useState } from "react";
import { Head, router, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import AddModal from "./Modals/AddModal";
import EditModal from "./Modals/EditModal";
import DeleteModal from "./Modals/DeleteModal";
import {
    UserPlus,
    Search,
    Edit3,
    Trash2,
    ShieldCheck,
    ShieldAlert,
    Users,
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function Index({ users, filters, stats }) {
    const { auth, errors } = usePage().props;
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState(filters.search || "");

    // Tangkap error jika hapus akun sendiri
    React.useEffect(() => {
        if (errors?.error) toast.error(errors.error);
    }, [errors]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/user-access",
            { search: searchQuery },
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Akses Akun" />

            <AddModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
            <EditModal
                isOpen={!!userToEdit}
                onClose={() => setUserToEdit(null)}
                user={userToEdit}
            />
            <DeleteModal
                isOpen={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                user={userToDelete}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                {/* Header Halaman */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-7 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                    <div>
                        <h2 className="font-extrabold text-2xl text-slate-900 leading-tight">
                            Manajemen Akses Akun (Backdoor)
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">
                            Karena registrasi publik ditutup, hanya Anda yang
                            dapat memberikan akses masuk brankas kepada orang
                            lain.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl font-bold text-sm text-white shadow-[0_8px_16px_rgba(14,165,233,0.25)] hover:brightness-110 transition shrink-0"
                    >
                        <UserPlus size={18} strokeWidth={2.5} />
                        Buka Akses Baru
                    </button>
                </div>

                {/* 2 Kartu Statistik */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Total Pengguna Sistem
                            </span>
                            <h4 className="text-3xl font-black text-slate-800 mt-2">
                                {stats.totalUsers}{" "}
                                <span className="text-sm font-bold text-slate-400">
                                    Orang
                                </span>
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-sky-50 text-sky-600">
                            <Users size={28} strokeWidth={2.5} />
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                Status Keamanan 2FA
                            </span>
                            <h4 className="text-2xl font-black text-emerald-600 mt-2">
                                {stats.total2FAEnabled} Akun Terproteksi
                            </h4>
                        </div>
                        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
                            <ShieldCheck size={28} strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* Bar Pencarian */}
                <div className="bg-white p-4 sm:p-5 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">
                        Daftar Pihak yang Memiliki Kredensial Login
                    </span>
                    <form
                        onSubmit={handleSearch}
                        className="relative w-full sm:w-80"
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama atau email..."
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none transition"
                        />
                        <Search
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                    </form>
                </div>

                {/* Tabel User */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                    <th className="py-5 px-6">
                                        Identitas Pengguna
                                    </th>
                                    <th className="py-5 px-6">
                                        Alamat Email Login
                                    </th>
                                    <th className="py-5 px-6 text-center">
                                        Status Pengaman 2FA
                                    </th>
                                    <th className="py-5 px-6 text-right">
                                        Tindakan
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm font-semibold">
                                {users.data.map((user) => {
                                    const isMe = user.id === auth.user.id;
                                    return (
                                        <tr
                                            key={user.id}
                                            className={`hover:bg-slate-50/80 transition ${isMe ? "bg-sky-50/30" : ""}`}
                                        >
                                            <td className="py-4 px-6">
                                                <span className="font-extrabold text-slate-900 block text-base flex items-center gap-2">
                                                    {user.name}
                                                    {isMe && (
                                                        <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-sky-100 text-sky-700 border border-sky-200">
                                                            Anda
                                                        </span>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-slate-500 font-medium">
                                                {user.email}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                {user.google2fa_enabled ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold uppercase tracking-wider">
                                                        <ShieldCheck
                                                            size={14}
                                                        />{" "}
                                                        Aktif Terhubung
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-extrabold uppercase tracking-wider">
                                                        <ShieldAlert
                                                            size={14}
                                                        />{" "}
                                                        Belum Setup Barcode
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2">
                                                <button
                                                    onClick={() =>
                                                        setUserToEdit(user)
                                                    }
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 text-xs font-extrabold transition"
                                                >
                                                    <Edit3 size={14} /> Edit
                                                    Sandi
                                                </button>
                                                {!isMe && (
                                                    <button
                                                        onClick={() =>
                                                            setUserToDelete(
                                                                user,
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-extrabold transition"
                                                    >
                                                        <Trash2 size={14} />{" "}
                                                        Cabut Akses
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users.links && users.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-1.5 bg-slate-50/40">
                            {users.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || "#"}
                                    preserveScroll
                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                                        link.active
                                            ? "bg-sky-600 text-white shadow-sm"
                                            : link.url
                                              ? "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                              : "text-slate-300 pointer-events-none"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
