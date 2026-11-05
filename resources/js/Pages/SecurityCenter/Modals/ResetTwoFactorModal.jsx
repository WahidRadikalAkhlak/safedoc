import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { X, KeyRound, AlertTriangle } from "lucide-react";

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
                toast.success("Kunci 2FA direset! Silakan scan QR Code baru.");
                closeModal();
            },
            onError: () => {
                toast.error("Kata sandi salah atau gagal mereset 2FA.");
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-lg overflow-hidden border border-white/50 flex flex-col animate-in zoom-in-95 fade-in duration-300">
                {/* Header Modal */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-amber-50/40 relative overflow-hidden">
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl shadow-lg">
                            <KeyRound size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                                Reset Perangkat 2FA
                            </h2>
                            <p className="text-xs font-bold text-amber-600 mt-0.5">
                                Buat ulang QR Code Google Authenticator
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body Modal */}
                <form
                    onSubmit={submit}
                    className="p-6 space-y-5 bg-slate-50/30"
                >
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
                        <AlertTriangle
                            size={20}
                            className="text-amber-600 shrink-0 mt-0.5"
                        />
                        <p className="text-xs font-semibold text-amber-800 leading-relaxed">
                            Kode OTP pada HP lama Anda tidak akan berlaku lagi.
                            Anda akan diarahkan ke halaman pemindaian QR Code
                            baru setelah konfirmasi ini.
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                            Konfirmasi Password Brankas{" "}
                            <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Masukkan password akun Anda..."
                            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 font-semibold text-slate-700 focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition"
                            required
                            autoFocus
                        />
                        {errors.password && (
                            <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-5 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 text-sm transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 shadow-lg text-sm transition disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Memproses..."
                                : "Reset & Buat QR Baru"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
