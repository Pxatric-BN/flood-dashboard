
import { useCallback, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

import MapControls from '@/feature/map/components/MapControls'
import type { MapLayers } from '@/feature/map/hooks/useMapLayers'
import PredictionViewportLayer from '@/feature/prediction/components/PredictionViewportLayer'
import FloodPeriodSelector from '@/feature/prediction/components/FloodPeriodSelector'
import type { FloodPeriod } from '@/feature/prediction/types/prediction.types'
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

const PERIOD_LABELS: Record<FloodPeriod, string> = {
  '1day': '1 Day',
  '3days': '3 Days',
  '7days': '7 Days',
  '30days': '30 Days',
}

export default function FloodMap({ layers }: FloodMapProps) {
  const [status, setStatus] =
    useState<PredictionStatus>(INITIAL_STATUS)

  const [period, setPeriod] = useState<FloodPeriod>('30days')

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
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; Esri"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        <MapControls />

        {layers.prediction && (
          <PredictionViewportLayer
            period={period}
            onStatusChange={handleStatusChange}
          />
        )}
      </MapContainer>

      {layers.prediction && (
        <>
          {/* Flood period selector */}
          <div className="absolute left-3 top-3 z-[1000]">
            <div className="mb-2 rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Flood Data Period
              </p>
            </div>

            <FloodPeriodSelector
              value={period}
              onChange={setPeriod}
            />
          </div>

          {/* Flood data status */}
          <div className="absolute bottom-3 left-3 z-[1000] max-w-xs rounded-xl border border-gray-200 bg-white/95 p-3 text-sm shadow">
            {status.loading && (
              <p>
                กำลังโหลดข้อมูลน้ำท่วม ({PERIOD_LABELS[period]})...
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
                <p className="font-medium">
                  GISTDA Flood {PERIOD_LABELS[period]}:{' '}
                  {status.returned} features
                </p>

                {status.matched !== null && (
                  <p className="mt-1 text-gray-600">
                    จำนวนที่ API รายงาน: {status.matched} features
                  </p>
                )}

                {status.incomplete && (
                  <p className="mt-1 text-amber-700">
                    แสดงข้อมูลบางส่วนเพื่อรักษาประสิทธิภาพแผนที่
                    ลองซูมเข้าเพื่อจำกัดพื้นที่ให้แคบลง
                  </p>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
