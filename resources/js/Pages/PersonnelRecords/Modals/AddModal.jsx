import React, { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, Briefcase, CheckCircle2, ShieldCheck } from "lucide-react";

export default function AddModal({ isOpen, onClose }) {
    const fileInput = useRef(null);
    const { data, setData, post, errors, reset, clearErrors } = useForm({
        title: "",
        category: "sk_pangkat",
        decree_number: "",
        decree_date: "",
        effective_date: "",
        rank_grade: "",
        position_unit: "",
        issuing_authority: "",
        notes: "",
        document_file: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const closeModal = () => {
        reset();
        clearErrors();
        onClose();
    };

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        post("/personnel-records", {
            preserveScroll: true,
            onSuccess: () => {
                toast.success(
                    "Berkas & data kepegawaian berhasil dicadangkan ke brankas!",
                );
                closeModal();
            },
            onError: () => {
                toast.error("Gagal menyimpan data. Mohon periksa isian Anda.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-3xl overflow-hidden border border-white/60 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl">
                            <Briefcase size={26} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-sky-300 block">
                                Backup SIMPEG & Riwayat Karier
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                                Simpan SK & Berkas Kepegawaian Baru
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                    >
                        <X size={22} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar bg-slate-50/40 flex-1">
                    <form
                        id="addPersonnelForm"
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Nama SK / Berkas Kepegawaian{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none"
                                    placeholder="Contoh: SK Kenaikan Pangkat Penata Tk. I (III/d)"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-rose-500 text-xs font-bold mt-2">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Jenis Dokumen Kepegawaian{" "}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none cursor-pointer"
                                    >
                                        <option value="sk_cpns_pns">
                                            SK CPNS / SK PNS / Karpeg
                                        </option>
                                        <option value="sk_pangkat">
                                            SK Kenaikan Pangkat
                                        </option>
                                        <option value="sk_jabatan">
                                            SK Pengangkatan / Mutasi Jabatan
                                        </option>
                                        <option value="kgb">
                                            Kenaikan Gaji Berkala (KGB)
                                        </option>
                                        <option value="diklat_sertifikat">
                                            Sertifikat Diklat / Bimtek /
                                            Kompetensi
                                        </option>
                                        <option value="penghargaan_lainnya">
                                            Satyalancana / Penghargaan / Lainnya
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Nomor SK / Nomor Sertifikat
                                    </label>
                                    <input
                                        type="text"
                                        value={data.decree_number}
                                        onChange={(e) =>
                                            setData(
                                                "decree_number",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-mono font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none"
                                        placeholder="Contoh: SEK.KP.04.01-128"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Tanggal Ditetapkan SK
                                    </label>
                                    <input
                                        type="date"
                                        value={data.decree_date}
                                        onChange={(e) =>
                                            setData(
                                                "decree_date",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        TMT (Terhitung Mulai Tanggal)
                                    </label>
                                    <input
                                        type="date"
                                        value={data.effective_date}
                                        onChange={(e) =>
                                            setData(
                                                "effective_date",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Pangkat / Golongan Ruang
                                    </label>
                                    <input
                                        type="text"
                                        value={data.rank_grade}
                                        onChange={(e) =>
                                            setData(
                                                "rank_grade",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none"
                                        placeholder="Contoh: Penata Tk. I (III/d)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Jabatan & Unit Kerja
                                    </label>
                                    <input
                                        type="text"
                                        value={data.position_unit}
                                        onChange={(e) =>
                                            setData(
                                                "position_unit",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:border-sky-500 outline-none"
                                        placeholder="Contoh: Analis Kepegawaian / Kanwil Kemenkum"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Pejabat / Instansi yang Menetapkan
                                </label>
                                <input
                                    type="text"
                                    value={data.issuing_authority}
                                    onChange={(e) =>
                                        setData(
                                            "issuing_authority",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:border-sky-500 outline-none"
                                    placeholder="Contoh: Kepala Badan Kepegawaian Negara / Menteri Hukum RI"
                                />
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-1.5">
                                    Unggah File Scan SK / Sertifikat (PDF, JPG,
                                    PNG - Maks. 5 MB)
                                </label>
                                <p className="text-xs font-medium text-slate-400 mb-3">
                                    Opsional jika hanya ingin mencatat riwayat
                                    dulu, atau unggah scan SK agar siap diunduh
                                    kapan saja.
                                </p>
                                <input
                                    type="file"
                                    ref={fileInput}
                                    onChange={(e) =>
                                        setData(
                                            "document_file",
                                            e.target.files[0],
                                        )
                                    }
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    className="block w-full text-sm text-slate-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 transition cursor-pointer border border-slate-200 rounded-2xl p-2 bg-slate-50"
                                />
                                {errors.document_file && (
                                    <p className="text-rose-500 text-xs font-bold mt-2">
                                        {errors.document_file}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Catatan Tambahan / Letak Map Fisik SK Asli
                                </label>
                                <textarea
                                    rows="2"
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-medium text-slate-700 focus:bg-white focus:border-sky-500 outline-none"
                                    placeholder="Contoh: SK asli bermeterai tersimpan di map ordner merah lemari kerja..."
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                        <ShieldCheck size={16} /> Terenkripsi AES-256 • Siap
                        Cetak Rekap PDF
                    </span>
                    <div className="flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            form="addPersonnelForm"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 shadow-lg disabled:opacity-50"
                        >
                            <CheckCircle2 size={18} />
                            {isSubmitting
                                ? "Menyimpan..."
                                : "Simpan ke Arsip SIMPEG"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
