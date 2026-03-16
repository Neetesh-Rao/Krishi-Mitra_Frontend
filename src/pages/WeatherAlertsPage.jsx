// src/pages/WeatherAlertsPage.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaCloudSun, 
  FaArrowLeft, 
  FaSpinner, 
  FaMapMarkerAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaCloudRain,
  FaSnowflake,
  FaSun,
  FaBell,
  FaEnvelope,
  FaSeedling,
  FaLeaf,
  FaTractor,
  FaWater,
  FaAppleAlt,
  FaCarrot,
  FaTree,
  FaPagelines
} from 'react-icons/fa'  // ✅ Sirf Fa icons
import { getWeatherAlerts } from '../services/api'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const WeatherAlertsPage = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    city: '',
    loading: true,
    error: null
  })
  const [alerts, setAlerts] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [farmingTips, setFarmingTips] = useState([])

  // Get user's location on page load
  useEffect(() => {
    getCurrentLocation()
  }, [])

  // Generate farming tips based on weather
  useEffect(() => {
    if (alerts.length > 0) {
      generateFarmingTips()
    }
  }, [alerts])

  const getCurrentLocation = () => {
    setLocation(prev => ({ ...prev, loading: true, error: null }))

    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: "Geolocation is not supported by your browser"
      }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        // Get city name from coordinates (reverse geocoding)
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
          const data = await response.json()
          const city = data.address?.city || data.address?.town || data.address?.village || 'Unknown location'
          
          setLocation({
            latitude,
            longitude,
            city,
            loading: false,
            error: null
          })
        } catch (error) {
          setLocation({
            latitude,
            longitude,
            city: 'Unknown location',
            loading: false,
            error: null
          })
        }
      },
      (error) => {
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: "Unable to get your location. Please enable location services."
        }))
      }
    )
  }

  const generateFarmingTips = () => {
    const tips = []
    
    alerts.forEach(alert => {
      if (alert.includes('Frost')) {
        tips.push({
          icon: <FaSnowflake className="text-blue-500" />,
          tip: "Cover sensitive crops with plastic sheets or straw mulch",
          action: "Protect your crops from frost damage"
        })
      }
      if (alert.includes('Heatwave')) {
        tips.push({
          icon: <FaTemperatureHigh className="text-red-500" />,
          tip: "Increase irrigation frequency and provide shade for young plants",
          action: "Prevent heat stress in crops"
        })
      }
      if (alert.includes('Heavy rain')) {
        tips.push({
          icon: <FaCloudRain className="text-blue-500" />,
          tip: "Ensure proper drainage in fields and avoid waterlogging",
          action: "Protect roots from excess water"
        })
      }
      if (alert.includes('High wind')) {
        tips.push({
          icon: <FaWind className="text-gray-500" />,
          tip: "Stake tall plants and create windbreaks",
          action: "Prevent crop damage from strong winds"
        })
      }
    })

    setFarmingTips(tips)
  }

  const fetchWeatherAlerts = async () => {
    if (!location.latitude || !location.longitude) {
      toast.error('Location not available')
      return
    }

    setLoading(true)
    
    try {
      const response = await getWeatherAlerts(location.latitude, location.longitude)
      
      if (response.data) {
        setAlerts(response.data.alerts || [])
        setShowResult(true)
        
        // Save to localStorage for dashboard
        localStorage.setItem('weatherAlerts', JSON.stringify(response.data.alerts || []))
        
        if (response.data.alerts?.length > 0) {
          toast.success(`Found ${response.data.alerts.length} weather alerts!`)
        } else {
          toast.success('No severe weather alerts for your area')
        }
      }
    } catch (error) {
      console.error('Weather alerts error:', error)
      toast.error(error.response?.data?.error || 'Failed to fetch weather alerts')
    } finally {
      setLoading(false)
    }
  }

  const resetAlerts = () => {
    setShowResult(false)
    setAlerts([])
    setFarmingTips([])
  }

  // Get alert icon based on content
  const getAlertIcon = (alert) => {
    if (alert.includes('Frost')) return <FaSnowflake className="text-blue-400" />
    if (alert.includes('Heatwave')) return <FaTemperatureHigh className="text-red-500" />
    if (alert.includes('Heavy rain')) return <FaCloudRain className="text-blue-500" />
    if (alert.includes('High wind')) return <FaWind className="text-gray-500" />
    return <FaExclamationTriangle className="text-yellow-500" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-8">
      {/* Decorative farming elements - using Fa icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-green-200 opacity-10">
          <FaTractor size={80} />
        </div>
        <div className="absolute bottom-20 right-10 text-green-200 opacity-10">
          <FaSeedling size={100} />
        </div>
        <div className="absolute top-40 right-40 text-green-200 opacity-10">
          <FaPagelines size={60} />
        </div>
      </div>

      <div className="container-custom max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-green-600 transition group">
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={14} />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FaTractor className="text-green-600" />
            <span>Farmer's Weather Station</span>
          </div>
        </div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl mb-4 shadow-lg">
            <FaCloudSun className="text-4xl text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Weather <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Alerts</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get real-time weather updates and smart farming recommendations for your location
          </p>
          {user?.email && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-green-100"
            >
              <FaEnvelope className="text-green-600 mr-2" />
              <span className="text-sm text-gray-600">Alerts will be sent to: </span>
              <span className="text-sm font-medium text-gray-800 ml-1">{user.email}</span>
            </motion.div>
          )}
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-green-100"
        >
          
          {/* Location Status - Farm Style */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <FaMapMarkerAlt className="text-green-600" />
                </div>
                <div>
                  <span className="text-sm text-gray-600 block">Your Farm Location</span>
                  {location.loading ? (
                    <div className="flex items-center text-gray-500">
                      <FaSpinner className="animate-spin mr-2" />
                      <span>Getting location...</span>
                    </div>
                  ) : location.error ? (
                    <div className="text-red-500 text-sm flex items-center">
                      <FaExclamationTriangle className="mr-1" />
                      {location.error}
                      <button 
                        onClick={getCurrentLocation}
                        className="ml-2 text-green-600 hover:text-green-700 underline text-xs font-medium"
                      >
                        Retry
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800">{location.city}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({location.latitude?.toFixed(2)}°, {location.longitude?.toFixed(2)}°)
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Farm Season Indicator */}
              <div className="flex items-center space-x-2 bg-white/60 px-4 py-2 rounded-full">
                <FaSun className="text-yellow-600" />
                <span className="text-sm text-gray-700">Kharif Season 2024</span>
              </div>
            </div>
          </div>
          
          {!showResult ? (
            /* Action Button with Farming Theme */
            <div className="p-10 text-center">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="mb-8"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-white">
                  <FaBell className="text-5xl text-green-600" />
                </div>
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Check Weather Alerts</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Get personalized weather alerts and farming recommendations to protect your crops from extreme conditions.
              </p>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
                <div className="text-center">
                  <div className="p-2 bg-blue-100 rounded-lg mb-2">
                    <FaSnowflake className="text-blue-600 mx-auto" />
                  </div>
                  <span className="text-xs text-gray-600">Frost</span>
                </div>
                <div className="text-center">
                  <div className="p-2 bg-red-100 rounded-lg mb-2">
                    <FaTemperatureHigh className="text-red-600 mx-auto" />
                  </div>
                  <span className="text-xs text-gray-600">Heatwave</span>
                </div>
                <div className="text-center">
                  <div className="p-2 bg-cyan-100 rounded-lg mb-2">
                    <FaCloudRain className="text-cyan-600 mx-auto" />
                  </div>
                  <span className="text-xs text-gray-600">Heavy Rain</span>
                </div>
              </div>

              <button
                onClick={fetchWeatherAlerts}
                disabled={loading || location.loading || location.error}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-10 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center space-x-3 mx-auto disabled:opacity-50 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Checking Weather...</span>
                  </>
                ) : (
                  <>
                    <FaCloudSun />
                    <span>Get Weather Alerts</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Results Section with Farming Tips */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6"
            >
              {/* Success Header */}
              <div className="text-center mb-6">
                <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
                  {alerts.length > 0 ? (
                    <FaExclamationTriangle className="text-3xl text-yellow-600" />
                  ) : (
                    <FaCheckCircle className="text-3xl text-green-600" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {alerts.length > 0 ? 'Weather Alerts Found!' : 'Weather is Clear'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {alerts.length > 0 
                    ? `${alerts.length} alert(s) for your farming area` 
                    : 'Good weather conditions for farming activities'}
                </p>
              </div>

              {/* Alerts List with Farming Icons */}
              {alerts.length > 0 ? (
                <>
                  <div className="space-y-4 mb-6">
                    {alerts.map((alert, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-white border-l-4 shadow-md"
                        style={{
                          borderLeftColor: alert.includes('Frost') ? '#3B82F6' :
                                          alert.includes('Heatwave') ? '#EF4444' :
                                          alert.includes('Heavy rain') ? '#06B6D4' :
                                          '#F59E0B'
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="text-2xl">
                            {getAlertIcon(alert)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{alert}</p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center">
                              <FaEnvelope className="mr-1" />
                              Alert will be sent to: {user?.email}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Farming Tips Section */}
                  {farmingTips.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-6"
                    >
                      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <FaSeedling className="mr-2 text-green-600" />
                        Smart Farming Recommendations
                      </h3>
                      <div className="space-y-3">
                        {farmingTips.map((tip, index) => (
                          <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-white rounded-lg shadow-sm">
                                {tip.icon}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{tip.tip}</p>
                                <p className="text-sm text-green-700 mt-1">{tip.action}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-6 text-center border border-green-200">
                  <FaSun className="text-6xl text-yellow-500 mx-auto mb-3" />
                  <p className="text-gray-700 font-medium mb-2">Perfect Weather for Farming!</p>
                  <p className="text-sm text-gray-600">No severe weather conditions predicted. Good time for planting and harvesting.</p>
                </div>
              )}

              {/* Location and Farm Details */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 mb-6 border border-amber-200">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <FaTractor className="mr-2 text-amber-600" />
                  Farm Details
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-amber-500 mr-2" size={12} />
                    <span className="text-gray-600">Location:</span>
                    <span className="ml-2 font-medium text-gray-800">{location.city}</span>
                  </div>
                  <div className="flex items-center">
                    <FaLeaf className="text-green-500 mr-2" size={12} />
                    <span className="text-gray-600">Soil Type:</span>
                    <span className="ml-2 font-medium text-gray-800">Alluvial</span>
                  </div>
                  <div className="flex items-center">
                    <FaWater className="text-blue-500 mr-2" size={12} />
                    <span className="text-gray-600">Irrigation:</span>
                    <span className="ml-2 font-medium text-gray-800">Available</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-500 mr-2" size={12} />
                    <span className="text-gray-600">Contact:</span>
                    <span className="ml-2 font-medium text-gray-800">{user?.email}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={resetAlerts}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition flex items-center justify-center space-x-2"
                >
                  <FaCloudSun />
                  <span>Check Again</span>
                </button>
                <Link
                  to="/dashboard"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition flex items-center justify-center space-x-2"
                >
                  <FaTractor />
                  <span>Go to Dashboard</span>
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Info Card with Farming Tips */}
        {!showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-green-200 shadow-lg"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FaPagelines className="text-green-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">🌾 Why Weather Alerts Matter for Farmers?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <FaSnowflake className="text-blue-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Frost Protection</p>
                      <p className="text-xs text-gray-500">Protect young seedlings from frost damage</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaTemperatureHigh className="text-red-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Heatwave Management</p>
                      <p className="text-xs text-gray-500">Adjust irrigation to prevent wilting</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <FaCloudRain className="text-blue-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Rain Planning</p>
                      <p className="text-xs text-gray-500">Schedule pesticide spraying around rain</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default WeatherAlertsPage