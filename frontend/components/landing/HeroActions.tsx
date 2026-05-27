'use client'

import { Show, SignUpButton, useAuth } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import ButtonSkeleton from '@/components/ui/ButtonSkeleton'

export default function HeroActions() {
  const t = useTranslations('home')

  const { isLoaded } = useAuth()

  if (!isLoaded) {
    return <ButtonSkeleton size="lg" variant="primary" />
  }

  return (
    <Show
      when="signed-out"
      fallback={
        <Link
          href="/app"
          className="
    group
    relative
    inline-flex
    items-center
    justify-center
    gap-3
    rounded-3xl
    border border-blue-400/50
    bg-blue-500/10
    px-10 py-5
    text-base font-bold text-white
    shadow-2xl shadow-blue-500/25
    transition
    duration-300
    hover:-translate-y-1
    hover:border-blue-300
    hover:shadow-blue-400/40
    animate-[bounce_1s_infinite]
  "
        >
          {t('useApp')}
          <span className="transition group-hover:translate-x-3">→</span>
        </Link>
      }
    >
      <SignUpButton mode="modal">
        <button className="rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-blue-500">
          {t('ctaUser')}
        </button>
      </SignUpButton>
    </Show>
  )
}