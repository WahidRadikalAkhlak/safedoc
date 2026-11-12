import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, KeyRound, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function ResetTwoFactorModal({ isOpen, onClose }) {
    const { data, setData, post, errors, reset, clearErrors } = useForm({
        password: "",
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

        post("/security-center/reset-2fa", {
            onSuccess: () => {
                toast.success(
                    "Barcode QR baru berhasil dibuat! Silakan pindai dengan HP Anda.",
                );
                closeModal();
            },
            onError: () => {
                toast.error("Kata sandi salah. Mohon periksa kembali.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-xl overflow-hidden border border-white/60 flex flex-col animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-2xl">
                            <KeyRound size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 block">
                                Pengaturan HP Pengaman (2FA)
                            </span>
                            <h2 className="text-xl font-black tracking-tight mt-0.5">
                                Pindah HP / Buat Barcode QR Baru
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body Modal */}
                <form
                    onSubmit={submit}
                    className="p-6 sm:p-8 space-y-5 bg-slate-50/40"
                >
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
                        <AlertTriangle
                            size={20}
                            className="text-amber-600 shrink-0 mt-0.5"
                        />
                        <p className="text-xs font-semibold text-amber-900 leading-relaxed">
                            Setelah Anda menekan tombol di bawah, kode OTP di HP
                            lama tidak akan dipakai lagi dan Anda akan langsung
                            diarahkan ke layar{" "}
                            <strong>Scan Barcode QR Baru</strong>.
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                        <label className="block text-sm font-extrabold text-slate-800 mb-2">
                            Masukkan Kata Sandi Brankas Anda{" "}
                            <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Ketik kata sandi login Anda..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 font-bold text-slate-800 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition"
                            required
                            autoFocus
                        />
                        {errors.password && (
                            <p className="text-rose-500 text-xs font-bold mt-2">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 shadow-lg text-sm transition disabled:opacity-50"
                        >
                            <CheckCircle2 size={17} />
                            {isSubmitting
                                ? "Memproses..."
                                : "Tampilkan Barcode QR Baru"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
