<x-guest-layout>
    <div class="text-center mb-6">
        <div class="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
        </div>
        <h2 class="text-xl font-bold text-slate-900">Pemeriksaan Keamanan 2 Langkah</h2>
        <p class="text-xs text-slate-500 mt-1">Buka aplikasi Authenticator di ponsel Anda dan masukkan kode 6-digit.</p>
    </div>

    <form method="POST" action="{{ route('2fa.verify') }}" class="space-y-5">
        @csrf

        <div>
            <x-text-input id="code" class="block w-full text-center text-3xl tracking-[0.3em] font-mono font-bold py-3" type="text" name="code" maxlength="6" autofocus required placeholder="000000" />
            <x-input-error :messages="$errors->get('code')" class="mt-2 text-center" />
        </div>

        <button type="submit" class="w-full py-3 bg-gradient-to-r from-[#0052CC] to-[#00A3FF] hover:brightness-110 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/25 transition">
            Konfirmasi Masuk
        </button>

        <div class="text-center pt-2">
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="text-xs text-slate-400 hover:text-slate-600 underline">
                    Batal & Keluar
                </button>
            </form>
        </div>
    </form>
</x-guest-layout>
