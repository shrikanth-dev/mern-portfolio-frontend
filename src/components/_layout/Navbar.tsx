import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import config from '../../config'
import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/useTheme'


const Navbar: React.FC = () => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const links = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/certifications', label: 'Certifications' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
    { path: '/admin/dashboard', label: 'Admin' },
  ]

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80 }}
      style={{
        padding: '1rem 2rem',
        background: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        {config.name}
      </Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: location.pathname === link.path ? '#007bff' : '#333',
              fontWeight: location.pathname === link.path ? 'bold' : 'normal',
            }}
          >
            {link.label}
          </Link>
        ))}
        
        <button
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: theme === 'light' ? '#333' : '#f0f0f0',
          }}
          aria-label="Toggle Theme"
          title="Toggle Light/Dark Mode" 
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </motion.nav>
  )
}

export default Navbar
