import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { Toaster } from "react-hot-toast";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import PageGuideModal from "../Components/PageGuideModal";
import { HelpCircle, Sparkles } from "lucide-react";

export default function AuthenticatedLayout({ children }) {
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isGuideOpen, setIsGuideOpen] = useState(false);

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

            {/* Modal Surat Panduan & SOP Langkah Input */}
            <PageGuideModal
                isOpen={isGuideOpen}
                onClose={() => setIsGuideOpen(false)}
                currentUrl={url}
            />

            {/* Sidebar Desktop & Mobile */}
            <div
                className={`${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out`}
            >
                <Sidebar onOpenGuide={() => setIsGuideOpen(true)} />
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
                    onOpenGuide={() => setIsGuideOpen(true)}
                />

                <main className="flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar">
                    {/* Bar Panduan Kontekstual Cepat di Setiap Halaman */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                        <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-indigo-50/60 border border-sky-200/70 rounded-2xl px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-white text-sky-600 shadow-sm border border-sky-100 shrink-0">
                                    <Sparkles size={16} />
                                </div>
                                <p className="text-xs font-bold text-slate-700">
                                    Bingung fungsi halaman ini atau cara
                                    menginput datanya? Buka lembar panduan
                                    langkah demi langkah.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsGuideOpen(true)}
                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-sky-600 text-sky-700 hover:text-white border border-sky-200 text-xs font-extrabold transition shadow-sm shrink-0"
                            >
                                <HelpCircle size={15} />
                                Panduan & Cara Input Halaman Ini
                            </button>
                        </div>
                    </div>

                    {children}
                </main>
            </div>
        </div>
    );
}
