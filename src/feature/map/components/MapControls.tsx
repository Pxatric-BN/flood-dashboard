import {
  Maximize,
  Minus,
  Plus,
  RotateCcw,
} from 'lucide-react'

import { useMap } from '@/feature/map/hooks/useMap'

export default function MapControls() {
  const {
    zoomIn,
    zoomOut,
    resetView,
    toggleFullscreen,
  } = useMap()

  return (
    <div className="absolute right-4 top-4 z-[1000] flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
      <button
        type="button"
        onClick={zoomIn}
        aria-label="Zoom in"
        className="flex h-10 w-10 items-center justify-center text-gray-700 transition hover:bg-gray-100 hover:text-black"
      >
        <Plus size={18} />
      </button>

      <div className="h-px bg-gray-200" />

      <button
        type="button"
        onClick={zoomOut}
        aria-label="Zoom out"
        className="flex h-10 w-10 items-center justify-center text-gray-700 transition hover:bg-gray-100 hover:text-black"
      >
        <Minus size={18} />
      </button>

      <div className="h-px bg-gray-200" />

      <button
        type="button"
        onClick={resetView}
        aria-label="Reset map view"
        className="flex h-10 w-10 items-center justify-center text-gray-700 transition hover:bg-gray-100 hover:text-black"
      >
        <RotateCcw size={17} />
      </button>

      <div className="h-px bg-gray-200" />

      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label="Fullscreen"
        className="flex h-10 w-10 items-center justify-center text-gray-700 transition hover:bg-gray-100 hover:text-black"
      >
        <Maximize size={17} />
      </button>
    </div>
  )
}