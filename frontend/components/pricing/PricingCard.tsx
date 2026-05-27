import PricingCtaButton from '@/components/pricing/PricingCtaButton'

type PricingCardProps = {
    plan: 'free' | 'pro' | 'enterprise'
    name: string
    description: string
    price: string
    period: string
    features: string[]
    cta: string
    highlighted?: boolean
    popularLabel: string
}

export default function PricingCard({
    plan,
    name,
    description,
    price,
    period,
    features,
    cta,
    highlighted = false,
    popularLabel,
}: PricingCardProps) {
    return (
        <article
            className={[
                'flex min-h-[620px] flex-col rounded-3xl border bg-[#071226]/80 p-8 shadow-lg transition duration-300 hover:-translate-y-1',
                highlighted
                    ? 'border-blue-300/60 shadow-blue-500/25 hover:shadow-blue-400/40'
                    : 'border-blue-500/20 shadow-blue-950/30 hover:border-blue-400/50 hover:shadow-blue-500/20',
            ].join(' ')}
        >
            <div className="h-12">
                {highlighted && (
                    <div className="inline-flex rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200">
                        {popularLabel}
                    </div>
                )}
            </div>

            <div className="min-h-36">
                <h2 className="text-2xl font-bold">
                    {name}
                </h2>

                <p className="mt-3 leading-7 text-slate-300">
                    {description}
                </p>
            </div>

            <div className="mt-4 flex min-h-20 items-end gap-2">
                <span className="text-5xl font-black">
                    {price}
                </span>

                {period && (
                    <span className="pb-2 text-slate-400">
                        {period}
                    </span>
                )}
            </div>

            <ul className="mt-8 flex-1 space-y-4 text-slate-300">
                {features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                        <span className="text-blue-300">—</span>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <PricingCtaButton
                plan={plan}
                label={cta}
                highlighted={highlighted}
            />
        </article>
    )
}