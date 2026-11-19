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
      className="sp-contact-form"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6">
        <div>
          <label className="sp-field-label">
            {t('reason.label')}
          </label>

          <select className="sp-form-control">
            <option>{t('reason.options.suggestions')}</option>
            <option>{t('reason.options.quote')}</option>
            <option>{t('reason.options.other')}</option>
          </select>
        </div>

        <div>
          <label className="sp-field-label">
            {t('email.label')}
          </label>

          <input
            type="email"
            value={email}
            placeholder={t('email.placeholder')}
            className={`sp-form-control ${errors.email ? 'sp-form-error' : ''}`}
            onChange={(event) => {
              setEmail(event.target.value)
              if (errors.email) {
                setErrors((current) => ({...current, email: ''}))
              }
            }}
          />

          {errors.email && (
            <p className="sp-form-error-text">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="sp-field-label">
            {t('message.label')}
          </label>

          <textarea
            rows={7}
            value={message}
            placeholder={t('message.placeholder')}
            className={`sp-form-control sp-form-textarea ${errors.message ? 'sp-form-error' : ''}`}
            onChange={(event) => {
              setMessage(event.target.value)
              if (errors.message) {
                setErrors((current) => ({...current, message: ''}))
              }
            }}
          />

          {errors.message && (
            <p className="sp-form-error-text">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="sp-primary-cta sp-contact-submit"
        >
          {t('submit')}
        </button>
      </div>
    </form>
  )
}