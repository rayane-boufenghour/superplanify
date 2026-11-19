'use client'

import {useEffect, useState} from 'react'
import type {ReactNode} from 'react'
import {ThemeContext} from './theme-context'

export default function ThemeShell({children, className = 'sp-landing'}: {children: ReactNode; className?: string}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('sp-theme')
      if (stored === 'light' || stored === 'dark') {
        setTheme(stored)
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark')
      }
    } catch {
      // The landing page still works when storage is unavailable.
    }
  }, [])

  function toggleTheme() {
    setTheme(current => {
      const next = current === 'light' ? 'dark' : 'light'
      try { window.localStorage.setItem('sp-theme', next) } catch { /* Storage may be unavailable. */ }
      return next
    })
  }

  return <ThemeContext.Provider value={{theme, toggleTheme}}>
    <div className={className} data-theme={theme}>{children}</div>
  </ThemeContext.Provider>
}
