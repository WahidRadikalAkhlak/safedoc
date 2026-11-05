<x-guest-layout>
    <div class="text-center mb-6">
        <div class="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        </div>
        <h2 class="text-xl font-bold text-slate-900">Aktifkan Dua Faktor (2FA)</h2>
        <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Scan barcode ini menggunakan aplikasi <strong>Google Authenticator</strong> atau <strong>Microsoft Authenticator</strong> di HP Anda.</p>
    </div>

    <!-- Tampilan Barcode -->
    <div class="flex justify-center p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-4">
        <img src="data:image/svg+xml;base64,{{ $qrCodeSvg }}" alt="2FA QR Code" class="w-48 h-48">
    </div>

    <div class="text-center mb-6">
        <p class="text-[11px] text-slate-400">Atau masukkan kode kunci rahasia secara manual:</p>
        <code class="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded select-all">{{ $secret }}</code>
    </div>

    <form method="POST" action="{{ route('2fa.enable') }}" class="space-y-4">
        @csrf
        <div>
            <x-input-label for="code" :value="__('Masukkan 6 Digit Angka dari Authenticator')" class="text-center" />
            <x-text-input id="code" class="block mt-2 w-full text-center text-2xl tracking-widest font-mono font-bold" type="text" name="code" maxlength="6" autofocus required placeholder="000000" />
            <x-input-error :messages="$errors->get('code')" class="mt-2 text-center" />
        </div>

        <button type="submit" class="w-full py-3 bg-gradient-to-r from-[#0052CC] to-[#00A3FF] hover:brightness-110 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/25 transition">
            Verifikasi & Masuk ke Brankas
        </button>
    </form>
</x-guest-layout>
