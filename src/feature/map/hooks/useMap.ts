import { useCallback } from 'react'
import { useMap as useLeafletMap } from 'react-leaflet'

import { MAP_CONFIG } from '@/lib/constants'

export function useMap() {
  const map = useLeafletMap()

  const zoomIn = useCallback(() => {
    map.zoomIn()
  }, [map])

  const zoomOut = useCallback(() => {
    map.zoomOut()
  }, [map])

  const resetView = useCallback(() => {
    map.setView(MAP_CONFIG.center, MAP_CONFIG.zoom)
  }, [map])

  const toggleFullscreen = useCallback(() => {
    const container = map.getContainer()

    if (!document.fullscreenElement) {
      container.requestFullscreen()
      return
    }

    document.exitFullscreen()
  }, [map])

  return {
    zoomIn,
    zoomOut,
    resetView,
    toggleFullscreen,
  }
}