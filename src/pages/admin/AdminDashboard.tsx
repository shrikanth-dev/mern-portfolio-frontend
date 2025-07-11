// src/admin/AdminDashboard.tsx

import React, { useEffect, useState } from 'react';
import { fetchBlogs, fetchProjects, fetchCertifications } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminDashboard.css';
import type { Blog, Project, Certification } from '../../types/types';

const AdminDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const blogsData = await fetchBlogs();
        const projectsData = await fetchProjects();
        const certsData = await fetchCertifications();

        setBlogs(blogsData.data);
        setProjects(projectsData.data);
        setCertifications(certsData.data);
      } catch (error) {
        console.error('Error loading admin dashboard data:', error);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard-container">
      <header className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </header>

      <div className="dashboard-stats">
        <div className="dashboard-card">
          <h2>Total Blogs</h2>
          <p>{blogs.length}</p>
          <button onClick={() => navigate('/admin/blogs')}>Manage Blogs</button>
        </div>

        <div className="dashboard-card">
          <h2>Total Projects</h2>
          <p>{projects.length}</p>
          <button onClick={() => navigate('/admin/projects')}>Manage Projects</button>
        </div>

        <div className="dashboard-card">
          <h2>Total Certifications</h2>
          <p>{certifications.length}</p>
          <button onClick={() => navigate('/admin/certifications')}>Manage Certifications</button>
        </div>
      </div>

      <div className="recent-section">
        <h2>Recent Blogs</h2>
        <ul>
          {blogs.slice(0, 5).map((blog) => (
            <li key={blog._id}>{blog.title}</li>
          ))}
        </ul>
      </div>

      <div className="recent-section">
        <h2>Recent Projects</h2>
        <ul>
          {projects.slice(0, 5).map((project) => (
            <li key={project._id}>{project.title}</li>
          ))}
        </ul>
      </div>

      <div className="recent-section">
        <h2>Recent Certifications</h2>
        <ul>
          {certifications.slice(0, 5).map((cert) => (
            <li key={cert._id}>{cert.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

