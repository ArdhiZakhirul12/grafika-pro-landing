<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
import CtaSection from '../components/CtaSection.vue'
const industries = [
 ['Digital Printing','Banyak order kecil, bahan beragam, deadline berdekatan. Satukan detail pesanan dan bantu operator membaca prioritas kerja.','Inti + Pack Produksi','produksi'],
 ['Offset Printing','Produksi berkloter dan penggunaan bahan perlu dicatat. Pantau proses, persetujuan sample, stok, serta biaya bahan per order.','Pack Produksi + Pack Gudang','gudang'],
 ['Advertising','Satu pekerjaan bisa melibatkan banyak proses dan rekanan. Catat biaya vendor ke dalam HPP agar margin tetap terbaca.','Grafika Penuh + Pack Vendor','vendor'],
 ['Sablon','Hubungkan resep proses dan pemakaian bahan dengan pesanan. Kelola finishing dan pekerjaan tim dalam alur yang lebih rapi.','Inti + Pack Produksi','produksi'],
 ['Fotokopi & Print Shop','Percepat pencatatan transaksi, kelola kategori pelanggan, dan pantau kas. Fitur antrian ikut tersedia mulai dua loket.','Modul Inti + Loket Deskprint','inti'],
]
</script>
<template><PageHeading label="DIBUAT UNTUK INDUSTRI PRINTING" number="03 / SOLUSI" title="Mengikuti cara kerja" accent="percetakan Anda." description="Tantangan setiap percetakan berbeda. Pilih modul berdasarkan masalah yang ingin diselesaikan, lalu sesuaikan skala dengan jumlah loket layanan."/><section class="industry-list wrap"><article class="industry" v-for="(item,i) in industries" :key="item[0]"><span class="micro">0{{i+1}}</span><div><h2>{{item[0]}}</h2></div><div><p>{{item[1]}}</p><RouterLink :to="'/fitur#'+item[3]" class="text-link">{{item[2]}} <ArrowUpRight :size="18"/></RouterLink></div></article><div class="notice">Punya lebih dari satu cabang? Pengelolaan multi-cabang belum tersedia pada versi yang dijelaskan di katalog 2026. Diskusikan kebutuhan tersebut sebelum memilih paket.</div></section><section class="service-strip"><div class="wrap split"><div><p class="eyebrow">UKURAN YANG MASUK AKAL</p><h2>Tim bertambah.<br/>Biaya tetap terarah.</h2></div><div><p class="lead">Skala langganan mengikuti jumlah loket deskprint, bukan jumlah pengguna atau transaksi.</p><ul class="check-list"><li>Jumlah pengguna, pelanggan, produk, dan transaksi tidak dibatasi</li><li>Antrian dan papan tampilan tersedia mulai dua loket</li><li>Tambah loket Rp1.250.000 per unit per tahun</li></ul><RouterLink class="text-link" to="/harga">Bandingkan paket <ArrowUpRight :size="18"/></RouterLink></div></div></section><CtaSection/></template>
