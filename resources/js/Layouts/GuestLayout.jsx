import React from "react";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 to-slate-100 flex flex-col sm:justify-center items-center pt-6 sm:pt-0 font-['Plus_Jakarta_Sans',sans-serif]">
            <div className="mb-6">
                <Link href="/">
                    <img
                        src="/images/logo-safedoc.png"
                        alt="SafeDoc"
                        className="h-16 w-auto hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            </div>

            <div className="w-full sm:max-w-md px-8 py-8 backdrop-blur-xl bg-white/70 shadow-2xl border border-white/50 rounded-[2rem]">
                {children}
            </div>
        </div>
    );
}
