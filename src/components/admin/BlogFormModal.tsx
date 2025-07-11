// src/components/admin/BlogFormModal.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import API from '../../api/api';
import Modal from '../ui/Modal'; 
import '../../styles/BlogFormModal.css';
import type { BlogFormModalProps, BlogFormData } from '../../types/types'


const schema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  image: yup.string().url('Must be a valid URL').required('Image URL is required'),
  tags: yup.string().required('Tags are required'),
});

const BlogFormModal: React.FC<BlogFormModalProps> = ({ isOpen, onClose, initialData, onSubmitSuccess }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BlogFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData || { title: '', content: '', image: '', tags: '' },
  });

  const onSubmit = async (data: BlogFormData) => {
    let summary = '';
    try {
      const completion = await API.post('/api/openai/summarize', { text: data.content });
      summary = completion.data.summary;
    } catch {
      console.error('Summarization failed.');
      summary = 'AI summarization unavailable currently.';
    }

    try {
      if (initialData) {
        await API.put(`/api/blogs/${initialData._id}`, { ...data, summary });
      } else {
        await API.post('/api/blogs', { ...data, summary });
      }
      onSubmitSuccess();
      reset();
      onClose();
    } catch (err) {
      console.error('Failed to submit blog:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit(onSubmit)}
        className="form-container"
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{initialData ? 'Edit Blog' : 'Add Blog'}</h2>

        <input placeholder="Title" {...register('title')} />
        {errors.title && <span className="error-text">{errors.title.message}</span>}

        <textarea placeholder="Content" rows={5} {...register('content')} />
        {errors.content && <span className="error-text">{errors.content.message}</span>}

        <input placeholder="Image URL" {...register('image')} />
        {errors.image && <span className="error-text">{errors.image.message}</span>}

        <input placeholder="Tags (comma separated)" {...register('tags')} />
        {errors.tags && <span className="error-text">{errors.tags.message}</span>}

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? 'Submitting...' : initialData ? 'Update Blog' : 'Create Blog'}
        </button>
      </motion.form>
    </Modal>
  );
};

export default BlogFormModal;

