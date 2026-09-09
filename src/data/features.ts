export const modules = [
 { id: 'inti', number: '01', name: 'Semua berawal dari order.', tag: 'MODUL INTI · SEMUA PAKET', description: 'Fondasi operasional percetakan Anda. Dari penawaran pertama sampai tahu berapa laba setiap pesanan.', items: [
 ['Penjualan & kasir','Buat quotation, ubah menjadi transaksi, gabungkan banyak produk dalam satu nota, dan catat DP serta pelunasan.','Receipt'],
 ['Produk, proses & HPP','Atur resep produk, bahan per proses, mesin, dan harga bertingkat untuk retail, reseller, atau pelanggan tetap.','Calculator'],
 ['Customer terpusat','Simpan profil, kategori, dan histori transaksi. Atur harga serta minimum DP sesuai kategori pelanggan.','Users'],
 ['Bahan & mesin','Stok berkurang saat produksi berjalan. Batch FIFO membantu perhitungan HPP mengikuti biaya bahan yang dipakai.','Boxes'],
 ['Keuangan & laporan','Pantau multi-kas, pengeluaran harian, piutang, titipan DP, serta rincian HPP dan laba per order.','ChartNoAxesCombined'],
 ['Hak akses & aktivitas','Bagi wewenang kasir, deskprint, operator, dan owner. Telusuri siapa mengubah apa melalui log aktivitas.','ShieldCheck'],
 ] },
 { id: 'gudang', number: '02', name: 'Gudang juga harus terpantau.', tag: 'PACK GUDANG', description: 'Ketahui bahan yang masuk, digunakan, tersisa, dan masih harus dibayar ke supplier. Semua tercatat dalam satu tempat.', items: [
 ['Stok opname','Bandingkan stok fisik dengan sistem. Penyesuaian baru berjalan setelah diajukan dan disetujui.','ClipboardCheck'],
 ['Pembelian bahan','Buat PO dengan beberapa bahan sekaligus. Harga faktur pembelian masuk ke batch FIFO.','ShoppingCart'],
 ['Supplier & hutang','Pantau rincian hutang, pembayaran, dan riwayat transaksi untuk setiap supplier.','Building2'],
 ['Riwayat penyesuaian','Lihat siapa yang mengubah stok, kapan dilakukan, dan berapa selisihnya.','History'],
 ] },
 { id: 'produksi', number: '03', name: 'Produksi tinggal jalan.', tag: 'PACK PRODUKSI', description: 'Bantu tim melihat pekerjaan yang siap masuk mesin, sedang berjalan, sampai proses finishing. Kurangi pekerjaan yang terlewat dan komunikasi berulang.', items: [
 ['Kloter produksi','Gabungkan order dengan bahan sejenis dalam satu kloter untuk mengurangi sisa bahan.','Layers'],
 ['Papan kerja','Pantau pra-produksi, produksi, dan finishing secara real time dalam alur yang jelas.','PanelsTopLeft'],
 ['Kendali mutu','Pekerjaan dilanjutkan setelah sample disetujui. Status persetujuan tercatat.','ClipboardCheck'],
 ['Operator & bahan','Tentukan operator tiap mesin dan catat bahan yang dipakai agar stok ikut berkurang.','Printer'],
 ] },
 { id: 'sdm', number: '04', name: 'Kerja tercatat. Lembur jelas.', tag: 'PACK SDM', description: 'Kepastian bagi bisnis dan karyawan. Bedakan lembur yang diajukan dengan waktu yang benar-benar tercatat.', note: 'Pack SDM fokus pada lembur dan laporan kerja. Absensi harian penuh, penggajian, dan pengenalan wajah belum tersedia.', items: [
 ['Pengajuan & persetujuan','Rencanakan lembur dan proses persetujuan secara berjenjang sesuai peran.','ClipboardList'],
 ['Absen lembur','Catat waktu masuk dan keluar melalui halaman khusus di lantai produksi.','Clock'],
 ['Selisih jam yang jelas','Selisih antara pengajuan dan jam tercatat harus disetujui sebelum dibayarkan.','GitCompareArrows'],
 ['Laporan kerja','Lihat pekerjaan yang ditangani karyawan serta penugasan mesin tiap operator.','Users'],
 ] },
 { id: 'vendor', number: '05', name: 'Kapasitas mesin bukan batas.', tag: 'PACK VENDOR · GRAFIKA PENUH', description: 'Terima pekerjaan yang membutuhkan proses dari rekan percetakan. Biaya vendor tetap masuk ke HPP agar laba setiap order terbaca.', note: 'Pack Vendor / Subjoin hanya tersedia di paket Grafika Penuh dan tidak dijual satuan.', items: [
 ['Subjoin per proses','Alihkan proses tertentu dalam satu order, tanpa harus melempar seluruh pekerjaan.','Network'],
 ['Persetujuan pekerjaan','Ajukan dan setujui pekerjaan sebelum dilepas. Setelah selesai, masuk kembali ke alur produksi.','ClipboardCheck'],
 ['Master vendor','Catat rekanan dan proses yang dapat mereka kerjakan.','Building2'],
 ['Biaya & pembayaran','Kelola hutang vendor terpisah dari supplier bahan. Biayanya masuk ke HPP order.','Receipt'],
 ] },
]
