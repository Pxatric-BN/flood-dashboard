import {
  BarChart3,
  CircleHelp,
  LayoutDashboard,
  Map,
  Settings,
} from 'lucide-react'

import SidebarItem from '@/layout/components/SidebarItem'
import SidebarSection from '@/layout/components/SidebarSection'

export default function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col rounded-2xl bg-white p-3 shadow-sm">

      <div className="mb-6 flex h-10 items-center px-3">
        <span className="text-lg font-bold tracking-tight">
          Flood Prediction
        </span>
      </div>
      <SidebarSection title="Main">
        <SidebarItem
          to="/"
          label="Dashboard"
          icon={LayoutDashboard}
        />

        <SidebarItem
          to="/map"
          label="Flood Map"
          icon={Map}
        />

        <SidebarItem
          to="/analytics"
          label="Analytics"
          icon={BarChart3}
        />
      </SidebarSection>
      <div className="mt-auto pt-6">
        <SidebarItem
          to="/settings"
          label="Settings"
          icon={Settings}
        />

        <SidebarItem
          to="/help"
          label="Help & Support"
          icon={CircleHelp}
        />
      </div>
    </aside>
  )
}