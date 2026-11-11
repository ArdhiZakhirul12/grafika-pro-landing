<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { Check } from 'lucide-vue-next'
import PageHeading from '../components/PageHeading.vue'
import CtaSection from '../components/CtaSection.vue'
import { workflow, implementation } from '../data/workflow'
import { rupiah } from '../data/pricing'

// Satu order contoh yang berubah keadaan di setiap langkah alur. Semua isinya hanya ilustrasi.
const total = 420000
const states = [
  { status: 'Kebutuhan dicatat', tone: 'muted', holder: 'Deskprint', paid: 0, log: '09.12  Deskprint mencatat kebutuhan pelanggan' },
  { status: 'Penawaran dikirim', tone: 'muted', holder: 'Deskprint', paid: 0, log: '09.26  Penawaran Rp420.000 disetujui pelanggan' },
  { status: 'Menunggu pembayaran', tone: 'warn', holder: 'Deskprint', paid: 0, log: '09.31  Nota GP-2417 dibuat' },
  { status: 'DP diterima', tone: 'warn', holder: 'Kasir', paid: 210000, log: '09.35  Kasir menerima DP Rp210.000' },
  { status: 'Sedang dicetak', tone: 'accent', holder: 'Operator produksi', paid: 210000, log: '10.48  Mesin outdoor 1 mulai, flexi 280 gr terpakai 12,6 m' },
  { status: 'Finishing', tone: 'accent', holder: 'Tim finishing', paid: 210000, log: '13.05  Potong dan pasang mata ayam' },
  { status: 'Selesai, diambil', tone: 'done', holder: 'Kasir', paid: total, log: '16.20  Pelunasan Rp210.000, barang diambil' },
]

const active = ref(0)
const state = computed(() => states[active.value])
const log = computed(() => states.slice(0, active.value + 1).map((item) => item.log).reverse())

// Sorot langkah sesuai peran yang dipilih
const roles = ['Semua', 'Deskprint', 'Kasir', 'Operator produksi', 'Tim finishing']
const role = ref('Semua')
const involves = (stepRole: string) => role.value === 'Semua' || stepRole.toLowerCase().includes(role.value.split(' ').pop()!.toLowerCase())
const roleCount = computed(() => workflow.filter((step) => involves(step[2])).length)

// Langkah aktif mengikuti posisi gulir
const stepEls = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null
onMounted(async () => {
  await nextTick()
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) active.value = Number((entry.target as HTMLElement).dataset.index)
  }, { rootMargin: '-45% 0px -50% 0px' })
  stepEls.value.forEach((el) => observer!.observe(el))
})
onBeforeUnmount(() => observer?.disconnect())
function goTo(index: number) {
  active.value = index
  stepEls.value[index]?.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}
</script>

<template>
  <PageHeading label="CARA KERJA" number="02 / WORKFLOW" title="Dari nota" accent="hingga produksi." description="Satu pesanan menghubungkan banyak bagian. Gulir ke bawah dan ikuti perjalanan satu order dari meja depan sampai diambil pelanggan."/>

  <section class="wf wrap">
    <div class="wf-roles" role="group" aria-label="Lihat dari sudut pandang peran">
      <span class="wf-roles-label">Lihat sebagai</span>
      <button v-for="item in roles" :key="item" type="button" :class="['wf-role', { on: role === item }]" :aria-pressed="role === item" @click="role = item">{{ item }}</button>
      <span class="wf-roles-note" aria-live="polite">{{ role === 'Semua' ? `${workflow.length} langkah, satu nota yang sama.` : `${role} terlibat di ${roleCount} dari ${workflow.length} langkah.` }}</span>
    </div>

    <div class="wf-grid">
      <ol class="wf-steps">
        <li v-for="(step, i) in workflow" :key="step[0]" ref="stepEls" :data-index="i" :class="['wf-step', { active: i === active, past: i < active, dim: !involves(step[2]) }]">
          <button type="button" class="wf-step-btn" :aria-current="i === active ? 'step' : undefined" @click="goTo(i)">
            <span class="wf-dot" aria-hidden="true"><Check v-if="i < active" :size="14" :stroke-width="3"/><template v-else>{{ i + 1 }}</template></span>
            <span class="wf-step-text">
              <span class="wf-step-role">{{ step[2] }}</span>
              <h3>{{ step[0] }}</h3>
              <p>{{ step[1] }}</p>
            </span>
          </button>
        </li>
      </ol>

      <aside class="wf-order" aria-label="Contoh order yang sedang diikuti">
        <div class="wf-order-head">
          <div><span class="wf-order-label">Nota contoh</span><strong>GP-2417</strong></div>
          <Transition name="fx-swap" mode="out-in"><span :key="state.status" :class="['wf-chip', 'is-' + state.tone]">{{ state.status }}</span></Transition>
        </div>
        <div class="wf-order-item"><span>Banner flexi 3 × 1 m, 4 lembar</span><strong>{{ rupiah(total) }}</strong></div>
        <div class="wf-track" aria-hidden="true"><span v-for="(_, i) in workflow" :key="i" :class="{ on: i <= active }"></span></div>
        <dl class="wf-facts">
          <div><dt>Langkah</dt><dd>{{ active + 1 }} dari {{ workflow.length }}</dd></div>
          <div><dt>Ditangani oleh</dt><dd>{{ state.holder }}</dd></div>
          <div><dt>Sudah dibayar</dt><dd>{{ rupiah(state.paid) }}</dd></div>
          <div><dt>Sisa</dt><dd>{{ rupiah(total - state.paid) }}</dd></div>
        </dl>
        <div class="wf-pay" aria-hidden="true"><i :style="{ transform: `scaleX(${state.paid / total})` }"></i></div>
        <div class="wf-log">
          <span class="wf-order-label">Riwayat aktivitas</span>
          <TransitionGroup tag="ul" name="wf-log">
            <li v-for="line in log" :key="line">{{ line }}</li>
          </TransitionGroup>
        </div>
      </aside>
    </div>

    <p class="notice">Contoh alur operasional dengan data ilustrasi. Detail proses disesuaikan saat implementasi; papan kerja, kloter, dan finishing menggunakan Pack Produksi.</p>
  </section>

  <section id="implementasi" class="implementation">
    <div class="wrap">
      <div class="split">
        <div><p class="eyebrow">PROGRAM PENATAAN</p><h2>Bukan sekadar<br/>pasang aplikasi.</h2></div>
        <p class="lead">Sistem baru bermanfaat ketika benar-benar dipakai. Kami bantu menyiapkan data, melatih tim, dan mendampingi masa transisinya.</p>
      </div>
      <ol v-reveal class="impl-track">
        <li v-for="(step, i) in implementation" :key="step[0]" :style="{ '--i': i }">
          <span class="impl-dot">{{ i + 1 }}</span>
          <h3>{{ step[0] }}</h3>
          <p>{{ step[1] }}</p>
        </li>
      </ol>
      <p class="notice">Program Penataan dibayar sekali di awal, terpisah dari langganan. Jumlah hari, peserta pelatihan, dan batas data yang dimigrasi dicantumkan dalam penawaran.</p>
    </div>
  </section>
  <CtaSection/>
</template>
