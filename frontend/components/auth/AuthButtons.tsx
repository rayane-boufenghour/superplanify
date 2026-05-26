'use client'

import {Show, SignInButton, SignUpButton, UserButton, useAuth} from '@clerk/nextjs'
import {useTranslations} from 'next-intl'
import {Link} from '@/i18n/routing'
import ButtonSkeleton from '@/components/ui/ButtonSkeleton'

export default function AuthButtons() {
  const t = useTranslations('nav')
  const {isLoaded} = useAuth()

 if (!isLoaded) {
  return (
    <div className="flex items-center gap-3">
      <ButtonSkeleton size="sm" variant="outline" />
      <ButtonSkeleton size="sm" variant="primary" />
    </div>
  )
}

  return (
    <div className="flex items-center gap-3">
      <Show when="signed-out">
        <SignInButton mode="modal" forceRedirectUrl="/app">
          <button className="rounded-xl border border-blue-500/30 px-5 py-2 text-sm text-slate-200 transition hover:border-blue-400 hover:text-white">
            {t('login')}
          </button>
        </SignInButton>

        <SignUpButton mode="modal" forceRedirectUrl="/app">
          <button className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
            {t('createAccount')}
          </button>
        </SignUpButton>
      </Show>

      <Show when="signed-in">
        <Link
          href="/app"
          className="rounded-xl border border-blue-500/30 px-5 py-2 text-sm text-slate-200 transition hover:border-blue-400 hover:text-white"
        >
          App
        </Link>

        <UserButton />
      </Show>
    </div>
  )
}