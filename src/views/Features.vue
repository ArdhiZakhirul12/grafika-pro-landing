<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Receipt, Calculator, Users, Boxes, ChartNoAxesCombined, ShieldCheck, ClipboardCheck, ShoppingCart, Building2, History, Layers, PanelsTopLeft, Printer, ClipboardList, Clock, GitCompareArrows, Network, Sparkles, ArrowUpRight, Check, Plus } from 'lucide-vue-next'
import type { Component } from 'vue'
import { modules } from '../data/features'
import { plans, rupiah } from '../data/pricing'
import PageHeading from '../components/PageHeading.vue'
import CtaSection from '../components/CtaSection.vue'
import FeatureDemo from '../components/FeatureDemo.vue'

const icons: Record<string, Component> = { Receipt, Calculator, Users, Boxes, ChartNoAxesCombined, ShieldCheck, ClipboardCheck, ShoppingCart, Building2, History, Layers, PanelsTopLeft, Printer, ClipboardList, Clock, GitCompareArrows, Network }
const tabLabel = (id: string) => (id === 'inti' ? 'Modul Inti' : id === 'sdm' ? 'Pack SDM' : 'Pack ' + id.charAt(0).toUpperCase() + id.slice(1))

// Penjelajah modul: satu modul tampil, berganti lewat tab
const route = useRoute()
const activeId = ref(modules[0].id)
const active = computed(() => modules.find((item) => item.id === activeId.value) ?? modules[0])
function syncFromHash() {
  const id = route.hash.slice(1)
  if (modules.some((item) => item.id === id)) activeId.value = id
}
onMounted(syncFromHash)
watch(() => route.hash, syncFromHash)
// Di layar sempit, tab yang aktif digeser agar terlihat di deretan tab.
watch(activeId, (id) => document.getElementById(id)?.scrollIntoView({ block: 'nearest', inline: 'nearest' }), { flush: 'post' })
function onTabKey(event: KeyboardEvent, index: number) {
  const last = modules.length - 1
  const next = event.key === 'ArrowRight' ? (index === last ? 0 : index + 1) : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1) : event.key === 'Home' ? 0 : event.key === 'End' ? last : -1
  if (next < 0) return
  event.preventDefault()
  activeId.value = modules[next].id
  const tabs = (event.currentTarget as HTMLElement).parentElement?.children
  ;(tabs?.[next] as HTMLElement | undefined)?.focus()
}

// Rakit sistem: pilih pack, tampilkan paket terkecil yang mencakupnya
const packs = modules.filter((item) => item.id !== 'inti').map((item) => ({ id: item.id, label: tabLabel(item.id), summary: item.description }))
const picked = ref<string[]>([])
function togglePack(id: string) {
  picked.value = picked.value.includes(id) ? picked.value.filter((item) => item !== id) : [...picked.value, id]
}
const matchedPlan = computed(() => {
  const basePacks = picked.value.filter((id) => id !== 'vendor').length
  const name = picked.value.includes('vendor') ? 'Grafika Penuh' : basePacks >= 2 ? 'Skala' : basePacks === 1 ? 'Tumbuh' : 'Mulai'
  return plans.find((plan) => plan.name === name) ?? plans[0]
})
</script>

<template>
  <PageHeading label="FITUR & MODUL" number="01 / PRODUK" title="Satu sistem." accent="Seluruh operasional." description="Mulai dari fondasi yang lengkap. Pilih sebuah modul di bawah, lalu coba sendiri cara kerjanya."/>

  <section class="fx-explorer wrap">
    <div class="fx-tabs" role="tablist" aria-label="Pilih modul">
      <button v-for="(item, i) in modules" :id="item.id" :key="item.id" type="button" role="tab" :class="['fx-tab', { active: item.id === activeId }]" :aria-selected="item.id === activeId" :aria-controls="'panel-' + item.id" :tabindex="item.id === activeId ? 0 : -1" @click="activeId = item.id" @keydown="onTabKey($event, i)">
        <span class="fx-tab-number">{{ item.number }}</span>{{ tabLabel(item.id) }}
      </button>
    </div>

    <Transition name="fx-swap" mode="out-in">
      <div :id="'panel-' + active.id" :key="active.id" class="fx-panel" role="tabpanel" :aria-labelledby="active.id">
        <div class="fx-intro">
          <div class="fx-summary-copy">
            <span class="module-tag">{{ active.tag }}</span>
            <h2>{{ active.name }}</h2>
            <p>{{ active.description }}</p>
            <div v-if="active.note" class="notice">{{ active.note }}</div>
            <div class="fx-intro-actions">
              <button v-if="active.id !== 'inti'" type="button" :class="['fx-btn', { 'is-on': picked.includes(active.id) }]" :aria-pressed="picked.includes(active.id)" @click="togglePack(active.id)">
                <Check v-if="picked.includes(active.id)" :size="14"/><Plus v-else :size="14"/>{{ picked.includes(active.id) ? 'Ada di sistem saya' : 'Tambahkan ke sistem saya' }}
              </button>
              <RouterLink to="/harga" class="text-link">Lihat paket & harga <ArrowUpRight :size="17"/></RouterLink>
            </div>
          </div>
          <FeatureDemo :id="active.id"/>
        </div>
        <div class="fx-features">
          <article v-for="(feature, i) in active.items" :key="feature[0]" :style="{ '--i': i }">
            <component :is="icons[feature[2]!]" :size="24" :stroke-width="1.25"/>
            <h3>{{ feature[0] }}</h3>
            <p>{{ feature[1] }}</p>
          </article>
        </div>
      </div>
    </Transition>
  </section>

  <section class="fx-builder">
    <div class="wrap fx-builder-grid">
      <div v-reveal>
        <p class="eyebrow">RAKIT SISTEM ANDA</p>
        <h2>Pilih yang dibutuhkan.<br/>Lihat paketnya.</h2>
        <p class="lead">Modul Inti selalu termasuk. Centang pack yang ingin ditambahkan.</p>
        <div class="fx-pack-list">
          <div class="fx-pack is-fixed"><span class="fx-check on"><Check :size="12" :stroke-width="3"/></span><span><strong>Modul Inti</strong><small>Termasuk di semua paket</small></span></div>
          <button v-for="pack in packs" :key="pack.id" type="button" :class="['fx-pack', { on: picked.includes(pack.id) }]" :aria-pressed="picked.includes(pack.id)" @click="togglePack(pack.id)">
            <span :class="['fx-check', { on: picked.includes(pack.id) }]"><Check :size="12" :stroke-width="3"/></span>
            <span><strong>{{ pack.label }}</strong><small>{{ pack.summary }}</small></span>
          </button>
        </div>
      </div>
      <div v-reveal="120" class="fx-plan" aria-live="polite">
        <span class="fx-plan-label">Paket terkecil yang mencakup pilihan Anda</span>
        <Transition name="fx-swap" mode="out-in">
          <div :key="matchedPlan.name">
            <h3>{{ matchedPlan.name }}</h3>
            <p>{{ matchedPlan.tagline }}</p>
            <div class="fx-plan-price">{{ rupiah(matchedPlan.annual) }}<span> / tahun</span></div>
            <ul>
              <li><Check :size="14"/>{{ matchedPlan.packs }}</li>
              <li><Check :size="14"/>{{ matchedPlan.desks }} loket deskprint</li>
              <li><Check :size="14"/>Program Penataan {{ rupiah(matchedPlan.setup) }}, sekali di awal</li>
            </ul>
            <RouterLink :to="{ path: '/kontak', query: { paket: matchedPlan.name } }" class="button">Konsultasi {{ matchedPlan.name }}<ArrowUpRight :size="17"/></RouterLink>
          </div>
        </Transition>
        <p class="fx-plan-note">Harga belum termasuk PPN. Pack juga bisa ditambahkan satuan ke Modul Inti. <RouterLink to="/harga">Bandingkan semua paket</RouterLink></p>
      </div>
    </div>
  </section>

  <section id="ai" class="ai-section">
    <div class="wrap">
      <p class="eyebrow"><Sparkles :size="17"/> KECERDASAN BUATAN</p>
      <h2 v-reveal>Dua AI.<br/>Dua pekerjaan yang berbeda.</h2>
      <div class="ai-grid">
        <article v-reveal>
          <span class="module-tag">TERMASUK DI SEMUA PAKET</span>
          <h3>AI Tutor</h3>
          <p>Asisten yang membantu Anda dan tim memakai aplikasi. Memahami halaman yang sedang dibuka, menjawab pertanyaan cara pakai, dan membantu karyawan baru lebih cepat mandiri.</p>
          <span class="micro">PANDUAN PENGGUNAAN · TANPA MEMOTONG KUOTA SUPPORT</span>
        </article>
        <article v-reveal="120">
          <span class="module-tag">TAMBAHAN OPSIONAL · RP4.000.000 / TAHUN</span>
          <h3>AI Analis</h3>
          <p>Tanya soal omzet, HPP, laba, stok, produksi, dan piutang dari data percetakan Anda sendiri. Membantu owner membaca kondisi usaha tanpa membuka banyak laporan satu per satu.</p>
          <span class="micro">ANALISIS USAHA · UNTUK PEMILIK BISNIS</span>
        </article>
      </div>
    </div>
  </section>
  <CtaSection/>
</template>
