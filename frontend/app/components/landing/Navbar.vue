<script setup lang="ts">
const isMenuOpen = ref(false)

const user = useUser()

const navLinks = [
  { labelKey: 'nav.features', href: '#' },
  { labelKey: 'nav.pricing', href: '#' },
  { labelKey: 'nav.contact', href: '#' },
]
</script>

<template>
  <nav class="sticky top-0 z-50 w-full border-b border-blue-500/20 bg-black/90 px-6 py-4 shadow-lg shadow-black/30 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between">
      <a href="/" class="flex items-center gap-3">
        <img
          src="/images/superplanify_logo.png"
          alt="SuperPlanify logo"
          class="h-14 w-14 object-contain"
        >

        <span class="text-xl font-semibold tracking-tight">
          SuperPlanify
        </span>
      </a>

      <div class="hidden items-center gap-10 text-base font-semibold text-slate-300 lg:flex">
        <a
          v-for="link in navLinks"
          :key="link.labelKey"
          :href="link.href"
          class="transition hover:text-white"
        >
          {{ $t(link.labelKey) }}
        </a>
      </div>

      <div class="flex items-center gap-3">
        <LanguageSwitcher />

        <div class="hidden items-center gap-3 lg:flex">
          <NuxtLink
            v-if="!user"
            to="/auth/login"
            external
            class="inline-flex items-center justify-center rounded-xl border border-blue-500/30 px-5 py-2 text-sm text-slate-200 transition hover:border-blue-400 hover:text-white"
          >
            {{ $t('nav.login') }}
          </NuxtLink>

          <NuxtLink
            v-else
            to="/auth/logout"
            external
            class="inline-flex items-center justify-center rounded-xl border border-blue-500/30 px-5 py-2 text-sm text-slate-200 transition hover:border-blue-400 hover:text-white"
          >
            {{ $t('nav.logout') }}
          </NuxtLink>
      </div>

        <button
          class="rounded-xl border border-blue-500/30 px-3 py-2 text-slate-200 transition hover:border-blue-400 hover:text-white lg:hidden"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span v-if="!isMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        class="mx-auto mt-5 max-w-7xl space-y-4 border-t border-blue-500/20 pt-5 lg:hidden"
      >
        <a
          v-for="link in navLinks"
          :key="link.labelKey"
          :href="link.href"
          class="block text-base font-semibold text-slate-300 transition hover:text-white"
        >
          {{ $t(link.labelKey) }}
        </a>

        <div class="flex flex-col gap-3 pt-2">
          <NuxtLink
            v-if="!user"
            to="/auth/login"
            external
            class="inline-flex items-center justify-center rounded-xl border border-blue-500/30 px-5 py-2 text-sm text-slate-200 transition hover:border-blue-400 hover:text-white"
          >
            {{ $t('nav.login') }}
          </NuxtLink>

          <NuxtLink
            v-else
            to="/auth/logout"
            external
            class="inline-flex items-center justify-center rounded-xl border border-blue-500/30 px-5 py-2 text-sm text-slate-200 transition hover:border-blue-400 hover:text-white"
          >
            {{ $t('nav.logout') }}
          </NuxtLink>
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