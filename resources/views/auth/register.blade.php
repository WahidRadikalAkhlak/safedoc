<x-guest-layout>
    <div class="mb-6 text-center">
        <h2 class="text-2xl font-extrabold text-slate-900 tracking-tight">Pendaftaran Akun Brankas</h2>
        <p class="text-xs text-slate-500 mt-1">Lengkapi data verifikasi identitas Anda untuk perlindungan dokumen maksimal.</p>
    </div>

    <form method="POST" action="{{ route('register') }}" class="space-y-4">
        @csrf

        <!-- Nama Lengkap Sesuai KTP -->
        <div>
            <x-input-label for="name" :value="__('Nama Lengkap (Sesuai KTP)')" />
            <x-text-input id="name" class="block mt-1 w-full text-sm" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" placeholder="cth: Ahmad Fauzi" />
            <x-input-error :messages="$errors->get('name')" class="mt-1" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Email -->
            <div>
                <x-input-label for="email" :value="__('Alamat Email Aktif')" />
                <x-text-input id="email" class="block mt-1 w-full text-sm" type="email" name="email" :value="old('email')" required placeholder="nama@email.com" />
                <x-input-error :messages="$errors->get('email')" class="mt-1" />
            </div>

            <!-- Nomor HP / WhatsApp -->
            <div>
                <x-input-label for="phone_number" :value="__('Nomor WhatsApp / HP')" />
                <x-text-input id="phone_number" class="block mt-1 w-full text-sm" type="text" name="phone_number" :value="old('phone_number')" required placeholder="081234567890" />
                <x-input-error :messages="$errors->get('phone_number')" class="mt-1" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- NIK / No Identitas -->
            <div>
                <x-input-label for="nik" :value="__('Nomor Induk Kependudukan (NIK)')" />
                <x-text-input id="nik" class="block mt-1 w-full text-sm" type="text" name="nik" :value="old('nik')" required maxlength="16" placeholder="16 digit NIK resmi" />
                <x-input-error :messages="$errors->get('nik')" class="mt-1" />
            </div>

            <!-- Alamat Domisili -->
            <div>
                <x-input-label for="address" :value="__('Alamat Domisili Sesuai KTP')" />
                <x-text-input id="address" class="block mt-1 w-full text-sm" type="text" name="address" :value="old('address')" required placeholder="Kota, Provinsi" />
                <x-input-error :messages="$errors->get('address')" class="mt-1" />
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <!-- Password -->
            <div>
                <x-input-label for="password" :value="__('Password Vault')" />
                <x-text-input id="password" class="block mt-1 w-full text-sm" type="password" name="password" required autocomplete="new-password" placeholder="Min. 8 karakter" />
                <x-input-error :messages="$errors->get('password')" class="mt-1" />
            </div>

            <!-- Konfirmasi Password -->
            <div>
                <x-input-label for="password_confirmation" :value="__('Ulangi Password')" />
                <x-text-input id="password_confirmation" class="block mt-1 w-full text-sm" type="password" name="password_confirmation" required autocomplete="new-password" />
                <x-input-error :messages="$errors->get('password_confirmation')" class="mt-1" />
            </div>
        </div>

        <div class="pt-4 flex items-center justify-between">
            <a class="text-xs text-sky-600 hover:text-sky-800 font-medium underline" href="{{ route('login') }}">
                {{ __('Sudah punya akun? Masuk') }}
            </a>

            <button type="submit" class="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-[#0052CC] to-[#00A3FF] hover:brightness-110 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md shadow-sky-500/25 transition">
                {{ __('Daftar & Pasang 2FA') }} &rarr;
            </button>
        </div>
    </form>
</x-guest-layout>
