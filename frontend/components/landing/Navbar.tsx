'use client'

import {useContext, useState} from 'react'
import Image from 'next/image'
import {useAuth} from '@clerk/nextjs'
import {useTranslations} from 'next-intl'
import {Link} from '@/i18n/routing'
import LanguageSwitcher from '@/components/common/LanguageSwitcher'
import AuthButtons from '@/components/auth/AuthButtons'
import {ThemeContext} from './theme-context'

export default function Navbar() {
  const t = useTranslations('landingV2')
  const [open, setOpen] = useState(false)
  const {theme, toggleTheme} = useContext(ThemeContext)
  const {isSignedIn, isLoaded} = useAuth()

  return <header className="sp-navbar">
    <nav className="sp-container sp-nav-inner" aria-label={t('navigation')}>
      <Link href="/" className="sp-brand" onClick={() => setOpen(false)}>
        <Image src="/images/superplanify_logo.png" alt="" width={36} height={36} className="sp-brand-logo" priority />
        <span>Super<span>Planify</span></span>
      </Link>
      <div className="sp-nav-links" aria-label={t('navigation')}>
        <Link href="/pricing">{t('pricing')}</Link>
        <Link href="/contact">{t('contact')}</Link>
      </div>
      <div className="sp-nav-actions">
        <LanguageSwitcher />
        <button type="button" className="sp-theme-toggle" onClick={toggleTheme} aria-label={theme === 'light' ? t('darkMode') : t('lightMode')} title={theme === 'light' ? t('darkMode') : t('lightMode')}>
          <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
        </button>
        {isLoaded && isSignedIn && <Link href="/app" className="sp-dashboard-link">{t('dashboard')} <span aria-hidden="true">↗</span></Link>}
        <div className="sp-desktop-auth"><AuthButtons /></div>
        <button type="button" className="sp-menu-button" aria-expanded={open} aria-controls="sp-mobile-menu" aria-label={open ? t('closeMenu') : t('openMenu')} onClick={() => setOpen(value => !value)}>{open ? '✕' : '☰'}</button>
      </div>
    </nav>
    {open && <div id="sp-mobile-menu" className="sp-mobile-menu sp-container">
      <Link href="/pricing" onClick={() => setOpen(false)}>{t('pricing')}</Link>
      <Link href="/contact" onClick={() => setOpen(false)}>{t('contact')}</Link>
      {isLoaded && isSignedIn && <Link href="/app" className="sp-dashboard-link" onClick={() => setOpen(false)}>{t('dashboard')} ↗</Link>}
      <div className="sp-mobile-auth"><AuthButtons /></div>
    </div>}
  </header>
}
