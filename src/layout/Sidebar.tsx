import {
  BarChart3,
  CircleHelp,
  Droplets,
  LayoutDashboard,
  Map,
  Route,
  Settings,
  Waves,
} from 'lucide-react'
import { useLocation } from 'react-router-dom'

import LayerToggle from '@/layout/components/LayerToggle'
import SidebarItem from '@/layout/components/SidebarItem'
import SidebarSection from '@/layout/components/SidebarSection'

import type {
  MapLayerKey,
  MapLayers,
} from '@/feature/map/hooks/useMapLayers'

interface SidebarProps {
  layers: MapLayers
  onToggleLayer: (layer: MapLayerKey) => void
}

export default function Sidebar({
  layers,
  onToggleLayer,
}: SidebarProps) {
  const location = useLocation()

  const isMapPage = location.pathname === '/map'

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

      {isMapPage && (
        <SidebarSection title="Map Layers">
          <LayerToggle
            label="Flood Prediction"
            icon={Droplets}
            checked={layers.prediction}
            onChange={() => onToggleLayer('prediction')}
          />

          <LayerToggle
            label="Rainfall"
            icon={Waves}
            checked={layers.rainfall}
            onChange={() => onToggleLayer('rainfall')}
          />

          <LayerToggle
            label="Water Level"
            icon={Waves}
            checked={layers.waterLevel}
            onChange={() => onToggleLayer('waterLevel')}
          />

          <LayerToggle
            label="Routes"
            icon={Route}
            checked={layers.routes}
            onChange={() => onToggleLayer('routes')}
          />
        </SidebarSection>
      )}

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