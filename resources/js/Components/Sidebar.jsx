import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FolderLock,
    Users,
    KeyRound,
    BookOpen,
    ShieldCheck,
    Activity,
    UserCog,
    LogOut,
} from "lucide-react";

export default function Sidebar() {
    const { url } = usePage();

    const navItems = [
        {
            name: "Brankas Dokumen",
            href: "/dashboard",
            active: url === "/dashboard" || url.startsWith("/documents"),
            icon: FolderLock,
        },
        {
            name: "Ahli Waris & Alokasi",
            href: "/beneficiaries",
            active: url.startsWith("/beneficiaries"),
            icon: Users,
        },
        {
            name: "Kredensial & PIN",
            href: "/credentials",
            active: url.startsWith("/credentials"),
            icon: KeyRound,
        },
        {
            name: "Amanat & Wasiat",
            href: "/testaments",
            active: url.startsWith("/testaments"),
            icon: BookOpen,
        },
        {
            name: "Pusat Keamanan",
            href: "/security-center",
            active: url.startsWith("/security-center"),
            icon: ShieldCheck,
        },
        {
            name: "Riwayat Aktivitas",
            href: "/activity-logs",
            active: url.startsWith("/activity-logs"),
            icon: Activity,
        },
        {
            name: "Profil & Sandi",
            href: "/profile",
            active: url.startsWith("/profile"),
            icon: UserCog,
        },
    ];

    return (
        <aside className="w-64 bg-white/80 backdrop-blur-2xl border-r border-slate-200 flex flex-col h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-40">
            <div className="p-6 border-b border-slate-100 flex items-center justify-center h-20">
                <Link href="/dashboard">
                    <img
                        src="/images/logo-safedoc.png"
                        alt="SafeDoc"
                        className="h-10 w-auto hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-1.5 overflow-y-auto">
                <p className="px-4 text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 mt-2">
                    Menu Utama Vault
                </p>

                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${
                                item.active
                                    ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/30"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                        >
                            <Icon size={19} strokeWidth={2.5} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            <div className="p-6 border-t border-slate-100">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-sm rounded-2xl transition-all duration-200 shadow-sm"
                >
                    <LogOut size={18} strokeWidth={2.5} />
                    Kunci Brankas
                </Link>
            </div>
        </aside>
    );
}
