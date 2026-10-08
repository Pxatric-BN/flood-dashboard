import {
  LayoutDashboard,
  Map,
  Waves,
  Route,
  BarChart3,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const menus = [
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Flood Map',
    path: '/map',
    icon: Map,
  },
  {
    label: 'Prediction',
    path: '/prediction',
    icon: Waves,
  },
  {
    label: 'Routes',
    path: '/routes',
    icon: Route,
  },
  {
    label: 'Analytics',
    path: '/analytics',
    icon: BarChart3,
  },
]

export default function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
      
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
          🌊
        </div>

        <div>
          <h1 className="font-semibold">
            Flood Prediction
          </h1>

          <p className="text-xs text-slate-400">
            Monitoring System
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon size={19} />
              {menu.label}
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4">
        <p className="text-xs text-slate-500">
          Flood Prediction System
        </p>

        <p className="mt-1 text-xs text-slate-600">
          v0.1.0
        </p>
      </div>
    </aside>
  )
}