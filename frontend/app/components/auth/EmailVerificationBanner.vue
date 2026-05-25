<script setup lang="ts">
defineProps<{
  email?: string
}>()

const isDismissed = ref(false)
</script>

<template>
  <Transition name="banner">
    <div
      v-if="!isDismissed"
      class="sticky top-[89px] z-40 border-b border-amber-400/30 bg-amber-500/10 px-6 py-3 shadow-lg shadow-amber-950/20 backdrop-blur"
    >
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p class="text-sm font-medium text-amber-100">
          <span class="mr-2">⚠️</span>
          {{ $t('auth.verify_email') }}
          <span v-if="email" class="text-amber-200">
            {{ $t('auth.confirmation_sent') }} {{ email }}.
          </span>
        </p>

        <button
          class="rounded-xl border border-amber-300/30 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-200 hover:bg-amber-400/10"
          @click="isDismissed = true"
        >
          {{ $t('common.dismiss') }}
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.banner-enter-active,
.banner-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.banner-enter-from,
.banner-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>