'use client'

import { createContext, useEffect, useState } from 'react'
import { User } from '@/types/user'
import { getUserFromToken } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      const decodedUser = getUserFromToken(savedToken)
      if (decodedUser) {
        setToken(savedToken)
        setUser(decodedUser)
      }
    }
  }, [])

  const login = (user: User, token: string) => {
    localStorage.setItem('token', token)
    setUser(user)
    setToken(token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
