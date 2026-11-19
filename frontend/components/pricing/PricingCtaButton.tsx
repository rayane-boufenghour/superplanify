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

  const className = `sp-pricing-cta ${highlighted ? 'sp-pricing-cta-primary' : 'sp-pricing-cta-secondary'}`

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