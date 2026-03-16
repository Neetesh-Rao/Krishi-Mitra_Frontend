// src/components/Layout/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  FaLeaf, 
  FaUser, 
  FaSignOutAlt,
  FaHome,
  FaInfoCircle,
  FaCamera,
  FaSeedling,
  FaCloudSun,
  FaTachometerAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  
  // Auth context with error handling
  let auth = null
  try {
    auth = useAuth()
  } catch (error) {
    console.error('Auth context not available:', error)
    return null
  }

  const { isAuthenticated, user, logout } = auth
  const navigate = useNavigate()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  const closeMenu = () => setIsOpen(false)

  // Navigation links data
  const navLinks = [
    { path: '/', name: 'Home', icon: FaHome, auth: false },
    { path: '/about', name: 'About', icon: FaInfoCircle, auth: false },
    { path: '/analyze', name: 'Analyze Crop', icon: FaCamera, auth: true },
    { path: '/recommend', name: 'Crop Recommendation', icon: FaSeedling, auth: true },
    { path: '/weather', name: 'Weather Alerts', icon: FaCloudSun, auth: true },
    { path: '/dashboard', name: 'Dashboard', icon: FaTachometerAlt, auth: true },
  ]

  // Filter links based on auth status
  const filteredLinks = navLinks.filter(link => !link.auth || (link.auth && isAuthenticated))

  // Check if link is active
  const isActive = (path) => location.pathname === path

  if (!auth) {
    return <div className="h-20 bg-white/80"></div>
  }

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
            : 'bg-white/80 backdrop-blur-sm shadow-lg py-4'
        }`}
      >
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenu}>
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="text-3xl text-green-600"
              >
                <FaLeaf />
              </motion.div>
              <div className="flex flex-col">
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-gray-800">KRISHI</span>
                  <span className="text-xl font-light text-green-600 ml-1">MITRA</span>
                </div>
                <span className="text-[10px] text-gray-500 -mt-1">Farming Assistant</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {filteredLinks.map((link) => (
                <NavLink 
                  key={link.path}
                  to={link.path} 
                  icon={link.icon}
                  active={isActive(link.path)}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 rounded-full border border-green-100">
                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                      <FaUser className="text-xs text-green-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name?.split(' ')[0] || 'Farmer'}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center space-x-1.5 text-gray-600 hover:text-red-600 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
                  >
                    <FaSignOutAlt size={14} />
                    <span className="text-sm">Logout</span>
                  </motion.button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-1.5 text-sm text-gray-600 hover:text-green-600 transition-colors"
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link to="/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-md"
                    >
                      Register
                    </motion.button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-600 hover:text-green-600 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl z-40 md:hidden border-t border-gray-100"
          >
            <div className="container-custom px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {filteredLinks.map((link) => (
                  <MobileNavLink
                    key={link.path}
                    to={link.path}
                    icon={link.icon}
                    active={isActive(link.path)}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </MobileNavLink>
                ))}
              </div>

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                      <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                        <FaUser className="text-green-700" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user?.name || 'Farmer'}</p>
                        <p className="text-xs text-gray-500">{user?.email || ''}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 py-3 rounded-xl hover:bg-red-100 transition"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-3">
                    <Link to="/login" className="flex-1" onClick={closeMenu}>
                      <button className="w-full px-4 py-2.5 border border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition">
                        Login
                      </button>
                    </Link>
                    <Link to="/register" className="flex-1" onClick={closeMenu}>
                      <button className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition">
                        Register
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
    </>
  )
}

// Desktop NavLink Component
const NavLink = ({ to, icon: Icon, active, children }) => (
  <Link to={to}>
    <motion.div
      whileHover={{ y: -2 }}
      className={`relative px-3 py-2 rounded-lg transition-all duration-200 group ${
        active 
          ? 'text-green-600' 
          : 'text-gray-600 hover:text-green-600'
      }`}
    >
      <div className="flex items-center space-x-1.5">
        <Icon size={16} />
        <span className="text-sm font-medium">{children}</span>
      </div>
      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
        />
      )}
    </motion.div>
  </Link>
)

// Mobile NavLink Component
const MobileNavLink = ({ to, icon: Icon, active, onClick, children }) => (
  <Link to={to} onClick={onClick}>
    <div
      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-green-50 text-green-600' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className={active ? 'text-green-600' : 'text-gray-400'} size={18} />
      <span className="font-medium">{children}</span>
      {active && (
        <div className="ml-auto w-1.5 h-1.5 bg-green-600 rounded-full"></div>
      )}
    </div>
  </Link>
)

export default Navbar