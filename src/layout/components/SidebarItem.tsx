import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface SidebarItemProps {
  to: string
  label: string
  icon: LucideIcon
}

export default function SidebarItem({
  to,
  label,
  icon: Icon,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-lg px-3 py-2.5',
          'text-sm font-medium transition-colors',
          isActive
            ? 'bg-black text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-black',
        ].join(' ')
      }
    >
      <Icon size={18} strokeWidth={2} />
      <span>{label}</span>
    </NavLink>
  )
}