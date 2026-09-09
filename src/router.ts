import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import { contact } from './data/site'
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home, meta: { title: 'Sistem POS & Produksi Khusus Percetakan', description: 'Kelola order, produksi, stok dan laporan bisnis percetakan dalam satu sistem.' } },
    { path: '/fitur', component: () => import('./views/Features.vue'), meta: { title: 'Fitur & Modul', description: 'Kenali modul Inti, Gudang, Produksi, SDM, Vendor, AI Tutor dan AI Analis Grafika Pro.' } },
    { path: '/cara-kerja', component: () => import('./views/Workflow.vue'), meta: { title: 'Cara Kerja & Implementasi', description: 'Dari nota hingga produksi. Pelajari alur operasional dan pendampingan implementasi Grafika Pro.' } },
    { path: '/solusi', component: () => import('./views/Solutions.vue'), meta: { title: 'Solusi Bisnis Percetakan', description: 'Temukan modul yang sesuai dengan kebutuhan digital printing, offset, advertising, sablon dan print shop.' } },
    { path: '/harga', component: () => import('./views/Pricing.vue'), meta: { title: 'Paket & Harga 2026', description: 'Bandingkan paket Mulai, Tumbuh, Skala dan Grafika Penuh. Lihat langganan dan biaya penataan awal.' } },
    { path: '/faq', component: () => import('./views/Faq.vue'), meta: { title: 'Pertanyaan Umum', description: 'Jawaban tentang paket, server, keamanan data, implementasi dan batasan fitur Grafika Pro.' } },
    { path: '/kontak', component: () => import('./views/Contact.vue'), meta: { title: 'Konsultasi & Demo', description: 'Ceritakan kebutuhan percetakan Anda dan siapkan konsultasi bersama Grafika Pro.' } },
    { path: '/:pathMatch(.*)*', component: () => import('./views/NotFound.vue'), meta: { title: 'Halaman Tidak Ditemukan', description: 'Kembali ke beranda Grafika Pro.' } },
  ],
  scrollBehavior(to, from, saved) { if (saved) return saved; if (to.hash) return { el: to.hash, top: 110 }; return { top: 0 } },
})
router.afterEach((to, from) => {
  const title = `Grafika Pro — ${to.meta.title}`
  document.title = title
  for (const selector of ['meta[name="description"]','meta[property="og:description"]','meta[name="twitter:description"]']) document.querySelector(selector)?.setAttribute('content', String(to.meta.description))
  for (const selector of ['meta[property="og:title"]','meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute('content', title)
  document.querySelector('meta[name="robots"]')?.setAttribute('content', to.matched[0]?.path.includes('pathMatch') ? 'noindex,follow' : 'index,follow')
  if (contact.domain) {
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = new URL(to.path, contact.domain).href
  }
  if (from.matched.length && to.path !== from.path) window.setTimeout(() => document.querySelector<HTMLElement>('#main')?.focus({ preventScroll: true }), 80)
})
