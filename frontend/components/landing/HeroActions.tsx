'use client'

import {Show, SignUpButton, useAuth} from '@clerk/nextjs'
import {useTranslations} from 'next-intl'
import {Link} from '@/i18n/routing'
import ButtonSkeleton from '@/components/ui/ButtonSkeleton'

export default function HeroActions() {
  const t = useTranslations('home')

  const {isLoaded} = useAuth()

    if (!isLoaded) {
        return <ButtonSkeleton size="lg" variant="primary" />
    }

  return (
    <Show
      when="signed-out"
      fallback={
        <Link
          href="/app"
          className="rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-blue-500"
        >
          App
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