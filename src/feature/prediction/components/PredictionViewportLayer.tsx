
import { useCallback, useEffect, useRef, useState } from 'react'
import { GeoJSON, useMap } from 'react-leaflet'
import type { Feature } from 'geojson'

import { getFlood30Days } from '@/feature/prediction/services/predictionService'
import type {
  FloodFeatureCollection,
} from '@/feature/prediction/types/prediction.types'

interface PredictionViewportLayerProps {
  onStatusChange: (status: {
    loading: boolean
    error: string | null
    returned: number
    matched: number | null
    incomplete: boolean
  }) => void
}

const PAGE_SIZE = 100
const MAX_PAGES = 5

export default function PredictionViewportLayer({
  onStatusChange,
}: PredictionViewportLayerProps) {
  const map = useMap()
  const [data, setData] = useState<FloodFeatureCollection | null>(null)
  const [viewportKey, setViewportKey] = useState('')
  const controllerRef = useRef<AbortController | null>(null)
  const lastBoundsRef = useRef('')

  const loadViewport = useCallback(async () => {
    const bounds = map.getBounds()

    // GISTDA bbox order: west, south, east, north
    const bbox = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ].map((value) => Number(value.toFixed(5))) as [
      number,
      number,
      number,
      number,
    ]

    const key = bbox.join(',')

    if (key === lastBoundsRef.current) return
    lastBoundsRef.current = key

    controllerRef.current?.abort()

    const controller = new AbortController()
    controllerRef.current = controller

    setData(null)
    setViewportKey(key)
    onStatusChange({
      loading: true,
      error: null,
      returned: 0,
      matched: null,
      incomplete: false,
    })

    const features: Feature[] = []
    let firstPage: FloodFeatureCollection | null = null
    let matched: number | null = null

    try {
      for (let page = 0; page < MAX_PAGES; page += 1) {
        const offset = page * PAGE_SIZE

        const result = await getFlood30Days(
          {
            bbox,
            limit: PAGE_SIZE,
            offset,
          },
          controller.signal,
        )

        if (controller.signal.aborted) return

        if (!firstPage) {
          firstPage = result
          matched = result.numberMatched ?? null
        }

        features.push(...result.features)

        setData({
          ...firstPage,
          features: [...features],
          numberReturned: features.length,
        })

        onStatusChange({
          loading: true,
          error: null,
          returned: features.length,
          matched,
          incomplete: false,
        })

        if (
          result.features.length < PAGE_SIZE ||
          (matched !== null && features.length >= matched)
        ) {
          break
        }
      }

      if (controller.signal.aborted) return

      onStatusChange({
        loading: false,
        error: null,
        returned: features.length,
        matched,
        incomplete:
          matched !== null && features.length < matched,
      })
    } catch (error) {
      if (controller.signal.aborted) return

      onStatusChange({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to load GISTDA flood data',
        returned: features.length,
        matched,
        incomplete: false,
      })
    }
  }, [map, onStatusChange])

  useEffect(() => {
    void loadViewport()

    map.on('moveend', loadViewport)

    return () => {
      map.off('moveend', loadViewport)
      controllerRef.current?.abort()
    }
  }, [map, loadViewport])

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
        const properties = feature.properties
        if (!properties) return

        const location = [
          properties.tb_tn,
          properties.ap_tn,
          properties.pv_tn,
        ]
          .filter(Boolean)
          .join(' ')

        const area = properties.f_area ?? properties._area

        // Treat API-provided strings as text, not HTML.
        const popup = document.createElement('div')
        const title = document.createElement('strong')
        title.textContent = 'พื้นที่น้ำท่วมจาก GISTDA'
        popup.append(title)

        const locationText = document.createElement('p')
        locationText.textContent = `พื้นที่: ${location || 'ไม่ระบุ'}`
        popup.append(locationText)

        const areaText = document.createElement('p')
        areaText.textContent =
          typeof area === 'number'
            ? `พื้นที่: ${area.toLocaleString('th-TH')} ตร.ม.`
            : 'พื้นที่: ไม่มีข้อมูล'
        popup.append(areaText)

        layer.bindPopup(popup)
      }}
    />
  )
}
