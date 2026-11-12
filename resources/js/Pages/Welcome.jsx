import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    ShieldCheck,
    FolderLock,
    Users,
    KeyRound,
    BookOpen,
    Lock,
    ArrowRight,
    Sparkles,
} from "lucide-react";

export default function Welcome() {
    const { auth } = usePage().props;

    const features = [
        {
            icon: FolderLock,
            title: "Lemari Sertifikat & BPKB",
            desc: "Simpan salinan asli Sertifikat Tanah (SHM), BPKB, dan Akta penting dengan penguncian sandi militer AES-256.",
            color: "bg-sky-500/15 text-sky-400 border-sky-500/30",
        },
        {
            icon: Users,
            title: "Pembagian Hak Waris Keluarga",
            desc: "Tentukan sejak awal siapa anggota keluarga yang berhak menerima masing-masing aset agar tertib dan rukun.",
            color: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
        },
        {
            icon: KeyRound,
            title: "Rekening, Polis & PIN Brankas",
            desc: "Wariskan informasi nomor rekening deposito, polis asuransi jiwa, dan letak kunci brankas fisik secara aman.",
            color: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        },
        {
            icon: BookOpen,
            title: "Surat Induk Wasiat & Piutang",
            desc: "Catat pesan wasiat keluarga, uang piutang yang harus ditagih, serta cetak Surat Induk Warisan kapan saja.",
            color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white font-['Plus_Jakarta_Sans',sans-serif] relative overflow-hidden flex flex-col justify-between">
            <Head title="SafeDoc — Brankas Digital & Arsip Warisan Keluarga" />

            {/* Efek Cahaya Latar */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[130px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none"></div>

            {/* Navbar Atas */}
            <header className="max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <img
                        src="/images/logo-safedoc.png"
                        alt="SafeDoc"
                        className="h-10 w-auto bg-white/95 px-3 py-1.5 rounded-xl shadow-md"
                    />
                    <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-black uppercase tracking-widest text-sky-300">
                        Executive Family Vault
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {auth?.user ? (
                        <Link
                            href="/estate-summary"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition"
                        >
                            Buka Ruang Brankas <ArrowRight size={15} />
                        </Link>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition"
                            >
                                Masuk Brankas
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 text-white font-black text-xs shadow-lg transition"
                            >
                                Buat Brankas Baru
                            </Link>
                        </>
                    )}
                </div>
            </header>

            {/* Konten Hero Tengah */}
            <main className="max-w-7xl w-full mx-auto px-6 py-12 lg:py-16 relative z-10 space-y-14">
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-extrabold uppercase tracking-widest">
                        <Sparkles size={14} className="text-amber-400" />
                        Perlindungan Harta & Amanat Keluarga Terpadu
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                        Amankan Sertifikat Berharga &{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-300 to-amber-300">
                            Tertibkan Warisan Keluarga
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
                        Tempat penyimpanan pribadi yang dirancang khusus untuk
                        menjaga Sertifikat Tanah (SHM), BPKB, Nomor Rekening &
                        Polis Asuransi, hingga Surat Wasiat Keluarga dengan
                        pengamanan ganda{" "}
                        <strong>AES-256 + Google Authenticator (2FA)</strong>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                        {auth?.user ? (
                            <Link
                                href="/estate-summary"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 text-white font-black text-sm shadow-[0_10px_30px_rgba(14,165,233,0.35)] transition transform hover:-translate-y-0.5"
                            >
                                Masuk ke Pusat Kendali Harta{" "}
                                <ArrowRight size={18} />
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 text-white font-black text-sm shadow-[0_10px_30px_rgba(14,165,233,0.35)] transition transform hover:-translate-y-0.5"
                            >
                                <Lock size={18} /> Buka Kunci Brankas Sekarang
                            </Link>
                        )}
                    </div>
                </div>

                {/* 4 Kartu Pilar Utama */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className="p-7 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 hover:border-sky-400/40 transition-all space-y-4"
                            >
                                <div
                                    className={`p-3.5 rounded-2xl border w-fit ${item.color}`}
                                >
                                    <Icon size={24} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-lg font-black text-white">
                                    {item.title}
                                </h3>
                                <p className="text-xs font-medium text-slate-300 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Footer */}
            <footer className="max-w-7xl w-full mx-auto px-6 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 relative z-10">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <ShieldCheck size={16} /> Enkripsi Militer AES-256 • Segel
                    Keaslian SHA-256 • Kunci OTP 2FA
                </div>
                <span>
                    © {new Date().getFullYear()} SafeDoc Personal Estate Vault.
                </span>
            </footer>
        </div>
    );
}
