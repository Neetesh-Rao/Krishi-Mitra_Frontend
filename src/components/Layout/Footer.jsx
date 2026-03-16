import React from 'react'
import { Link } from 'react-router-dom'
import { FaLeaf, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-900 to-green-800 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <FaLeaf className="text-3xl text-green-400" />
              <span className="text-2xl font-bold">KRISHI MITRA</span>
            </div>
            <p className="text-green-100 mb-6 leading-relaxed">
              Empowering farmers with AI-driven crop disease detection and treatment solutions for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<FaFacebook />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaInstagram />} />
              <SocialIcon icon={<FaLinkedin />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/analyze">Crop Analysis</FooterLink>
              <FooterLink to="/dashboard">Dashboard</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <FooterLink to="/analyze">Disease Detection</FooterLink>
              <FooterLink to="/analyze">Crop Health Analysis</FooterLink>
              <FooterLink to="/treatments">Treatment Solutions</FooterLink>
              <FooterLink to="/advice">Expert Advice</FooterLink>
              <FooterLink to="/community">Farmer Community</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <ContactInfo icon={<FaMapMarkerAlt />} text="123 Green Field, Agriculture Street, India" />
              <ContactInfo icon={<FaPhone />} text="+91 98765 43210" />
              <ContactInfo icon={<FaEnvelope />} text="support@krishimitra.com" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-300 text-center md:text-left">
              © 2024 KRISHI MITRA. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-green-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-green-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const SocialIcon = ({ icon }) => (
  <motion.a
    whileHover={{ scale: 1.2, y: -5 }}
    href="#"
    className="bg-green-700 p-3 rounded-full hover:bg-green-600 transition-colors"
  >
    {icon}
  </motion.a>
)

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-green-200 hover:text-white transition-colors flex items-center space-x-2">
      <span className="w-1 h-1 bg-green-400 rounded-full"></span>
      <span>{children}</span>
    </Link>
  </li>
)

const ContactInfo = ({ icon, text }) => (
  <div className="flex items-start space-x-3">
    <div className="text-green-400 mt-1">{icon}</div>
    <p className="text-green-200">{text}</p>
  </div>
)

export default Footer