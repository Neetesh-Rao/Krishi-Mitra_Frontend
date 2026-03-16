// src/components/Home/FarmerAnimation.jsx
import React from 'react'
import { motion } from 'framer-motion'

const FarmerAnimation = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      {/* Background Glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-96 h-96 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-3xl"
      />

      {/* Main SVG Animation */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10"
      >
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sun */}
          <motion.circle 
            cx="300" 
            cy="80" 
            r="30" 
            fill="#FBBF24"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Sun rays */}
          {[0, 45, 90, 135].map((angle, i) => (
            <motion.line
              key={i}
              x1="300" y1="80"
              x2={300 + 50 * Math.cos(angle * Math.PI/180)}
              y2={80 + 50 * Math.sin(angle * Math.PI/180)}
              stroke="#FCD34D"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            />
          ))}

          {/* Clouds */}
          <motion.g
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <circle cx="50" cy="50" r="15" fill="#E5E7EB" />
            <circle cx="65" cy="50" r="18" fill="#E5E7EB" />
            <circle cx="80" cy="50" r="15" fill="#E5E7EB" />
          </motion.g>

          <motion.g
            animate={{ x: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <circle cx="340" cy="120" r="12" fill="#E5E7EB" />
            <circle cx="355" cy="120" r="15" fill="#E5E7EB" />
            <circle cx="370" cy="120" r="12" fill="#E5E7EB" />
          </motion.g>

          {/* Farmer */}
          <g transform="translate(100, 150)">
            {/* Hat */}
            <motion.g
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <rect x="45" y="0" width="60" height="10" rx="5" fill="#8B5A2B" />
              <path d="M55 10 L95 10 L85 30 L65 30 L55 10" fill="#A67B5B" />
            </motion.g>

            {/* Head */}
            <circle cx="75" cy="40" r="20" fill="#FDE68A" />

            {/* Eyes */}
            <motion.circle 
              cx="65" cy="35" r="3" fill="#1F2937"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.3, delay: 2, repeat: Infinity }}
            />
            <motion.circle 
              cx="85" cy="35" r="3" fill="#1F2937"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.3, delay: 2, repeat: Infinity }}
            />

            {/* Smile */}
            <motion.path
              d="M65 45 Q75 55, 85 45"
              stroke="#1F2937"
              strokeWidth="2"
              fill="none"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Body */}
            <rect x="60" y="60" width="30" height="50" rx="5" fill="#4B5563" />

            {/* Arms */}
            <motion.g
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <rect x="40" y="70" width="20" height="8" rx="4" fill="#4B5563" transform="rotate(-20 50 74)" />
            </motion.g>
            
            <motion.g
              animate={{ rotate: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <rect x="90" y="70" width="20" height="8" rx="4" fill="#4B5563" transform="rotate(20 100 74)" />
            </motion.g>

            {/* Tools */}
            <motion.g
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <rect x="100" y="55" width="40" height="5" rx="2" fill="#9CA3AF" />
              <rect x="135" y="50" width="5" height="15" rx="2" fill="#6B7280" />
            </motion.g>

            {/* Legs */}
            <motion.g
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <rect x="65" y="110" width="8" height="30" rx="4" fill="#374151" />
              <rect x="77" y="110" width="8" height="30" rx="4" fill="#374151" />
            </motion.g>
          </g>

          {/* Crops */}
          {[150, 200, 250].map((x, i) => (
            <motion.g
              key={i}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            >
              <rect x={x} y="280" width="5" height="40" fill="#2D5A27" />
              <circle cx={x + 2.5} cy="270" r="15" fill="#4CAF50" />
              <circle cx={x + 12} cy="275" r="8" fill="#81C784" />
              <circle cx={x - 7} cy="275" r="8" fill="#81C784" />
            </motion.g>
          ))}

          {/* Ground */}
          <rect x="0" y="320" width="400" height="30" fill="#8B5A2B" />
          <rect x="0" y="315" width="400" height="10" fill="#6B4423" />

          {/* Floating Leaves */}
          {[1, 2, 3].map((_, i) => (
            <motion.g
              key={i}
              initial={{ x: 50 + i * 80, y: 200 }}
              animate={{ 
                y: [200, 150, 200],
                rotate: [0, 20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity 
              }}
            >
              <path d="M0 0 L10 -10 L20 0 L10 10 Z" fill="#4CAF50" transform={`translate(${50 + i * 80}, 200)`} />
            </motion.g>
          ))}
        </svg>
      </motion.div>

      {/* Floating Labels */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute -top-10 right-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
      >
        <span className="text-green-600 font-semibold">✨ AI Powered</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-20 left-0 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
      >
        <span className="text-emerald-600 font-semibold">🌱 Smart Farming</span>
      </motion.div>
    </div>
  )
}

export default FarmerAnimation