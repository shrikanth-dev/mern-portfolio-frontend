import React from 'react';
import config from '../../config';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/useTheme';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  const getIconColor = (isHover: boolean) => {
    if (theme === 'dark') {
      return isHover ? '#90caf9' : '#f0f0f0';
    } else {
      return isHover ? '#007bff' : '#333';
    }
  };

  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
      style={{
        padding: '1rem',
        textAlign: 'center',
        background: theme === 'dark' ? '#121212' : '#fff',
        marginTop: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '0.5rem',
        }}
      >
        {config.socials.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              style={{
                fontSize: '1.5rem',
                color: getIconColor(false),
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = getIconColor(true))}
              onMouseLeave={e => (e.currentTarget.style.color = getIconColor(false))}
            >
              <Icon />
            </a>
          );
        })}
      </motion.div>
      <p
        style={{
          fontSize: '0.9rem',
          color: theme === 'dark' ? '#aaa' : '#666',
        }}
      >
        &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;

