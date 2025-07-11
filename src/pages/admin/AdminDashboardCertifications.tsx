import React, { useEffect, useState } from 'react';
import { fetchCertifications, deleteCertification } from '../../api/api';
import CertificationFormModal from '../../components/admin/CertificationFormModal';
import type { Certification } from '../../types/types';
import { motion } from 'framer-motion';
import '../../styles/AdminDashboardCertifications.css';

const AdminDashboardCertifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editCert, setEditCert] = useState<Certification | null>(null);

  const loadCertifications = async () => {
    try {
      const { data } = await fetchCertifications();
      setCertifications(data);
    } catch (error) {
      console.error('Error fetching certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertifications();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    try {
      await deleteCertification(id);
      await loadCertifications();
      alert('Certification deleted successfully.');
    } catch (error) {
      console.error('Error deleting certification:', error);
      alert('Error deleting certification.');
    }
  };

  return (
    <div className="admin-dashboard-certifications">
      <h2>Admin: Manage Certifications</h2>
      <div className="create-button-container">
        <button
          onClick={() => {
            setEditCert(null);
            setShowModal(true);
          }}
        >
          + Add Certification
        </button>
      </div>

      {loading ? (
        <p>Loading certifications...</p>
      ) : (
        <div className="certifications-grid">
          {certifications.map((cert) => (
            <motion.div
              key={cert._id}
              whileHover={{ scale: 1.02 }}
              className="cert-card"
            >
              <h3>{cert.title}</h3>
              <p><strong>Issuer:</strong> {cert.issuer}</p>
              <p><strong>Date:</strong> {new Date(cert.date).toLocaleDateString()}</p>
              {cert.link && <a href={cert.link} target="_blank" rel="noopener noreferrer">View Certificate</a>}
              <div className="cert-actions">
                <button onClick={() => { setEditCert(cert); setShowModal(true); }}>Edit</button>
                <button onClick={() => handleDelete(cert._id)}>Delete</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <CertificationFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          initialData={editCert}
          onSubmitSuccess={loadCertifications}
        />
      )}
    </div>
  );
};

export default AdminDashboardCertifications;
