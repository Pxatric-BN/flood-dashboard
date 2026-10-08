import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#EEEEEE] p-4 text-white">
      <div className="flex min-h-[calc(100vh-2rem)] gap-4">

        {/* Sidebar */}
        <Sidebar />

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">

          {/* Header */}
          <Header />

          {/* Content */}
          <main className="min-h-0 flex-1 overflow-auto rounded-2xl  bg-[#F5FAFF]  p-6 text-slate-900">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  )
}