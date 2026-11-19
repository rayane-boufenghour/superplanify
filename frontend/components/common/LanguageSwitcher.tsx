'use client'

import {useLocale} from 'next-intl'
import {usePathname, useRouter} from '@/i18n/routing'
import {useTransition} from 'react'

export default function LanguageSwitcher({variant = 'public'}: {variant?: 'public' | 'dashboard'}) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return <div className={`sp-language-control ${variant === 'dashboard' ? 'sp-language-dashboard' : ''}`}>
    <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18M12 3c5 5 5 13 0 18"/></svg>
    <span className="sp-language-code" aria-hidden="true">{locale.toUpperCase()}</span>
    <select aria-label={locale === 'fr' ? 'Choisir la langue' : 'Choose language'} value={locale} disabled={pending} onChange={event => {
      const nextLocale = event.target.value as 'en' | 'fr'
      startTransition(() => router.replace(pathname, {locale: nextLocale}))
    }}>
      <option value="en">EN</option>
      <option value="fr">FR</option>
    </select>
    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 9 6 6 6-6"/></svg>
  </div>
}
