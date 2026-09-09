<script setup lang="ts">defineProps<{ label: string; title: string; accent?: string; description: string; number?: string }>();
</script>
<template><header class="page-heading wrap"><div class="eyebrow"><span class="tiny-square"></span>{{ label }}<span class="index">{{ number || 'GRAFIKA PRO' }}</span></div><h1>{{ title }}<br v-if="accent"/><span v-if="accent" class="accent-text">{{ accent }}</span></h1><p class="lead">{{ description }}</p></header></template>
