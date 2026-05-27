import {getTranslations} from 'next-intl/server'

export default async function MemberHomePage() {
    const t = await getTranslations("members")
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {t("settings")}
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-slate-300">
        {t("settings_intro")}
      </p>
    </div>
  )
}