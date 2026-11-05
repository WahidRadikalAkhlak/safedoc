import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Sidebar() {
    const { url } = usePage();

    return (
        <aside className="w-64 bg-white/80 backdrop-blur-2xl border-r border-slate-200 hidden md:flex flex-col h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-40">
            <div className="p-6 border-b border-slate-100 flex items-center justify-center">
                <Link href="/dashboard">
                    <img
                        src="/images/logo-safedoc.png"
                        alt="SafeDoc"
                        className="h-10 w-auto hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-2">
                <p className="px-4 text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2 mt-4">
                    Menu Brankas
                </p>

                <Link
                    href="/dashboard"
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${url === "/dashboard" ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/30" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                    </svg>
                    Semua Dokumen
                </Link>

                <Link
                    href="/profile"
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${url.startsWith("/profile") ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/30" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                    Profil & Keamanan
                </Link>
            </div>

            <div className="p-6 border-t border-slate-100">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl transition"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    Kunci Brankas
                </Link>
            </div>
        </aside>
    );
}
