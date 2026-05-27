import {Link} from '@/i18n/routing'

type SidebarLinkProps = {
  label: string
  href: string
  isActive: boolean
  onClick?: () => void
}

export default function SidebarLink({
  label,
  href,
  isActive,
  onClick,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        'block rounded-2xl px-4 py-3 text-sm font-semibold transition',
        isActive
          ? 'border border-blue-400/40 bg-blue-600/20 text-white shadow-lg shadow-blue-500/10'
          : 'border border-transparent text-slate-300 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}