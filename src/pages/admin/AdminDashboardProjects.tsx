import React, { useEffect, useState } from 'react';
import { fetchProjects, deleteProject } from '../../api/api';
import ProjectFormModal from '../../components/admin/ProjectFormModal';
import type { Project } from '../../types/types';
import '../../styles/AdminDashboardProjects.css';
import { motion } from 'framer-motion';

const AdminDashboardProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  const loadProjects = async () => {
    try {
      const { data } = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      await loadProjects();
      alert('Project deleted.');
    } catch {
      alert('Error deleting project.'); 
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin: Manage Projects</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }} >
      <button className="create-button" onClick={() => { setEditProject(null); setShowModal(true); }}>
        + Create New Project
      </button>
      </div>
      {loading ? <p>Loading projects...</p> : (
        <div className="admin-card-grid">
          {projects.map(project => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.02 }}
              className={`admin-card ${document.body.classList.contains('dark') ? 'dark' : ''}`}
            >
              <h3>{project.title}</h3>
              <p>{project.description.slice(0, 100)}...</p>
              <div className="admin-card-actions">
                <button onClick={() => { setEditProject(project); setShowModal(true); }}>Edit</button>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <ProjectFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          initialData={editProject}
          onSubmitSuccess={loadProjects}
        />
      )}
    </div>
  );
};

export default AdminDashboardProjects;
