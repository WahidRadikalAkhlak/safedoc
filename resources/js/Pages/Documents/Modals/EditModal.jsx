import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, Edit3, CheckCircle2 } from "lucide-react";

export default function EditModal({
    isOpen,
    onClose,
    document,
    beneficiaries = [],
}) {
    const { data, setData, put, reset, clearErrors } = useForm({
        title: "",
        category: "",
        beneficiary_id: "",
        estimated_value: 0,
        asset_location: "",
        document_number: "",
        notes: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (document) {
            setData({
                title: document.title || "",
                category: document.category || "lainnya",
                beneficiary_id: document.beneficiary_id || "",
                estimated_value: document.estimated_value || 0,
                asset_location: document.asset_location || "",
                document_number: document.document_number || "",
                notes: document.notes || "",
            });
        }
    }, [document]);

    if (!isOpen || !document) return null;

    const closeModal = () => {
        reset();
        clearErrors();
        onClose();
    };

    const submit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        put(`/documents/${document.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Perubahan informasi dokumen berhasil disimpan!");
                closeModal();
            },
            onError: () => {
                toast.error("Gagal menyimpan perubahan.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-3xl overflow-hidden border border-white/60 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3.5 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-2xl">
                            <Edit3 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                                Perbarui Rincian Berkas
                            </span>
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                                Ubah Keterangan & Penerima Waris
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X size={22} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body Modal Lega */}
                <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50/40 flex-1">
                    <form
                        id="editDocumentForm"
                        onSubmit={submit}
                        className="space-y-6"
                    >
                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Nama Dokumen atau Harta Aset{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Jenis Dokumen{" "}
                                        <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) =>
                                            setData("category", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none cursor-pointer"
                                    >
                                        <option value="sertifikat_tanah">
                                            Sertifikat Tanah / Rumah (SHM/HGB)
                                        </option>
                                        <option value="bpkb">
                                            BPKB Kendaraan Bermotor
                                        </option>
                                        <option value="wasiat">
                                            Surat Wasiat / Akta Notaris
                                        </option>
                                        <option value="lainnya">
                                            Dokumen Penting Lainnya
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Nomor Sertifikat / Nomor BPKB
                                    </label>
                                    <input
                                        type="text"
                                        value={data.document_number}
                                        onChange={(e) =>
                                            setData(
                                                "document_number",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-mono font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Diwariskan Kepada Siapa?
                                    </label>
                                    <select
                                        value={data.beneficiary_id}
                                        onChange={(e) =>
                                            setData(
                                                "beneficiary_id",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none cursor-pointer"
                                    >
                                        <option value="">
                                            -- Belum Ditentukan / Milik Bersama
                                            --
                                        </option>
                                        {beneficiaries.map((b) => (
                                            <option key={b.id} value={b.id}>
                                                {b.name} (
                                                {b.relationship.replace(
                                                    "_",
                                                    "/",
                                                )}
                                                )
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                        Perkiraan Nilai Harta Saat Ini (Rupiah)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={data.estimated_value}
                                        onChange={(e) =>
                                            setData(
                                                "estimated_value",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-emerald-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Alamat atau Lokasi Fisik Harta / Tanah
                                </label>
                                <input
                                    type="text"
                                    value={data.asset_location}
                                    onChange={(e) =>
                                        setData(
                                            "asset_location",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-extrabold text-slate-800 mb-2">
                                    Catatan Letak Berkas Asli & Pesan untuk
                                    Keluarga
                                </label>
                                <textarea
                                    rows="3"
                                    value={data.notes}
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-medium text-slate-700 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all outline-none leading-relaxed"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer Modal */}
                <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm transition"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        form="editDocumentForm"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 shadow-lg transition disabled:opacity-50"
                    >
                        <CheckCircle2 size={18} strokeWidth={2.5} />
                        {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </div>
        </div>
    );
}
