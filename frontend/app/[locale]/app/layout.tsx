import AppSidebar from '@/components/app/AppSidebar'
import ThemeShell from '@/components/landing/ThemeShell'
import {getTranslations} from 'next-intl/server'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const t = await getTranslations("members");
  return (
    <ThemeShell className="sp-dashboard">
    <main className="sp-dashboard-main min-h-screen">
      <div className="sp-dashboard-glow" aria-hidden="true" />

      <div className="relative z-10 lg:flex">
        <AppSidebar />

        <section className="flex-1 px-6 py-10 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="sp-dashboard-panel rounded-3xl p-8">
                <p className="sp-dashboard-eyebrow mb-3 text-sm font-semibold">
                    {t("memberarea")}
                </p>
                { children }
            </div>
          </div>
        </section>
      </div>
    </main>
    </ThemeShell>
  )
}