
import { useCallback, useEffect, useState } from 'react'

import { getFlood30Days } from '@/feature/prediction/services/predictionService'
import type {
  Flood30DaysParams,
  FloodFeatureCollection,
} from '@/feature/prediction/types/prediction.types'

const DEFAULT_PARAMS: Flood30DaysParams = {
  limit: 100,
  offset: 0,
}

export function usePrediction(enabled = true) {
  const [data, setData] = useState<FloodFeatureCollection | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadPrediction = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true)
      setError(null)

      try {
        const result = await getFlood30Days(
          DEFAULT_PARAMS,
          signal,
        )
        setData(result)
      } catch (err) {
        if (signal?.aborted) return

        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load flood data',
        )
      } finally {
        if (!signal?.aborted) setLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    if (!enabled) return

    const controller = new AbortController()
    void loadPrediction(controller.signal)

    return () => controller.abort()
  }, [enabled, loadPrediction])

  return {
    data,
    loading,
    error,
    reload: () => void loadPrediction(),
  }
}
