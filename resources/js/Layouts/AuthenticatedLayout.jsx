import React from "react";
import { usePage } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../Components/Sidebar";

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] flex">
            {/* Komponen Toaster Global */}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        borderRadius: "1rem",
                        background: "#334155",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "600",
                    },
                }}
            />

            {/* Manggil Komponen Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Header Khusus Mobile (Muncul jika layar kecil saja) */}
                <header className="md:hidden bg-white/80 backdrop-blur-xl border-b border-slate-200 h-16 flex items-center justify-between px-4 sticky top-0 z-30">
                    <img
                        src="/images/logo-safedoc.png"
                        alt="SafeDoc"
                        className="h-8 w-auto"
                    />
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                        {auth?.user?.name}
                    </span>
                </header>

                <main className="flex-1 overflow-x-hidden">{children}</main>
            </div>
        </div>
    );
}
