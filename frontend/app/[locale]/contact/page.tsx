import {getTranslations} from 'next-intl/server'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import ThemeShell from '@/components/landing/ThemeShell'

export default async function ContactPage() {
  const t = await getTranslations('contactV3')
  return <ThemeShell>
    <Navbar />
    <main className="sp-subpage-main">
      <section className="sp-container sp-contact-v3">
        <div className="sp-contact-intro">
          <span className="sp-section-label">{t('eyebrow')}</span>
          <h1 className="sp-subpage-title">{t('title')}</h1>
          <p>{t('subtitle')}</p>
        </div>
        <div className="sp-contact-methods">
          <article className="sp-contact-method sp-contact-method-primary">
            <span className="sp-contact-method-icon" aria-hidden="true">✉</span>
            <div><h2>{t('emailTitle')}</h2><p>{t('emailDescription')}</p>
            <span className="sp-contact-placeholder">{t('emailPlaceholder')}</span>
            <small>{t('emailNote')}</small></div>
          </article>
          <article className="sp-contact-method">
            <span className="sp-contact-method-icon" aria-hidden="true">↗</span>
            <div><h2>{t('socialTitle')}</h2><p>{t('socialDescription')}</p>
              <div className="sp-social-list"><span>LinkedIn · {t('soon')}</span><span>X / Twitter · {t('soon')}</span></div>
            </div>
          </article>
          <div className="sp-contact-later"><span aria-hidden="true">◷</span><div><strong>{t('demoTitle')}</strong><p>{t('demoDescription')}</p></div></div>
        </div>
      </section>
    </main>
    <Footer />
  </ThemeShell>
}
