<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <article
    class="rounded-3xl border border-blue-500/20 bg-[#071226]/80 p-8 shadow-lg shadow-blue-950/30 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-blue-500/20"
  >
    <h3 class="text-xl font-semibold">
      {{ title }}
    </h3>

    <p class="mt-4 leading-7 text-slate-300">
      {{ description }}
    </p>
  </article>
</template>