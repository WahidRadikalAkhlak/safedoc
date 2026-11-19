import React, { useState, useEffect } from "react";
import {
    X,
    HelpCircle,
    FolderLock,
    Briefcase,
    Users,
    KeyRound,
    BookOpen,
    Layers,
    ShieldCheck,
    Activity,
    UserCog,
    UserPlus,
    CheckCircle2,
    Sparkles,
    Lock,
} from "lucide-react";

const GUIDES = {
    "estate-summary": {
        title: "Ringkasan Harta & Surat Induk",
        subtitle: "Pusat Kendali Harta Bersih & Cetak Surat Induk Warisan",
        icon: Layers,
        purpose:
            "Halaman ini merangkum seluruh isi brankas keluarga secara otomatis. Sistem menjumlahkan perkiraan nilai dokumen aset ditambah uang piutang (hak tagih keluarga), lalu dikurangi tanggungan utang untuk menampilkan Total Harta Bersih Keluarga beserta pembagian per ahli waris.",
        steps: [
            {
                title: "1. Periksa Kartu Total Harta Bersih",
                desc: "Amati rincian gabungan nilai dokumen sertifikat/BPKB, daftar uang piutang yang harus ditagih, serta kewajiban utang yang harus dilunasi.",
            },
            {
                title: "2. Cek Peringatan Dokumen yang Belum Dibagi",
                desc: 'Jika muncul kotak peringatan kuning, klik "Atur Penerima Sekarang" untuk menentukan ahli waris pada dokumen yang masih kosong.',
            },
            {
                title: "3. Klik Angka pada Tabel Pembagian Keluarga",
                desc: "Anda dapat mengklik langsung tombol jumlah Berkas, Akun/PIN, atau Pesan pada baris nama keluarga untuk membuka daftar aset milik orang tersebut.",
            },
            {
                title: '4. Buka & Cetak "Surat Induk Warisan"',
                desc: 'Tekan tombol emas "Buka & Cetak Surat Induk" di kanan atas untuk mencetak dokumen rekapitulasi resmi siap cetak berukuran A4.',
            },
        ],
        tips: "Cetak atau simpan Surat Induk Warisan sebagai PDF setiap kali Anda selesai memperbarui data harta penting.",
    },
    dashboard: {
        title: "Lemari Dokumen & Sertifikat",
        subtitle: "Penyimpanan Berkas Berharga Terenkripsi AES-256",
        icon: FolderLock,
        purpose:
            "Berfungsi sebagai lemari besi utama untuk menyimpan salinan digital dari dokumen berharga seperti Sertifikat Hak Milik (SHM) Tanah, BPKB Kendaraan, Akta Notaris, hingga Surat Berharga. Setiap file otomatis dikunci dengan sandi AES-256.",
        steps: [
            {
                title: '1. Klik Tombol "+ Simpan Dokumen Baru"',
                desc: "Tekan tombol biru di pojok kanan atas halaman untuk membuka formulir penyimpanan berkas.",
            },
            {
                title: "2. Isi Nama Dokumen, Jenis & Nomor Surat",
                desc: 'Masukkan nama aset yang mudah dikenali keluarga (contoh: "SHM Rumah Palu Timur"), pilih jenis dokumen, dan ketik nomor sertifikatnya.',
            },
            {
                title: "3. Pilih Penerima Waris & Perkiraan Nilai",
                desc: "Tentukan siapa anggota keluarga yang berhak menerima aset tersebut, isi perkiraan nilai pasarnya (Rupiah), serta tulis alamat/lokasi fisiknya.",
            },
            {
                title: "4. Unggah File & Catat Lokasi Map Asli",
                desc: 'Pilih file PDF/JPG/PNG (maks. 5 MB), tulis petunjuk letak berkas fisik aslinya di rumah, lalu klik "Simpan ke Brankas".',
            },
        ],
        tips: 'Daftarkan nama istri/anak terlebih dahulu di menu "Keluarga & Ahli Waris" agar namanya langsung muncul di pilihan penerima waris.',
    },
    "personnel-records": {
        title: "Arsip Kepegawaian (SIMPEG)",
        subtitle: "Cadangan SK Pangkat, Jabatan, KGB & Cetak PDF Riwayat",
        icon: Briefcase,
        purpose:
            "Halaman ini berfungsi sebagai brankas cadangan data kepegawaian agar apabila server SIMPEG pusat mengalami gangguan atau sedang dalam perawatan, seluruh SK, riwayat pangkat/jabatan, dan file scan tetap aman terenkripsi serta siap dicetak menjadi PDF kapan saja.",
        steps: [
            {
                title: '1. Klik Tombol "+ Tambah Berkas SK"',
                desc: "Tekan tombol biru di pojok kanan atas untuk membuka formulir penyimpanan arsip kepegawaian baru.",
            },
            {
                title: "2. Isi Nama SK, Jenis & Nomor Keputusan",
                desc: "Pilih kategori dokumen (SK CPNS/PNS, SK Pangkat, SK Jabatan, KGB, atau Diklat/Sertifikat), lalu masukkan judul dan nomor SK-nya.",
            },
            {
                title: "3. Lengkapi TMT, Pangkat/Golongan & Jabatan",
                desc: "Isi tanggal penetapan, TMT (Terhitung Mulai Tanggal), pangkat/golongan ruang, jabatan/unit kerja, serta instansi yang menetapkan.",
            },
            {
                title: "4. Unggah File Scan & Cetak Rekap PDF",
                desc: 'Lampirkan file scan SK (PDF/JPG/PNG) jika ada, lalu gunakan tombol "Unduh PDF" per berkas atau "Cetak / Download PDF Rekap Riwayat" untuk mencetak seluruh riwayat kepegawaian.',
            },
        ],
        tips: "Pastikan TMT dan pangkat/golongan terisi rapi agar tabel rekapitulasi riwayat kepegawaian terlihat lengkap saat dicetak ke PDF.",
    },
    beneficiaries: {
        title: "Keluarga & Ahli Waris",
        subtitle: "Daftar Penerima Hak Waris & Kuasa Hukum Keluarga",
        icon: Users,
        purpose:
            "Digunakan untuk mendaftarkan identitas anggota keluarga inti (Istri/Suami, Anak Kandung, Kerabat) maupun Notaris yang berhak menerima pembagian dokumen aset, akses rekening, dan pesan wasiat.",
        steps: [
            {
                title: '1. Klik "+ Tambah Anggota Keluarga"',
                desc: "Buka formulir pendaftaran keluarga di pojok kanan atas halaman.",
            },
            {
                title: "2. Lengkapi Nama, Hubungan & NIK KTP",
                desc: "Masukkan nama lengkap sesuai KTP, pilih status hubungan keluarga, serta isi nomor NIK KTP dan nomor WhatsApp aktif.",
            },
            {
                title: "3. Tuliskan Pesan Wasiat Pribadi",
                desc: "Isi pesan atau amanat khusus untuk anggota keluarga tersebut yang nantinya akan ikut tercetak di Surat Induk Warisan.",
            },
            {
                title: '4. Klik "Rincian Lengkap" pada Kartu Keluarga',
                desc: "Pantau seluruh dokumen sertifikat, nomor rekening/PIN, dan surat wasiat yang diwariskan kepada orang tersebut dalam satu layar.",
            },
        ],
        tips: 'Menghapus nama anggota keluarga tidak akan menghapus file sertifikat Anda; status berkas hanya kembali menjadi "Belum Ditentukan".',
    },
    credentials: {
        title: "Rekening, Polis & PIN",
        subtitle: "Penyimpanan Nomor Rekening, Asuransi & Kunci Brankas Fisik",
        icon: KeyRound,
        purpose:
            "Menyimpan informasi rahasia non-berkas seperti nomor rekening deposito, nomor polis asuransi jiwa, akun investasi, hingga kode kombinasi brankas besi di rumah atau Safe Deposit Box (SDB) bank.",
        steps: [
            {
                title: '1. Klik "+ Simpan Rekening / PIN"',
                desc: "Buka formulir penyimpanan kode rahasia di kanan atas halaman.",
            },
            {
                title: "2. Pilih Jenis Data & Nama Bank/Asuransi",
                desc: "Pilih kategori (Rekening Bank, Polis Asuransi, Brankas Rumah/SDB, dll), pilih penerima warisnya, dan ketik nama bank atau lokasinya.",
            },
            {
                title: "3. Masukkan Nomor Rekening/Polis & Kode PIN",
                desc: "Ketik nomor rekening/polis beserta kode PIN atau putaran kunci brankas. Kode PIN otomatis disembunyikan dengan sensor titik-titik.",
            },
            {
                title: "4. Catat Petunjuk Klaim & Letak Kunci Fisik",
                desc: "Jelaskan di mana buku tabungan asli atau kunci cadangan disimpan serta siapa petugas bank/agen asuransi yang harus dihubungi.",
            },
        ],
        tips: 'Gunakan tombol "Lihat PIN" untuk mengintip kode sandi, atau klik "Salin" untuk menyalin nomor rekening dan PIN secara instan.',
    },
    testaments: {
        title: "Surat Wasiat & Piutang",
        subtitle:
            "Pesan Wasiat Keluarga, Petunjuk Usaha & Catatan Utang-Piutang",
        icon: BookOpen,
        purpose:
            "Tempat menuliskan surat wasiat keluarga secara naratif, petunjuk kelanjutan usaha, daftar uang piutang (hak tagih keluarga kepada peminjam), serta daftar tanggungan utang yang wajib dilunasi.",
        steps: [
            {
                title: '1. Klik "+ Tulis Wasiat / Catatan"',
                desc: "Tekan tombol di kanan atas untuk mulai menulis lembar wasiat atau catatan keuangan baru.",
            },
            {
                title: "2. Pilih Jenis Catatan & Penerima",
                desc: "Pilih apakah catatan tersebut berupa Pesan Keluarga, Pesan Bisnis, Uang Piutang, atau Tanggungan Utang.",
            },
            {
                title: "3. Isi Nama Pihak/Saksi & Jumlah Rupiah",
                desc: "Jika mencatat piutang atau utang, masukkan nama peminjam/saksi dan jumlah nominal Rupiahnya agar terhitung otomatis di Ringkasan Harta.",
            },
            {
                title: '4. Klik "Baca & Cetak Surat"',
                desc: "Buka lembar surat resmi dari setiap catatan wasiat dan cetak langsung ke kertas A4 atau simpan sebagai PDF.",
            },
        ],
        tips: 'Ubah status catatan menjadi "Sudah Lunas / Sudah Diselesaikan" apabila piutang atau utang tersebut telah beres.',
    },
    "security-center": {
        title: "Cek Keamanan Berkas",
        subtitle: "Pemeriksaan Keaslian File (SHA-256) & Pengaturan HP 2FA",
        icon: ShieldCheck,
        purpose:
            "Memastikan tidak ada satu pun file sertifikat di dalam server yang rusak atau berubah sejak pertama kali disimpan, sekaligus mengatur ulang Barcode QR Google Authenticator saat berganti HP.",
        steps: [
            {
                title: '1. Klik "Periksa Keaslian Seluruh Berkas"',
                desc: 'Sistem akan memindai segel digital SHA-256 seluruh dokumen dan memastikan statusnya hijau "ASLI & UTUH".',
            },
            {
                title: "2. Pantau Grafik Isi Lemari Dokumen",
                desc: "Lihat rincian jumlah berkas dan kapasitas penyimpanan berdasarkan kategori dokumen.",
            },
            {
                title: '3. Klik "Pindah HP / Buat Barcode QR Baru"',
                desc: "Apabila Anda membeli HP baru, tekan tombol ini, masukkan kata sandi brankas, lalu pindai Barcode QR baru di HP baru Anda.",
            },
        ],
        tips: "Lakukan pemeriksaan keaslian berkas secara berkala setelah mengunggah dokumen-dokumen penting.",
    },
    "activity-logs": {
        title: "Catatan Riwayat Akses",
        subtitle: "Rekaman Transparan Siapa & Kapan Membuka Brankas",
        icon: Activity,
        purpose:
            "Mencatat seluruh aktivitas di dalam brankas secara otomatis—mulai dari waktu masuk akun, penambahan data, pembukaan dokumen, pengunduhan sertifikat, hingga peringatan salah kode OTP.",
        steps: [
            {
                title: "1. Pilih Filter Kategori Riwayat",
                desc: 'Saring catatan berdasarkan "Aktivitas Dokumen & Harta", "Riwayat Masuk & OTP", atau "Peringatan Penting".',
            },
            {
                title: "2. Periksa Perangkat & Alamat IP",
                desc: "Amati jenis perangkat (HP/Laptop) dan browser yang digunakan saat mengakses brankas.",
            },
            {
                title: '3. Klik "Lihat Bukti" pada Baris Tabel',
                desc: "Buka rincian lengkap aktivitas beserta jam presisi hingga satuan detik dan kode segel SHA-256 berkas.",
            },
        ],
        tips: "Catatan riwayat ini bersifat permanen dan tidak dapat dihapus demi menjamin keamanan audit keluarga.",
    },
    "user-access": {
        title: "Manajemen Akses Akun (Backdoor)",
        subtitle: "Gerbang Eksklusif Pembuatan & Pencabutan Akun Login Brankas",
        icon: UserPlus,
        purpose:
            "Karena pendaftaran publik ditutup demi keamanan tingkat tinggi, halaman ini adalah satu-satunya tempat bagi Pemilik Brankas untuk membuatkan akun login baru bagi anggota keluarga atau notaris kepercayaan, mengganti kata sandi mereka, atau mencabut hak akses sewaktu-waktu.",
        steps: [
            {
                title: '1. Klik Tombol "+ Buka Akses Baru"',
                desc: "Tekan tombol biru di pojok kanan atas untuk mendaftarkan pengguna baru yang diizinkan masuk ke sistem brankas.",
            },
            {
                title: "2. Isi Nama, Email Login & Kata Sandi Awal",
                desc: 'Masukkan nama lengkap pengguna, alamat email aktif, dan buatkan kata sandi awal (minimal 8 karakter) lalu klik "Beri Akses Sistem".',
            },
            {
                title: "3. Pandu Keluarga Saat Login Pertama Kali",
                desc: "Berikan email dan sandi awal tersebut kepada keluarga. Saat mereka login pertama kali, sistem otomatis mewajibkan mereka memindai Barcode QR Google Authenticator di HP mereka masing-masing.",
            },
            {
                title: "4. Edit Sandi atau Cabut Akses Kapan Saja",
                desc: 'Gunakan tombol "Edit Sandi" jika anggota keluarga lupa kata sandi, atau klik "Cabut Akses" untuk menutup akses login mereka secara permanen.',
            },
        ],
        tips: 'Pantau kolom "Status Pengaman 2FA" pada tabel untuk memastikan akun keluarga yang baru dibuat sudah berstatus hijau "Aktif Terhubung".',
    },
    profile: {
        title: "Profil & Ganti Sandi",
        subtitle: "Pengaturan Identitas Pemilik Utama & Kata Sandi Brankas",
        icon: UserCog,
        purpose:
            "Mengelola data identitas resmi pemilik brankas (Nama sesuai KTP, Email, Nomor HP, dan NIK) yang akan tercetak otomatis pada Surat Induk Warisan, serta mengganti kata sandi utama.",
        steps: [
            {
                title: "1. Perbarui Identitas Diri Pemilik",
                desc: 'Lengkapi nama lengkap, email, nomor WhatsApp, dan NIK KTP pada bagian pertama lalu klik "Simpan Perubahan Identitas".',
            },
            {
                title: "2. Ganti Kata Sandi Utama Secara Berkala",
                desc: "Masukkan kata sandi lama dan kata sandi baru minimal 8 karakter pada bagian kedua.",
            },
        ],
        tips: "Gunakan kata sandi utama yang kuat dan berbeda dari kata sandi media sosial atau email harian Anda.",
    },
};

export default function PageGuideModal({
    isOpen,
    onClose,
    currentUrl = "/dashboard",
}) {
    const detectKeyFromUrl = (url) => {
        if (url.startsWith("/estate-summary")) return "estate-summary";
        if (url.startsWith("/personnel-records")) return "personnel-records";
        if (url.startsWith("/beneficiaries")) return "beneficiaries";
        if (url.startsWith("/credentials")) return "credentials";
        if (url.startsWith("/testaments")) return "testaments";
        if (url.startsWith("/security-center")) return "security-center";
        if (url.startsWith("/activity-logs")) return "activity-logs";
        if (url.startsWith("/user-access")) return "user-access";
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
            <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.65)] w-full max-w-4xl overflow-hidden border border-white/60 flex flex-col max-h-[92vh] animate-in zoom-in-95 fade-in duration-300">
                {/* Header Surat Panduan */}
                <div className="flex justify-between items-center p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-sky-500/20 border border-sky-400/30 text-sky-300 rounded-2xl">
                            <HelpCircle size={26} strokeWidth={2.5} />
                        </div>
                        <div>
                            <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-[10px] font-black uppercase tracking-widest border border-sky-400/20">
                                Lembar Panduan & SOP Resmi
                            </span>
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

                        {/* Bagian 3: Tips Keamanan */}
                        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                            <Lock
                                size={18}
                                className="text-amber-600 shrink-0 mt-0.5"
                            />
                            <div className="text-xs font-semibold text-amber-900 leading-relaxed">
                                <strong className="font-black uppercase tracking-wider block mb-0.5">
                                    Tips Penting untuk Pemilik Brankas:
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
