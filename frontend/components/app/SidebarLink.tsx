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
        'sp-dashboard-link block rounded-2xl px-4 py-3 text-sm font-semibold transition',
        isActive ? 'sp-dashboard-link-active' : '',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}