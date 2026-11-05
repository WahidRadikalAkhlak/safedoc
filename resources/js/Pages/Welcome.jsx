import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Simpan Aman, Akses Kapan Saja" />

            <div className="bg-gradient-to-b from-sky-50/70 via-white to-slate-50 text-slate-800 antialiased selection:bg-sky-500 selection:text-white min-h-screen relative overflow-x-hidden font-['Plus_Jakarta_Sans',sans-serif]">
                {/* Ornamen Latar Belakang Estetik (Soft Gradient Blobs) */}
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-sky-200/50 via-blue-100/40 to-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
                <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

                {/* Sticky Navigation Bar (Glassmorphism Cerah) */}
                <header className="border-b border-sky-100/80 backdrop-blur-md sticky top-0 z-50 bg-white/75 transition-all">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center group">
                                <img
                                    src="/images/logo-safedoc.png"
                                    alt="SafeDoc"
                                    className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </Link>
                        </div>

                        <nav className="flex items-center gap-3">
                            {auth?.user ? (
                                <Link
                                    href="/dashboard"
                                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold text-sm shadow-md shadow-sky-500/25 transition"
                                >
                                    Buka Brankas &rarr;
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:opacity-95 text-white font-bold text-sm shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/35 transition-all"
                                    >
                                        Daftar Gratis
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="pt-16 pb-24 lg:pt-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        {/* Badge Slogan */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200/80 text-xs font-bold text-sky-700 shadow-sm shadow-sky-100 mb-8">
                            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
                            <span>Simpan Aman, Akses Kapan Saja</span>
                        </div>

                        {/* Heading Utama */}
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15] max-w-4xl mx-auto">
                            Brankas Cloud Aman untuk <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500">
                                Berkas Legal & Dokumen Berharga
                            </span>
                        </h1>

                        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Kelola dan amankan Sertifikat Tanah, BPKB, Akta
                            Notaris, dan Surat Wasiat secara privat dengan
                            standar enkripsi ganda{" "}
                            <span className="font-semibold text-slate-800">
                                AES-256
                            </span>{" "}
                            langsung dari perangkat Anda.
                        </p>

                        {/* Call to Actions */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/register"
                                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 hover:brightness-105 font-bold text-white shadow-xl shadow-sky-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                Mulai Simpan Berkas Sekarang
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </Link>
                            <Link
                                href="/login"
                                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-700 font-bold transition-all shadow-sm"
                            >
                                Masuk ke Akun
                            </Link>
                        </div>

                        {/* Feature Cards */}
                        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {/* Card 1 */}
                            <div className="p-8 rounded-3xl bg-white border border-sky-100 shadow-xl shadow-slate-100/70 hover:shadow-2xl hover:shadow-sky-100 hover:border-sky-300 transition-all group">
                                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg
                                        className="w-7 h-7"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    Simpan Aman (Vault Enkripsi)
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    File Anda diacak dengan algoritma AES-256
                                    militer. Kunci enkripsi tersimpan mandiri
                                    sehingga privasi Anda terjamin 100%.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="p-8 rounded-3xl bg-white border border-sky-100 shadow-xl shadow-slate-100/70 hover:shadow-2xl hover:shadow-sky-100 hover:border-sky-300 transition-all group">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg
                                        className="w-7 h-7"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    Akses Kapan Saja (Cloud Sync)
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Buka dan unduh dokumen penting Anda di mana
                                    saja dan kapan saja saat dibutuhkan secara
                                    cepat melalui dekripsi on-the-fly.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="p-8 rounded-3xl bg-white border border-sky-100 shadow-xl shadow-slate-100/70 hover:shadow-2xl hover:shadow-sky-100 hover:border-sky-300 transition-all group">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <svg
                                        className="w-7 h-7"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">
                                    Struktur Dokumen Teratur
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Tersedia pelabelan rapi khusus untuk
                                    sertifikat kepemilikan tanah, surat
                                    kendaraan bermotor, dan berkas waris.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer Estetik */}
                <footer className="border-t border-slate-200/80 bg-white/50 backdrop-blur-sm py-8 text-center text-xs text-slate-500 mt-auto">
                    <p>
                        &copy; {new Date().getFullYear()}{" "}
                        <strong className="text-slate-700">SafeDoc</strong>.
                        Simpan Aman, Akses Kapan Saja.
                    </p>
                </footer>
            </div>
        </>
    );
}
