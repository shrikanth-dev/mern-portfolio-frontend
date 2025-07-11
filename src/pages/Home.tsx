// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import config from '../config';
import API from '../api/api';
import '../styles/Home.css';
import type { Blog, Certification, Testimonial } from '../../src/types/types'


const Home: React.FC = () => {
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRes = await API.get('/api/blogs');
        setLatestBlogs(blogsRes.data.slice(0, 3));

        const certsRes = await API.get('/api/certifications');
        setCertifications(certsRes.data.slice(0, 2));

        const testiRes = await API.get('/api/testimonials');
        setTestimonials(testiRes.data.slice(0, 2));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <div className="intro-section">
        <h1>Hi, I'm {config.name} <span role="img" aria-label="waving hand">👋</span></h1>
        <h2>{config.role}</h2>
        <p>{config.bio}</p>
      </div>

          <div className="cta-buttons">
      <motion.a
        href="https://drive.google.com/uc?export=download&id=1VjsC_YsVyszRgnfqreg8tIeXufROgKIv" // replace with resume path
        download
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="cta-button"
      >
        Download Resume
      </motion.a>

      <motion.a
        href="/contact"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="cta-button secondary"
      >
        Hire Me
      </motion.a>
  </div>

      {/* Skills Section */}
      <div className="section">
        <h3>Skills</h3>
        <div className="skills-grid">
          {config.skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="skill-card"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="section">
        <h3>Featured Projects</h3>
        <div className="card-grid">
          {config.projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="card"
            >
              <img src={project.image} alt={project.title} className="card-img" />
              <div className="card-body">
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <div className="card-links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">Live</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="view-more">
          <Link to="/projects">View All Projects →</Link>
        </div>
      </div>
      
      {/* Certifications Preview */}
      <div className="section">
        <h3>Certifications</h3>
        <div className="card-grid">
          {certifications.map((cert) => (
            <motion.div
              key={cert._id}
              whileHover={{ scale: 1.05 }}
              className="card"
            >
              <div className="card-body">
                <h4>{cert.title}</h4>
                <p>{cert.issuer}</p>
                <small>{new Date(cert.date).toLocaleDateString()}</small>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="view-more">
          <Link to="/certifications">View All Certifications →</Link>
        </div>
      </div>

      {/* Latest Blogs */}
      <div className="section">
        <h3>Latest Blogs</h3>
        <div className="card-grid">
          {latestBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              whileHover={{ scale: 1.05 }}
              className="card"
            >
              <div className="card-body">
                <h4>{blog.title}</h4>
                <p>{blog.summary?.slice(0, 100)}...</p>
                <div className="card-links">
                  <Link to={`/blogs/${blog._id}`}>Read More →</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="view-more">
          <Link to="/blog">View All Blogs →</Link>
        </div>
      </div>


      {/* Testimonials Preview */}
      <div className="section">
        <h3>Testimonials</h3>
        <div className="card-grid">
          {testimonials.map((testi) => (
            <motion.div
              key={testi._id}
              whileHover={{ scale: 1.05 }}
              className="card"
            >
              <div className="card-body">
                <p>"{testi.message}"</p>
                <h5>- {testi.name}</h5>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="view-more">
          <Link to="/testimonials">View All Testimonials →</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;


