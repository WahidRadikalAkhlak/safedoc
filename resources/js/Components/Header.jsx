import React, { useState, useEffect, useRef } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
    Bell,
    Check,
    ShieldCheck,
    UserCog,
    LogOut,
    Menu,
    Lock,
} from "lucide-react";

export default function Header({ sidebarOpen, setSidebarOpen }) {
    const { auth } = usePage().props;
    const authUser = auth.user;

    const [profileOpen, setProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notifRef = useRef(null);

    // Placeholder untuk UI Notifikasi
    const unreadCount = 0;
    const notifications = [];

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
                @keyframes wave-emas {
                    0%, 100% { transform: translateY(0px); opacity: 0.3; }
                    50% { transform: translateY(8px); opacity: 0.7; }
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
                                Brankas Digital Pribadi
                            </p>
                        </div>
                    </div>
                </div>

                {/* KANAN: Notifikasi & Profil Dropdown */}
                <div className="flex items-center gap-x-3 sm:gap-x-5 relative z-10">
                    {/* Badge Keamanan */}
                    <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50/90 backdrop-blur-md px-4 py-2 rounded-xl border border-emerald-100 shadow-sm">
                        <Lock size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">
                            AES-256 Secured
                        </span>
                    </div>

                    {/* Lonceng Notifikasi */}
                    <div
                        className="relative flex items-center justify-center"
                        ref={notifRef}
                    >
                        <button
                            onClick={() => {
                                setIsNotifOpen(!isNotifOpen);
                                setProfileOpen(false);
                            }}
                            className={`relative p-2.5 rounded-2xl transition-all border shadow-sm ${isNotifOpen ? "bg-sky-50 text-sky-600 border-sky-200" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-sky-600"}`}
                        >
                            <Bell size={20} />
                        </button>

                        {isNotifOpen && (
                            <div className="absolute right-0 top-14 mt-2 w-72 sm:w-80 bg-white/95 backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-white overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-sky-600">
                                        <Bell size={16} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900 tracking-tight">
                                            Aktivitas Brankas
                                        </h3>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            0 Pesan Baru
                                        </p>
                                    </div>
                                </div>
                                <div className="py-12 flex flex-col items-center justify-center text-center px-6 bg-white/50">
                                    <Bell
                                        size={24}
                                        className="text-slate-300 mb-3"
                                    />
                                    <p className="text-sm font-black text-slate-700">
                                        Belum Ada Notifikasi
                                    </p>
                                    <p className="text-[11px] font-medium text-slate-400 mt-1">
                                        Brankas Anda aman dan tidak ada
                                        aktivitas mencurigakan.
                                    </p>
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
                                        Pemilik Utama
                                    </div>
                                </div>

                                <div className="p-3 space-y-1 bg-white/50">
                                    <Link
                                        href="/profile"
                                        onClick={() => setProfileOpen(false)}
                                        className="w-full flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-slate-50 hover:shadow-sm border border-transparent hover:border-slate-100 text-slate-600 group font-black text-xs uppercase tracking-wider"
                                    >
                                        <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-sky-100 text-slate-500 group-hover:text-sky-600 transition-colors">
                                            <UserCog size={16} />
                                        </div>
                                        <span>Pengaturan</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-rose-50 hover:shadow-sm border border-transparent hover:border-rose-100 text-rose-600 group font-black text-xs uppercase tracking-wider outline-none"
                                    >
                                        <div className="p-1.5 rounded-lg bg-rose-100/50 group-hover:bg-rose-500 text-rose-500 group-hover:text-white transition-colors">
                                            <LogOut
                                                size={16}
                                                className="group-hover:-translate-x-0.5 transition-transform"
                                            />
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
