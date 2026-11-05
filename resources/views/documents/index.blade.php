<x-app-layout>
    <x-slot name="header">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h2 class="font-extrabold text-2xl text-slate-900 leading-tight tracking-tight">
                    {{ __('Brankas Dokumen Rahasia') }}
                </h2>
                <p class="text-sm text-slate-500 mt-1">Data Anda tersimpan dengan proteksi enkripsi AES-256 end-to-end.</p>
            </div>
            <!-- Ganti kelas tombol lama dengan gradient SafeDoc -->
            <a href="{{ route('documents.create') }}" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0052CC] to-[#00A3FF] border border-transparent rounded-xl font-bold text-sm text-white shadow-lg shadow-sky-500/25 hover:brightness-110 transition">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
                Upload Dokumen Baru
            </a>
        </div>
    </x-slot>

    <div class="py-10 bg-slate-50/50 min-h-[calc(100vh-140px)]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

            <!-- Flash Notification -->
            @if (session('success'))
                <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between shadow-sm">
                    <div class="flex items-center gap-3">
                        <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span class="text-sm font-semibold">{{ session('success') }}</span>
                    </div>
                </div>
            @endif

            <!-- 3 Stat Widgets -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Total Berkas</span>
                        <h4 class="text-3xl font-extrabold text-slate-900 mt-1">{{ $documents->total() }}</h4>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/></svg>
                    </div>
                </div>

                <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Kapasitas Terpakai</span>
                        <h4 class="text-3xl font-extrabold text-slate-900 mt-1">
                            {{ round($documents->sum('file_size') / 1024 / 1024, 2) }} <span class="text-lg font-medium text-slate-500">MB</span>
                        </h4>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z"/></svg>
                    </div>
                </div>

                <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div>
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Status Proteksi</span>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            <h4 class="text-xl font-bold text-slate-900">AES-256 Aktif</h4>
                        </div>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                    </div>
                </div>
            </div>

            <!-- Tabel Daftar Berkas -->
            <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                @if ($documents->isEmpty())
                    <div class="text-center py-16 px-4">
                        <div class="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                        </div>
                        <h3 class="text-lg font-bold text-slate-900">Belum ada dokumen yang disimpan</h3>
                        <p class="text-sm text-slate-500 mt-1 max-w-sm mx-auto">Mulai amankan sertifikat tanah, BPKB, wasiat atau berkas privat Anda ke dalam brankas sekarang.</p>
                        <div class="mt-6">
                            <a href="{{ route('documents.create') }}" class="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition">
                                + Simpan Dokumen Pertama
                            </a>
                        </div>
                    </div>
                @else
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-50/80 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                                    <th class="py-4 px-6">Nama Dokumen</th>
                                    <th class="py-4 px-6">Kategori</th>
                                    <th class="py-4 px-6">Nomor Dokumen</th>
                                    <th class="py-4 px-6">Ukuran</th>
                                    <th class="py-4 px-6 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 text-sm font-medium">
                                @foreach ($documents as $doc)
                                    <tr class="hover:bg-slate-50/50 transition">
                                        <td class="py-4 px-6 text-slate-900 flex items-center gap-3">
                                            <div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                                            </div>
                                            <div>
                                                <span class="font-bold text-slate-900 block">{{ $doc->title }}</span>
                                                <span class="text-xs text-slate-400">{{ $doc->original_filename }}</span>
                                            </div>
                                        </td>
                                        <td class="py-4 px-6">
                                            @php
                                                $badges = [
                                                    'sertifikat_tanah' => 'bg-amber-50 text-amber-700 border-amber-200',
                                                    'bpkb' => 'bg-blue-50 text-blue-700 border-blue-200',
                                                    'wasiat' => 'bg-purple-50 text-purple-700 border-purple-200',
                                                    'lainnya' => 'bg-slate-100 text-slate-700 border-slate-200',
                                                ];
                                            @endphp
                                            <span class="inline-block px-2.5 py-1 text-xs font-semibold rounded-lg border {{ $badges[$doc->category] ?? $badges['lainnya'] }}">
                                                {{ strtoupper(str_replace('_', ' ', $doc->category)) }}
                                            </span>
                                        </td>
                                        <td class="py-4 px-6 text-slate-600 font-mono text-xs">
                                            {{ $doc->document_number ?? '-' }}
                                        </td>
                                        <td class="py-4 px-6 text-slate-500 text-xs">
                                            {{ round($doc->file_size / 1024, 1) }} KB
                                        </td>
                                        <td class="py-4 px-6 text-right space-x-2">
                                            <a href="{{ route('documents.download', $doc) }}" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs transition">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                                Unduh
                                            </a>
                                            <form action="{{ route('documents.destroy', $doc) }}" method="POST" class="inline" onsubmit="return confirm('Peringatan: Dokumen akan dihapus permanen dari server vault. Lanjutkan?')">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-xs transition">
                                                    Hapus
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                    <div class="p-4 border-t border-slate-100">
                        {{ $documents->links() }}
                    </div>
                @endif
            </div>

        </div>
    </div>
</x-app-layout>
