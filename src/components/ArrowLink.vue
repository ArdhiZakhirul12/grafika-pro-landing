<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
withDefaults(defineProps<{ to?: string; label?: string; secondary?: boolean }>(), { to: '/kontak', label: 'Jadwalkan Demo', secondary: false })
</script>
<template><RouterLink :to="to" :class="['button', { secondary } ]">{{ label }}<ArrowUpRight :size="19" :stroke-width="1.5" /></RouterLink></template>
