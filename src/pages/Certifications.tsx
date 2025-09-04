import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { motion } from 'framer-motion';
import type { Certification } from '../types/types';
import Loader from '../components/_common/Loader';

const Certifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(document.body.classList.contains('dark'));
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchCertifications = async () => {
      setLoading(true);
      try {
        const res = await API.get('/api/certifications');
        setCertifications(res.data);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      } finally {
      setLoading(false); 
      }
    };
    fetchCertifications();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Certifications</h2>
      {loading ? (
        <Loader />
      ) : certifications.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Reload page after 15-20 sec to load certifications.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {certifications.map(cert => (
            <motion.div
              key={cert._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: isDarkMode ? '#1e1e1e' : '#ffffff',
                color: isDarkMode ? '#f0f0f0' : '#333333',
                borderRadius: '8px',
                boxShadow: isDarkMode
                  ? '0 2px 8px rgba(255,255,255,0.05)'
                  : '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
            >
              <img
                src={cert.image}
                alt={cert.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1rem' }}>
                <h3>{cert.title}</h3>
                <p style={{ fontSize: '0.9rem', color: isDarkMode ? '#cccccc' : '#555555' }}>{cert.issuer}</p>
                <p style={{ fontSize: '0.8rem', color: isDarkMode ? '#999999' : '#777777' }}>
                  {new Date(cert.date).toLocaleDateString()}
                </p>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    marginTop: '0.5rem', 
                    display: 'inline-block', 
                    color: isDarkMode ? '#90caf9' : '#007bff',
                    fontWeight: 500,
                    textDecoration: 'none', 
                  }}
                >
                  View Certificate
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certifications;
