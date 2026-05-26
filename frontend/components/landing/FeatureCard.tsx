type FeatureCardProps = {
  title: string
  description: string
}

export default function FeatureCard({title, description}: FeatureCardProps) {
  return (
    <article className="rounded-3xl border border-blue-500/20 bg-[#071226]/80 p-8 shadow-lg shadow-blue-950/30 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-blue-500/20">
      <h3 className="text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-300">
        {description}
      </p>
    </article>
  )
}