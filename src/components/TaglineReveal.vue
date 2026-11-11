<!-- Tagline besar: setiap kata berubah dari redup ke penuh saat bagian ini digulir melewati layar.
     Kata yang sudah menyala tidak meredup lagi ketika digulir ke atas. -->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
const props = defineProps<{ text: string; accent?: string }>()
const words = computed(() => props.text.split(/\s+/).filter(Boolean))
const accentWords = computed(() => new Set((props.accent ?? '').split(/\s+/).filter(Boolean)))
const el = ref<HTMLElement | null>(null)
const lit = ref(0)
let frame = 0

function measure() {
  frame = 0
  const node = el.value
  if (!node) return
  const rect = node.getBoundingClientRect()
  const viewport = window.innerHeight
  // Mulai menyala saat bagian atas teks melewati 85% tinggi layar, selesai saat bagian bawahnya mencapai 45%.
  const start = viewport * 0.85
  const end = viewport * 0.45
  const progress = (start - rect.top) / (start - end + rect.height)
  const count = Math.round(Math.min(1, Math.max(0, progress)) * words.value.length)
  if (count > lit.value) lit.value = count
}
function onScroll() {
  if (!frame) frame = requestAnimationFrame(measure)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lit.value = words.value.length
    return
  }
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (frame) cancelAnimationFrame(frame)
})
</script>
<template>
  <section class="tagline-section wrap">
    <p ref="el" class="tagline" :aria-label="text">
      <template v-for="(word, i) in words" :key="i"><span aria-hidden="true" :class="['word', { on: i < lit, accent: accentWords.has(word) }]">{{ word }}</span>{{ ' ' }}</template>
    </p>
  </section>
</template>
