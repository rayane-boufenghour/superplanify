'use client'

import {Show, SignInButton, SignUpButton, UserButton, useAuth} from '@clerk/nextjs'
import {useTranslations} from 'next-intl'
import ButtonSkeleton from '@/components/ui/ButtonSkeleton'
import LogoutButton from '@/components/auth/LogoutButton'

export default function AuthButtons() {
  const tNav = useTranslations('nav')
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
        <div className="flex w-full items-center lg:w-auto">
          <SignInButton mode="modal">
            <button className="rounded-xl border border-blue-500/30 px-5 py-2 text-sm text-slate-200 transition hover:border-blue-400 hover:text-white">
              {tNav('login')}
            </button>
          </SignInButton>

          <div className="ml-auto pl-3 lg:ml-0">
            <SignUpButton mode="modal">
              <button className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
                {tNav('createAccount')}
              </button>
            </SignUpButton>
          </div>
          
        </div>
      </Show>

      <Show when="signed-in">
        <div className="flex w-full items-center lg:w-auto">
          <UserButton />

          <div className="ml-auto pl-3 lg:ml-0">
            <LogoutButton />
          </div>
        </div>
      </Show>
    </div>
  )
}