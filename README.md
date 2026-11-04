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

`src/proxy.ts` memeriksa sesi dengan `getClaims()` pada setiap request ke `/preview/*`. Pengguna tanpa sesi dialihkan ke `/login?next=...`, lalu dikembalikan ke halaman yang dituju setelah berhasil masuk. Tombol keluar ada di header aplikasi.

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

- Next.js 16.4 (App Router, Turbopack, Cache Components)
- React 19.3, TypeScript 5.9
- Tailwind CSS 4.3 (token di `src/app/globals.css`)
- `motion` untuk animasi
- `perfect-freehand` untuk tinta kanvas
- `lucide-react` untuk ikon
- `@supabase/ssr` + `@supabase/supabase-js` untuk autentikasi

## Struktur

```
src/
  app/              rute App Router
  proxy.ts          penjaga sesi + refresh cookie Supabase
  components/
    marketing/      bagian landing page
    preview/        komponen layar pratinjau
    handwriting/    mesin kanvas (StrokeCanvas)
    app/            kerangka aplikasi (sidebar, header)
    auth/           form masuk + menu pengguna
    ui/             tombol, toggle tema, dsb.
  content/          teks landing page
  data/             data contoh pembelajar & materi
  lib/
    handwriting/    data goresan + pencocokan lokal
    supabase/       klien browser/server + konfigurasi env
supabase/
  migrations/       skema database + RLS
```

## Menulis di kanvas

`StrokeCanvas` memakai dua lapis: panduan goresan dari KanjiVG (garis putus-putus) dan tinta kanvas dengan tekanan. Setiap goresan pengguna dicocokkan secara lokal dengan goresan acuan (resampling + jarak rata-rata), sehingga tidak ada gambar yang dikirim ke server. Pengguna bisa memilih mode jiplak atau menulis bebas, meminta petunjuk, mengulang, atau menampilkan seluruh goresan.

## Kredit

- Data goresan kanji: [KanjiVG](https://kanjivg.tagaini.net/), CC BY-SA 3.0.
- Font: Geist, Zen Kaku Gothic New, Shippori Mincho (Google Fonts).
