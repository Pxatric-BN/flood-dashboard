import { useCallback, useState } from 'react'

export type MapLayerKey =
  | 'prediction'
  | 'rainfall'
  | 'waterLevel'
  | 'routes'

export interface MapLayers {
  prediction: boolean
  rainfall: boolean
  waterLevel: boolean
  routes: boolean
}

const DEFAULT_LAYERS: MapLayers = {
  prediction: true,
  rainfall: false,
  waterLevel: false,
  routes: false,
}

export function useMapLayers() {
  const [layers, setLayers] = useState<MapLayers>(DEFAULT_LAYERS)

  const toggleLayer = useCallback((layer: MapLayerKey) => {
    setLayers((current) => ({
      ...current,
      [layer]: !current[layer],
    }))
  }, [])

  return {
    layers,
    toggleLayer,
  }
}