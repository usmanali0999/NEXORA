import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import ProtectedRoute from '../routes/ProtectedRoute'
import RoleGuard from '../routes/RoleGuard'
import LoginPage from '../features/auth/LoginPage'
import UnauthorizedPage from '../features/auth/UnauthorizedPage'
import DashboardPage from '../features/dashboard/DashboardPage'
import AnalyticsPage from '../features/analytics/AnalyticsPage'
import UsersPage from '../features/users/UsersPage'
import SettingsPage from '../features/settings/SettingsPage'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'users',
        element: (
          <RoleGuard allowedRoles={['admin', 'manager']}>
            <UsersPage />
          </RoleGuard>
        ),
      },
      {
        path: 'settings',
        element: (
          <RoleGuard allowedRoles={['admin']}>
            <SettingsPage />
          </RoleGuard>
        ),
      },
      {
        path: 'unauthorized',
        element: <UnauthorizedPage />,
      },
    ],
  },
])

function AppRouter() {
  return <RouterProvider router={router} />
}

export default AppRouter