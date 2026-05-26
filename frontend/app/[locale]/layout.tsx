import type {Metadata} from 'next'
import {ClerkProvider} from '@clerk/nextjs'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import '../globals.css'

export const metadata: Metadata = {
  title: 'SuperPlanify',
  description: 'All your schedules. One smart platform.',
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const messages = await getMessages()

  return (
    <ClerkProvider afterSignOutUrl="/">
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