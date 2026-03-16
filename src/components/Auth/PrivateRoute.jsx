// src/components/Auth/PrivateRoute.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-gray-600 font-medium"
        >
          Loading your dashboard...
        </motion.p>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Save the location they tried to go to for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check for role-based access (optional)
  if (location.pathname.startsWith('/admin') && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

// For role-based private routes
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="loader"></div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

// Default export
export default PrivateRoute