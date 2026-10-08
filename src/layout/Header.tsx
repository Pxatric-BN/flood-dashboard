export default function Header() {
  return (
    <header className="flex h-14 items-center justify-between rounded-2xl bg-white px-5 shadow-sm">
      <div>
        <h1 className="text-sm font-semibold text-gray-900">
          Flood Prediction
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
          U
        </div>
      </div>
    </header>
  )
}