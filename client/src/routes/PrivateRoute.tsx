import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Carregando...</div>  // evita flash para /login durante a verificação
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}