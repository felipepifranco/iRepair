// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { api } from '../services/api'

interface Usuario {
  id: number
  email: string
}

interface AuthContextType {
  user: Usuario | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, senha: string) => Promise<void>
  register: (email: string, senha: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]           = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Recupera sessão existente ao recarregar a página (o cookie ainda é válido)
  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUser(res.data.usuario))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  async function login(email: string, senha: string) {
    const response = await api.post('/auth/login', { email, senha })
    setUser(response.data.usuario)
    // Não precisamos guardar o token: o browser recebeu o cookie httpOnly
    // e vai enviá-lo automaticamente nas próximas requisições
  }

  async function register(email: string, senha: string) {
    await api.post('/auth/register', { email, senha })
    // Não precisamos guardar o token: o browser recebeu o cookie httpOnly
    // e vai enviá-lo automaticamente nas próximas requisições
  }

  async function logout() {
    await api.post('/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  return context
}