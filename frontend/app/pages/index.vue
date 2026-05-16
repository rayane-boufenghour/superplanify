<script setup lang="ts">
const features = [
  {
    titleKey: 'features.allSchedules.title',
    descriptionKey: 'features.allSchedules.description',
  },
  {
    titleKey: 'features.realTimeUpdates.title',
    descriptionKey: 'features.realTimeUpdates.description',
  },
  {
    titleKey: 'features.workflows.title',
    descriptionKey: 'features.workflows.description',
  },
  {
    titleKey: 'features.peopleTeams.title',
    descriptionKey: 'features.peopleTeams.description',
  },
]
</script>

<template>
  <main class="min-h-screen bg-[#020817] text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_45%)]" />

    <div class="relative z-10">
      <LandingNavbar />

      <div class="mx-auto max-w-7xl px-6">
        <section class="mx-auto flex max-w-5xl flex-col items-center px-4 pb-20 pt-16 text-center">
          <div class="mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-base font-medium text-blue-200">
            {{ $t('home.badge') }}
          </div>

          <h1 class="max-w-5xl text-5xl font-black leading-none tracking-tight sm:text-6xl md:text-7xl">
            <span class="block">{{ $t('home.titleLine1') }}</span>
            <span class="mt-2 block text-blue-500">{{ $t('home.titleLine2') }}</span>
          </h1>

          <p class="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            {{ $t('home.subtitle') }}
          </p>

          <div class="mt-12 flex flex-col gap-4 sm:flex-row">
            <button class="rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-blue-500">
              {{ $t('home.ctaUser') }}
            </button>

            <button class="rounded-2xl border border-blue-500/30 bg-[#071226] px-8 py-4 text-base font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white">
              {{ $t('home.ctaOrganization') }}
            </button>
          </div>
        </section>

        <section class="grid gap-6 pb-24 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            v-for="feature in features"
            :key="feature.titleKey"
            :title="$t(feature.titleKey)"
            :description="$t(feature.descriptionKey)"
          />
        </section>

        <AppFooter />
      </div>
    </div>
  </main>
</template>