'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type User = {
  id: number
  name: string
  email: string
  type: "student" | "company" | "supervisor"
} | null

type AuthContextType = {
  user: User
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('user') || 'null')
    }
    return null
  })

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token') // Clear JWT token
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}