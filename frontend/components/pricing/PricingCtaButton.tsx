'use client'

import {SignInButton, useAuth} from '@clerk/nextjs'
import {Link} from '@/i18n/routing'

type PricingCtaButtonProps = {
  plan: 'free' | 'pro' | 'enterprise'
  label: string
  highlighted?: boolean
}

export default function PricingCtaButton({
  plan,
  label,
  highlighted = false,
}: PricingCtaButtonProps) {
  const {isSignedIn} = useAuth()

  const className = [
    'mt-10 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold transition',
    highlighted
      ? 'bg-blue-600 text-white hover:bg-blue-500'
      : 'border border-blue-500/30 text-slate-200 hover:border-blue-400 hover:text-white',
  ].join(' ')

  if (plan === 'enterprise') {
    return (
      <Link href="/contact" className={className}>
        {label}
      </Link>
    )
  }

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal" forceRedirectUrl={plan === 'pro' ? '/app/billing' : '/app'}>
        <button className={className} type="button">
          {label}
        </button>
      </SignInButton>
    )
  }

  return (
    <Link
      href={plan === 'pro' ? '/app/billing' : '/app'}
      className={className}
    >
      {label}
    </Link>
  )
}