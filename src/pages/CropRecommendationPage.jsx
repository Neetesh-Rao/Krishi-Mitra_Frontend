// src/pages/CropRecommendationPage.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FaSeedling, 
  FaTemperatureHigh, 
  FaTint, 
  FaFlask,
  FaCloudRain,
  FaArrowLeft,
  FaSpinner,
  FaChartBar,
  FaLeaf,
  FaCheckCircle,
  FaInfoCircle,
  FaAppleAlt,  // ✅ Available
  FaCarrot,    // ✅ Available
  FaTree,      // ✅ Available
} from 'react-icons/fa'

import { getCropRecommendation } from '../services/api'
import toast from 'react-hot-toast'

// ✅ Sirf 4 basic icons use karenge jo definitely available hain
const cropIcons = {
  // All crops use same few icons
  rice: FaLeaf,
  wheat: FaLeaf,
  maize: FaLeaf,
  banana: FaLeaf,
  apple: FaAppleAlt,
  coffee: FaLeaf,
  cotton: FaLeaf,
  grapes: FaLeaf,
  mango: FaAppleAlt,
  orange: FaAppleAlt,
  coconut: FaTree,
  papaya: FaLeaf,
  watermelon: FaLeaf,
  blackgram: FaCarrot,
  chickpea: FaLeaf,
  kidneybeans: FaCarrot,
  lentil: FaLeaf,
  mothbeans: FaCarrot,
  mungbean: FaCarrot,
  pigeonpeas: FaCarrot,
  muskmelon: FaLeaf,
  pomegranate: FaAppleAlt,
  jute: FaLeaf,
  default: FaSeedling
}

// Crop colors mapping
const cropColors = {
  rice: 'from-green-500 to-emerald-600',
  wheat: 'from-amber-500 to-yellow-600',
  maize: 'from-yellow-500 to-orange-600',
  banana: 'from-yellow-400 to-amber-500',
  apple: 'from-red-500 to-rose-600',
  coffee: 'from-amber-700 to-amber-900',
  cotton: 'from-blue-200 to-gray-400',
  grapes: 'from-purple-500 to-violet-600',
  mango: 'from-orange-400 to-yellow-500',
  orange: 'from-orange-500 to-red-500',
  coconut: 'from-green-600 to-emerald-700',
  papaya: 'from-orange-400 to-green-500',
  watermelon: 'from-red-500 to-green-600',
  default: 'from-green-500 to-emerald-600'
}

const CropRecommendationPage = () => {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [showAllProbabilities, setShowAllProbabilities] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    for (let key in formData) {
      if (!formData[key]) {
        toast.error(`Please enter ${key}`)
        return
      }
    }

    setLoading(true)
    
    try {
      const response = await getCropRecommendation(formData)
      
      if (response.data.success) {
        setResult(response.data.data)
        setShowResult(true)
        toast.success('Recommendation generated!')
        
        // Save to localStorage for dashboard
        localStorage.setItem('cropRecommendation', JSON.stringify(response.data.data))
      }
    } catch (error) {
      console.error('Recommendation error:', error)
      toast.error(error.response?.data?.message || 'Failed to get recommendation')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      N: '',
      P: '',
      K: '',
      temperature: '',
      humidity: '',
      ph: '',
      rainfall: ''
    })
    setShowResult(false)
    setResult(null)
    setShowAllProbabilities(false)
  }

  // Get probabilities and sort by value (descending)
  const getSortedProbabilities = () => {
    if (!result?.probabilities) return []
    
    return Object.entries(result.probabilities)
      .map(([crop, probability]) => ({ crop, probability }))
      .filter(item => item.probability > 0)
      .sort((a, b) => b.probability - a.probability)
  }

  // Get icon component for crop
  const getCropIcon = (cropName) => {
    const IconComponent = cropIcons[cropName.toLowerCase()] || cropIcons.default
    return <IconComponent className="text-2xl" />
  }

  const sortedProbabilities = getSortedProbabilities()
  const mainCrop = result?.recommended_crop
  const mainProbability = result?.probabilities?.[mainCrop] || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-8">
      <div className="container-custom max-w-4xl mx-auto px-4">
        
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-green-600 transition">
            <FaArrowLeft className="mr-2" size={14} />
            <span className="text-sm">Back to Dashboard</span>
          </Link>
        </div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
            <FaSeedling className="text-3xl text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Crop Recommendation</h1>
          <p className="text-gray-600">Enter your soil parameters to get the best crop recommendation</p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          
          {!showResult ? (
            /* Input Form */
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Nitrogen */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaFlask className="inline mr-2 text-green-600" />
                    Nitrogen (N) - mg/kg
                  </label>
                  <input
                    type="number"
                    name="N"
                    value={formData.N}
                    onChange={handleChange}
                    placeholder="e.g., 90"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                {/* Phosphorus */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaFlask className="inline mr-2 text-green-600" />
                    Phosphorus (P) - mg/kg
                  </label>
                  <input
                    type="number"
                    name="P"
                    value={formData.P}
                    onChange={handleChange}
                    placeholder="e.g., 42"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                {/* Potassium */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaFlask className="inline mr-2 text-green-600" />
                    Potassium (K) - mg/kg
                  </label>
                  <input
                    type="number"
                    name="K"
                    value={formData.K}
                    onChange={handleChange}
                    placeholder="e.g., 43"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                {/* Temperature */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaTemperatureHigh className="inline mr-2 text-orange-500" />
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    placeholder="e.g., 20"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                {/* Humidity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaTint className="inline mr-2 text-blue-500" />
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    placeholder="e.g., 82"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                {/* pH */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaFlask className="inline mr-2 text-purple-500" />
                    pH Value
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="ph"
                    value={formData.ph}
                    onChange={handleChange}
                    placeholder="e.g., 6.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                </div>

                {/* Rainfall */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCloudRain className="inline mr-2 text-blue-400" />
                    Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    placeholder="e.g., 200"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Analyzing Soil...</span>
                    </>
                  ) : (
                    <>
                      <FaChartBar />
                      <span>Get Recommendation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Result Section */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6"
            >
              {/* Success Icon */}
              <div className="text-center mb-6">
                <div className="inline-block p-3 bg-green-100 rounded-full mb-3">
                  <FaCheckCircle className="text-3xl text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Recommendation Ready!</h2>
                <p className="text-gray-600 text-sm">Based on your soil parameters</p>
              </div>

              {/* Main Recommended Crop - Big Card */}
              <div className={`bg-gradient-to-br ${cropColors[mainCrop] || 'from-green-500 to-emerald-600'} rounded-2xl p-6 mb-6 text-white shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Best Crop for Your Soil</p>
                    <h3 className="text-3xl font-bold capitalize mb-2">{mainCrop}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-light">{mainProbability?.toFixed(1)}%</span>
                      <span className="text-sm bg-white/20 px-2 py-1 rounded-full">Match</span>
                    </div>
                  </div>
                  <div className="text-6xl text-white/30">
                    {getCropIcon(mainCrop)}
                  </div>
                </div>
              </div>

              {/* Other Probabilities Toggle */}
              {sortedProbabilities.length > 1 && (
                <button
                  onClick={() => setShowAllProbabilities(!showAllProbabilities)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-4 hover:bg-gray-100 transition"
                >
                  <span className="font-medium text-gray-700 flex items-center">
                    <FaLeaf className="mr-2 text-green-600" />
                    Other Possible Crops
                  </span>
                  <span className="text-sm text-green-600">
                    {showAllProbabilities ? 'Show Less' : 'Show All'}
                  </span>
                </button>
              )}

              {/* Probabilities List */}
              <AnimatePresence>
                {showAllProbabilities && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 mb-6 overflow-hidden"
                  >
                    {sortedProbabilities
                      .filter(item => item.crop !== mainCrop)
                      .map((item, index) => (
                        <motion.div
                          key={item.crop}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                              {getCropIcon(item.crop)}
                            </div>
                            <span className="font-medium text-gray-800 capitalize">{item.crop}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${item.probability}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-700 min-w-[50px] text-right">
                              {item.probability.toFixed(1)}%
                            </span>
                          </div>
                        </motion.div>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Soil Parameters Summary */}
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <FaInfoCircle className="mr-2 text-blue-500" />
                  Your Soil Parameters
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">N:</span>
                    <span className="font-medium text-gray-800">{formData.N} mg/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">P:</span>
                    <span className="font-medium text-gray-800">{formData.P} mg/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">K:</span>
                    <span className="font-medium text-gray-800">{formData.K} mg/kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temp:</span>
                    <span className="font-medium text-gray-800">{formData.temperature}°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Humidity:</span>
                    <span className="font-medium text-gray-800">{formData.humidity}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">pH:</span>
                    <span className="font-medium text-gray-800">{formData.ph}</span>
                  </div>
                  <div className="flex justify-between col-span-2">
                    <span className="text-gray-600">Rainfall:</span>
                    <span className="font-medium text-gray-800">{formData.rainfall} mm</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition flex items-center justify-center"
                >
                  New Analysis
                </button>
                <Link
                  to="/dashboard"
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition flex items-center justify-center"
                >
                  Go to Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Info Card */}
        {!showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-green-100"
          >
            <div className="flex items-start space-x-3">
              <FaInfoCircle className="text-green-600 mt-1" />
              <div>
                <h3 className="font-medium text-gray-800 mb-1">How it works?</h3>
                <p className="text-sm text-gray-600">
                  Enter your soil nutrients (N,P,K), temperature, humidity, pH, and rainfall. 
                  Our AI model analyzes these parameters and shows you the best crop match with probability scores.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default CropRecommendationPage