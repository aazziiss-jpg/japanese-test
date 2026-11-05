const AUTH_ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Email atau kata sandi salah.",
  email_not_confirmed:
    "Email belum dikonfirmasi. Daftar dengan email ini untuk menerima kode verifikasi baru.",
  email_exists: "Email ini sudah terdaftar. Coba masuk atau atur ulang kata sandi.",
  user_already_exists:
    "Email ini sudah terdaftar. Coba masuk atau atur ulang kata sandi.",
  weak_password: "Kata sandi terlalu lemah. Gunakan minimal 8 karakter.",
  same_password: "Kata sandi baru harus berbeda dari kata sandi sebelumnya.",
  email_address_invalid: "Alamat email tidak valid.",
  signup_disabled: "Pendaftaran dinonaktifkan. Hubungi admin.",
  unexpected_failure:
    "Server Supabase gagal mengirim email verifikasi. Periksa pengaturan SMTP di dashboard, atau matikan Confirm email untuk sementara.",
  email_provider_disabled:
    "Provider email dinonaktifkan di Supabase. Aktifkan di Authentication → Providers.",
  otp_expired: "Kode salah atau sudah kedaluwarsa. Minta kode baru.",
  otp_disabled: "Verifikasi kode sedang tidak aktif. Hubungi admin.",
  validation_failed: "Kode verifikasi tidak valid. Periksa kembali.",
  over_email_send_rate_limit:
    "Email baru saja dikirim. Tunggu sebentar sebelum meminta kode lagi.",
  over_request_rate_limit:
    "Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.",
  too_many_requests: "Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.",
};

export function authErrorMessage(code: string | undefined, fallback: string) {
  if (!code) return fallback;
  return AUTH_ERROR_MESSAGES[code] ?? fallback;
}

/**
 * Detail teknis untuk membantu diagnosis saat pengembangan. Tidak pernah
 * ditampilkan di build produksi.
 */
export function authErrorDetail(error: { code?: string; message?: string }) {
  if (process.env.NODE_ENV === "production") return null;

  const parts = [error.code, error.message].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : null;
}
