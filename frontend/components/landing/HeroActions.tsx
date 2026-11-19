'use client'

import {Show, SignUpButton, useAuth} from '@clerk/nextjs'
import {useTranslations} from 'next-intl'
import {Link} from '@/i18n/routing'

export default function HeroActions() {
  const t = useTranslations('landingV2')
  const {isLoaded} = useAuth()

  if (!isLoaded) return <span className="sp-primary-cta sp-cta-loading" aria-hidden="true" />

  return <Show when="signed-out" fallback={<Link href="/app" className="sp-primary-cta">{t('openApp')} <span aria-hidden="true">→</span></Link>}>
    <SignUpButton mode="modal"><button type="button" className="sp-primary-cta">{t('getStarted')} <span aria-hidden="true">→</span></button></SignUpButton>
  </Show>
}
