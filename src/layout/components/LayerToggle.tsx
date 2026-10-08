import type { LucideIcon } from 'lucide-react'

interface LayerToggleProps {
  label: string
  icon: LucideIcon
  checked: boolean
  onChange: () => void
}

export default function LayerToggle({
  label,
  icon: Icon,
  checked,
  onChange,
}: LayerToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-gray-100"
    >
      <div className="flex items-center gap-3">
        <Icon
          size={17}
          strokeWidth={1.8}
          className={checked ? 'text-black' : 'text-gray-500'}
        />

        <span
          className={
            checked
              ? 'font-medium text-gray-900'
              : 'text-gray-600'
          }
        >
          {label}
        </span>
      </div>

      <div
        className={[
          'relative h-5 w-9 rounded-full transition-colors',
          checked ? 'bg-black' : 'bg-gray-200',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.5 h-4 w-4 rounded-full bg-white',
            'transition-transform duration-200',
            checked ? 'translate-x-4' : 'translate-x-0.5',
          ].join(' ')}
        />
      </div>
    </button>
  )
}