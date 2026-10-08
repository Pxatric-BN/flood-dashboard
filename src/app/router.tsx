import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '@/layout/AppLayout'

import DashboardPage from '@/pages/Dashboard/DashboardPage'
import MapPage from '@/pages/map/MapPage'
import AnalyticsPage from '@/pages/Analytics/AnalyticsPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />,
      },
      {
        path: '/map',
        element: <MapPage />,
      },
      {
        path: '/analytics',
        element: <AnalyticsPage />,
      },
    ],
  },
])