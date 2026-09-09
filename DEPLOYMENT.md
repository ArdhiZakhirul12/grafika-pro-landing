# Deploy Grafika Pro ke cPanel

## 1. Lengkapi informasi publik

Isi nomor WhatsApp, email, dan domain resmi di `src/data/site.ts`. Nomor WhatsApp menggunakan kode negara, tanpa `+`, spasi, atau tanda hubung. Selama kosong, konsultasi hanya menyiapkan pesan untuk disalin.

Tinjau harga, copy, dan aset sebelum publikasi. Website tidak menyediakan pengiriman email, penyimpanan lead, atau endpoint PHP.

## 2. Build di komputer

Gunakan Node.js 20.19+ atau versi LTS yang kompatibel.

```bash
npm install
npm run build
```

Build menjalankan pengecekan TypeScript kemudian menghasilkan `dist/`. Node.js hanya diperlukan di komputer saat development/build, bukan di shared hosting.

## 3. Upload

1. Buka cPanel → File Manager → `public_html`.
2. Backup website yang sudah ada sebelum menggantinya.
3. Aktifkan **Show Hidden Files** agar `.htaccess` terlihat.
4. Upload **isi** folder `dist/`, bukan membungkusnya dalam folder `dist`.
5. Pastikan `public_html/index.html`, `public_html/.htaccess`, `assets/`, `images/`, `fonts/`, dan `downloads/` tersedia.
6. Jika memakai arsip ZIP yang disiapkan, upload lalu Extract di `public_html`.
7. Buka domain, lalu hapus cache bila versi lama masih muncul.

Struktur:

```text
public_html/
  index.html
  .htaccess
  favicon.png
  assets/
  images/
  fonts/
  downloads/
```

## 4. Periksa route langsung

Buka `/fitur`, `/cara-kerja`, `/solusi`, `/harga`, `/faq`, dan `/kontak`, lalu refresh. Apache membutuhkan `mod_rewrite` dan izin `.htaccess` (`AllowOverride`) untuk mengarahkan URL Vue Router ke `index.html`.

Jika terjadi 404 saat refresh, periksa `.htaccess` ikut ter-upload dan `mod_rewrite` aktif. Jika server memberi error 500 karena directive `Options` dilarang, hapus baris `Options -MultiViews` lalu coba kembali; tanyakan aturan override kepada penyedia hosting bila masih gagal.

Ini konfigurasi untuk **root domain**. Untuk subfolder, sesuaikan `base` pada `vite.config.ts`, history base pada router, semua path aset root, dan `RewriteBase`. Jangan upload ke subfolder tanpa perubahan ini.

## 5. Pemeriksaan setelah upload

- Navigasi desktop/mobile dan tombol kembali browser.
- Setiap route bisa diakses langsung dan di-refresh.
- Harga bulanan/tahunan dan paket konsultasi sesuai.
- FAQ terbuka lewat klik maupun keyboard; pencarian bekerja.
- Logo, font lokal, foto, favicon, dan unduhan katalog tampil.
- Pesan konsultasi memuat paket pilihan; WhatsApp mengarah ke nomor resmi setelah konfigurasi diisi.
- Konten nyaman dibaca pada ponsel dan desktop.

Untuk URL tidak dikenal, aplikasi menampilkan halaman 404 dan metadata noindex. Fallback Apache tetap memberi HTTP 200 (soft 404), sesuai karakter SPA; HTTP 404 sebenarnya membutuhkan aturan server tambahan.
