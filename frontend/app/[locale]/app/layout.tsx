import AppSidebar from '@/components/app/AppSidebar'
import {getTranslations} from 'next-intl/server'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const t = await getTranslations("members");
  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),transparent_45%)]" />

      <div className="relative z-10 lg:flex">
        <AppSidebar />

        <section className="flex-1 px-6 py-10 lg:px-10 lg:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl border border-blue-500/20 bg-[#071226]/80 p-8 shadow-lg shadow-blue-950/30">
                <p className="mb-3 text-sm font-semibold text-blue-300">
                    {t("memberarea")}
                </p>
                { children }
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}