// src/components/Home/HowItWorks.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'  // ✅ Yeh import add karna bhool gaye the
import { 
  FaCamera, 
  FaSearch, 
  FaPills, 
  FaCheckCircle,
  FaArrowRight,
  FaLeaf
} from 'react-icons/fa'

const steps = [
  {
    icon: <FaCamera className="text-3xl" />,
    title: "Upload Photo",
    description: "Take a clear photo of your crop leaf and upload it to our platform.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <FaSearch className="text-3xl" />,
    title: "AI Analysis",
    description: "Our advanced AI analyzes the image to detect any diseases or issues.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <FaPills className="text-3xl" />,
    title: "Get Treatment",
    description: "Receive detailed treatment plans and medicine recommendations.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <FaCheckCircle className="text-3xl" />,
    title: "Take Action",
    description: "Apply the treatments and monitor your crop's recovery progress.",
    color: "from-orange-500 to-red-500"
  }
]

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 text-green-200 opacity-20">
          <FaLeaf size={60} />
        </div>
        <div className="absolute bottom-20 right-10 text-green-200 opacity-20">
          <FaLeaf size={80} />
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur-sm text-green-700 rounded-full text-sm font-semibold mb-4 shadow-lg">
            🚀 Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How It{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in just a few simple steps and protect your crops today.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-green-300 via-emerald-300 to-green-300 transform -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Demo Video/Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link to="/analyze">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center space-x-2 shadow-xl"
            >
              <span>Try It Now</span>
              <FaArrowRight />
            </motion.button>
          </Link>
          <p className="text-gray-500 mt-4 text-sm">No credit card required • Free forever</p>
        </motion.div>
      </div>
    </section>
  )
}

const StepCard = ({ step, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    whileHover={{ y: -10 }}
    className="relative bg-white rounded-2xl shadow-xl p-8 text-center z-10 hover:shadow-2xl transition-all duration-300 group"
  >
    {/* Step Number */}
    <div className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
      {index + 1}
    </div>

    {/* Icon Container */}
    <motion.div
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6 }}
      className={`relative w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:shadow-2xl transition-all`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-white opacity-20 rounded-2xl"></div>
      {step.icon}
    </motion.div>

    {/* Title */}
    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
      {step.title}
    </h3>

    {/* Description */}
    <p className="text-gray-600">
      {step.description}
    </p>

    {/* Arrow for visual flow (except last) */}
    {index < steps.length - 1 && (
      <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-green-400 text-2xl">
        <FaArrowRight />
      </div>
    )}
  </motion.div>
)

export default HowItWorks