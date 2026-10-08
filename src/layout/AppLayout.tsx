import { Outlet } from 'react-router-dom'

import { useMapLayers } from '@/feature/map/hooks/useMapLayers'
import Header from '@/layout/Header'
import Sidebar from '@/layout/Sidebar'

export default function AppLayout() {
  const { layers, toggleLayer } = useMapLayers()

  return (
    <div className="flex min-h-screen bg-[#F7F7F7] p-3">
      <Sidebar
        layers={layers}
        onToggleLayer={toggleLayer}
      />

      <div className="ml-3 flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="min-h-0 flex-1 p-3">
          <Outlet
            context={{
              layers,
            }}
          />
        </main>
      </div>
    </div>
  )
}