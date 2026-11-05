<x-app-layout>
    <x-slot name="header">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="font-extrabold text-2xl text-slate-900 leading-tight">
                    {{ __('Simpan Dokumen Rahasia Baru') }}
                </h2>
                <p class="text-sm text-slate-500 mt-1">Dokumen akan langsung dienkripsi sebelum masuk ke penyimpanan server.</p>
            </div>
            <a href="{{ route('dashboard') }}" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition">
                &larr; Kembali ke Brankas
            </a>
        </div>
    </x-slot>

    <div class="py-10 bg-slate-50/50 min-h-[calc(100vh-140px)]">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- Tampilkan Peringatan Error Jika Ada Validasi yang Gagal -->
            @if ($errors->any())
                <div class="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 shadow-sm">
                    <div class="flex items-center gap-2 font-bold text-sm mb-2">
                        <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Gagal menyimpan dokumen:
                    </div>
                    <ul class="list-disc list-inside text-xs space-y-1 text-rose-700">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <div class="bg-white rounded-3xl border border-sky-100 shadow-xl shadow-slate-100/70 p-8">
                <form action="{{ route('documents.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                    @csrf

                    <div>
                        <x-input-label for="title" :value="__('Nama Dokumen / Keterangan')" class="font-bold text-slate-700" />
                        <x-text-input id="title" name="title" type="text" class="mt-2 block w-full rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500 text-sm" placeholder="cth: Sertifikat Hak Milik Rumah Palu" value="{{ old('title') }}" required />
                        <x-input-error :messages="$errors->get('title')" class="mt-1" />
                    </div>

                    <div>
                        <x-input-label for="category" :value="__('Kategori Dokumen')" class="font-bold text-slate-700" />
                        <select id="category" name="category" class="mt-2 block w-full rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500 text-sm py-2.5">
                            <option value="sertifikat_tanah" {{ old('category') == 'sertifikat_tanah' ? 'selected' : '' }}>Sertifikat Tanah / Properti</option>
                            <option value="bpkb" {{ old('category') == 'bpkb' ? 'selected' : '' }}>BPKB / Bukti Kendaraan</option>
                            <option value="wasiat" {{ old('category') == 'wasiat' ? 'selected' : '' }}>Surat Wasiat / Akta Notaris</option>
                            <option value="lainnya" {{ old('category') == 'lainnya' ? 'selected' : '' }}>Dokumen Rahasia Lainnya</option>
                        </select>
                        <x-input-error :messages="$errors->get('category')" class="mt-1" />
                    </div>

                    <div>
                        <x-input-label for="document_number" :value="__('Nomor Dokumen (Dienkripsi Otomatis)')" class="font-bold text-slate-700" />
                        <x-text-input id="document_number" name="document_number" type="text" class="mt-2 block w-full rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500 text-sm" placeholder="cth: No. Sertifikat / Nomor Rangka" value="{{ old('document_number') }}" />
                        <p class="text-[11px] text-slate-400 mt-1">Data nomor ini otomatis dienkripsi di dalam database.</p>
                        <x-input-error :messages="$errors->get('document_number')" class="mt-1" />
                    </div>

                    <div>
                        <x-input-label for="document_file" :value="__('Pilih File (PDF, JPG, PNG - Maksimal 5 MB)')" class="font-bold text-slate-700" />
                        <div class="mt-2 flex items-center justify-center w-full">
                            <label for="document_file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-sky-200 hover:border-sky-400 rounded-2xl cursor-pointer bg-sky-50/30 hover:bg-sky-50/60 transition">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-2 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                    </svg>
                                    <p class="mb-1 text-xs text-slate-600 font-semibold"><span class="text-sky-600 underline">Klik untuk memilih file</span> atau seret file ke sini</p>
                                    <p class="text-[11px] text-slate-400">PDF, JPG, JPEG, PNG (Maks. 5 MB)</p>
                                </div>
                                <input id="document_file" name="document_file" type="file" class="hidden" accept=".pdf,.jpg,.jpeg,.png" required onchange="updateFileName(this)" />
                            </label>
                        </div>
                        <p id="file-chosen" class="text-xs text-slate-600 font-medium mt-2 italic"></p>
                        <x-input-error :messages="$errors->get('document_file')" class="mt-1" />
                    </div>

                    <div>
                        <x-input-label for="notes" :value="__('Catatan Tambahan (Dienkripsi Otomatis)')" class="font-bold text-slate-700" />
                        <textarea id="notes" name="notes" rows="3" class="mt-2 block w-full rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500 text-sm" placeholder="Catatan rahasia terkait dokumen ini...">{{ old('notes') }}</textarea>
                        <x-input-error :messages="$errors->get('notes')" class="mt-1" />
                    </div>

                    <div class="flex items-center gap-4 pt-4 border-t border-slate-100">
                        <button type="submit" class="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0052CC] to-[#00A3FF] hover:brightness-110 font-bold text-white text-sm shadow-lg shadow-sky-500/25 transition">
                            Enkripsi & Simpan Dokumen
                        </button>
                        <a href="{{ route('dashboard') }}" class="text-xs font-semibold text-slate-500 hover:text-slate-800">
                            Batal
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        function updateFileName(input) {
            const fileNameDisplay = document.getElementById('file-chosen');
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
                fileNameDisplay.textContent = `File terpilih: ${file.name} (${fileSizeMB} MB)`;

                if (file.size > 5 * 1024 * 1024) {
                    fileNameDisplay.className = "text-xs font-bold text-rose-600 mt-2";
                    fileNameDisplay.textContent += " - Peringatan: Ukuran file melebihi batas 5 MB!";
                } else {
                    fileNameDisplay.className = "text-xs font-medium text-emerald-600 mt-2";
                }
            }
        }
    </script>
</x-app-layout>
