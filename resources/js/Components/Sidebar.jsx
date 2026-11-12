import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    FolderLock,
    Layers,
    Users,
    KeyRound,
    BookOpen,
    ShieldCheck,
    Activity,
    UserCog,
    LogOut,
    HelpCircle,
} from "lucide-react";

export default function Sidebar({ onOpenGuide }) {
    const { url } = usePage();

    const mainGroups = [
        {
            groupTitle: "Arsip & Harta Keluarga",
            items: [
                {
                    name: "Ringkasan Harta & Surat",
                    subtitle: "Total & Cetak Surat Induk",
                    href: "/estate-summary",
                    active: url.startsWith("/estate-summary"),
                    icon: Layers,
                },
                {
                    name: "Dokumen & Sertifikat",
                    subtitle: "Tanah, BPKB & Berkas",
                    href: "/dashboard",
                    active:
                        url === "/dashboard" || url.startsWith("/documents"),
                    icon: FolderLock,
                },
                {
                    name: "Keluarga & Ahli Waris",
                    subtitle: "Penerima Hak Waris",
                    href: "/beneficiaries",
                    active: url.startsWith("/beneficiaries"),
                    icon: Users,
                },
                {
                    name: "Rekening, Polis & PIN",
                    subtitle: "Bank, Asuransi & Kunci",
                    href: "/credentials",
                    active: url.startsWith("/credentials"),
                    icon: KeyRound,
                },
                {
                    name: "Surat Wasiat & Piutang",
                    subtitle: "Pesan, Tagihan & Utang",
                    href: "/testaments",
                    active: url.startsWith("/testaments"),
                    icon: BookOpen,
                },
            ],
        },
        {
            groupTitle: "Pengawasan & Pengaturan",
            items: [
                {
                    name: "Cek Keamanan Berkas",
                    subtitle: "Keaslian File & HP 2FA",
                    href: "/security-center",
                    active: url.startsWith("/security-center"),
                    icon: ShieldCheck,
                },
                {
                    name: "Catatan Riwayat Akses",
                    subtitle: "Siapa & Kapan Membuka",
                    href: "/activity-logs",
                    active: url.startsWith("/activity-logs"),
                    icon: Activity,
                },
                {
                    name: "Profil & Ganti Sandi",
                    subtitle: "Identitas Pemilik",
                    href: "/profile",
                    active: url.startsWith("/profile"),
                    icon: UserCog,
                },
            ],
        },
    ];

    return (
        <aside className="w-72 bg-white/90 backdrop-blur-2xl border-r border-slate-200/80 flex flex-col h-screen sticky top-0 shadow-[8px_0_30px_rgba(0,0,0,0.03)] z-40">
            {/* Logo Brankas */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between h-20">
                <Link
                    href="/estate-summary"
                    className="flex items-center gap-3"
                >
                    <img
                        src="/images/logo-safedoc.png"
                        alt="SafeDoc"
                        className="h-9 w-auto hover:scale-105 transition-transform duration-300"
                    />
                </Link>
                <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-100 text-[10px] font-black uppercase tracking-wider">
                    VIP Vault
                </span>
            </div>

            {/* Daftar Menu */}
            <div className="p-4 flex-1 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
                {mainGroups.map((group) => (
                    <div key={group.groupTitle} className="space-y-1.5">
                        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] mb-2">
                            {group.groupTitle}
                        </p>

                        {group.items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                                        item.active
                                            ? "bg-gradient-to-r from-slate-900 via-blue-950 to-sky-900 text-white shadow-lg shadow-slate-900/15"
                                            : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                                    }`}
                                >
                                    <div
                                        className={`p-2 rounded-xl transition ${
                                            item.active
                                                ? "bg-white/15 text-sky-300"
                                                : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-sky-600"
                                        }`}
                                    >
                                        <Icon size={18} strokeWidth={2.5} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="font-extrabold text-xs block truncate">
                                            {item.name}
                                        </span>
                                        <span
                                            className={`text-[10px] font-medium block truncate ${
                                                item.active
                                                    ? "text-slate-300"
                                                    : "text-slate-400"
                                            }`}
                                        >
                                            {item.subtitle}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Footer Bantuan & Kunci Brankas */}
            <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
                {onOpenGuide && (
                    <button
                        type="button"
                        onClick={onOpenGuide}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-extrabold text-xs rounded-xl border border-sky-200/60 transition"
                    >
                        <HelpCircle size={15} />
                        Petunjuk Pemakaian Halaman
                    </button>
                )}

                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-extrabold text-xs rounded-xl transition-all duration-200 shadow-sm"
                >
                    <LogOut size={16} strokeWidth={2.5} />
                    Kunci & Tutup Brankas
                </Link>
            </div>
        </aside>
    );
}
