import { createBrowserRouter } from 'react-router-dom'

import DashboardPage from '../pages/Dashboard/DashboardPage'
import MapPage from '../pages/map/MapPage'
import PredictionPage from '../pages/Prediction/PredictionPage'
import RoutesPage from '../pages/Routes/RoutesPage'
import AnalyticsPage from '../pages/Analytics/AnalyticsPage'
import DashboardLayout from '../layout/DashboardLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: 'prediction',
        element: <PredictionPage />,
      },
      {
        path: 'routes',
        element: <RoutesPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
    ],
  },
])