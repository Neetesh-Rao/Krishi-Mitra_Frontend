// src/pages/CropAnalysisPage.jsx
import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FaCamera, FaUpload, FaSpinner } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { detectDisease } from '../services/api'  // ✅ import API
import toast from 'react-hot-toast'

const CropAnalysisPage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      toast.error('Please upload an image file')
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first')
      return
    }

    setLoading(true)
    
    try {
      // ✅ API call to your backend
      const response = await detectDisease(selectedImage)
      
      if (response.data) {
        // Save result to localStorage for results page
        localStorage.setItem('analysisResult', JSON.stringify(response.data))
        toast.success('Analysis complete!')
        
        // Navigate to results page with disease name
        navigate(`/results/${response.data.disease}`)
      }
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error(error.response?.data?.message || 'Failed to analyze image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Crop Disease Analysis
            </h1>
            <p className="text-xl text-gray-600">
              Upload a clear photo of your crop leaf for instant disease detection
            </p>
          </div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
          >
            <div className="border-3 border-dashed rounded-2xl p-8 border-gray-300 hover:border-green-400">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />

              {!preview ? (
                <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <FaCamera className="text-4xl text-green-600" />
                  </div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    Click to upload image
                  </p>
                  <p className="text-gray-500 mb-4">
                    Supports: JPG, PNG (Max 10MB)
                  </p>
                  <button className="btn-primary">
                    Choose Image
                  </button>
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-96 mx-auto rounded-lg shadow-lg"
                  />
                  <button
                    onClick={() => {
                      setSelectedImage(null)
                      setPreview(null)
                      fileInputRef.current.value = ''
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <FiX />
                  </button>
                </div>
              )}
            </div>

            {/* Analyze Button */}
            {preview && (
              <div className="mt-8">
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <FaUpload />
                      <span>Analyze Crop</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default CropAnalysisPage