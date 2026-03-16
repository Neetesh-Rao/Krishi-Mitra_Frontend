// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaCamera, 
  FaHistory, 
  FaLeaf, 
  FaSeedling,
  FaChartLine,
  FaCalendarAlt,
  FaArrowRight,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
  FaCloudSun,
  FaBell,
  FaTemperatureHigh,
  FaTint,
  FaCloudRain,
  FaSnowflake
} from 'react-icons/fa'
import { GiFarmer, GiWheat, GiCorn } from 'react-icons/gi'
import { useAuth } from '../context/AuthContext'

const DashboardPage = () => {
  const { user } = useAuth()
  const [recentAnalysis, setRecentAnalysis] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [weatherAlerts, setWeatherAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get data from localStorage
    const storedAnalysis = localStorage.getItem('analysisResult')
    const storedRecommendation = localStorage.getItem('cropRecommendation')
    const storedWeatherAlerts = localStorage.getItem('weatherAlerts')
    
    if (storedAnalysis) {
      setRecentAnalysis(JSON.parse(storedAnalysis))
    }
    
    if (storedRecommendation) {
      setRecommendation(JSON.parse(storedRecommendation))
    }

    if (storedWeatherAlerts) {
      setWeatherAlerts(JSON.parse(storedWeatherAlerts))
    }
    
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-8">
      <div className="container-custom max-w-6xl mx-auto px-4">
        
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-green-600">{user?.name || 'Farmer'}!</span>
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your farm today</p>
        </motion.div>

        {/* Quick Actions Grid - 3 Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {/* Analyze Crop Card */}
          <Link to="/analyze">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-lg p-6 text-white cursor-pointer relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <FaCamera className="text-2xl" />
                </div>
                <FaArrowRight className="text-white/60" />
              </div>
              <h3 className="text-xl font-semibold mb-1">Analyze Crop</h3>
              <p className="text-green-100 text-sm">Detect diseases in your crops</p>
            </motion.div>
          </Link>

          {/* Crop Recommendation Card */}
          <Link to="/recommend">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg p-6 text-white cursor-pointer relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <FaSeedling className="text-2xl" />
                </div>
                <FaArrowRight className="text-white/60" />
              </div>
              <h3 className="text-xl font-semibold mb-1">Crop Recommendation</h3>
              <p className="text-blue-100 text-sm">Get AI-powered crop suggestions</p>
            </motion.div>
          </Link>

          {/* Weather Alerts Card */}
          <Link to="/weather">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white cursor-pointer relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <FaCloudSun className="text-2xl" />
                </div>
                <FaArrowRight className="text-white/60" />
              </div>
              <h3 className="text-xl font-semibold mb-1">Weather Alerts</h3>
              <p className="text-purple-100 text-sm">Get real-time farming alerts</p>
              {weatherAlerts.length > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {weatherAlerts.length}
                </span>
              )}
            </motion.div>
          </Link>
        </motion.div>

        {/* Stats Cards - 4 Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Analyses</p>
                <p className="text-2xl font-bold text-gray-800">
                  {recentAnalysis ? '1' : '0'}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaChartLine className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Healthy Crops</p>
                <p className="text-2xl font-bold text-green-600">
                  {recentAnalysis?.confidence > 80 ? '1' : '0'}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaCheckCircle className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Recommendations</p>
                <p className="text-2xl font-bold text-blue-600">
                  {recommendation ? '1' : '0'}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <GiWheat className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Weather Alerts</p>
                <p className="text-2xl font-bold text-purple-600">
                  {weatherAlerts.length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaBell className="text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Weather Alerts Preview - Only if alerts exist */}
        {weatherAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mb-6"
          >
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-800 flex items-center">
                  <FaCloudSun className="mr-2 text-purple-600" />
                  Recent Weather Alerts
                </h3>
                <Link to="/weather" className="text-sm text-purple-600 hover:text-purple-700">
                  View All
                </Link>
              </div>
              <div className="space-y-2">
                {weatherAlerts.slice(0, 2).map((alert, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    {alert.includes('Frost') ? (
                      <FaSnowflake className="text-blue-500 mt-1" />
                    ) : alert.includes('Heatwave') ? (
                      <FaTemperatureHigh className="text-red-500 mt-1" />
                    ) : alert.includes('Heavy rain') ? (
                      <FaCloudRain className="text-blue-500 mt-1" />
                    ) : (
                      <FaExclamationTriangle className="text-yellow-500 mt-1" />
                    )}
                    <span className="text-gray-700 flex-1">{alert}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Recent Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <FaHistory className="mr-3 text-green-600" />
              Recent Disease Analysis
            </h2>
            
            {recentAnalysis ? (
              <div className="space-y-3">
                <div className="p-4 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FaLeaf className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{recentAnalysis.disease}</h3>
                        <p className="text-xs text-gray-500">
                          <FaCalendarAlt className="inline mr-1" size={10} />
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {recentAnalysis.confidence}% Match
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Link to={`/results/${recentAnalysis.disease}`} className="text-sm text-green-600 hover:text-green-700 font-medium">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <GiFarmer className="text-5xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No analyses yet</p>
                <Link to="/analyze" className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                  Analyze Your First Crop
                </Link>
              </div>
            )}
          </motion.div>

          {/* Recent Recommendation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
              <FaSeedling className="mr-3 text-blue-600" />
              Latest Crop Recommendation
            </h2>
            
            {recommendation ? (
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <GiCorn className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 capitalize">
                        {recommendation.recommended_crop || recommendation}
                      </h3>
                      <p className="text-xs text-gray-500">Best match for your soil</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Link to="/recommend" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Details →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <GiWheat className="text-5xl text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">No recommendations yet</p>
                <Link to="/recommend" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                  Get Crop Recommendation
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-yellow-50 rounded-xl p-4 border border-yellow-200"
        >
          <div className="flex items-start space-x-3">
            <FaExclamationTriangle className="text-yellow-600 mt-1" />
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Farming Tip</h3>
              <p className="text-sm text-gray-600">
                Regular monitoring of your crops helps in early disease detection. 
                Upload clear photos of leaves for accurate analysis.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Email Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center text-xs text-gray-500"
        >
          <p>Weather alerts will be sent to: <span className="font-medium text-gray-700">{user?.email}</span></p>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardPage