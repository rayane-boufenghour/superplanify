'use client'

import {useState} from 'react'
import {useTranslations} from 'next-intl'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import ContactForm from '@/components/contact/ContactForm'
import SuccessBanner from '@/components/ui/SuccessBanner'

export default function ContactPage() {
  const t = useTranslations('contact')
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.25),transparent_45%)]" />

      <div className="relative z-10">
        <Navbar />

        {submitted && (
          <SuccessBanner
            message={t('form.success_message')}
            onClose={() => setSubmitted(false)}
          />
        )}

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold text-blue-300">
              {t('eyebrow')}
            </p>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              {t('title')}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {t('subtitle')}
            </p>
          </div>

          <ContactForm onSubmitSuccess={() => setSubmitted(true)} />
        </section>

        <div className="mx-auto max-w-7xl px-6">
          <Footer />
        </div>
      </div>
    </main>
  )
}