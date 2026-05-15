<script setup lang="ts">
const isMenuOpen = ref(false)

const navLinks = [
  { label: 'Features', href: '#' },
  { label: 'How it works', href: '#' },
  { label: 'Pricing', href: '#' },
]
</script>

<template>
  <nav class="rounded-2xl border border-blue-500/30 bg-[#071226]/80 px-6 py-4 backdrop-blur">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-xl border border-blue-400/40 bg-blue-500/10" />
        <span class="text-xl font-semibold tracking-tight">SuperPlanify</span>
      </div>

      <div class="hidden items-center gap-10 text-sm text-slate-300 md:flex">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="transition hover:text-white"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="hidden items-center gap-3 md:flex">
        <button class="rounded-xl border border-blue-500/30 px-5 py-2 text-sm text-slate-200 transition hover:border-blue-400 hover:text-white">
          Log in
        </button>

        <button class="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
          Create account
        </button>
      </div>

      <button
        class="rounded-xl border border-blue-500/30 px-3 py-2 text-slate-200 transition hover:border-blue-400 hover:text-white md:hidden"
        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span v-if="!isMenuOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <Transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        class="mt-5 space-y-4 border-t border-blue-500/20 pt-5 md:hidden"
      >
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="block text-sm text-slate-300 transition hover:text-white"
        >
          {{ link.label }}
        </a>

        <div class="flex flex-col gap-3 pt-2">
          <button class="rounded-xl border border-blue-500/30 px-5 py-2 text-sm text-slate-200 transition hover:border-blue-400 hover:text-white">
            Log in
          </button>

          <button class="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
            Create account
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>