import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

export default function AuthenticatedLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] flex overflow-hidden">
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

            {/* Sidebar Desktop & Mobile */}
            <div
                className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out`}
            >
                <Sidebar />
            </div>

            {/* Overlay untuk Mobile saat Sidebar terbuka */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
                ></div>
            )}

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}
