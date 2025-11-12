import { createAuthClient } from '@/api/authClient'
import { useLocalStorage } from '@hooks'
import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react'

interface AuthContextType {
  user: { name: string } | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<{ name: string } | null>(null)

  const [token, setToken] = useLocalStorage<string>('token', '')

  const authClient = useMemo(() => createAuthClient(), [token])


  const login = async (email: string, password: string) => {
    const data = await authClient.login(email, password)
    setToken(data.token)
  }

  const logout = () => {
    setToken('')
    setUser(null)
    localStorage.removeItem("token")
  }

  useEffect(() => {
    if (token) {
      setUser({ name: 'Usuario' })
    }
  }, [token])

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

