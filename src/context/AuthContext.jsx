// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token')
      
      if (storedToken) {
        setToken(storedToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
        
        // 🔥 IMPORTANT: User data fetch karo from token
        // Aapke backend mein ek /me endpoint hona chahiye jo token se user data return kare
        await fetchUserData(storedToken)
      } else {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // ✅ User data fetch karne ka function
  const fetchUserData = async (authToken) => {
    try {
      // Option 1: Agar aapke backend mein /me endpoint hai
      const response = await axios.get('https://krishi-mitra-nodebackend.onrender.com/api/auth/me')
      setUser(response.data.user)
      
      /* 
      // Option 2: Agar /me endpoint nahi hai to token decode karo
      // NOTE: Ye tabhi safe hai jab aap JWT token mein user data bhej rahe ho
      if (authToken) {
        const base64Url = authToken.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const payload = JSON.parse(window.atob(base64))
        
        // User data token mein se nikaalo
        setUser({
          id: payload.id,
          name: payload.name,
          email: payload.email,
          role: payload.role
        })
      }
      */
    } catch (error) {
      console.error('Error fetching user data:', error)
      // Agar error aaye to logout kar do
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://krishi-mitra-nodebackend.onrender.com/api/auth/login', { email, password })
      const { token, user } = response.data
      
      // Save token
      localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user)) /
      setToken(token)

      
      // Set user data
      setUser(user)
      
      // Set axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      toast.success('Welcome back!')
      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      return { success: false }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post('https://krishi-mitra-nodebackend.onrender.com/api/auth/signup', { name, email, password })
      toast.success('Account created! Please login.')
      return { success: true }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed')
      return { success: false }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}