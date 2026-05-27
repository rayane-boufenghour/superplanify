'use client'

import {useState} from 'react'
import {useTranslations} from 'next-intl'

type ContactFormProps = {
  onSubmitSuccess: () => void
}

export default function ContactForm({onSubmitSuccess}: ContactFormProps) {
  const t = useTranslations('contact.form')

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({
    email: '',
    message: '',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = {
      email: email.trim() ? '' : t('email.error'),
      message: message.trim() ? '' : t('message.error'),
    }

    setErrors(nextErrors)

    if (nextErrors.email || nextErrors.message) {
      return
    }

    onSubmitSuccess()
  }

  return (
    <form
      className="rounded-3xl border border-blue-500/20 bg-[#071226]/80 p-8 shadow-2xl shadow-blue-950/40"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-blue-200">
            {t('reason.label')}
          </label>

          <select className="w-full rounded-2xl border border-blue-500/30 bg-black/70 px-5 py-4 text-slate-100 outline-none transition focus:border-cyan-300 focus:shadow-lg focus:shadow-cyan-400/20">
            <option>{t('reason.options.suggestions')}</option>
            <option>{t('reason.options.quote')}</option>
            <option>{t('reason.options.other')}</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-blue-200">
            {t('email.label')}
          </label>

          <input
            type="email"
            value={email}
            placeholder={t('email.placeholder')}
            className={[
              'w-full rounded-2xl border bg-black/70 px-5 py-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:shadow-lg',
              errors.email
                ? 'border-red-400/70 focus:border-red-300 focus:shadow-red-400/20'
                : 'border-blue-500/30 focus:border-cyan-300 focus:shadow-cyan-400/20',
            ].join(' ')}
            onChange={(event) => {
              setEmail(event.target.value)
              if (errors.email) {
                setErrors((current) => ({...current, email: ''}))
              }
            }}
          />

          {errors.email && (
            <p className="mt-2 text-sm font-medium text-red-300">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-blue-200">
            {t('message.label')}
          </label>

          <textarea
            rows={7}
            value={message}
            placeholder={t('message.placeholder')}
            className={[
              'w-full resize-none rounded-2xl border bg-black/70 px-5 py-4 text-slate-100 outline-none transition placeholder:text-slate-500 focus:shadow-lg',
              errors.message
                ? 'border-red-400/70 focus:border-red-300 focus:shadow-red-400/20'
                : 'border-blue-500/30 focus:border-cyan-300 focus:shadow-cyan-400/20',
            ].join(' ')}
            onChange={(event) => {
              setMessage(event.target.value)
              if (errors.message) {
                setErrors((current) => ({...current, message: ''}))
              }
            }}
          />

          {errors.message && (
            <p className="mt-2 text-sm font-medium text-red-300">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500 hover:shadow-blue-400/30"
        >
          {t('submit')}
        </button>
      </div>
    </form>
  )
}