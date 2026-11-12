import React, { useState, useEffect, useRef } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import axios from "axios";
import {
    Bell,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Info,
    ShieldCheck,
    UserCog,
    LogOut,
    Menu,
    Lock,
    HelpCircle,
} from "lucide-react";

export default function Header({ sidebarOpen, setSidebarOpen, onOpenGuide }) {
    const { auth } = usePage().props;
    const authUser = auth.user;

    const [profileOpen, setProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const dropdownRef = useRef(null);
    const notifRef = useRef(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get("/vault-notifications");
            setNotifications(res.data.notifications || []);
        } catch (err) {
            console.error("Gagal memuat notifikasi brankas", err);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getNotifIcon = (type) => {
        switch (type) {
            case "success":
                return (
                    <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
                );
            case "danger":
                return <XCircle className="text-rose-500 w-5 h-5 shrink-0" />;
            case "warning":
                return (
                    <AlertTriangle className="text-amber-500 w-5 h-5 shrink-0" />
                );
            default:
                return <Info className="text-sky-500 w-5 h-5 shrink-0" />;
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post("/logout");
    };

    const initial = authUser?.name
        ? authUser.name.charAt(0).toUpperCase()
        : "U";

    return (
        <>
            <style>{`
                @keyframes lintas-elegan {
                    0% { transform: translateX(110vw); }
                    100% { transform: translateX(-30vw); }
                }
                @keyframes wave-navy {
                    0%, 100% { transform: translateY(0px); opacity: 0.7; }
                    50% { transform: translateY(-8px); opacity: 0.3; }
                }
            `}</style>

            <header className="sticky top-0 z-30 flex justify-between items-center py-3 px-4 sm:px-8 bg-white/70 backdrop-blur-2xl border-b border-white/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] h-20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent"></div>

                {/* Animasi Komet */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 hidden md:block">
                    <div className="absolute top-1/2 -translate-y-1/2 w-full animate-[lintas-elegan_30s_linear_infinite]">
                        <div className="relative flex items-center w-full max-w-[500px] opacity-60">
                            <div className="absolute left-0 w-full animate-[wave-navy_8s_ease-in-out_infinite]">
                                <div className="flex items-center">
                                    <div className="relative w-1.5 h-1.5 bg-blue-100 rounded-full z-10 shadow-[0_0_10px_2px_#0284c7]"></div>
                                    <div className="h-[1.5px] w-[150px] bg-gradient-to-r from-[#0284c7] via-[#38bdf8]/20 to-transparent -ml-1 rounded-r-full blur-[0.5px]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KIRI: Tombol Toggle Mobile & Branding */}
                <div className="flex items-center gap-x-4 relative z-10">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden relative p-2.5 rounded-2xl text-slate-600 bg-white/90 backdrop-blur-sm border border-slate-200/80 hover:bg-sky-50 hover:text-sky-600 transition-all shadow-sm focus:outline-none"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="hidden md:flex items-center gap-3">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-4 h-4 bg-emerald-400 rounded-full blur-md opacity-60 animate-pulse"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative z-10 shadow-[0_0_8px_rgba(16,185,129,1)] border border-white"></div>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[13px] font-black tracking-[0.15em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-sky-700 leading-tight">
                                SafeDoc Vault
                            </p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                                Brankas Digital & Arsip Warisan
                            </p>
                        </div>
                    </div>
                </div>

                {/* KANAN: Tombol Panduan, Status Keamanan, Lonceng & Profil */}
                <div className="flex items-center gap-x-2.5 sm:gap-x-4 relative z-10">
                    <button
                        onClick={onOpenGuide}
                        className="inline-flex items-center gap-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 px-3.5 py-2 rounded-xl border border-sky-200/80 shadow-sm transition text-xs font-extrabold"
                        title="Buka Panduan & Cara Input Halaman Ini"
                    >
                        <HelpCircle size={15} className="text-sky-600" />
                        <span className="hidden sm:inline">Panduan Modul</span>
                    </button>

                    <Link
                        href="/security-center"
                        className="hidden lg:flex items-center gap-1.5 bg-emerald-50/90 hover:bg-emerald-100/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-emerald-100 shadow-sm transition"
                    >
                        <Lock size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                            AES-256 + 2FA
                        </span>
                    </Link>

                    {/* Lonceng Notifikasi */}
                    <div
                        className="relative flex items-center justify-center"
                        ref={notifRef}
                    >
                        <button
                            onClick={() => {
                                setIsNotifOpen(!isNotifOpen);
                                setProfileOpen(false);
                                if (!isNotifOpen) fetchNotifications();
                            }}
                            className={`relative p-2.5 rounded-2xl transition-all border shadow-sm ${
                                isNotifOpen
                                    ? "bg-sky-50 text-sky-600 border-sky-200"
                                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-sky-600"
                            }`}
                        >
                            <Bell size={20} />
                            {notifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-sky-500 rounded-full border-2 border-white"></span>
                            )}
                        </button>

                        {isNotifOpen && (
                            <div className="absolute right-0 top-14 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-white overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-sky-600">
                                            <Bell size={16} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 tracking-tight">
                                                Log Aktivitas Terbaru
                                            </h3>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                Pantauan Real-Time
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/activity-logs"
                                        onClick={() => setIsNotifOpen(false)}
                                        className="text-[11px] font-extrabold text-sky-600 hover:underline"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>

                                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100/80 p-2">
                                    {notifications.length === 0 ? (
                                        <div className="py-10 flex flex-col items-center justify-center text-center px-6">
                                            <Bell
                                                size={24}
                                                className="text-slate-300 mb-2"
                                            />
                                            <p className="text-xs font-bold text-slate-600">
                                                Belum Ada Aktivitas
                                            </p>
                                        </div>
                                    ) : (
                                        notifications.map((item) => (
                                            <Link
                                                key={item.id}
                                                href="/activity-logs"
                                                onClick={() =>
                                                    setIsNotifOpen(false)
                                                }
                                                className="p-3 rounded-2xl hover:bg-slate-50 transition flex items-start gap-3"
                                            >
                                                <div className="p-2 bg-white rounded-xl border border-slate-100 shadow-sm mt-0.5">
                                                    {getNotifIcon(item.type)}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[11px] font-black text-slate-800 tracking-wider">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs font-medium text-slate-500 truncate mt-0.5">
                                                        {item.message}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-slate-400 mt-1">
                                                        {new Date(
                                                            item.created_at,
                                                        ).toLocaleString(
                                                            "id-ID",
                                                            {
                                                                day: "2-digit",
                                                                month: "short",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            },
                                                        )}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profil Dropdown */}
                    <div className="relative ml-1" ref={dropdownRef}>
                        <button
                            onClick={() => {
                                setProfileOpen(!profileOpen);
                                setIsNotifOpen(false);
                            }}
                            className="relative flex items-center hover:scale-105 transition-transform group outline-none"
                        >
                            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 p-[2px] shadow-sm">
                                <div className="h-full w-full bg-white rounded-[14px] flex items-center justify-center text-sky-600 font-black shadow-inner">
                                    {initial}
                                </div>
                            </div>
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 top-14 mt-2 w-64 bg-white/95 backdrop-blur-3xl rounded-[2rem] shadow-2xl overflow-hidden z-50 border border-white animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-sky-50/30 relative">
                                    <p className="text-sm font-black text-slate-900 truncate tracking-tight">
                                        {authUser?.name}
                                    </p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 truncate mt-1">
                                        {authUser?.email}
                                    </p>
                                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border bg-white text-sky-700 border-sky-100">
                                        <ShieldCheck
                                            size={14}
                                            className="text-emerald-500"
                                        />{" "}
                                        Pemilik Brankas
                                    </div>
                                </div>

                                <div className="p-3 space-y-1 bg-white/50">
                                    <Link
                                        href="/profile"
                                        onClick={() => setProfileOpen(false)}
                                        className="w-full flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-slate-50 text-slate-600 group font-black text-xs uppercase tracking-wider"
                                    >
                                        <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-sky-100 text-slate-500 group-hover:text-sky-600 transition-colors">
                                            <UserCog size={16} />
                                        </div>
                                        <span>Pengaturan Akun</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-rose-50 text-rose-600 group font-black text-xs uppercase tracking-wider outline-none"
                                    >
                                        <div className="p-1.5 rounded-lg bg-rose-100/50 group-hover:bg-rose-500 text-rose-500 group-hover:text-white transition-colors">
                                            <LogOut size={16} />
                                        </div>
                                        <span>Kunci Brankas</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}
