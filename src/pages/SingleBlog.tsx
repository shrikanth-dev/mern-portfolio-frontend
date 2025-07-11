import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/api';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

interface Blog {
  _id: string;
  title: string;
  image?: string;
  content: string;
  tags?: string[];
}

const SingleBlog: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading blog...</p>;
  }

  if (!blog) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Blog not found.</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}
    >
      <Link to="/blog" style={{ color: '#007bff', textDecoration: 'underline', marginBottom: '1rem', display: 'inline-block' }}>
        ← Back to Blogs
      </Link>

      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{blog.title}</h2>

      {blog.tags && (
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {blog.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: '#007bff22',
                color: '#007bff',
                padding: '0.3rem 0.6rem',
                margin: '0 0.3rem',
                borderRadius: '4px',
                fontSize: '0.85rem',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1.5rem' }}
        />
      )}

      <div
        style={{
          textAlign: 'left',
          lineHeight: '1.7',
          fontSize: '1rem',
        }}
      >
        <div className="markdown-content">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>

        {/* <ReactMarkdown>{blog.content}</ReactMarkdown> */}
      </div>
    </motion.div>
  );
};

export default SingleBlog;
