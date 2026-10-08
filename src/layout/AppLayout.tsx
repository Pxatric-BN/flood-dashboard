import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'
import Header from './Header'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#F7F7F7] p-3">
      <Sidebar />

      <div className="ml-3 flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="min-h-0 flex-1 p-3">
          <Outlet />
        </main>
      </div>
    </div>
  )
}