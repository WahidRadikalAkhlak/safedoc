import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import MasterLetterModal from "./Modals/MasterLetterModal";
import {
    Printer,
    FolderLock,
    Users,
    KeyRound,
    BookOpen,
    AlertTriangle,
    ArrowRight,
    Award,
    Sparkles,
    ShieldCheck,
} from "lucide-react";

export default function Index({ overview, beneficiaries = [] }) {
    const [isMasterLetterOpen, setIsMasterLetterOpen] = useState(false);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(number || 0);
    };

    const relationshipLabels = {
        istri_suami: "Istri / Suami Sah",
        anak: "Anak Kandung",
        saudara: "Keluarga / Saudara",
        notaris: "Notaris / Kuasa Hukum",
        lainnya: "Penerima Wasiat",
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ringkasan Harta & Surat Induk Warisan" />

            <MasterLetterModal
                isOpen={isMasterLetterOpen}
                onClose={() => setIsMasterLetterOpen(false)}
                overview={overview}
                beneficiaries={beneficiaries}
                formatRupiah={formatRupiah}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Hero Banner Mewah */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(15,23,42,0.25)] relative overflow-hidden border border-white/10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl translate-y-1/2 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="space-y-3 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sky-300 text-xs font-extrabold tracking-wider uppercase">
                                <Sparkles
                                    size={14}
                                    className="text-amber-400"
                                />
                                Pusat Kendali Harta & Warisan Keluarga
                            </div>
                            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                                Ringkasan Harta & Surat Induk Warisan
                            </h1>
                            <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                Halaman ini menghitung secara otomatis seluruh
                                nilai aset sertifikat/BPKB, uang piutang yang
                                harus ditagih keluarga, dikurangi utang yang
                                harus dilunasi—serta mencetak{" "}
                                <strong>Surat Induk Resmi</strong> sebagai
                                pegangan keluarga.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[2rem] border border-white/15 min-w-[280px] text-left lg:text-right space-y-3">
                            <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 block">
                                Total Harta Bersih Keluarga
                            </span>
                            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                {formatRupiah(overview.netEstateValue)}
                            </div>
                            <button
                                onClick={() => setIsMasterLetterOpen(true)}
                                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg transition transform hover:-translate-y-0.5"
                            >
                                <Printer size={16} strokeWidth={2.5} />
                                Buka & Cetak Surat Induk
                            </button>
                        </div>
                    </div>
                </div>

                {/* Peringatan Ramah jika ada dokumen yang belum punya penerima waris */}
                {overview.unassignedDocuments > 0 && (
                    <div className="p-5 rounded-[2rem] bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                        <div className="flex items-center gap-3.5">
                            <div className="p-3 rounded-2xl bg-amber-500 text-white shrink-0">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-amber-950">
                                    Ada {overview.unassignedDocuments} Dokumen
                                    Berharga yang Belum Ditentukan Penerimanya
                                </h4>
                                <p className="text-xs font-medium text-amber-800 mt-0.5">
                                    Agar tidak menimbulkan kebingungan di
                                    kemudian hari, silakan tentukan siapa ahli
                                    waris untuk dokumen tersebut.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/dashboard?beneficiary_id=unassigned"
                            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold transition shrink-0"
                        >
                            Atur Penerima Sekarang <ArrowRight size={14} />
                        </Link>
                    </div>
                )}

                {/* 3 Kartu Rincian Perhitungan Harta */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-7 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between space-y-4">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                                1. Nilai Dokumen Aset ({overview.totalDocuments}{" "}
                                Berkas)
                            </span>
                            <h4 className="text-2xl font-black text-slate-900 mt-2">
                                {formatRupiah(overview.totalDocumentValue)}
                            </h4>
                            <p className="text-xs font-medium text-slate-500 mt-1">
                                Gabungan nilai rumah, tanah (SHM), kendaraan
                                (BPKB), dan surat berharga.
                            </p>
                        </div>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-sky-600 hover:text-sky-700"
                        >
                            Buka Lemari Dokumen <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="p-7 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between space-y-4">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
                                2. Uang Piutang (Hak Tagih Keluarga)
                            </span>
                            <h4 className="text-2xl font-black text-emerald-600 mt-2">
                                + {formatRupiah(overview.totalReceivables)}
                            </h4>
                            <p className="text-xs font-medium text-slate-500 mt-1">
                                Uang milik Anda di tangan pihak lain yang berhak
                                ditagih oleh keluarga.
                            </p>
                        </div>
                        <Link
                            href="/testaments?category=piutang_klaim"
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 hover:text-emerald-700"
                        >
                            Lihat Daftar Piutang <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="p-7 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between space-y-4">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-rose-500">
                                3. Tanggungan Utang (Harus Dilunasi)
                            </span>
                            <h4 className="text-2xl font-black text-rose-600 mt-2">
                                - {formatRupiah(overview.totalLiabilities)}
                            </h4>
                            <p className="text-xs font-medium text-slate-500 mt-1">
                                Kewajiban finansial yang wajib diselesaikan
                                keluarga terlebih dahulu.
                            </p>
                        </div>
                        <Link
                            href="/testaments?category=kewajiban_utang"
                            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-rose-600 hover:text-rose-700"
                        >
                            Lihat Catatan Kewajiban <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Pintasan Cepat Antar-Halaman (Quick Navigation Cards) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href="/dashboard"
                        className="p-5 bg-white hover:bg-sky-50/50 rounded-[2rem] border border-slate-100 hover:border-sky-200 shadow-sm transition group"
                    >
                        <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 w-fit group-hover:scale-110 transition-transform">
                            <FolderLock size={22} />
                        </div>
                        <h5 className="font-black text-slate-800 text-sm mt-3">
                            {overview.totalDocuments} Berkas Sertifikat
                        </h5>
                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                            Kelola file SHM, BPKB & Akta
                        </p>
                    </Link>

                    <Link
                        href="/beneficiaries"
                        className="p-5 bg-white hover:bg-indigo-50/50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 shadow-sm transition group"
                    >
                        <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 w-fit group-hover:scale-110 transition-transform">
                            <Users size={22} />
                        </div>
                        <h5 className="font-black text-slate-800 text-sm mt-3">
                            {overview.totalBeneficiaries} Anggota Keluarga
                        </h5>
                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                            Daftar penerima hak waris
                        </p>
                    </Link>

                    <Link
                        href="/credentials"
                        className="p-5 bg-white hover:bg-amber-50/50 rounded-[2rem] border border-slate-100 hover:border-amber-200 shadow-sm transition group"
                    >
                        <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 w-fit group-hover:scale-110 transition-transform">
                            <KeyRound size={22} />
                        </div>
                        <h5 className="font-black text-slate-800 text-sm mt-3">
                            {overview.totalCredentials} Rekening & PIN
                        </h5>
                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                            Nomor polis, bank & kunci SDB
                        </p>
                    </Link>

                    <Link
                        href="/testaments"
                        className="p-5 bg-white hover:bg-emerald-50/50 rounded-[2rem] border border-slate-100 hover:border-emerald-200 shadow-sm transition group"
                    >
                        <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 w-fit group-hover:scale-110 transition-transform">
                            <BookOpen size={22} />
                        </div>
                        <h5 className="font-black text-slate-800 text-sm mt-3">
                            {overview.totalTestaments} Pesan Wasiat
                        </h5>
                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                            Amanat keluarga & utang-piutang
                        </p>
                    </Link>
                </div>

                {/* Tabel Pembagian Warisan per Anggota Keluarga (Terkoneksi Langsung) */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                    <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2.5">
                                <Award size={22} className="text-sky-600" />
                                Pembagian Hak Waris & Akses per Anggota Keluarga
                            </h3>
                            <p className="text-xs font-medium text-slate-500 mt-1">
                                Klik pada angka <strong>Berkas</strong>,{" "}
                                <strong>PIN</strong>, atau{" "}
                                <strong>Wasiat</strong> di bawah ini untuk
                                langsung membuka daftar milik orang tersebut.
                            </p>
                        </div>
                        <Link
                            href="/beneficiaries"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold transition shrink-0"
                        >
                            + Tambah / Atur Keluarga
                        </Link>
                    </div>

                    {beneficiaries.length === 0 ? (
                        <div className="text-center py-16 px-4">
                            <Users
                                size={36}
                                className="mx-auto text-slate-300 mb-3"
                            />
                            <h4 className="text-base font-black text-slate-800">
                                Belum Ada Anggota Keluarga yang Didaftarkan
                            </h4>
                            <p className="text-xs font-medium text-slate-500 mt-1 max-w-md mx-auto">
                                Silakan daftarkan nama istri, anak, atau notaris
                                terlebih dahulu agar pembagian aset dapat
                                terlihat di tabel ini.
                            </p>
                            <Link
                                href="/beneficiaries"
                                className="mt-4 inline-block px-5 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold"
                            >
                                Daftarkan Keluarga Sekarang
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                        <th className="py-4 px-6">
                                            Nama Penerima Waris
                                        </th>
                                        <th className="py-4 px-6">
                                            Status Hubungan
                                        </th>
                                        <th className="py-4 px-6 text-center">
                                            Dokumen Sertifikat
                                        </th>
                                        <th className="py-4 px-6 text-center">
                                            Rekening & PIN
                                        </th>
                                        <th className="py-4 px-6 text-center">
                                            Pesan Wasiat
                                        </th>
                                        <th className="py-4 px-6 text-right">
                                            Estimasi Nilai Diterima
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm font-semibold">
                                    {beneficiaries.map((person) => (
                                        <tr
                                            key={person.id}
                                            className="hover:bg-slate-50/80 transition"
                                        >
                                            <td className="py-4 px-6">
                                                <span className="font-extrabold text-slate-900 block">
                                                    {person.name}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    {person.phone_number ||
                                                        person.email ||
                                                        "Belum ada nomor kontak"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="px-3 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-xs font-extrabold">
                                                    {relationshipLabels[
                                                        person.relationship
                                                    ] || "Penerima Wasiat"}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Link
                                                    href={`/dashboard?beneficiary_id=${person.id}`}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white border border-sky-200/80 text-xs font-black transition"
                                                >
                                                    <FolderLock size={13} />
                                                    {
                                                        person.documents_count
                                                    }{" "}
                                                    Berkas
                                                </Link>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Link
                                                    href={`/credentials?beneficiary_id=${person.id}`}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200/80 text-xs font-black transition"
                                                >
                                                    <KeyRound size={13} />
                                                    {
                                                        person.credentials_count
                                                    }{" "}
                                                    Akun/PIN
                                                </Link>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <Link
                                                    href={`/testaments?beneficiary_id=${person.id}`}
                                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200/80 text-xs font-black transition"
                                                >
                                                    <BookOpen size={13} />
                                                    {
                                                        person.testaments_count
                                                    }{" "}
                                                    Pesan
                                                </Link>
                                            </td>
                                            <td className="py-4 px-6 text-right font-black text-emerald-600">
                                                {formatRupiah(
                                                    person.total_value,
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
