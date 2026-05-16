<script setup lang="ts">
type LocaleCode = 'en' | 'fr'

const { locale, setLocale } = useI18n()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const availableLocales: Array<{ code: LocaleCode; name: string }> = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
]

const selectedLocale = computed(() => {
  return availableLocales.find(
    item => item.code === locale.value,
  )
})

const changeLocale = async (newLocale: LocaleCode) => {
  isOpen.value = false
  await setLocale(newLocale)
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    dropdownRef.value
    && !dropdownRef.value.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      class="flex h-10 items-center gap-2 rounded-xl border border-blue-500/30 bg-black px-3 text-sm font-medium text-white transition hover:border-blue-400 md:min-w-36 md:justify-between"
      type="button"
      @click="isOpen = !isOpen"
    >
      <!-- Mobile -->
      <div class="flex items-center gap-1 md:hidden">
        <span>🌐</span>
        <span class="text-xs">⌄</span>
      </div>

      <!-- Desktop -->
      <div class="hidden items-center justify-between gap-3 md:flex md:w-full">
        <span>
          {{ selectedLocale?.name }}
        </span>

        <span class="text-xs">⌄</span>
      </div>
    </button>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute right-0 top-12 z-50 min-w-40 overflow-hidden rounded-xl border border-blue-500/30 bg-black shadow-lg shadow-black/40"
      >
        <button
          v-for="localeItem in availableLocales"
          :key="localeItem.code"
          :class="[
            'block w-full px-4 py-3 text-left text-sm transition',
            localeItem.code === locale
              ? 'bg-blue-600/30 text-white'
              : 'text-slate-300 hover:bg-blue-600/20 hover:text-white',
          ]"
          type="button"
          @click="changeLocale(localeItem.code)"
        >
          {{ localeItem.name }}
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>