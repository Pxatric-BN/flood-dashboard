
import { useCallback, useEffect, useRef, useState } from 'react'
import { useMap } from 'react-leaflet'

import {
  getFloodData,
} from '@/feature/prediction/services/predictionService'

import type {
  FloodFeature,
  FloodFeatureCollection,
  FloodPeriod,
} from '@/feature/prediction/types/prediction.types'

export interface PredictionStatus {
  loading: boolean
  error: string | null
  returned: number
  matched: number | null
  incomplete: boolean
}

const PAGE_SIZE = 100
const MAX_PAGES = 5

const INITIAL_STATUS: PredictionStatus = {
  loading: false,
  error: null,
  returned: 0,
  matched: null,
  incomplete: false,
}

export function usePredictionViewport(
  period: FloodPeriod,
  onStatusChange: (status: PredictionStatus) => void,
) {
  const map = useMap()

  const [data, setData] = useState<FloodFeatureCollection | null>(null)
  const [viewportKey, setViewportKey] = useState('')

  const controllerRef = useRef<AbortController | null>(null)
  const lastBoundsRef = useRef('')

  const loadViewport = useCallback(async (force = false) => {
    const bounds = map.getBounds()

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

    if (!force && key === lastBoundsRef.current) return
    lastBoundsRef.current = key

    controllerRef.current?.abort()

    const controller = new AbortController()
    controllerRef.current = controller

    setData(null)
    setViewportKey(key)

    onStatusChange({
      ...INITIAL_STATUS,
      loading: true,
    })

    const features: FloodFeature[] = []
    let firstPage: FloodFeatureCollection | null = null
    let matched: number | null = null

    try {
      for (let page = 0; page < MAX_PAGES; page += 1) {
        const result = await getFloodData(
          period,
          {
            bbox,
            limit: PAGE_SIZE,
            offset: page * PAGE_SIZE,
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
  }, [map, period, onStatusChange])

  useEffect(() => {
    lastBoundsRef.current = ''
    void loadViewport(true)

    const handleMoveEnd = () => {
      void loadViewport()
    }

    map.on('moveend', handleMoveEnd)

    return () => {
      map.off('moveend', handleMoveEnd)
      controllerRef.current?.abort()
    }
  }, [map, loadViewport])

  return { data, viewportKey }
}
