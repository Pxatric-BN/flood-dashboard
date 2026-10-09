import type { FloodPeriod } from '@/feature/prediction/types/prediction.types'

interface FloodPeriodSelectorProps {
  value: FloodPeriod
  onChange: (period: FloodPeriod) => void
}

const periods: { label: string; value: FloodPeriod }[] = [
  { label: '1 Day', value: '1day' },
  { label: '3 Days', value: '3days' },
  { label: '7 Days', value: '7days' },
  { label: '30 Days', value: '30days' },
]

export default function FloodPeriodSelector({
  value,
  onChange,
}: FloodPeriodSelectorProps) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-md">
      {periods.map((period) => {
        const active = value === period.value

        return (
          <button
            key={period.value}
            type="button"
            onClick={() => onChange(period.value)}
            aria-pressed={active}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {period.label}
          </button>
        )
      })}
    </div>
  )
}
