<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowUpRight } from 'lucide-vue-next'
import { navigation, catalogUrl } from './data/site'
const route = useRoute()
const menuOpen = ref(false)
watch(() => route.fullPath, () => { menuOpen.value = false })
// Saat panel menu HP terbuka, halaman di belakangnya tidak ikut bergulir.
watch(menuOpen, (open) => { document.documentElement.style.overflow = open ? 'hidden' : '' })
const mobileLinks = [...navigation, { path: '/kontak', label: 'Konsultasi & Demo' }]
</script>
<template>
  <a href="#main" class="skip-link">Lewati ke konten utama</a>
  <header class="site-header" @keydown.esc="menuOpen = false">
    <div class="nav-wrap wrap">
      <RouterLink to="/" aria-label="Grafika Pro — Beranda" class="brand"><img src="/images/brand/logo.png" alt="Grafika Pro — Make It Easy" width="176" height="45"/></RouterLink>
      <nav aria-label="Navigasi utama" class="desktop-nav"><RouterLink v-for="item in navigation" :key="item.path" :to="item.path" :class="{ current: route.path === item.path }">{{ item.label }}</RouterLink></nav>
      <RouterLink to="/kontak" class="nav-cta">Jadwalkan Demo <ArrowUpRight :size="16"/></RouterLink>
      <button class="menu-button" :aria-expanded="menuOpen" aria-controls="mobile-nav" :aria-label="menuOpen ? 'Tutup menu' : 'Buka menu'" @click="menuOpen = !menuOpen"><span class="menu-icon" :class="{ open: menuOpen }" aria-hidden="true"><i></i><i></i></span></button>
    </div>
    <nav v-if="menuOpen" id="mobile-nav" aria-label="Navigasi mobile" class="mobile-nav"><RouterLink v-for="(item, i) in mobileLinks" :key="item.path" :to="item.path" :style="{ '--i': i }">{{ item.label }}<ArrowUpRight :size="18"/></RouterLink></nav>
  </header>
  <main id="main" tabindex="-1"><RouterView/></main>
  <footer class="footer wrap">
    <div class="footer-top"><div class="footer-brand"><RouterLink to="/" aria-label="Grafika Pro beranda"><img src="/images/brand/logo.png" alt="Grafika Pro — Make It Easy" width="190" height="49" loading="lazy"/></RouterLink><p>Sistem POS dan produksi yang dibuat khusus untuk membantu operasional bisnis percetakan.</p><span class="micro">ORDER · PRODUCTION · STOCK · REPORT</span></div><div><span class="footer-label">JELAJAHI</span><RouterLink to="/fitur">Fitur & Modul</RouterLink><RouterLink to="/cara-kerja">Cara Kerja</RouterLink><RouterLink to="/solusi">Solusi Percetakan</RouterLink></div><div><span class="footer-label">MULAI DI SINI</span><RouterLink to="/harga">Paket & Harga</RouterLink><RouterLink to="/faq">Pertanyaan Umum</RouterLink><RouterLink to="/kontak">Konsultasi & Demo</RouterLink></div><div><span class="footer-label">KENALI LEBIH DEKAT</span><a :href="catalogUrl" target="_blank" rel="noopener">Katalog Grafika Pro <ArrowUpRight :size="15"/></a><p class="footer-note">Dibuat untuk percetakan.<br/>Dirancang untuk memudahkan.</p></div></div>
    <div class="footer-bottom"><span>© {{ new Date().getFullYear() }} Grafika Pro.</span><span>Powered by PT Solusi Sepakat Digital.</span><a href="#main">Kembali ke atas ↑</a></div>
  </footer>
</template>
