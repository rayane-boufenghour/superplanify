'use client'

import { useState, useContext } from 'react'
import Image from 'next/image'
import { UserButton, useUser } from '@clerk/nextjs'
import { Link, usePathname } from '@/i18n/routing'
import SidebarLink from '@/components/app/SidebarLink'
import { useTranslations } from 'next-intl'
import LogoutButton from '@/components/auth/LogoutButton'
import LanguageSwitcher from '@/components/common/LanguageSwitcher'
import {ThemeContext} from '@/components/landing/theme-context'

export default function AppSidebar() {
    const tMembers = useTranslations('members')
    const {theme, toggleTheme} = useContext(ThemeContext)

    const mainItems = [
        { label: tMembers('orgs'), href: '/app' },
        { label: tMembers('scheds'), href: '/app/schedules' },
    ]

    const secondaryItems = [
        { label: tMembers('settings'), href: '/app/settings' },
        { label: tMembers('billing'), href: '/app/billing' },
    ]

    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const { user } = useUser()
    const userEmail = user?.primaryEmailAddress?.emailAddress ?? 'Account'

    const content = (
        <div className="sp-dashboard-sidebar flex h-full flex-col">
            <Link href="/" className="flex items-center gap-3 px-6 py-6">
                <Image
                    src="/images/superplanify_logo.png"
                    alt="SuperPlanify logo"
                    width={48}
                    height={48}
                    className="object-contain"
                    priority
                />

                <span className="text-lg font-semibold tracking-tight">
                    Super<span className="sp-dashboard-brand-accent">Planify</span>
                </span>
            </Link>

            <nav className="flex-1 px-4">
                <div className="space-y-2">
                    {mainItems.map((item) => (
                        <SidebarLink
                            key={item.href}
                            label={item.label}
                            href={item.href}
                            isActive={pathname === item.href}
                            onClick={() => setIsOpen(false)}
                        />
                    ))}
                </div>

                <div className="sp-dashboard-divider my-6 border-t" />

                <div className="space-y-2">
                    {secondaryItems.map((item) => (
                        <SidebarLink
                            key={item.href}
                            label={item.label}
                            href={item.href}
                            isActive={pathname === item.href}
                            onClick={() => setIsOpen(false)}
                        />
                    ))}
                </div>
            </nav>

            <div className="sp-dashboard-divider border-t p-4">
                <div className="mb-4 flex items-center justify-between gap-2">
                    <LanguageSwitcher variant="dashboard" />
                    <button
                        type="button"
                        className="sp-dashboard-theme-toggle"
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                    >
                        <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
                    </button>
                </div>

                <div className="sp-dashboard-account mb-3 flex items-center gap-3 rounded-2xl px-4 py-3">
                    <UserButton />

                    <span className="sp-dashboard-muted truncate text-sm font-medium">
                        {userEmail}
                    </span>
                </div>

                <LogoutButton className="w-full py-3" />
            </div>
        </div>
    )

    return (
        <>
            <header className="sp-dashboard-mobile-header sticky top-0 z-40 flex items-center justify-between border-b px-5 py-4 backdrop-blur lg:hidden">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/images/superplanify_logo.png"
                        alt="SuperPlanify logo"
                        width={42}
                        height={42}
                        className="object-contain"
                        priority
                    />

                    <span className="font-semibold">
                        Super<span className="sp-dashboard-brand-accent">Planify</span>
                    </span>
                </Link>

                <button
                    className="sp-dashboard-menu-button rounded-xl border px-3 py-2 transition"
                    type="button"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    onClick={() => setIsOpen((current) => !current)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </header>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={[
                    'fixed inset-y-0 left-0 z-50 w-80 transform border-r border-blue-500/20 shadow-2xl shadow-black/50 transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:z-30 lg:h-screen lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full',
                ].join(' ')}
            >
                {content}
            </aside>
        </>
    )
}