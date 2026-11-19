import {getTranslations} from 'next-intl/server'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import ThemeShell from '@/components/landing/ThemeShell'
import PricingCard from '@/components/pricing/PricingCard'

const plans = ['free', 'pro', 'enterprise'] as const

export default async function PricingPage() {
  const t = await getTranslations('pricing')
  return <ThemeShell>
    <Navbar />
    <main className="sp-subpage-main">
      <section className="sp-container sp-subpage-content">
        <div className="sp-section-intro">
          <span className="sp-section-label">{t('eyebrow')}</span>
          <h1 className="sp-subpage-title">{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </div>
        <div className="sp-pricing-grid">
          {plans.map(plan => <PricingCard
            key={plan} plan={plan}
            name={t(`plans.${plan}.name`)}
            description={t(`plans.${plan}.description`)}
            price={t(`plans.${plan}.price`)}
            period={t(`plans.${plan}.period`)}
            features={t.raw(`plans.${plan}.features`)}
            cta={t(`plans.${plan}.cta`)}
            highlighted={plan === 'pro'}
            popularLabel={t('popular')}
          />)}
        </div>
      </section>
    </main>
    <Footer />
  </ThemeShell>
}
