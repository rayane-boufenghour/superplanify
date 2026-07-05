import type {Metadata} from 'next'
import {ClerkProvider} from '@clerk/nextjs'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import '../globals.css'
import { clerkLocalizations } from '@/lib/clerk-localization'
import { enUS } from '@clerk/localizations/en-US'
import type {Locale} from '@/i18n/routing'

export const metadata: Metadata = {
  title: 'SuperPlanify',
  description: 'All your schedules. One smart platform.',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{locale: Locale}>
}) {
  const {locale} = await params
  const messages = await getMessages()

  return (
    <ClerkProvider localization={clerkLocalizations[locale] ?? {enUS}} afterSignOutUrl="/">
      <html lang="en">
        <body>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </html>
  </ClerkProvider>
  )
}