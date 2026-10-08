import type { ReactNode } from 'react'

interface SidebarSectionProps {
  title: string
  children: ReactNode
}

export default function SidebarSection({
  title,
  children,
}: SidebarSectionProps) {
  return (
    <section className="mb-5">
      <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        {title}
      </div>

      <div className="space-y-1">
        {children}
      </div>
    </section>
  )
}