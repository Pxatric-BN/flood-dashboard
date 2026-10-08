import { MapContainer, TileLayer } from 'react-leaflet'

import MapControls from '@/feature/map/components/MapControls'
import type { MapLayers } from '@/feature/map/hooks/useMapLayers'
import { MAP_CONFIG } from '@/lib/constants'

interface FloodMapProps {
  layers: MapLayers
}

export default function FloodMap({
  layers,
}: FloodMapProps) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <MapContainer
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.zoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        <MapControls />

        {layers.prediction && (
          <div>
            {/* Prediction layer — จะทำต่อ */}
          </div>
        )}
      </MapContainer>
    </div>
  )
}