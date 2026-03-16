// src/components/Home/HeroSection.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCamera, FaLeaf, FaShieldAlt, FaArrowRight } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import FarmerAnimation from './FarmerAnimation'

const HeroSection = () => {
  const { isAuthenticated } = useAuth()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center bg-white/90 backdrop-blur-sm text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg border border-green-200"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              🌱 AI-Powered Farming Assistant
            </motion.div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Protect Your Crops with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                Krishi Mitra
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Upload a photo of your crop and let our AI instantly detect diseases, 
              provide treatment solutions, and help you grow healthier crops for a better harvest.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to={isAuthenticated ? "/analyze" : "/register"}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FaCamera />
                  <span>Analyze Your Crop</span>
                  <FaArrowRight className="ml-2 text-sm" />
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "white", borderColor: "#16a34a" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-green-600 hover:bg-green-50 transition-all duration-300 shadow-lg"
                >
                  Learn More
                </motion.button>
              </Link>
            </div>

            {/* Stats with Icons */}
            <div className="grid grid-cols-3 gap-8">
              <StatItem number="10K+" text="Happy Farmers" icon="👨‍🌾" />
              <StatItem number="95%" text="Accuracy Rate" icon="🎯" />
              <StatItem number="50+" text="Crops Covered" icon="🌾" />
            </div>
          </motion.div>

          {/* Right Side - Animated Farmer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <FarmerAnimation />
          </motion.div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white" fillOpacity="0.3"/>
        </svg>
      </div>
    </section>
  )
}

const StatItem = ({ number, text, icon }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="text-center"
  >
    <div className="flex items-center justify-center space-x-1">
      <span className="text-2xl">{icon}</span>
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className="text-3xl font-bold text-green-600"
      >
        {number}
      </motion.div>
    </div>
    <div className="text-gray-600 text-sm mt-1">{text}</div>
  </motion.div>
)

export default HeroSection