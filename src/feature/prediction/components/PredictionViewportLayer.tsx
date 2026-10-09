
import { GeoJSON } from 'react-leaflet'

import {
  usePredictionViewport,
  type PredictionStatus,
} from '@/feature/prediction/hooks/usePrediction'

import type { FloodPeriod } from '@/feature/prediction/types/prediction.types'

import { createFloodPopup } from '@/feature/prediction/utils/floodPopup'

interface PredictionViewportLayerProps {
  period: FloodPeriod
  onStatusChange: (status: PredictionStatus) => void
}

export default function PredictionViewportLayer({
  period,
  onStatusChange,
}: PredictionViewportLayerProps) {
  const { data, viewportKey } = usePredictionViewport(
    period,
    onStatusChange,
  )

  if (!data) return null

  return (
    <GeoJSON
      key={viewportKey}
      data={data}
      style={() => ({
        color: '#2373F4',
        weight: 1,
        opacity: 0.9,
        fillColor: '#578EF5',
        fillOpacity: 0.45,
      })}
      onEachFeature={(feature, layer) => {
        layer.bindPopup(createFloodPopup(feature.properties))
      }}
    />
  )
}
