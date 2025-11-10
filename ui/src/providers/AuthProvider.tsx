import { createContext, PropsWithChildren, useState } from 'react'

interface AuthContextType {
  user: { name: string } | null
  isAuthenticated: boolean
  login: (user: { name: string }) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType| undefined>(undefined)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<{ name: string } | null>(null)

  const login = (userData: { name: string }) => setUser(userData)
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

