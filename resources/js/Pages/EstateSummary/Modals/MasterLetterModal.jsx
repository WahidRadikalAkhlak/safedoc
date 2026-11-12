import React from "react";
import { usePage } from "@inertiajs/react";
import { X, Printer, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function MasterLetterModal({
    isOpen,
    onClose,
    overview,
    beneficiaries = [],
    formatRupiah,
}) {
    const { auth } = usePage().props;
    const owner = auth.user;

    if (!isOpen) return null;

    const handlePrint = () => {
        window.print();
    };

    const today = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.65)] w-full max-w-4xl overflow-hidden border border-white/50 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Action Bar */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-900 text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-400/30">
                            <ShieldCheck size={22} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 block">
                                Dokumen Induk Resmi • SafeDoc Vault
                            </span>
                            <h2 className="text-lg font-black">
                                Surat Induk Inventaris Warisan & Pedoman Ahli
                                Waris
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 text-white text-xs font-extrabold shadow-md transition"
                        >
                            <Printer size={15} /> Cetak / Simpan PDF
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-300 hover:text-white rounded-xl"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Isi Naskah Surat Resmi */}
                <div className="p-6 sm:p-10 overflow-y-auto bg-slate-100/70 flex-1">
                    <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8 text-slate-800">
                        {/* Kop Surat */}
                        <div className="text-center border-b-2 border-slate-800 pb-6 space-y-1">
                            <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-700">
                                ARSIP BRANKAS DIGITAL TERENKRIPSI SAFEDOC
                            </p>
                            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                                SURAT INDUK INVENTARIS ASET & AMANAT WARISAN
                            </h1>
                            <p className="text-xs font-semibold text-slate-500">
                                Dicetak secara sah melalui otentikasi 2FA pada
                                tanggal: {today}
                            </p>
                        </div>

                        {/* Pembukaan Surat */}
                        <div className="space-y-3 text-sm leading-relaxed">
                            <p>
                                Saya yang bertanda tangan dan memegang otoritas
                                penuh atas Brankas Digital SafeDoc di bawah ini:
                            </p>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                                <div>
                                    Nama Pemilik Brankas:{" "}
                                    <span className="text-slate-900 font-black">
                                        {owner?.name}
                                    </span>
                                </div>
                                <div>
                                    Email Terverifikasi:{" "}
                                    <span className="text-slate-900">
                                        {owner?.email}
                                    </span>
                                </div>
                            </div>
                            <p>
                                Melalui dokumen induk ini, saya menyatakan bahwa
                                seluruh berkas sertifikat kepemilikan, BPKB,
                                nomor rekening/polis, serta surat amanat wasiat
                                yang tersimpan di dalam sistem{" "}
                                <strong>SafeDoc</strong> adalah benar dan sah
                                untuk digunakan sebagai pedoman distribusi
                                warisan bagi keluarga saya.
                            </p>
                        </div>

                        {/* Ringkasan Neraca Harta Warisan */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-2">
                                I. Rekapitulasi Valuasi Harta & Kewajiban
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                    <span className="text-[10px] font-black uppercase text-slate-400 block">
                                        Nilai Dokumen Aset
                                    </span>
                                    <span className="text-sm font-black text-slate-900 mt-1 block">
                                        {formatRupiah(
                                            overview.totalDocumentValue,
                                        )}
                                    </span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
                                    <span className="text-[10px] font-black uppercase text-emerald-700 block">
                                        Total Piutang (Hak Tagih)
                                    </span>
                                    <span className="text-sm font-black text-emerald-700 mt-1 block">
                                        {formatRupiah(
                                            overview.totalReceivables,
                                        )}
                                    </span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200">
                                    <span className="text-[10px] font-black uppercase text-rose-700 block">
                                        Kewajiban / Utang
                                    </span>
                                    <span className="text-sm font-black text-rose-700 mt-1 block">
                                        {formatRupiah(
                                            overview.totalLiabilities,
                                        )}
                                    </span>
                                </div>
                                <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200">
                                    <span className="text-[10px] font-black uppercase text-sky-700 block">
                                        Estimasi Kekayaan Bersih
                                    </span>
                                    <span className="text-sm font-black text-sky-800 mt-1 block">
                                        {formatRupiah(overview.netEstateValue)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Daftar Distribusi Per Ahli Waris */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-2">
                                II. Rincian Alokasi Per Ahli Waris (
                                {beneficiaries.length} Orang)
                            </h3>
                            {beneficiaries.length === 0 ? (
                                <p className="text-xs italic text-slate-400">
                                    Belum ada ahli waris yang didaftarkan.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {beneficiaries.map((person, index) => (
                                        <div
                                            key={person.id}
                                            className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2"
                                        >
                                            <div className="flex flex-wrap justify-between items-center gap-2">
                                                <span className="font-black text-sm text-slate-900">
                                                    {index + 1}. {person.name}{" "}
                                                    <span className="text-xs font-bold text-sky-600 uppercase">
                                                        (
                                                        {person.relationship.replace(
                                                            "_",
                                                            "/",
                                                        )}
                                                        )
                                                    </span>
                                                </span>
                                                <span className="text-xs font-black text-emerald-700">
                                                    Total Alokasi:{" "}
                                                    {formatRupiah(
                                                        person.total_value,
                                                    )}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-600">
                                                Menerima{" "}
                                                <strong>
                                                    {person.documents_count}{" "}
                                                    Dokumen Aset
                                                </strong>
                                                ,{" "}
                                                <strong>
                                                    {person.credentials_count}{" "}
                                                    Akses Kredensial/PIN
                                                </strong>
                                                , dan{" "}
                                                <strong>
                                                    {person.testaments_count}{" "}
                                                    Catatan Amanat
                                                </strong>
                                                .
                                            </p>
                                            {person.allocation_notes && (
                                                <p className="text-xs italic text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80">
                                                    Amanat Khusus: "
                                                    {person.allocation_notes}"
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Pedoman Prosedur Pembukaan Brankas untuk Keluarga */}
                        <div className="space-y-3">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-2">
                                III. Pedoman Langkah Klaim & Pembukaan Brankas
                                Bagi Keluarga / Notaris
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                                    <CheckCircle2
                                        size={16}
                                        className="text-sky-600 shrink-0 mt-0.5"
                                    />
                                    <div>
                                        <strong className="block text-slate-800">
                                            1. Selesaikan Kewajiban Terlebih
                                            Dahulu
                                        </strong>
                                        <span className="text-slate-600">
                                            Buka menu "Amanat & Wasiat", periksa
                                            tab Kewajiban/Utang, dan lunasi
                                            seluruh tanggungan sebelum
                                            membagikan aset.
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                                    <CheckCircle2
                                        size={16}
                                        className="text-sky-600 shrink-0 mt-0.5"
                                    />
                                    <div>
                                        <strong className="block text-slate-800">
                                            2. Verifikasi Keaslian SHA-256
                                        </strong>
                                        <span className="text-slate-600">
                                            Buka menu "Pusat Keamanan" dan
                                            jalankan pemindaian SHA-256 untuk
                                            membuktikan berkas digital belum
                                            pernah dimodifikasi.
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                                    <CheckCircle2
                                        size={16}
                                        className="text-sky-600 shrink-0 mt-0.5"
                                    />
                                    <div>
                                        <strong className="block text-slate-800">
                                            3. Akses Kredensial & SDB Fisik
                                        </strong>
                                        <span className="text-slate-600">
                                            Gunakan menu "Kredensial & PIN"
                                            untuk melihat lokasi kunci fisik,
                                            nomor polis asuransi, dan nomor
                                            rekening deposito.
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                                    <CheckCircle2
                                        size={16}
                                        className="text-sky-600 shrink-0 mt-0.5"
                                    />
                                    <div>
                                        <strong className="block text-slate-800">
                                            4. Unduh Salinan Resmi Sertifikat
                                        </strong>
                                        <span className="text-slate-600">
                                            Unduh berkas pada menu "Brankas
                                            Dokumen" sesuai alokasi nama ahli
                                            waris yang tertera pada
                                            masing-masing berkas.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tanda Tangan */}
                        <div className="pt-8 flex justify-between items-end text-xs font-bold text-slate-600 border-t border-slate-200">
                            <div>
                                <p>Status Keamanan Dokumen:</p>
                                <p className="text-emerald-600 font-black mt-0.5">
                                    TERVERIFIKASI SISTEM SAFEDOC (AES-256)
                                </p>
                            </div>
                            <div className="text-right space-y-12">
                                <p>Pemilik Sah Brankas Digital,</p>
                                <p className="font-black text-slate-900 underline text-sm">
                                    {owner?.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Modal */}
                <div className="p-5 border-t border-slate-100 bg-white flex justify-end shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs transition"
                    >
                        Tutup Surat Induk
                    </button>
                </div>
            </div>
        </div>
    );
}
