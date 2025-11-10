import { useAuth } from '@/hooks'
import { Router } from '@/routes/routes'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={Router.auth} replace />
  }

  return <Outlet />
}
