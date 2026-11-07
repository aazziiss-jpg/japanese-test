# Sumi · 墨

Platform belajar bahasa Jepang untuk JLPT N5–N4: huruf (hiragana, katakana, kanji), kosakata, tata bahasa, latihan menulis di kanvas, pengulangan berjeda, dan sensei suara berbasis AI.

Antarmuka berbahasa Indonesia, materi berbahasa Jepang. Desain minimalis: kertas hangat, tinta hitam, aksen vermilion yang dipakai seperlunya.

## Fase

**Fase 1 — selesai.** Design system, landing page, dan tujuh layar pratinjau dengan data contoh. **Autentikasi Supabase** sudah aktif: rute pembelajaran hanya bisa dibuka setelah masuk.

| Rute | Isi |
| --- | --- |
| `/` | Landing: hero, metode, latihan menulis, sensei, kurikulum, kebiasaan, CTA |
| `/login` | Masuk dengan Supabase Auth |
| `/preview` | Beranda pembelajar: ringkasan, unit, misi harian |
| `/preview/learn` | Daftar unit N5 |
| `/preview/lesson` | Latihan pilihan ganda dengan pembahasan |
| `/preview/writing` | Lab menulis (kanvas + penilaian lokal) |
| `/preview/review` | Sesi ulang kartu (FSRS) |
| `/preview/sensei` | Percakapan suara dengan sensei |
| `/preview/profile` | Statistik, peta kebiasaan, lencana |

Fase berikutnya: skema Supabase + RLS, mesin SRS, konten N5, lalu Gemini Live untuk sensei.

## Supabase

Autentikasi memakai Supabase Auth dengan sesi berbasis cookie lewat `@supabase/ssr`.

1. Buat proyek di [dashboard Supabase](https://supabase.com/dashboard).
2. Salin **Project URL** dan **publishable key** (proyek lama: anon key) dari *Project Settings → API* ke `.env.local`:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   # atau NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```

3. Di *Authentication → Providers*, pastikan provider **Email** aktif. Biarkan **Confirm email** menyala agar pendaftaran wajib verifikasi kode.
4. Buka *Authentication → Email Templates*, lalu tambahkan `{{ .Token }}` ke dua template berikut. Tanpa ini, email hanya berisi tautan dan alur kode tidak akan bekerja.

   **Confirm signup** — subjek `Kode verifikasi Sumi`:

   ```html
   <h2>Selamat datang di Sumi</h2>
   <p>Masukkan kode 6 angka ini untuk mengaktifkan akunmu:</p>
   <p style="font-size: 28px; letter-spacing: 6px"><b>{{ .Token }}</b></p>
   <p>Kode berlaku 60 menit. Abaikan email ini jika kamu tidak mendaftar.</p>
   ```

   **Reset password** — subjek `Kode pemulihan kata sandi Sumi`:

   ```html
   <h2>Atur ulang kata sandi</h2>
   <p>Masukkan kode 6 angka ini di halaman lupa kata sandi:</p>
   <p style="font-size: 28px; letter-spacing: 6px"><b>{{ .Token }}</b></p>
   <p>Kode berlaku 60 menit. Abaikan email ini jika kamu tidak memintanya.</p>
   ```

   Untuk pengembangan cepat, *Confirm email* juga boleh dimatikan — form daftar akan langsung masuk tanpa kode. Namun alur verifikasi email di halaman `/login` hanya bisa diuji saat opsi itu menyala.
5. Buat akun awal lewat *Authentication → Users → Add user* bila perlu.
6. Jalankan ulang `pnpm dev`.

### Jika pendaftaran gagal: `Error sending confirmation email`

Pesan ini berarti permintaan pembuatan akun diterima, tetapi Supabase gagal mengirim email verifikasi. Aplikasi menampilkannya sebagai:

> Server Supabase gagal mengirim email verifikasi. Periksa pengaturan SMTP di dashboard, atau matikan Confirm email untuk sementara.

Penyebab umum:

- Proyek baru masih memakai **SMTP bawaan Supabase**, yang kuotanya sangat kecil dan sering menolak pengiriman.
- Kuota email per jam habis karena beberapa percobaan berturut-turut. Tunggu sekitar satu jam.
- Kredensial SMTP kustom salah.

Perbaikannya, pilih salah satu:

1. **Atur SMTP sendiri** — *Authentication → Settings → SMTP Settings*. Isi host, port, user, dan password dari penyedia seperti Resend, Brevo, atau Mailtrap.
2. **Matikan Confirm email sementara** — *Authentication → Providers → Email*. Pendaftaran langsung memberi sesi tanpa email.
3. **Tunggu kuota pulih**, lalu coba lagi.

Detail teknis error juga muncul sebagai baris kecil di bawah pesan saat `pnpm dev` (tidak tampil di build produksi). Log lengkapnya ada di *Authentication → Logs* pada dashboard.

> Uji diagnostik yang pernah dijalankan membuat akun belum terkonfirmasi `diagnostik+sumi@example.com` dan `diagnostik+sumi3@example.com`. Hapus keduanya di *Authentication → Users* bila tidak diperlukan.

Penjagaan rute sekarang berjalan di browser lewat `PreviewAuthGate` (`src/components/auth/preview-auth-gate.tsx`). Pengguna tanpa sesi dialihkan ke `/login?next=...`, lalu dikembalikan ke halaman yang dituju setelah berhasil masuk. Tombol keluar ada di header aplikasi.

Karena aplikasi juga dibundel ke Android, sesi disimpan di `localStorage` (bukan cookie server). Setelah pengguna pernah masuk, aplikasi tetap bisa dibuka saat offline; konten belajar seluruhnya lokal dan tidak sensitif.

### Alur akun di `/login`

- **Masuk** — email + kata sandi. Ada tombol tampilkan/sembunyikan kata sandi dan tautan *Lupa kata sandi?*.
- **Daftar** — email, kata sandi, ulangi kata sandi. Supabase mengirim kode 6 angka; masukkan kode itu untuk mengaktifkan akun. Kode bisa dikirim ulang setelah 60 detik.
- **Lupa kata sandi** — masukkan email, lalu kode 6 angka dan kata sandi baru. Setelah tersimpan, kamu langsung masuk dengan kata sandi baru.

### Skema database

Migrasi awal ada di `supabase/migrations/20261104000000_init.sql`. Buka *SQL Editor* di dashboard, tempel seluruh isinya, lalu **Run**. Dengan Supabase CLI: `supabase link --project-ref <ref>` lalu `supabase db push`.

| Tabel | Isi |
| --- | --- |
| `profiles` | Data pembelajar (nama, level, target harian, XP, streak), 1:1 dengan `auth.users` |
| `login_events` | Riwayat masuk/keluar yang ditampilkan aplikasi |
| `units`, `lessons` | Materi kurikulum; hanya bisa dibaca pengguna yang login |
| `lesson_progress` | Status, skor terbaik, dan jumlah percobaan per pelajaran |
| `srs_cards`, `review_logs` | Kartu ulangan berjeda (field FSRS) dan riwayat ulangannya |
| `writing_attempts` | Riwayat latihan menulis beserta akurasi |
| `daily_activity` | Agregat harian untuk streak, XP, dan peta kebiasaan |

Catatan:

- Register/login tetap ditangani `auth.users`. Trigger `on_auth_user_created` otomatis membuat baris `profiles` saat akun baru dibuat, dan `profiles.created_at` menjadi waktu pendaftaran.
- RLS aktif di semua tabel: pengguna hanya bisa membaca/menulis barisnya sendiri. `units` dan `lessons` hanya punya kebijakan baca; penulisan konten lewat `service_role`.
- Riwayat login juga tersedia di `auth.users.last_sign_in_at` dan audit log dashboard. `login_events` dipakai untuk riwayat perangkat/waktu yang terlihat di aplikasi.
- Pencatatan otomatis ke `login_events`, `lesson_progress`, dan `daily_activity` belum disambungkan ke UI; skemanya sudah siap untuk fase berikutnya.

Untuk produksi, isi *Site URL* dan *Redirect URLs* di *Authentication → URL Configuration*.

## Menjalankan

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build
```

## Tumpukan

- Next.js 16.4 (App Router, Turbopack) dengan static export
- React 19.3, TypeScript 5.9
- Tailwind CSS 4.3 (token di `src/app/globals.css`)
- `motion` untuk animasi
- `perfect-freehand` untuk tinta kanvas
- `lucide-react` untuk ikon
- `@supabase/supabase-js` untuk autentikasi di sisi klien
- Capacitor 8 untuk aplikasi Android offline

## Struktur

```
src/
  app/              rute App Router
  fonts.ts          font Jepang self-hosted (subset)
  components/
    marketing/      bagian landing page
    preview/        komponen layar pratinjau
    handwriting/    mesin kanvas (StrokeCanvas)
    app/            kerangka aplikasi + shell native
    auth/           form masuk, menu pengguna, penjaga rute
    ui/             tombol, toggle tema, dsb.
  content/          teks landing page
  data/             data contoh pembelajar & materi
  lib/
    handwriting/    data goresan + pencocokan lokal
    supabase/       klien browser + konfigurasi env
supabase/
  migrations/       skema database + RLS
android/            proyek native Capacitor
assets/             sumber ikon & splash
```

## Aplikasi Android

Build web statis, salin ke proyek native, lalu buat APK debug:

```bash
export JAVA_HOME="/path/to/jdk-24"
pnpm app:apk
```

APK ada di `android/app/build/outputs/apk/debug/app-debug.apk`. Pasang ke perangkat/emulator:

```bash
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n id.sumi.app/.MainActivity
```

`pnpm app:sync` hanya membangun dan menyinkronkan aset, sedangkan `pnpm app:open` membuka proyek di Android Studio. Rute bersarang seperti `/preview/learn/` ditangani `StaticRouteWebViewClient` agar deep link dan reload memuat `index.html` rute yang benar.

### Debug di HP Android

1. Aktifkan **Opsi pengembang** (ketuk *Nomor build* 7×), lalu nyalakan **Debugging USB**.
2. Sambungkan HP, pilih mode *Transfer file*, dan setujui dialog sidik jari RSA.
3. Pastikan perangkat terdeteksi (bukan `unauthorized`):

   ```bash
   adb devices
   ```

   Di Windows, `adb` biasanya ada di `%LOCALAPPDATA%\Android\Sdk\platform-tools\adb.exe`.

4. Pasang APK debug seperti di atas, buka aplikasi, lalu buka `chrome://inspect/#devices` di Chrome desktop. Klik **inspect** pada entri `https://localhost/preview/learn/` untuk membuka DevTools (Console, Network, Sources, breakpoint TypeScript).
5. Log native dan `console.log` WebView:

   ```bash
   adb logcat -c
   adb logcat -s Capacitor:V Capacitor/Console:V chromium:V AndroidRuntime:E
   ```

6. Jika entri WebView tidak muncul di `chrome://inspect`, teruskan port secara manual:

   ```bash
   adb forward tcp:9222 localabstract:webview_devtools_remote_<pid>
   ```

   Lalu buka `http://127.0.0.1:9222`.

### Live reload

Untuk melihat perubahan kode langsung di HP tanpa membangun ulang APK:

```bash
# Terminal 1 — server dev yang bisa diakses perangkat
pnpm dev:host

# Terminal 2 — arahkan WebView ke server dev, lalu pasang
# (adb reverse membuat localhost HP menuju localhost komputer lewat USB)
adb reverse tcp:3000 tcp:3000
CAP_SERVER_URL="http://localhost:3000" pnpm app:live
```

Di PowerShell, set variabel lingkungan lebih dulu:

```powershell
$env:CAP_SERVER_URL = "http://localhost:3000"
pnpm app:live
```

`app:live` hanya menyinkronkan konfigurasi dan memasang APK debug; `next dev` yang menyajikan halamannya. Build debug mengizinkan HTTP lewat `android/app/src/debug/AndroidManifest.xml`. Setelah selesai, hapus variabel `CAP_SERVER_URL` dan jalankan `pnpm app:sync` lagi agar APK kembali memakai aset lokal (offline).

Catatan: `http://localhost:3000` adalah origin berbeda dari `https://localhost`, jadi sesi dan progres di localStorage tidak ikut terbawa saat mode live reload. Tambahkan juga `http://localhost:3000` ke *Redirect URLs* Supabase bila menguji login.

## Menulis di kanvas

`StrokeCanvas` memakai dua lapis: panduan goresan dari KanjiVG (garis putus-putus) dan tinta kanvas dengan tekanan. Setiap goresan pengguna dicocokkan secara lokal dengan goresan acuan (resampling + jarak rata-rata), sehingga tidak ada gambar yang dikirim ke server. Pengguna bisa memilih mode jiplak atau menulis bebas, meminta petunjuk, mengulang, atau menampilkan seluruh goresan.

## Kredit

- Data goresan kanji: [KanjiVG](https://kanjivg.tagaini.net/), CC BY-SA 3.0.
- Font: Geist, Zen Kaku Gothic New, Shippori Mincho. Font Jepang di-subset dan di-self-host lewat `next/font/local` agar aplikasi tetap tampil benar saat offline.
