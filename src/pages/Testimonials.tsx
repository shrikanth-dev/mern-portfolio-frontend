import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { motion } from 'framer-motion';
import type { Testimonial } from '../../src/types/types'


const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(document.body.classList.contains('dark'));

  // to dark/light mode toggle for instant updates
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await API.get('/api/testimonials');
        setTestimonials(res.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Testimonials</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {testimonials.map(testimonial => (
          <motion.div
            key={testimonial._id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: isDarkMode ? '#1e1e1e' : '#ffffff',
              color: isDarkMode ? '#f0f0f0' : '#333333',
              borderRadius: '8px',
              boxShadow: isDarkMode
                ? '0 2px 8px rgba(255,255,255,0.05)'
                : '0 2px 8px rgba(0,0,0,0.1)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '0.5rem'
              }}
            />
            <h3>{testimonial.name}</h3>
            <p style={{
               fontSize: '0.9rem', 
              color: isDarkMode ? '#bbbbbb' : '#555555',
              margin: '0.2rem 0',
               }}>{testimonial.role} at {testimonial.company}
               </p>
            <p style={{ 
              fontSize: '0.9rem', 
              color: isDarkMode ? '#999999' : '#777777',
              marginTop: '0.5rem',
              fontStyle: 'italic',
              }}>
              "{testimonial.message}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
