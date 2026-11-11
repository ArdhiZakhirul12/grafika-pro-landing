<!-- Simulasi kecil yang bisa dicoba pengunjung di halaman Fitur, satu untuk tiap modul.
     Semua angka di sini hanya contoh, bukan data atau harga asli. -->
<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { Check, Minus, Plus, RotateCcw } from 'lucide-vue-next'
import { rupiah } from '../data/pricing'

defineProps<{ id: string }>()
const decimal = (value: number) => value.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

// Modul Inti: susun nota, lihat HPP dan laba per order
const products = [
  { name: 'Banner flexi 3 × 1 m', price: 105000, cost: 61500 },
  { name: 'Stiker vinyl A3, 100 lembar', price: 187500, cost: 96250 },
  { name: 'Kartu nama, 2 box', price: 76000, cost: 41300 },
]
const inNota = reactive([true, false, false])
const withDp = ref(false)
const nota = computed(() => {
  const chosen = products.filter((_, i) => inNota[i])
  const total = chosen.reduce((sum, p) => sum + p.price, 0)
  const cost = chosen.reduce((sum, p) => sum + p.cost, 0)
  return { count: chosen.length, total, cost, profit: total - cost, dp: total / 2 }
})

// Pack Gudang: stok opname dengan pengajuan dan persetujuan
const systemStock = ref(42.5)
const physicalStock = ref(41)
const opnamePending = ref(false)
const opnameLog = ref('')
const stockDiff = computed(() => physicalStock.value - systemStock.value)
function countStock(step: number) {
  physicalStock.value = Math.max(0, physicalStock.value + step)
  opnamePending.value = false
  opnameLog.value = ''
}
function approveOpname() {
  systemStock.value = physicalStock.value
  opnamePending.value = false
  opnameLog.value = `Stok sistem disesuaikan menjadi ${decimal(systemStock.value)} m.`
}

// Pack Produksi: papan kerja
const stages = ['Pra produksi', 'Produksi', 'Finishing']
const startOrders = [
  { code: 'GP-2418', name: 'Stiker vinyl 500 pcs', stage: 0 },
  { code: 'GP-2417', name: 'Banner 3 × 1 m', stage: 1 },
  { code: 'GP-2416', name: 'X-banner 60 × 160 cm', stage: 2 },
]
const orders = ref(startOrders.map((order) => ({ ...order })))
const doneCount = computed(() => orders.value.filter((order) => order.stage > 2).length)
function resetBoard() { orders.value = startOrders.map((order) => ({ ...order })) }

// Pack SDM: lembur diajukan vs tercatat
const planned = ref(3)
const recorded = ref(2.5)
const gapApproved = ref(false)
const gapMinutes = computed(() => Math.round((recorded.value - planned.value) * 60))
watch([planned, recorded], () => { gapApproved.value = false })
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

// Pack Vendor: subjoin per proses, biaya masuk HPP
const sellPrice = 165000
const processes = reactive([
  { name: 'Cetak', inhouse: 48000, vendor: 0, atVendor: false, fixed: true },
  { name: 'Laminasi', inhouse: 12500, vendor: 19000, atVendor: false, fixed: false },
  { name: 'Emboss', inhouse: 15000, vendor: 27500, atVendor: true, fixed: false },
])
const vendorJob = computed(() => {
  const vendorCost = processes.filter((p) => p.atVendor).reduce((sum, p) => sum + p.vendor, 0)
  const cost = processes.reduce((sum, p) => sum + (p.atVendor ? p.vendor : p.inhouse), 0)
  return { vendorCost, cost, profit: sellPrice - cost }
})
</script>

<template>
  <div class="fx-demo">
    <div class="fx-demo-head">
      <span class="fx-demo-label"><span class="tiny-square"></span>Coba sendiri</span>
      <span class="fx-demo-hint">Simulasi. Angka hanya contoh.</span>
    </div>

    <!-- Modul Inti -->
    <div v-if="id === 'inti'" class="fx-demo-body">
      <h3>Susun satu nota</h3>
      <p>Pilih produk yang dipesan, lalu lihat total, HPP, dan labanya berubah.</p>
      <div class="fx-options">
        <button v-for="(product, i) in products" :key="product.name" type="button" :class="['fx-option', { on: inNota[i] }]" :aria-pressed="inNota[i]" @click="inNota[i] = !inNota[i]">
          <span class="fx-check"><Check :size="12" :stroke-width="3"/></span>
          <span class="fx-option-name">{{ product.name }}</span>
          <span class="fx-option-value">{{ rupiah(product.price) }}</span>
        </button>
      </div>
      <dl class="fx-summary" aria-live="polite">
        <div><dt>Total nota</dt><dd>{{ rupiah(nota.total) }}</dd></div>
        <div><dt>HPP</dt><dd>{{ rupiah(nota.cost) }}</dd></div>
        <div class="is-strong"><dt>Laba order ini</dt><dd>{{ rupiah(nota.profit) }}</dd></div>
        <div v-if="withDp && nota.count"><dt>DP 50% diterima</dt><dd>{{ rupiah(nota.dp) }}</dd></div>
        <div v-if="withDp && nota.count"><dt>Sisa pelunasan</dt><dd>{{ rupiah(nota.total - nota.dp) }}</dd></div>
      </dl>
      <button type="button" class="fx-btn" :aria-pressed="withDp" :disabled="!nota.count" @click="withDp = !withDp">{{ withDp ? 'Hapus DP' : 'Catat DP 50%' }}</button>
    </div>

    <!-- Pack Gudang -->
    <div v-else-if="id === 'gudang'" class="fx-demo-body">
      <h3>Lakukan stok opname</h3>
      <p>Masukkan hasil hitung fisik bahan Flexi 280 gr. Stok sistem baru berubah setelah disetujui.</p>
      <div class="fx-meters">
        <div class="fx-meter"><span>Stok di sistem</span><strong>{{ decimal(systemStock) }} m</strong></div>
        <div class="fx-meter">
          <span>Hitung fisik</span>
          <div class="fx-stepper">
            <button type="button" aria-label="Kurangi hitung fisik" @click="countStock(-0.5)"><Minus :size="14"/></button>
            <strong aria-live="polite">{{ decimal(physicalStock) }} m</strong>
            <button type="button" aria-label="Tambah hitung fisik" @click="countStock(0.5)"><Plus :size="14"/></button>
          </div>
        </div>
      </div>
      <p class="fx-status" :class="{ warn: stockDiff !== 0 }" aria-live="polite">
        <template v-if="opnameLog">{{ opnameLog }}</template>
        <template v-else-if="stockDiff === 0">Stok fisik sama dengan sistem. Tidak ada penyesuaian.</template>
        <template v-else-if="opnamePending">Selisih {{ decimal(stockDiff) }} m menunggu persetujuan.</template>
        <template v-else>Selisih {{ decimal(stockDiff) }} m. Ajukan agar bisa diperiksa.</template>
      </p>
      <div class="fx-actions">
        <button v-if="!opnamePending" type="button" class="fx-btn" :disabled="stockDiff === 0" @click="opnamePending = true">Ajukan penyesuaian</button>
        <button v-else type="button" class="fx-btn is-accent" @click="approveOpname">Setujui sebagai owner</button>
      </div>
    </div>

    <!-- Pack Produksi -->
    <div v-else-if="id === 'produksi'" class="fx-demo-body">
      <h3>Jalankan papan kerja</h3>
      <p>Klik sebuah order untuk memindahkannya ke tahap berikutnya.</p>
      <div class="fx-board">
        <div v-for="(stage, s) in stages" :key="stage" class="fx-column">
          <span class="fx-column-title">{{ stage }}</span>
          <button v-for="order in orders.filter((o) => o.stage === s)" :key="order.code + s" type="button" class="fx-card" :aria-label="`Pindahkan ${order.code} ke tahap berikutnya`" @click="order.stage++">
            <strong>{{ order.code }}</strong><span>{{ order.name }}</span>
          </button>
        </div>
      </div>
      <div class="fx-actions is-between">
        <p class="fx-status" aria-live="polite">{{ doneCount ? `${doneCount} order selesai dan siap diambil.` : 'Belum ada order yang selesai.' }}</p>
        <button type="button" class="fx-btn" @click="resetBoard"><RotateCcw :size="14"/>Ulangi</button>
      </div>
    </div>

    <!-- Pack SDM -->
    <div v-else-if="id === 'sdm'" class="fx-demo-body">
      <h3>Cocokkan jam lembur</h3>
      <p>Ubah jam yang diajukan dan jam yang tercatat dari absen lembur.</p>
      <div class="fx-meters">
        <div class="fx-meter">
          <span>Diajukan</span>
          <div class="fx-stepper">
            <button type="button" aria-label="Kurangi jam diajukan" @click="planned = clamp(planned - 0.5, 0.5, 6)"><Minus :size="14"/></button>
            <strong aria-live="polite">{{ decimal(planned) }} jam</strong>
            <button type="button" aria-label="Tambah jam diajukan" @click="planned = clamp(planned + 0.5, 0.5, 6)"><Plus :size="14"/></button>
          </div>
        </div>
        <div class="fx-meter">
          <span>Tercatat</span>
          <div class="fx-stepper">
            <button type="button" aria-label="Kurangi jam tercatat" @click="recorded = clamp(recorded - 0.5, 0, 6)"><Minus :size="14"/></button>
            <strong aria-live="polite">{{ decimal(recorded) }} jam</strong>
            <button type="button" aria-label="Tambah jam tercatat" @click="recorded = clamp(recorded + 0.5, 0, 6)"><Plus :size="14"/></button>
          </div>
        </div>
      </div>
      <p class="fx-status" :class="{ warn: gapMinutes !== 0 && !gapApproved }" aria-live="polite">
        <template v-if="gapMinutes === 0">Jam sesuai pengajuan. Siap dibayarkan.</template>
        <template v-else-if="gapApproved">Selisih {{ Math.abs(gapMinutes) }} menit disetujui. Dibayar {{ decimal(recorded) }} jam.</template>
        <template v-else>Tercatat {{ Math.abs(gapMinutes) }} menit {{ gapMinutes < 0 ? 'lebih sedikit' : 'lebih banyak' }} dari pengajuan. Perlu disetujui dulu.</template>
      </p>
      <div class="fx-actions">
        <button type="button" class="fx-btn is-accent" :disabled="gapMinutes === 0 || gapApproved" @click="gapApproved = true">Setujui selisih</button>
      </div>
    </div>

    <!-- Pack Vendor -->
    <div v-else class="fx-demo-body">
      <h3>Lempar satu proses ke vendor</h3>
      <p>Pilih proses yang dikerjakan rekanan. Biayanya langsung masuk ke HPP order.</p>
      <div class="fx-options">
        <button v-for="process in processes" :key="process.name" type="button" :class="['fx-option', { on: process.atVendor }]" :aria-pressed="process.atVendor" :disabled="process.fixed" @click="process.atVendor = !process.atVendor">
          <span class="fx-option-name">{{ process.name }}</span>
          <span class="fx-place">{{ process.atVendor ? 'Vendor' : 'Di tempat' }}</span>
          <span class="fx-option-value">{{ rupiah(process.atVendor ? process.vendor : process.inhouse) }}</span>
        </button>
      </div>
      <dl class="fx-summary" aria-live="polite">
        <div><dt>Harga jual</dt><dd>{{ rupiah(sellPrice) }}</dd></div>
        <div><dt>Biaya vendor dalam HPP</dt><dd>{{ rupiah(vendorJob.vendorCost) }}</dd></div>
        <div><dt>HPP order</dt><dd>{{ rupiah(vendorJob.cost) }}</dd></div>
        <div class="is-strong"><dt>Laba order ini</dt><dd>{{ rupiah(vendorJob.profit) }}</dd></div>
      </dl>
    </div>
  </div>
</template>
