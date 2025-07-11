import React, { useEffect, useState } from 'react';
import { fetchBlogs, deleteBlog } from '../../api/api';
import BlogFormModal from '../../components/admin/BlogFormModal';
import { motion } from 'framer-motion';
import '../../styles/AdminDashboardBlogs.css';
import type { BlogFormData } from '../../types/types'

interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  tags: string[];
  summary: string;
  createdAt: string;
}

const AdminDashboardBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [theme, setTheme] = useState<string>(document.body.classList.contains('dark') ? 'dark' : 'light');

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.body.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const loadBlogs = async () => {
    try {
      const { data } = await fetchBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      await deleteBlog(id);
      await loadBlogs();
      alert('Blog deleted successfully.');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog. Please try again.');
    }
  };

  const getFormattedBlogFormData = (blog: Blog | null): BlogFormData | null => {
    if (!blog) return null;
    return {
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      image: blog.image,
      tags: blog.tags.join(', '),
    };
  };

  return (
    <div className="admin-dashboard-blogs">
      <h2>Admin: Manage Blogs</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button
          onClick={() => {
            setEditBlog(null);
            setShowModal(true);
          }}
          className="create-blog-btn"
        >
          + Create New Blog
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading blogs...</p>
      ) : (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              whileHover={{ scale: 1.02 }}
              className={`blog-card ${theme}`}
            >
              <h3>{blog.title}</h3>
              <p>{blog.summary?.slice(0, 100)}...</p>
              <div className="blog-card-buttons">
                <button
                  onClick={() => {
                    setEditBlog(blog);
                    setShowModal(true);
                  }}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showModal && (
        <BlogFormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          refresh={loadBlogs}
          initialData={getFormattedBlogFormData(editBlog)}
          onSubmitSuccess={loadBlogs}
        />
      )}
    </div>
  );
};

export default AdminDashboardBlogs;

