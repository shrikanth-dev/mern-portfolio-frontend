import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../api/projectApi';
import { motion } from 'framer-motion';
import type { Project } from '../types/types';
import Loader from '../components/_common/Loader';


const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
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
    const getProjects = async () => {
      setLoading(true);
      try {
        const { data } = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
      setLoading(false); 
      }
    };
    getProjects();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Projects</h2>
      {loading ? (
        <Loader />
      ) : projects.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Reload page after 15-20 sec to load projects.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="card"
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
                transition: 'background 0.3s ease',
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1rem', flexGrow: 1 }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: isDarkMode ? '#cccccc' : '#555555',
                  }}>
                  {project.description}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '0.5rem 0',
                  borderTop: isDarkMode ? '1px solid #333' : '1px solid #eee',
                }}
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    color: isDarkMode ? '#90caf9' : '#007bff',
                    fontWeight: 500, 
                  }}
                >
                  GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    color: isDarkMode ? '#a5d6a7' : '#28a745',
                    fontWeight: 500,
                  }}
                >
                  Live
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;



