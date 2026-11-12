import React, { useState, useEffect } from "react";
import {
    X,
    HelpCircle,
    FolderLock,
    Users,
    KeyRound,
    BookOpen,
    Layers,
    ShieldCheck,
    Activity,
    UserCog,
    CheckCircle2,
    Sparkles,
    Lock,
} from "lucide-react";

const GUIDES = {
    dashboard: {
        title: "Brankas Dokumen & Sertifikat",
        subtitle: "Modul Penyimpanan Fisik Digital Terenkripsi AES-256",
        icon: FolderLock,
        purpose:
            "Halaman ini berfungsi sebagai lemari besi utama untuk menyimpan salinan digital dari dokumen berharga milik Pak Nyoman seperti Sertifikat Hak Milik (SHM) Tanah, BPKB Kendaraan, Akta Notaris, hingga Surat Berharga. Setiap file yang diunggah otomatis diacak dengan algoritma militer AES-256 sehingga tidak dapat dibuka oleh pihak luar meskipun hardisk server diambil.",
        steps: [
            {
                title: '1. Klik Tombol "+ Upload Dokumen"',
                desc: "Tekan tombol biru di pojok kanan atas halaman untuk membuka formulir penyimpanan brankas baru.",
            },
            {
                title: "2. Isi Identitas & Kategori Berkas",
                desc: 'Masukkan nama aset yang jelas (contoh: "SHM Tanah Kavling Palu Timur"), pilih kategori dokumen, dan masukkan Nomor Sertifikat/BPKB.',
            },
            {
                title: "3. Tentukan Ahli Waris & Estimasi Nilai Aset",
                desc: 'Pilih siapa ahli waris yang berhak atas dokumen tersebut di kolom "Alokasikan ke Ahli Waris", lalu isi estimasi nilai pasar aset (Rp) dan lokasinya.',
            },
            {
                title: "4. Pilih File & Enkripsi",
                desc: 'Unggah file berformat PDF, JPG, atau PNG (maksimal 5 MB), tambahkan catatan letak dokumen fisik asli di rumah/bank, lalu klik "Enkripsi & Simpan".',
            },
        ],
        tips: 'Sangat disarankan mendaftarkan nama keluarga terlebih dahulu di menu "Ahli Waris & Alokasi" agar saat mengunggah dokumen, Anda bisa langsung menautkan pemilik warisnya.',
    },
    "estate-summary": {
        title: "Ikhtisar Eksekutif & Surat Induk Warisan",
        subtitle: "Pusat Komando Kekayaan Bersih & Cetak Dokumen Induk Wasiat",
        icon: Layers,
        purpose:
            "Halaman ini menyajikan rekapitulasi menyeluruh dari seluruh isi brankas Pak Nyoman. Sistem otomatis menjumlahkan nilai seluruh aset dokumen ditambah piutang (hak tagih), lalu dikurangi kewajiban (utang) untuk menampilkan Kekayaan Bersih (Net Estate Value) serta porsi pembagian untuk masing-masing ahli waris.",
        steps: [
            {
                title: "1. Evaluasi Kartu Kekayaan Bersih",
                desc: "Periksa total nilai aset dokumen, total piutang yang harus ditagih keluarga, serta kewajiban utang yang harus dilunasi terlebih dahulu.",
            },
            {
                title: "2. Tinjau Porsi Masing-Masing Ahli Waris",
                desc: "Lihat tabel distribusi untuk memastikan setiap istri/anak sudah mendapatkan alokasi dokumen, PIN kredensial, dan amanat yang adil.",
            },
            {
                title: "3. Cek Berkas yang Belum Dialokasikan",
                desc: 'Jika masih ada indikator dokumen yang "Belum Dialokasikan", Anda dapat kembali ke menu Brankas Dokumen untuk mengatur penerimanya.',
            },
            {
                title: '4. Buka & Cetak "Surat Induk Warisan"',
                desc: 'Klik tombol "Buka Surat Induk Warisan" di kanan atas untuk menghasilkan naskah surat resmi yang merangkum seluruh harta dan panduan klaim bagi keluarga/notaris.',
            },
        ],
        tips: "Anda dapat mencetak Surat Induk Warisan ini secara berkala atau menyimpannya sebagai PDF untuk dititipkan kepada Notaris kepercayaan keluarga.",
    },
    beneficiaries: {
        title: "Manajemen Ahli Waris & Penerima Wasiat",
        subtitle: "Direktori Keluarga, Kuasa Hukum & Pemetaan Hak Waris",
        icon: Users,
        purpose:
            "Halaman ini digunakan untuk mendaftarkan anggota keluarga inti (Istri, Anak Kandung, Saudara) maupun Notaris/Kuasa Hukum yang berhak menerima distribusi aset dan amanat dari brankas Pak Nyoman.",
        steps: [
            {
                title: '1. Klik Tombol "+ Tambah Ahli Waris"',
                desc: "Buka formulir pendaftaran penerima wasiat di pojok kanan atas halaman.",
            },
            {
                title: "2. Lengkapi Identitas Sesuai KTP",
                desc: "Masukkan Nama Lengkap, pilih status hubungan keluarga (Istri/Suami, Anak, Saudara, atau Notaris), dan isi 16 digit NIK KTP (otomatis dienkripsi).",
            },
            {
                title: "3. Masukkan Kontak Aktif & Amanat Khusus",
                desc: "Isi nomor WhatsApp/telepon dan email aktif untuk keperluan verifikasi notaris, lalu tuliskan pesan amanat pribadi untuk orang tersebut.",
            },
            {
                title: "4. Pantau Portofolio Warisan per Orang",
                desc: 'Klik tombol "Rincian" pada kartu ahli waris untuk melihat daftar lengkap sertifikat, BPKB, dan total nilai Rupiah yang diwariskan kepadanya.',
            },
        ],
        tips: 'Menghapus nama ahli waris tidak akan menghapus dokumen sertifikat Anda; dokumen tersebut hanya akan kembali berstatus "Belum Dialokasikan".',
    },
    credentials: {
        title: "Brankas Kredensial, Polis & PIN Rahasia",
        subtitle:
            "Penyimpanan Kode Akses Rekening, Asuransi & Kombinasi Brankas Fisik",
        icon: KeyRound,
        purpose:
            "Sering kali keluarga kesulitan mencairkan deposito, mengklaim asuransi jiwa, atau membuka brankas besi di rumah karena tidak mengetahui nomor polis dan kombinasi PIN-nya. Halaman ini menyimpan seluruh kode rahasia tersebut dengan enkripsi penuh.",
        steps: [
            {
                title: '1. Klik "+ Simpan Kredensial Baru"',
                desc: "Buka modal input kredensial rahasia di bagian kanan atas halaman.",
            },
            {
                title: "2. Pilih Kategori & Institusi",
                desc: "Pilih jenis kredensial (Rekening Bank, Polis Asuransi, Brankas Fisik/SDB, Investasi, atau Akun Digital) dan ketik nama bank/lokasinya.",
            },
            {
                title: "3. Masukkan Nomor Akun & PIN/Password",
                desc: "Isi Nomor Rekening/Polis serta PIN atau kode kombinasi kunci. Seluruh karakter PIN akan disembunyikan dengan sensor titik-titik.",
            },
            {
                title: "4. Tuliskan Panduan Klaim / Letak Kunci Fisik",
                desc: "Jelaskan secara spesifik di mana kunci cadangan disimpan atau siapa nama petugas bank/agen asuransi yang harus dihubungi keluarga.",
            },
        ],
        tips: 'Gunakan ikon "Mata" pada kartu untuk mengintip PIN, atau klik ikon "Salin" untuk menyalin nomor rekening/PIN langsung ke clipboard.',
    },
    testaments: {
        title: "Surat Wasiat, Amanat & Catatan Piutang/Utang",
        subtitle:
            "Arsip Pesan Terakhir, Suksesi Bisnis & Neraca Tagihan Keluarga",
        icon: BookOpen,
        purpose:
            "Halaman ini adalah tempat Pak Nyoman menuliskan surat wasiat naratif, instruksi kelanjutan bisnis keluarga, daftar piutang (uang Pak Nyoman yang dipinjam orang lain agar bisa ditagih keluarga), serta daftar kewajiban/utang yang harus diselesaikan.",
        steps: [
            {
                title: '1. Klik "+ Tulis Amanat Baru"',
                desc: "Tekan tombol di kanan atas untuk mulai menulis lembar wasiat atau catatan keuangan baru.",
            },
            {
                title: "2. Pilih Kategori Amanat",
                desc: "Pilih apakah catatan ini berupa Amanat Keluarga, Instruksi Bisnis, Catatan Piutang (Hak Tagih), atau Kewajiban/Utang.",
            },
            {
                title: "3. Isi Pihak Terkait & Nilai Nominal (Jika Ada)",
                desc: "Jika mencatat piutang atau utang, tuliskan nama debitur/saksi dan jumlah nominal Rupiahnya agar terhitung otomatis di Ikhtisar Kekayaan.",
            },
            {
                title: "4. Baca & Cetak Lembar Resmi",
                desc: 'Klik tombol "Baca & Cetak" pada kartu wasiat untuk membuka tampilan surat resmi yang siap dicetak ke kertas atau PDF.',
            },
        ],
        tips: "Pisahkan antara catatan Piutang dan Kewajiban Utang agar keluarga memiliki pedoman hukum dan finansial yang terang benderang.",
    },
    "security-center": {
        title: "Pusat Keamanan & Integritas SHA-256",
        subtitle: "Pemindai Keaslian File Fisik & Manajemen Perangkat 2FA",
        icon: ShieldCheck,
        purpose:
            "Memastikan tidak ada satu pun file terenkripsi di dalam server yang rusak, hilang, atau diubah secara diam-diam (tampering), sekaligus tempat mengelola perangkat Google Authenticator Anda.",
        steps: [
            {
                title: '1. Klik "Pindai Integritas SHA-256"',
                desc: "Sistem akan mendekripsi sementara setiap file di memori dan mencocokkan sidik jari digital (checksum SHA-256) dengan catatan asli saat diunggah.",
            },
            {
                title: "2. Periksa Status Tabel Integritas",
                desc: 'Pastikan seluruh dokumen berstatus hijau "TERVERIFIKASI UTUH".',
            },
            {
                title: "3. Reset QR 2FA Saat Ganti HP Baru",
                desc: 'Jika Anda mengganti smartphone, klik "Ganti Perangkat / Reset QR", masukkan password brankas, dan pindai QR Code baru.',
            },
        ],
        tips: "Lakukan pemindaian integritas secara berkala setelah mengunggah dokumen-dokumen berharga baru.",
    },
    "activity-logs": {
        title: "Riwayat Aktivitas & Audit Trail",
        subtitle: "Kotak Hitam (Blackbox) Perekam Jejak Akses Real-Time",
        icon: Activity,
        purpose:
            "Mencatat setiap aktivitas yang terjadi di dalam brankas tanpa terkecuali—mulai dari login, percobaan OTP 2FA yang gagal, hingga siapa dan kapan sebuah dokumen dilihat atau diunduh.",
        steps: [
            {
                title: "1. Gunakan Filter Kategori Log",
                desc: 'Saring catatan berdasarkan "Akses Dokumen", "Keamanan & 2FA", atau "Peringatan Kritis" untuk mendeteksi aktivitas mencurigakan.',
            },
            {
                title: "2. Periksa Alamat IP & Jenis Perangkat",
                desc: "Amati kolom IP Address dan sistem operasi/browser yang mengakses brankas Anda.",
            },
            {
                title: '3. Klik "Detail" untuk Inspeksi Teknis',
                desc: "Tekan tombol Detail di sebelah kanan baris tabel untuk melihat waktu presisi hingga detik beserta kode checksum SHA-256 berkas.",
            },
        ],
        tips: "Log audit ini bersifat permanen (immutable) dan tidak dapat dihapus dari antarmuka pengguna demi menjamin keabsahan forensik.",
    },
    profile: {
        title: "Pengaturan Profil & Kata Sandi Utama",
        subtitle: "Manajemen Identitas Pemilik Brankas & Kredensial Login",
        icon: UserCog,
        purpose:
            "Mengelola data identitas utama pemilik brankas (Nama Lengkap sesuai KTP, Email, Nomor HP) serta memperbarui kata sandi utama (Master Password) brankas.",
        steps: [
            {
                title: "1. Perbarui Informasi Identitas",
                desc: 'Ubah nama, email, atau nomor kontak pada panel pertama lalu klik "Simpan Profil".',
            },
            {
                title: "2. Rotasi Kata Sandi Berkala",
                desc: "Masukkan password saat ini dan password baru minimal 8 karakter kombinasi huruf dan angka pada panel kedua.",
            },
        ],
        tips: "Gunakan kata sandi yang unik dan berbeda dari password email atau media sosial Anda.",
    },
};

export default function PageGuideModal({
    isOpen,
    onClose,
    currentUrl = "/dashboard",
}) {
    const detectKeyFromUrl = (url) => {
        if (url.startsWith("/estate-summary")) return "estate-summary";
        if (url.startsWith("/beneficiaries")) return "beneficiaries";
        if (url.startsWith("/credentials")) return "credentials";
        if (url.startsWith("/testaments")) return "testaments";
        if (url.startsWith("/security-center")) return "security-center";
        if (url.startsWith("/activity-logs")) return "activity-logs";
        if (url.startsWith("/profile")) return "profile";
        return "dashboard";
    };

    const [activeTab, setActiveTab] = useState(detectKeyFromUrl(currentUrl));

    useEffect(() => {
        if (isOpen) {
            setActiveTab(detectKeyFromUrl(currentUrl));
        }
    }, [isOpen, currentUrl]);

    if (!isOpen) return null;

    const guide = GUIDES[activeTab] || GUIDES.dashboard;
    const ActiveIcon = guide.icon;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 backdrop-blur-md transition-all duration-300">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.65)] w-full max-w-4xl overflow-hidden border border-white/50 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Surat Panduan */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl">
                            <HelpCircle size={26} strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[10px] font-black uppercase tracking-widest border border-sky-400/20">
                                    Dokumen Panduan & SOP Resmi
                                </span>
                            </div>
                            <h2 className="text-xl font-black tracking-tight mt-1">
                                Petunjuk Penggunaan & Langkah Input SafeDoc
                            </h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                </div>

                {/* Body: Navigasi Modul Kiri + Isi Surat Panduan Kanan */}
                <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                    {/* Daftar Halaman di Kiri */}
                    <div className="w-full md:w-64 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200/80 p-4 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-1.5 shrink-0">
                        <p className="hidden md:block px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                            Pilih Panduan Halaman
                        </p>
                        {Object.entries(GUIDES).map(([key, item]) => {
                            const TabIcon = item.icon;
                            const isCurrent = activeTab === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-left whitespace-nowrap md:whitespace-normal transition-all ${
                                        isCurrent
                                            ? "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-md shadow-sky-500/20"
                                            : "text-slate-600 hover:bg-slate-200/60"
                                    }`}
                                >
                                    <TabIcon size={16} className="shrink-0" />
                                    <span className="truncate">
                                        {item.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Lembar Penjelasan & Langkah Input */}
                    <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 bg-white">
                        {/* Judul Halaman yang Dijelaskan */}
                        <div className="flex items-start gap-4 pb-5 border-b border-slate-100">
                            <div className="p-3.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 shrink-0">
                                <ActiveIcon size={28} strokeWidth={2.5} />
                            </div>
                            <div>
                                <span className="text-[11px] font-black uppercase tracking-widest text-sky-600">
                                    {guide.subtitle}
                                </span>
                                <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                                    {guide.title}
                                </h3>
                            </div>
                        </div>

                        {/* Bagian 1: Penjelasan Fungsi Halaman */}
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                                <Sparkles size={14} className="text-sky-500" />
                                Apa Fungsi Halaman Ini?
                            </h4>
                            <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                {guide.purpose}
                            </p>
                        </div>

                        {/* Bagian 2: Langkah-Langkah Menginput & Mengelola */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">
                                Langkah-Langkah Menginput & Menggunakan Halaman
                                Ini:
                            </h4>
                            <div className="grid grid-cols-1 gap-3">
                                {guide.steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3.5 hover:border-sky-200 transition"
                                    >
                                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0 mt-0.5">
                                            <CheckCircle2
                                                size={18}
                                                strokeWidth={2.5}
                                            />
                                        </div>
                                        <div>
                                            <h5 className="text-sm font-extrabold text-slate-800">
                                                {step.title}
                                            </h5>
                                            <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bagian 3: Tips Keamanan Pak Nyoman */}
                        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                            <Lock
                                size={18}
                                className="text-amber-600 shrink-0 mt-0.5"
                            />
                            <div className="text-xs font-semibold text-amber-900 leading-relaxed">
                                <strong className="font-black uppercase tracking-wider block mb-0.5">
                                    Catatan Penting & Rekomendasi Terbaik:
                                </strong>
                                {guide.tips}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Modal */}
                <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
                    <span className="text-xs font-bold text-slate-400">
                        Standar Keamanan: AES-256 + SHA-256 + 2FA Google
                        Authenticator
                    </span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 text-xs shadow-md transition"
                    >
                        Saya Mengerti, Tutup Panduan
                    </button>
                </div>
            </div>
        </div>
    );
}
