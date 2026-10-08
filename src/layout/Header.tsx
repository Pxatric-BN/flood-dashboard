import { Bell, Settings } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      
      <div>
        <h2 className="text-lg font-semibold">
          Flood Monitoring Dashboard
        </h2>

        <p className="text-sm text-slate-400">
          Real-time flood risk monitoring
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
          <Bell size={20} />
        </button>

        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
          <Settings size={20} />
        </button>
      </div>
    </header>
  )
}