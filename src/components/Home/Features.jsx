// src/components/Home/Features.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { 
  FaCamera, 
  FaFlask, 
  FaPills, 
  FaChartLine, 
  FaMobile, 
  FaUsers,
  FaLeaf,
  FaShieldAlt,
  FaTachometerAlt,
  FaCloudSun,
  FaSeedling
} from 'react-icons/fa'

const features = [
  {
    icon: <FaCamera className="text-3xl" />,
    title: "Instant Crop Analysis",
    description: "Upload a photo and get instant disease detection results within seconds.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <FaFlask className="text-3xl" />,
    title: "Disease Identification",
    description: "AI identifies over 50 different crop diseases with 95% accuracy.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <FaPills className="text-3xl" />,
    title: "Treatment Solutions",
    description: "Detailed treatment plans, medicine recommendations, and prevention tips.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <FaChartLine className="text-3xl" />,
    title: "Crop Health Monitoring",
    description: "Track your crop's health over time and get early warnings.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <FaMobile className="text-3xl" />,
    title: "Mobile Friendly",
    description: "Access from anywhere using your smartphone for quick analysis.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: <FaUsers className="text-3xl" />,
    title: "Farmer Community",
    description: "Connect with other farmers and share experiences and solutions.",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: <FaCloudSun className="text-3xl" />,
    title: "Weather Alerts",
    description: "Get real-time weather alerts for your farming area.",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: <FaSeedling className="text-3xl" />,
    title: "Crop Recommendations",
    description: "AI-powered crop suggestions based on your soil parameters.",
    color: "from-green-600 to-emerald-600"
  },
  {
    icon: <FaShieldAlt className="text-3xl" />,
    title: "Premium Support",
    description: "24/7 expert support for all your farming queries.",
    color: "from-purple-600 to-pink-600"
  }
]

const Features = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            ✨ Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Powerful Features for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Smart Farming
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge AI technology with agricultural expertise to help farmers 
            protect their crops and increase yield.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">Join thousands of farmers already using Krishi Mitra</p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full border-2 border-white shadow-lg"
              />
            ))}
            <div className="flex items-center ml-2">
              <span className="text-2xl font-bold text-gray-800">10K+</span>
              <span className="text-gray-600 ml-1">Farmers</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group relative bg-white rounded-2xl shadow-xl p-8 cursor-pointer overflow-hidden"
  >
    {/* Gradient Background on Hover */}
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10`}
    />
    
    {/* Icon Container */}
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.2 }}
      className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:shadow-xl transition-all`}
    >
      {feature.icon}
    </motion.div>

    {/* Content */}
    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
      {feature.title}
    </h3>
    <p className="text-gray-600 leading-relaxed">
      {feature.description}
    </p>

    {/* Decorative Line */}
    <motion.div
      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-600 to-emerald-600"
      initial={{ width: 0 }}
      whileHover={{ width: '100%' }}
      transition={{ duration: 0.3 }}
    />

    {/* Corner Decoration */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full" />
  </motion.div>
)

export default Features