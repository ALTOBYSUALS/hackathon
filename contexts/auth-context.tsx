"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { signIn, signUp, signOut } from '@/lib/supabase'

interface User {
  id: string
  email: string
  artistName: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, artistName: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('sonar_user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error('Error parsing saved user:', error)
          localStorage.removeItem('sonar_user')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    try {
      // Use real Supabase authentication
      const { data, error } = await signIn(email, password)
      
      if (error) {
        throw new Error(error.message || 'Failed to sign in')
      }
      
      if (data.user) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email || email,
          artistName: (data.user as any).user_metadata?.artistName || 'Artist',
          avatar: (data.user as any).user_metadata?.avatar || '/artist-avatar.png'
        }
        
        setUser(userData)
        localStorage.setItem('sonar_user', JSON.stringify(userData))
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string, artistName: string) => {
    setIsLoading(true)
    
    try {
      // Use real Supabase authentication
      const { data, error } = await signUp(email, password)
      
      if (error) {
        throw new Error(error.message || 'Failed to sign up')
      }
      
      if (data.user) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email || email,
          artistName,
          avatar: '/artist-avatar.png'
        }
        
        setUser(userData)
        localStorage.setItem('sonar_user', JSON.stringify(userData))
      }
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Logout error:', error)
    }
    
    setUser(null)
    localStorage.removeItem('sonar_user')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 