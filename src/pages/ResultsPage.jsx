// src/pages/ResultsPage.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { 
  FaLeaf, 
  FaPills, 
  FaCheckCircle, 
  FaSpinner,
  FaFlask,
  FaShieldAlt,
  FaArrowLeft,
  FaDownload,
  FaShare
} from 'react-icons/fa'
import { GiPlantRoots } from 'react-icons/gi'

const ResultsPage = () => {
  const { diseaseName } = useParams()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const storedResult = localStorage.getItem('analysisResult')
    if (storedResult) {
      setResult(JSON.parse(storedResult))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 text-center">
          <GiPlantRoots className="text-6xl text-green-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Results Found</h2>
          <p className="text-gray-600 mb-6">Start by analyzing your crop</p>
          <Link to="/analyze" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Analyze Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8">
      <div className="container-custom max-w-4xl mx-auto px-4">
        
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-green-600 transition">
            <FaArrowLeft className="mr-2" size={14} />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-green-600 transition">
              <FaShare size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-green-600 transition">
              <FaDownload size={16} />
            </button>
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          
          {/* Disease Header - Simple aur Clean */}
          <div className="bg-green-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaLeaf className="text-2xl" />
                </div>
                <div>
                  <p className="text-green-100 text-sm">Detected Disease</p>
                  <h2 className="text-2xl font-semibold">{result.disease}</h2>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{result.confidence}%</div>
                <p className="text-green-100 text-sm">Confidence</p>
              </div>
            </div>
          </div>

          {/* Simple Stats Row */}
          <div className="grid grid-cols-3 border-b border-gray-100">
            <div className="p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Severity</p>
              <p className="font-medium text-gray-800">Moderate</p>
            </div>
            <div className="p-4 text-center border-l border-r border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Spread</p>
              <p className="font-medium text-gray-800">Controlled</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">Treatment</p>
              <p className="font-medium text-gray-800">Available</p>
            </div>
          </div>

          {/* Simple Tabs */}
          <div className="flex border-b border-gray-100">
            {['Treatments', 'Medicines', 'Prevention'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === index ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {activeTab === index && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-green-600" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content - Clean aur Simple */}
          <div className="p-6">
            
            {/* Treatments Tab */}
            {activeTab === 0 && (
              <div className="space-y-4">
                {result.treatment?.map((treatment, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        treatment.type === 'organic' ? 'bg-green-100 text-green-700' :
                        treatment.type === 'chemical' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {treatment.type === 'organic' ? '🌱' :
                         treatment.type === 'chemical' ? '⚗️' : '🔬'}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 mb-1">
                          {treatment.type?.charAt(0).toUpperCase() + treatment.type?.slice(1)} Treatment
                        </p>
                        {treatment.prevention && (
                          <p className="text-sm text-gray-600 mb-2">{treatment.prevention}</p>
                        )}
                        {treatment.spray_interval && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Every {treatment.spray_interval}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Medicines Tab */}
            {activeTab === 1 && (
              <div className="space-y-3">
                {result.medicines?.map((medicine, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">{medicine.name}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        medicine.company?.includes('Home') 
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {medicine.company?.includes('Home') ? 'Home' : 'Commercial'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {medicine.dose && (
                        <div>
                          <span className="text-gray-500">Dose:</span>
                          <span className="ml-1 text-gray-700">{medicine.dose}</span>
                        </div>
                      )}
                      {medicine.method && (
                        <div>
                          <span className="text-gray-500">Method:</span>
                          <span className="ml-1 text-gray-700">{medicine.method}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Prevention Tab */}
            {activeTab === 2 && (
              <div className="space-y-4">
                <div className="bg-yellow-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                    <FaShieldAlt className="mr-2 text-yellow-600" size={16} />
                    Quick Tips
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      Maintain proper plant spacing
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      Avoid overhead watering
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      Remove infected leaves immediately
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      Practice crop rotation
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Simple Footer Actions */}
          <div className="flex justify-end space-x-3 p-4 bg-gray-50 border-t border-gray-100">
            <Link to="/analyze" className="text-sm text-gray-600 hover:text-green-600 transition">
              New Analysis
            </Link>
            <Link to="/dashboard" className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ResultsPage