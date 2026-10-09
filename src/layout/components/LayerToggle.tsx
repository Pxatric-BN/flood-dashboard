import type { LucideIcon } from 'lucide-react'

import { Switch } from '@/components/ui/switch'

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
    <div className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-gray-100">
      <div className="flex items-center gap-3">
        <Icon
          size={17}
          strokeWidth={1.8}
          className={checked ? 'text-black' : 'text-gray-500'}
        />

        <span
          className={
            checked
              ? 'text-sm font-medium text-gray-900'
              : 'text-sm text-gray-600'
          }
        >
          {label}
        </span>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onChange}
        aria-label={label}
        className="data-[state=checked]:bg-black"
      />
    </div>
  )
}