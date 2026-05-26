'use client'

import {useLocale} from 'next-intl'
import {usePathname, useRouter} from '@/i18n/routing'
import {useTransition, useState, useRef, useEffect} from 'react'

type LocaleCode = 'en' | 'fr'

const availableLocales: Array<{code: LocaleCode; name: string}> = [
  {code: 'en', name: 'English'},
  {code: 'fr', name: 'Français'},
]

export default function LanguageSwitcher() {
  const locale = useLocale() as LocaleCode
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const selectedLocale = availableLocales.find(item => item.code === locale)

  const changeLocale = (newLocale: LocaleCode) => {
    setIsOpen(false)

    startTransition(() => {
      router.replace(pathname, {locale: newLocale})
    })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="flex h-10 items-center gap-2 rounded-xl border border-blue-500/30 bg-black px-3 text-sm font-medium text-white transition hover:border-blue-400 disabled:opacity-60 md:min-w-36 md:justify-between"
        type="button"
        disabled={isPending}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1 md:hidden">
          <span>🌐</span>
          <span className="text-xs">⌄</span>
        </div>

        <div className="hidden w-full items-center justify-between gap-3 md:flex">
          <span>{selectedLocale?.name}</span>
          <span className="text-xs">⌄</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 min-w-40 overflow-hidden rounded-xl border border-blue-500/30 bg-black shadow-lg shadow-black/40">
          {availableLocales.map(localeItem => (
            <button
              key={localeItem.code}
              className={[
                'block w-full px-4 py-3 text-left text-sm transition',
                localeItem.code === locale
                  ? 'bg-blue-600/30 text-white'
                  : 'text-slate-300 hover:bg-blue-600/20 hover:text-white',
              ].join(' ')}
              type="button"
              onClick={() => changeLocale(localeItem.code)}
            >
              {localeItem.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}