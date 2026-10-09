import { useOutletContext } from 'react-router-dom'

import FloodMap from '@/feature/map/components/FloodMap'

import type { MapLayers } from '@/feature/map/hooks/useMapLayers'

interface MapPageContext {
  layers: MapLayers
}

export default function MapPage() {
  const { layers } = useOutletContext<MapPageContext>()

  return (
    <div className="flex h-full flex-col gap-3">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Flood Map
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor flood conditions and predictions
        </p>
      </div>

      <div className="min-h-0 flex-1">

        <FloodMap layers={layers} />
      </div>
    </div>
  )
}