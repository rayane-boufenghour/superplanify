import PricingCtaButton from '@/components/pricing/PricingCtaButton'

type PricingCardProps = {
  plan: 'free' | 'pro' | 'enterprise'
  name: string
  description: string
  price: string
  period: string
  features: string[]
  cta: string
  highlighted?: boolean
  popularLabel: string
}

export default function PricingCard({plan, name, description, price, period, features, cta, highlighted = false, popularLabel}: PricingCardProps) {
  return <article className={`sp-pricing-card ${highlighted ? 'sp-pricing-highlighted' : ''}`}>
    <div className="sp-pricing-badge-space">{highlighted && <span className="sp-pricing-badge">{popularLabel}</span>}</div>
    <h2>{name}</h2>
    <p className="sp-pricing-description">{description}</p>
    <div className="sp-pricing-amount"><strong>{price}</strong>{period && <span>{period}</span>}</div>
    <ul className="sp-pricing-features">{features.map((feature, i) => <li key={i}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
    <PricingCtaButton plan={plan} label={cta} highlighted={highlighted} />
  </article>
}
