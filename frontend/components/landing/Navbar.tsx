'use client'

import {useState} from 'react'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {Link} from '@/i18n/routing'
import LanguageSwitcher from '@/components/common/LanguageSwitcher'
import AuthButtons from '@/components/auth/AuthButtons'

const navLinks = [
  {labelKey: 'features', href: '#features'},
  {labelKey: 'pricing', href: '#pricing'},
  {labelKey: 'contact', href: '#contact'},
] as const

export default function Navbar() {
  const t = useTranslations('nav')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-500/20 bg-black/90 px-6 py-4 shadow-lg shadow-black/30 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/superplanify_logo.png"
            alt="SuperPlanify logo"
            width={56}
            height={56}
            className="object-contain"
            priority
          />

          <span className="text-xl font-semibold tracking-tight text-white">
            SuperPlanify
          </span>
        </Link>

        <div className="hidden items-center gap-10 text-base font-semibold text-slate-300 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.labelKey}
              href={link.href}
              className="transition hover:text-white"
            >
              {t(link.labelKey)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <div className="hidden lg:block">
            <AuthButtons />
          </div>

          <button
            className="rounded-xl border border-blue-500/30 px-3 py-2 text-slate-200 transition hover:border-blue-400 hover:text-white lg:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span>{isMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      <div
        className={[
          'mx-auto max-w-7xl overflow-hidden border-t border-blue-500/20 transition-all duration-300 ease-out lg:hidden',
          isMenuOpen
            ? 'mt-5 max-h-96 pt-5 opacity-100'
            : 'mt-0 max-h-0 pt-0 opacity-0',
        ].join(' ')}
      >
        <div className="space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.labelKey}
              href={link.href}
              className="block text-base font-semibold text-slate-300 transition hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {t(link.labelKey)}
            </a>
          ))}

          <div className="flex flex-col gap-3 pt-2">
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  )
}