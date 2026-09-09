# Grafika Pro

Website pemasaran Grafika Pro dengan Vue 3, Vite, TypeScript, Tailwind CSS, Lucide Vue Next, dan Vue Router. Desain editorial menggunakan Gloock, Manrope, warna brand, dan aset logo asli. Hasil produksi sepenuhnya statis; tidak membutuhkan Node.js di shared hosting.

## Development

```bash
npm install
npm run dev
```

## Validasi dan build

```bash
npm run typecheck
node scripts/check-pages.mjs
npm run build
npm run preview
```

`dist/` adalah hasil yang di-upload ke cPanel. Script pemeriksaan halaman merender komponen hanya saat pengujian; tidak menambahkan SSR ke website produksi.

## Halaman

- `/`: beranda
- `/fitur`: Inti, Gudang, Produksi, SDM, Vendor, AI
- `/cara-kerja`: workflow dan Program Penataan
- `/solusi`: kebutuhan industri percetakan
- `/harga`: paket, periode harga, add-on, Harga Setia
- `/faq`: pencarian dan accordion pertanyaan
- `/kontak`: penyusun pesan konsultasi, pilihan paket dari halaman harga
- Route lain menampilkan halaman 404 di dalam aplikasi.

## Struktur

```text
src/
  components/   Navbar/footer ada di App.vue; tombol, heading, dan CTA reusable
  data/         site.ts, features.ts, workflow.ts, pricing.ts, faq.ts
  views/        Satu komponen untuk setiap halaman
  styles/       global.css: font lokal, token warna, layout, responsive
  router.ts     Route, judul, deskripsi, fokus, dan scroll
public/
  images/       Logo dan fotografi
  fonts/        Font lokal dan lisensi OFL
  downloads/    Katalog 2026
  .htaccess     Apache history fallback
scripts/
  check-pages.mjs
```

## Mengubah kontak

Edit `src/data/site.ts`:

```ts
export const contact = {
  whatsapp: '6281234567890', // contoh format saja, ganti nomor resmi tanpa + atau spasi
  email: 'alamat-resmi-anda',
  domain: 'https://domain-resmi-anda',
}
```

Nilai awal sengaja kosong: katalog tidak mencantumkan kontak. Sebelum nomor diisi, form hanya menyusun dan menyalin pesan, tidak mengklaim mengirim lead. Setelah nomor valid diisi, tombol menuju WhatsApp tersedia. Tidak ada backend atau penyimpanan data formulir. Link canonical diaktifkan setelah domain diisi; jangan memasukkan domain contoh sebagai domain publik.

## Konten dan harga

- Paket, harga bulanan/tahunan, biaya penataan: `src/data/pricing.ts`.
- Modul: `src/data/features.ts`.
- Workflow dan implementasi: `src/data/workflow.ts`.
- FAQ: `src/data/faq.ts`.
- Navigasi, kontak, URL katalog: `src/data/site.ts`.
- Solusi per industri: array `industries` dalam `src/views/Solutions.vue`.

Sumber produk/harga: katalog milik pengguna, 2026. Harga belum termasuk PPN. Multi-cabang tidak dipromosikan sebagai fitur aktif. Notifikasi WhatsApp otomatis belum dipastikan dalam katalog. Tidak ada testimoni, logo klien, rating, atau screenshot produk rekaan. Screenshot aplikasi dapat ditambahkan saat aset asli tersedia.

## Mengganti gambar dan font

- Logo latar terang: `public/images/brand/logo.png`.
- Logo latar gelap: `public/images/brand/logo-white.png`.
- Foto: `public/images/printing/offset-press.jpg` (foto ilustrasi industri, bukan lokasi pelanggan Grafika Pro).
- Katalog: `public/downloads/katalog-grafika-pro-2026.pdf`.
- Font Gloock dan Manrope self-hosted, lisensi OFL disertakan. Format TTF asli dipertahankan.

Foto berasal dari Unsplash: https://unsplash.com/s/photos/photocopier, ID foto `photo-1729944950511-e9c71556cfd4`. Aset disimpan lokal agar tidak bergantung pada URL foto saat runtime. Ganti dengan foto percetakan asli jika tersedia. Logo asli beresolusi penuh tetap ada di root proyek; salinan web diperkecil.

## SEO

Title/deskripsi dasar, Open Graph, Twitter metadata, favicon, semantic HTML, serta metadata per route tersedia. Ini SPA statis; preview sosial yang tidak menjalankan JavaScript membaca metadata dasar `index.html`. Untuk social preview unik per route kelak, tambahkan prerender saat build. Setelah domain final tersedia, lengkapi canonical, OG URL/image, dan sitemap sebelum publikasi.

## Deployment

Lihat [DEPLOYMENT.md](DEPLOYMENT.md). Jangan upload `node_modules`, source katalog asli, atau source proyek ke `public_html`. Upload isi `dist/`, termasuk `.htaccess`.
