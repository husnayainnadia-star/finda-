# FINDA – Find What You Lost

Platform kehilangan dan penemuan barang untuk kampus, sekolah, masjid, dan tempat umum.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (auth, database, storage)
- **Lucide React** (icons)

---

## Cara Menjalankan (Mode Demo)

Aplikasi sudah bisa dijalankan tanpa Supabase menggunakan **Demo Mode** — data tersimpan di localStorage browser.

```bash
cd finda-app
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

> Di mode demo, gunakan email & password apa saja untuk login/register.

---

## Setup Supabase (Production)

### 1. Buat project di Supabase
Buka [https://supabase.com](https://supabase.com) dan buat project baru.

### 2. Jalankan SQL setup
Buka **SQL Editor** di dashboard Supabase, lalu copy-paste dan jalankan isi file `supabase-setup.sql`.

### 3. Update environment variables
Edit file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_DEMO_MODE=false
```

Dapatkan URL dan anon key dari:  
**Supabase Dashboard → Project Settings → API**

---

## Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Atau gunakan [https://vercel.com/import](https://vercel.com/import) dan hubungkan repo GitHub.

Tambahkan environment variables di Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_DEMO_MODE` = `false`

---

## Struktur Folder

```
src/
├── app/
│   ├── splash/          # Onboarding
│   ├── auth/            # Login & Register
│   ├── home/            # Halaman utama
│   ├── lost/
│   │   ├── new/         # Form laporan hilang
│   │   ├── success/     # Halaman sukses
│   │   └── [id]/        # Detail laporan hilang
│   ├── found/
│   │   ├── new/         # Form laporan temuan
│   │   ├── success/     # Halaman sukses
│   │   └── [id]/        # Detail laporan temuan
│   ├── search/          # Find & Match
│   ├── notifications/   # Notifikasi
│   └── profile/         # Profil pengguna
├── components/
│   ├── ui/              # Komponen UI reusable
│   └── layout/          # Komponen layout
├── context/             # Auth & Reports context
├── lib/                 # Supabase client, constants, matching
└── types/               # TypeScript types
```

---

## Fitur

- ✅ Splash screen & onboarding
- ✅ Autentikasi (login/register/logout)
- ✅ Laporan barang hilang
- ✅ Laporan barang temuan
- ✅ Upload foto barang
- ✅ Pencarian & filter laporan
- ✅ Sistem pencocokan (matching) otomatis
- ✅ Halaman detail laporan
- ✅ Notifikasi
- ✅ Profil pengguna
- ✅ Mode demo (tanpa Supabase)
- ✅ Responsive mobile-first
- ✅ Bottom navigation
