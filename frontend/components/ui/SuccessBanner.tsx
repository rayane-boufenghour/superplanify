'use client'

type SuccessBannerProps = {
  message: string
  onClose: () => void
}

export default function SuccessBanner({message, onClose}: SuccessBannerProps) {
  return (
    <div className="sticky top-[89px] z-40 animate-[fadeIn_0.25s_ease-out] border-b border-emerald-400/30 bg-emerald-500/10 px-6 py-3 shadow-lg shadow-emerald-950/20 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-sm font-semibold text-emerald-100">
          ✅ {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-emerald-300/30 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200 hover:bg-emerald-400/10 hover:text-white"
        >
          OK
        </button>
      </div>
    </div>
  )
}