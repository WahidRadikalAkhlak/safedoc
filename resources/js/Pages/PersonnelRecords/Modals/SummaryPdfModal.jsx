import React from "react";
import { usePage } from "@inertiajs/react";
import { X, Printer, ShieldCheck } from "lucide-react";

export default function SummaryPdfModal({ isOpen, onClose, allRecords = [] }) {
    const { auth } = usePage().props;
    const owner = auth?.user;

    if (!isOpen) return null;

    const handlePrint = () => {
        window.print();
    };

    const categoryLabels = {
        sk_cpns_pns: "SK CPNS / PNS",
        sk_pangkat: "SK Kenaikan Pangkat",
        sk_jabatan: "SK Jabatan",
        kgb: "Kenaikan Gaji Berkala",
        diklat_sertifikat: "Diklat / Sertifikat",
        penghargaan_lainnya: "Penghargaan / Lainnya",
    };

    const today = new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-slate-900/80 backdrop-blur-md transition-all">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-5xl overflow-hidden border border-white/60 flex flex-col max-h-[92vh] animate-in zoom-in-95">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-900 text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-400/30">
                            <ShieldCheck size={22} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 block">
                                Dokumen Cadangan SIMPEG • Format PDF A4
                            </span>
                            <h2 className="text-lg font-black">
                                Rekapitulasi Riwayat Kepegawaian & Daftar SK
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md hover:brightness-105 transition"
                        >
                            <Printer size={15} /> Cetak / Simpan sebagai PDF
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-300 hover:text-white rounded-xl"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-6 sm:p-10 overflow-y-auto bg-slate-100/70 flex-1">
                    <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-800">
                        <div className="text-center border-b-2 border-slate-800 pb-5 space-y-1">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-700">
                                ARSIP CADANGAN DATA KEPEGAWAIAN (BACKUP SIMPEG)
                            </p>
                            <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                                REKAPITULASI RIWAYAT PANGKAT, JABATAN & SURAT
                                KEPUTUSAN
                            </h1>
                            <p className="text-xs font-semibold text-slate-500">
                                Dicetak dari Brankas SafeDoc pada tanggal:{" "}
                                {today}
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                            <div>
                                Nama Pegawai:{" "}
                                <span className="text-slate-900 font-black">
                                    {owner?.name}
                                </span>
                            </div>
                            <div>
                                NIK / Identitas:{" "}
                                <span className="text-slate-900 font-mono">
                                    {owner?.nik || "-"}
                                </span>
                            </div>
                            <div>
                                Email Resmi:{" "}
                                <span className="text-slate-900">
                                    {owner?.email}
                                </span>
                            </div>
                            <div>
                                Total Berkas SK Terarsip:{" "}
                                <span className="text-sky-700 font-black">
                                    {allRecords.length} Dokumen
                                </span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse border border-slate-300 text-xs">
                                <thead>
                                    <tr className="bg-slate-100 text-slate-800 font-black uppercase">
                                        <th className="border border-slate-300 p-2.5 text-center">
                                            No
                                        </th>
                                        <th className="border border-slate-300 p-2.5">
                                            Jenis & Nama SK
                                        </th>
                                        <th className="border border-slate-300 p-2.5">
                                            Nomor & Tgl SK
                                        </th>
                                        <th className="border border-slate-300 p-2.5">
                                            TMT
                                        </th>
                                        <th className="border border-slate-300 p-2.5">
                                            Pangkat / Golongan
                                        </th>
                                        <th className="border border-slate-300 p-2.5">
                                            Jabatan / Unit Kerja
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allRecords.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="border border-slate-300 p-6 text-center italic text-slate-400"
                                            >
                                                Belum ada data riwayat
                                                kepegawaian yang diinput.
                                            </td>
                                        </tr>
                                    ) : (
                                        allRecords.map((item, idx) => (
                                            <tr key={item.id}>
                                                <td className="border border-slate-300 p-2.5 text-center font-bold">
                                                    {idx + 1}
                                                </td>
                                                <td className="border border-slate-300 p-2.5">
                                                    <span className="font-black text-slate-900 block">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500">
                                                        {categoryLabels[
                                                            item.category
                                                        ] || item.category}
                                                    </span>
                                                </td>
                                                <td className="border border-slate-300 p-2.5 font-mono">
                                                    {item.decree_number || "-"}
                                                    {item.decree_date && (
                                                        <span className="block text-[10px] text-slate-500">
                                                            Tgl:{" "}
                                                            {item.decree_date}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="border border-slate-300 p-2.5 font-bold whitespace-nowrap">
                                                    {item.effective_date || "-"}
                                                </td>
                                                <td className="border border-slate-300 p-2.5 font-bold">
                                                    {item.rank_grade || "-"}
                                                </td>
                                                <td className="border border-slate-300 p-2.5">
                                                    {item.position_unit || "-"}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="pt-8 flex justify-between items-end text-xs font-bold text-slate-600">
                            <div>
                                <p>Sumber Arsip Digital:</p>
                                <p className="text-emerald-600 font-black">
                                    SAFEDOC PERSONAL VAULT (AES-256)
                                </p>
                            </div>
                            <div className="text-right space-y-12">
                                <p>Pemilik Arsip Kepegawaian,</p>
                                <p className="font-black text-slate-900 underline text-sm">
                                    {owner?.name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-5 border-t border-slate-100 bg-white flex justify-end shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs"
                    >
                        Tutup Pratinjau Cetak
                    </button>
                </div>
            </div>
        </div>
    );
}
