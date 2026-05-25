<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated', 'verified']
})

const user = useUser()
</script>

<template>
  <main class="min-h-screen bg-[#020817] px-6 py-24 text-white">
    <section class="mx-auto max-w-4xl rounded-3xl border border-blue-500/20 bg-[#071226]/80 p-8">
      <h1 class="text-3xl font-bold">
        {{ $t('members.welcome') }}
      </h1>

      <p class="mt-4 text-slate-300">
        {{ $t('members.signed_in_as') }} {{ user?.email }}.
      </p>

      <p>You are not currently part of any organization.</p>
    </section>
  </main>
</template>