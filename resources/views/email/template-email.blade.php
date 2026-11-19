<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi Alamat Email - SafeDoc</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">

    <!-- Container Utama -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; padding: 40px 16px;">
        <tr>
            <td align="center">

                <!-- Kartu Email -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 560px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06); border: 1px solid #e2e8f0;">

                    <!-- Header Banner -->
                    <tr>
                        <td align="center" style="background: linear-gradient(135deg, #0f172a 0%, #0284c7 100%); background-color: #0f172a; padding: 36px 24px;">
                            <div style="display: inline-block; background-color: #ffffff; padding: 10px 20px; border-radius: 14px; margin-bottom: 16px;">
                                <span style="font-size: 20px; font-weight: 800; color: #0284c7; letter-spacing: -0.5px;">Safe<span style="color: #0f172a;">Doc</span></span>
                            </div>
                            <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">
                                Verifikasi Alamat Email Anda
                            </h1>
                            <p style="margin: 8px 0 0; font-size: 13px; color: #bae6fd;">
                                Aktivasi Keamanan Brankas Digital AES-256
                            </p>
                        </td>
                    </tr>

                    <!-- Isi Konten -->
                    <tr>
                        <td style="padding: 36px 32px;">
                            <p style="margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: #334155;">
                                Halo <strong>{{ $user->name ?? 'Pengguna SafeDoc' }}</strong>,
                            </p>
                            <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.6; color: #475569;">
                                Terima kasih telah mendaftarkan akun di <strong>SafeDoc</strong>. Untuk melindungi dokumen berharga Anda dan mengaktifkan brankas pribadi, silakan klik tombol di bawah ini untuk memverifikasi bahwa alamat email ini milik Anda:
                            </p>

                            <!-- Tombol CTA Utama -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 28px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ $url }}" target="_blank" style="display: inline-block; background-color: #0284c7; background: linear-gradient(to right, #0052CC, #00A3FF); color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 15px 34px; border-radius: 12px; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);">
                                            Verifikasi Email Sekarang &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <!-- Kotak Informasi Keamanan -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border-left: 4px solid #0284c7; border-radius: 8px; padding: 14px 16px; margin-bottom: 24px;">
                                <tr>
                                    <td style="font-size: 13px; line-height: 1.5; color: #475569;">
                                        <strong>Catatan Keamanan:</strong> Tautan verifikasi ini hanya berlaku selama <strong>60 menit</strong>. Jika Anda tidak merasa membuat akun di SafeDoc, abaikan email ini.
                                    </td>
                                </tr>
                            </table>

                            <!-- Fallback Link Manual -->
                            <p style="margin: 0 0 8px; font-size: 12px; color: #64748b;">
                                Jika tombol di atas tidak berfungsi, salin dan tempel tautan berikut ke peramban (browser) Anda:
                            </p>
                            <p style="margin: 0; font-size: 12px; word-break: break-all; color: #0284c7;">
                                <a href="{{ $url }}" style="color: #0284c7; text-decoration: underline;">{{ $url }}</a>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0;">
                            <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; color: #64748b;">
                                SafeDoc Security Vault
                            </p>
                            <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                                &copy; {{ date('Y') }} SafeDoc. Simpan Aman, Akses Kapan Saja.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
