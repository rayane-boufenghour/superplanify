import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import PricingCard from '@/components/pricing/PricingCard'

const plans = ['free', 'pro', 'enterprise'] as const

export default async function PricingPage() {
    const t = await getTranslations('pricing')

    return (
        <main className="min-h-screen bg-[#020817] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_45%)]" />

            <div className="relative z-10">
                <Navbar />

                <div className="mx-auto max-w-7xl px-6 py-16">
                    <div className="text-center">
                        <p className="mb-4 text-sm font-semibold text-blue-300">
                            {t('eyebrow')}
                        </p>

                        <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                            {t('title')}
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            {t('subtitle')}
                        </p>
                    </div>

                    <section className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
                        {plans.map((plan) => (
                            <PricingCard
                                key={plan}
                                plan={plan}
                                name={t(`plans.${plan}.name`)}
                                description={t(`plans.${plan}.description`)}
                                price={t(`plans.${plan}.price`)}
                                period={t(`plans.${plan}.period`)}
                                features={t.raw(`plans.${plan}.features`)}
                                cta={t(`plans.${plan}.cta`)}
                                highlighted={plan === 'pro'}
                                popularLabel={t('popular')}
                            />
                        ))}
                    </section>
                </div>

                <div className="mx-auto max-w-7xl px-6">
                    <Footer />
                </div>
            </div>
        </main>
    )
}