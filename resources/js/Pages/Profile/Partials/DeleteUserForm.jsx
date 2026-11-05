import React, { useRef, useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => setConfirmingUserDeletion(true);

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy("/profile", {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => {
                toast.error("Password salah!");
                passwordInput.current.focus();
            },
            onFinish: () => reset(),
        });
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-xl font-black text-rose-600 tracking-tight">
                    Hapus Akun Permanen
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                    Sekali akun dihapus, seluruh sumber daya, kunci dekripsi
                    2FA, dan dokumen akan dihancurkan.
                </p>
            </header>

            <button
                onClick={confirmUserDeletion}
                className="px-6 py-3 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-sm rounded-xl transition"
            >
                Hancurkan Akun Brankas
            </button>

            {/* Modal Kritis Custom */}
            {confirmingUserDeletion && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md transition-all">
                    <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] w-full max-w-lg overflow-hidden border border-white/50 animate-in zoom-in-95">
                        <div className="p-6 bg-rose-50/50 border-b border-slate-100 flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl animate-pulse shadow-lg">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2.5"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-rose-700">
                                    Konfirmasi Penghancuran
                                </h2>
                                <p className="text-sm font-medium text-rose-500/80">
                                    Masukkan password untuk melanjutkan.
                                </p>
                            </div>
                        </div>
                        <form onSubmit={deleteUser} className="p-6">
                            <input
                                ref={passwordInput}
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 font-semibold text-slate-700 focus:bg-white focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 outline-none"
                                placeholder="Masukkan password vault Anda..."
                                autoFocus
                                required
                            />
                            {errors.password && (
                                <p className="text-rose-500 text-xs font-bold mt-1.5 ml-1">
                                    {errors.password}
                                </p>
                            )}

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-3 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-3 rounded-2xl font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-lg disabled:opacity-50"
                                >
                                    {processing
                                        ? "Menghapus..."
                                        : "Hancurkan Akun"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
