<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Simpan Dokumen Rahasia Baru - SafeDoc') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                <form action="{{ route('documents.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
                    @csrf

                    <div>
                        <x-input-label for="title" :value="__('Nama Dokumen / Keterangan')" />
                        <x-text-input id="title" name="title" type="text" class="mt-1 block w-full" placeholder="cth: Sertifikat Hak Milik Rumah Palu" required />
                    </div>

                    <div>
                        <x-input-label for="category" :value="__('Kategori Dokumen')" />
                        <select id="category" name="category" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                            <option value="sertifikat_tanah">Sertifikat Tanah / Properti</option>
                            <option value="bpkb">BPKB / Bukti Kepemilikan Kendaraan</option>
                            <option value="wasiat">Surat Wasiat / Akta Notaris</option>
                            <option value="lainnya">Dokumen Rahasia Lainnya</option>
                        </select>
                    </div>

                    <div>
                        <x-input-label for="document_number" :value="__('Nomor Dokumen (Dienkripsi Otomatis)')" />
                        <x-text-input id="document_number" name="document_number" type="text" class="mt-1 block w-full" placeholder="cth: No. Sertifikat / Nomor Rangka" />
                    </div>

                    <div>
                        <x-input-label for="document_file" :value="__('Pilih File (PDF, JPG, PNG - Maks 10MB)')" />
                        <input id="document_file" name="document_file" type="file" class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" required />
                    </div>

                    <div>
                        <x-input-label for="notes" :value="__('Catatan Tambahan (Dienkripsi Otomatis)')" />
                        <textarea id="notes" name="notes" rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="Catatan opsional..."></textarea>
                    </div>

                    <div class="flex items-center gap-4">
                        <x-primary-button>{{ __('Enkripsi & Simpan Dokumen') }}</x-primary-button>
                        <a href="{{ route('documents.index') }}" class="text-gray-600 hover:underline">Batal</a>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>
