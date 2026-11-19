import {getTranslations} from 'next-intl/server'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import HeroActions from '@/components/landing/HeroActions'
import ThemeShell from '@/components/landing/ThemeShell'

export default async function HomePage() {
  const t = await getTranslations('landingV2')

  return (
    <ThemeShell>
      <Navbar />
      <main>
        <section className="sp-hero sp-container">
          <div className="sp-hero-copy">
            <div className="sp-kicker"><span className="sp-kicker-dot" />{t('eyebrow')}</div>
            <h1>{t('titleStart')} <span>{t('titleAccent')}</span></h1>
            <p className="sp-lead">{t('description')}</p>
            <div className="sp-hero-actions">
              <HeroActions />
              <a className="sp-link-action" href="#how-it-works">{t('explore')} <span aria-hidden="true">↗</span></a>
            </div>
            <div className="sp-hero-note"><span className="sp-note-dot" />{t('note')}</div>
          </div>
          <div className="sp-hero-visual" aria-label={t('visualLabel')}>
            <div className="sp-visual-glow" />
            <div className="sp-visual-caption">{t('visualCaption')}</div>
            <div className="sp-source-list">
              <div className="sp-source sp-source-blue"><span className="sp-source-icon">✦</span><div><strong>{t('school')}</strong><small>{t('schoolDetail')}</small></div><span className="sp-source-check">✓</span></div>
              <div className="sp-source sp-source-green"><span className="sp-source-icon">◈</span><div><strong>{t('driving')}</strong><small>{t('drivingDetail')}</small></div><span className="sp-source-check">✓</span></div>
              <div className="sp-source sp-source-teal"><span className="sp-source-icon">✳</span><div><strong>{t('sports')}</strong><small>{t('sportsDetail')}</small></div><span className="sp-source-check">✓</span></div>
            </div>
            <div className="sp-flow-line"><span>↓</span></div>
            <div className="sp-unified"><span className="sp-unified-icon">▦</span><div><strong>{t('unified')}</strong><small>{t('unifiedDetail')}</small></div><span className="sp-unified-spark">✦</span></div>
            <div className="sp-visual-footnote">{t('visualFootnote')}</div>
          </div>
        </section>

        <section id="how-it-works" className="sp-section sp-container">
          <div className="sp-section-intro">
            <span className="sp-section-label">{t('sectionEyebrow')}</span>
            <h2>{t('sectionTitle')}</h2>
            <p>{t('sectionDescription')}</p>
          </div>
          <div className="sp-feature-grid">
            <article className="sp-feature"><span className="sp-feature-icon sp-fi-blue">▦</span><span className="sp-feature-number">01</span><h3>{t('featureOneTitle')}</h3><p>{t('featureOneDescription')}</p></article>
            <article className="sp-feature"><span className="sp-feature-icon sp-fi-green">⌘</span><span className="sp-feature-number">02</span><h3>{t('featureTwoTitle')}</h3><p>{t('featureTwoDescription')}</p></article>
            <article className="sp-feature"><span className="sp-feature-icon sp-fi-teal">↗</span><span className="sp-feature-number">03</span><h3>{t('featureThreeTitle')}</h3><p>{t('featureThreeDescription')}</p></article>
          </div>
        </section>

        <section id="about" className="sp-about-wrap">
          <div className="sp-container sp-about">
            <div><span className="sp-section-label">{t('aboutEyebrow')}</span><h2>{t('aboutTitle')}</h2><p>{t('aboutDescription')}</p></div>
            <div className="sp-about-steps">
              <div><span>01</span><strong>{t('stepOne')}</strong></div>
              <div><span>02</span><strong>{t('stepTwo')}</strong></div>
              <div><span>03</span><strong>{t('stepThree')}</strong></div>
              <div><span>04</span><strong>{t('stepFour')}</strong></div>
            </div>
          </div>
        </section>
        <section className="sp-container sp-bottom-cta"><h2>{t('ctaTitle')}</h2><p>{t('ctaDescription')}</p><HeroActions /></section>
      </main>
      <Footer />
    </ThemeShell>
  )
}
