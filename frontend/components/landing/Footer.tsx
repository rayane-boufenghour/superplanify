'use client'

import {useTranslations} from 'next-intl'

export default function Footer() {
  const t = useTranslations('landingV2')
  return <footer className="sp-footer"><div className="sp-container sp-footer-inner"><span>© {new Date().getFullYear()} SuperPlanify. {t('rights')}</span></div></footer>
}
