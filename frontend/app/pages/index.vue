<script setup lang="ts">
const features = [
  {
    title: 'All schedules',
    description: 'Bring school, work, training and personal schedules together in one place.',
  },
  {
    title: 'Real-time updates',
    description: 'Stay aligned when classes, sessions or events move.',
  },
  {
    title: 'Frictionless workflows',
    description: 'Replace scattered emails, WhatsApp groups and hallway decisions with structured requests.',
  },
  {
    title: 'Built for people & teams',
    description: 'Join existing schedules as an individual, or create and manage an organization.',
  },
]
</script>

<template>
  <main class="min-h-screen overflow-hidden bg-[#020817] text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_45%)]" />

    <div class="relative z-10 mx-auto max-w-7xl px-6 py-6">
      <LandingNavbar />

      <section class="mx-auto flex max-w-5xl flex-col items-center px-4 pb-20 pt-28 text-center">
        <div class="mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm text-blue-200">
          All your schedules. One smart platform.
        </div>

        <h1 class="max-w-5xl text-5xl font-black leading-none tracking-tight sm:text-6xl md:text-7xl">
          <span class="block">Centralize. Organize.</span>
          <span class="mt-2 block text-blue-500">Stay one step ahead.</span>
        </h1>

        <p class="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
          SuperPlanify helps people and organizations manage schedules,
          changes and notifications in one place.
        </p>

        <div class="mt-12 flex flex-col gap-4 sm:flex-row">
          <button class="rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-blue-500">
            Create my account
          </button>

          <button class="rounded-2xl border border-blue-500/30 bg-[#071226] px-8 py-4 text-base font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white">
            For organizations
          </button>
        </div>
      </section>

      <section class="grid gap-6 pb-24 md:grid-cols-2 xl:grid-cols-4">
        <LandingFeatureCard
          v-for="feature in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
        />
      </section>

      <AppFooter />
    </div>
  </main>
</template>