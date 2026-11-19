'use client'

type SuccessBannerProps = {
  message: string
  onClose: () => void
}

export default function SuccessBanner({message, onClose}: SuccessBannerProps) {
  return (
    <div className="sp-success-banner">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="sp-success-text">
          ✅ {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="sp-success-close"
        >
          OK
        </button>
      </div>
    </div>
  )
}