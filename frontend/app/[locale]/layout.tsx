import type {Metadata} from 'next'
import {ClerkProvider} from '@clerk/nextjs'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import '../globals.css'
import { clerkLocalizations } from '@/lib/clerk-localization'
import {hasLocale} from 'next-intl'
import {routing} from '@/i18n/routing'

export const metadata: Metadata = {
  title: 'SuperPlanify',
  description: 'All your schedules. One smart platform.',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale: rawLocale} = await params
  const locale = hasLocale(routing.locales, rawLocale) ? rawLocale : routing.defaultLocale
  const messages = await getMessages()

  return (
    <ClerkProvider localization={clerkLocalizations[locale]} afterSignOutUrl="/">
      <html lang={locale}>
        <body>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
  </ClerkProvider>
  )
}