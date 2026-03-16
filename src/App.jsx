// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import CropAnalysisPage from './pages/CropAnalysisPage'
import ResultsPage from './pages/ResultsPage'
import AboutPage from './pages/AboutPage'
import CropRecommendationPage from './pages/CropRecommendationPage' // ✅ Yeh line add karna bhool gaye the
import PrivateRoute from './components/Auth/PrivateRoute'
import WeatherAlertsPage from './pages/WeatherAlertsPage'

function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/weather" element={
  <PrivateRoute>
    <WeatherAlertsPage />
  </PrivateRoute>
} />
        
        {/* Protected Routes - Require Login */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
        
        <Route path="/analyze" element={
          <PrivateRoute>
            <CropAnalysisPage />
          </PrivateRoute>
        } />
        
        {/* Crop Recommendation Route */}
        <Route path="/recommend" element={
          <PrivateRoute>
            <CropRecommendationPage />
          </PrivateRoute>
        } />
        
        <Route path="/results/:diseaseName" element={
          <PrivateRoute>
            <ResultsPage />
          </PrivateRoute>
        } />
      </Routes>
    </Layout>
  )
}

export default App