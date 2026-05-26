import {getTranslations} from 'next-intl/server'
import Navbar from '@/components/landing/Navbar'
import FeatureCard from '@/components/landing/FeatureCard'
import Footer from '@/components/landing/Footer'
import HeroActions from '@/components/landing/HeroActions'

import {auth} from '@clerk/nextjs/server'
import {redirect} from '@/i18n/routing'

const features = [
  {
    titleKey: 'features.allSchedules.title',
    descriptionKey: 'features.allSchedules.description',
  },
  {
    titleKey: 'features.realTimeUpdates.title',
    descriptionKey: 'features.realTimeUpdates.description',
  },
  {
    titleKey: 'features.workflows.title',
    descriptionKey: 'features.workflows.description',
  },
  {
    titleKey: 'features.peopleTeams.title',
    descriptionKey: 'features.peopleTeams.description',
  },
] as const

type HomePageProps = {
  params: Promise<{
    locale: 'en' | 'fr'
  }>
}

export default async function HomePage({params}: HomePageProps) {
  const {locale} = await params
  const {userId} = await auth()

  if (userId) {
    redirect({href: '/app', locale})
  }

  const t = await getTranslations()

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_45%)]" />

      <div className="relative z-10">
        <Navbar />

        <div className="mx-auto max-w-7xl px-6">
          <section className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-20 pt-16 text-center">
            <div className="mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-base font-medium text-blue-200">
              {t('home.badge')}
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-none tracking-tight sm:text-6xl md:text-7xl">
              <span className="block">
                {t('home.titleLine1')}
              </span>

              <span className="mt-2 block text-blue-500">
                {t('home.titleLine2')}
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              {t('home.subtitle')}
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <HeroActions />

              <a
                href="#features"
                className="rounded-2xl border border-blue-500/30 bg-[#071226] px-8 py-4 text-base font-semibold text-slate-200 transition hover:border-blue-400 hover:text-white"
              >
                {t('home.ctaOrganization')}
              </a>
            </div>
          </section>

          <section
            id="features"
            className="grid gap-6 pb-24 md:grid-cols-2 xl:grid-cols-4"
          >
            {features.map((feature) => (
              <FeatureCard
                key={feature.titleKey}
                title={t(feature.titleKey)}
                description={t(feature.descriptionKey)}
              />
            ))}
          </section>

          <Footer />
        </div>
      </div>
    </main>
  )
}

function SignedOutButtons() {
  return null
}