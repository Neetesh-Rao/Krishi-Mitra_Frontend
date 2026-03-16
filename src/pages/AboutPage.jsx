// src/pages/AboutPage.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaLeaf, FaUsers, FaRocket, FaShieldAlt, FaHeart, FaSeedling } from 'react-icons/fa'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block p-4 bg-green-100 rounded-full mb-6"
            >
              <FaSeedling className="text-5xl text-green-600" />
            </motion.div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              About <span className="text-green-600">Krishi Mitra</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering farmers with AI technology for a sustainable future
            </p>
          </div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8"
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaHeart className="text-red-500 mr-3" />
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Krishi Mitra is an AI-powered farming assistant designed to help farmers detect crop diseases early 
              and provide effective treatment solutions. Our mission is to empower farmers with cutting-edge technology, 
              reduce crop losses, and improve agricultural productivity for a food-secure future.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <FeatureCard
              icon={<FaLeaf />}
              title="AI-Powered Detection"
              description="Advanced machine learning models identify over 50 crop diseases with 95% accuracy"
              delay={0.4}
            />
            <FeatureCard
              icon={<FaUsers />}
              title="Farmer Community"
              description="Connect with thousands of farmers, share experiences and best practices"
              delay={0.5}
            />
            <FeatureCard
              icon={<FaRocket />}
              title="Instant Results"
              description="Get disease detection and treatment recommendations in seconds"
              delay={0.6}
            />
            <FeatureCard
              icon={<FaShieldAlt />}
              title="Sustainable Solutions"
              description="Environmentally friendly treatment options for organic farming"
              delay={0.7}
            />
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-xl p-8 text-white"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard number="10,000+" text="Farmers" />
              <StatCard number="50,000+" text="Analyses" />
              <StatCard number="95%" text="Accuracy" />
              <StatCard number="50+" text="Crops" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
  >
    <div className="text-green-600 text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const StatCard = ({ number, text }) => (
  <div className="text-center">
    <div className="text-3xl font-bold mb-1">{number}</div>
    <div className="text-sm opacity-90">{text}</div>
  </div>
)

// 🔴 IMPORTANT: यह line जरूर होनी चाहिए
export default AboutPage
