import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../api/api';

interface Blog {
  _id: string;
  title: string;
  image?: string;
  summary?: string;
  tags?: string[];
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(document.body.classList.contains('dark'));

  // Detect theme changes and update
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get('/api/blogs');
        setBlogs(res.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="card"  // for dark/light toggling
      style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Blog</h2>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No blogs available yet.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: isDarkMode ? '#1e1e1e' : '#ffffff',
                color: isDarkMode ? '#f0f0f0' : '#333333',
                borderRadius: '8px',
                boxShadow: isDarkMode
                  ? '0 2px 8px rgba(255,255,255,0.05)'
                  : '0 2px 8px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'background 0.3s ease, color 0.3s ease',
              }}
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
              )}
              <div style={{ padding: '1rem', flexGrow: 1 }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{blog.title}</h3>
                {blog.tags && (
                  <div style={{ marginBottom: '0.5rem' }}>
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: isDarkMode ? '#90caf933' : '#007bff22',
                          color: isDarkMode ? '#90caf9' : '#007bff',
                          padding: '0.2rem 0.5rem',
                          marginRight: '0.3rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: isDarkMode ? '#cccccc' : '#555555',
                  }}>
                  {blog.summary}
                </p>
              </div>
              <Link
                to={`/blog/${blog._id}`}
                style={{
                  textAlign: 'center',
                  padding: '0.7rem',
                  background: isDarkMode ? '#007bff' : '#007bff',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'background 0.3s ease',
                }}
              >
                Read More
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Blog;


