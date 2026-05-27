'use client'

import {useLogout} from '@/lib/auth/useLogout'
import {useTranslations} from 'next-intl'

type LogoutButtonProps = {
  className?: string
}

export default function LogoutButton({className = ''}: LogoutButtonProps) {
  const logout = useLogout()
  const tNav = useTranslations('nav')

  return (
    <button
      type="button"
      onClick={logout}
      className={[
        'inline-flex items-center justify-center rounded-xl border border-red-500/25 px-5 py-2 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-200 hover:shadow-lg hover:shadow-red-500/10',
        className,
      ].join(' ')}
    >
      {tNav('logout')}
    </button>
  )
}