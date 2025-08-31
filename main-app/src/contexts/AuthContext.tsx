import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  username: string
  role: 'admin' | 'user'
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database
const mockUsers = [
  { username: 'admin', password: 'admin123', role: 'admin' as const },
  { username: 'user', password: 'user123', role: 'user' as const }
]

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('authToken')
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]))
        if (decoded.exp > Date.now() / 1000) {
          setUser({
            id: decoded.id,
            username: decoded.username,
            role: decoded.role
          })
        } else {
          localStorage.removeItem('authToken')
        }
      } catch {
        localStorage.removeItem('authToken')
      }
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(u => u.username === username && u.password === password)
    
    if (foundUser) {
      // Create mock JWT token
      const payload = {
        id: Math.random().toString(36).substr(2, 9),
        username: foundUser.username,
        role: foundUser.role,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      }
      
      const token = btoa(JSON.stringify(payload))
      localStorage.setItem('authToken', token)
      
      setUser({
        id: payload.id,
        username: payload.username,
        role: payload.role
      })
      
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authToken')
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
