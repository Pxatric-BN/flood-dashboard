
import { useCallback, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import MapControls from '@/feature/map/components/MapControls'
import type { MapLayers } from '@/feature/map/hooks/useMapLayers'
import PredictionViewportLayer from '@/feature/prediction/components/PredictionViewportLayer'
import { MAP_CONFIG } from '@/lib/constants'

interface FloodMapProps {
  layers: MapLayers
}

interface PredictionStatus {
  loading: boolean
  error: string | null
  returned: number
  matched: number | null
  incomplete: boolean
}

const INITIAL_STATUS: PredictionStatus = {
  loading: false,
  error: null,
  returned: 0,
  matched: null,
  incomplete: false,
}

export default function FloodMap({ layers }: FloodMapProps) {
  const [status, setStatus] =
    useState<PredictionStatus>(INITIAL_STATUS)

  const handleStatusChange = useCallback(
    (nextStatus: PredictionStatus) => {
      setStatus(nextStatus)
    },
    [],
  )

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
          <PredictionViewportLayer
            onStatusChange={handleStatusChange}
          />
        )}
      </MapContainer>

      {layers.prediction && (
        <div className="absolute left-3 top-3 z-[1000] max-w-xs rounded-xl border bg-white/95 p-3 text-sm shadow">
          {status.loading && (
            <p>
              กำลังโหลดพื้นที่น้ำท่วม...
              {' '}
              {status.returned} features
            </p>
          )}

          {status.error && (
            <p className="text-red-600">
              GISTDA: {status.error}
            </p>
          )}

          {!status.loading && !status.error && (
            <>
              <p>
                GISTDA Flood 30 Days: {status.returned} features
              </p>

              {status.matched !== null && (
                <p className="text-gray-600">
                  พบในพื้นที่นี้: {status.matched} features
                </p>
              )}

              {status.incomplete && (
                <p className="mt-1 text-amber-700">
                  แสดงบางส่วน เพื่อรักษาประสิทธิภาพแผนที่
                  ลองซูมเข้าเพื่อจำกัดพื้นที่ให้แคบลง
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
