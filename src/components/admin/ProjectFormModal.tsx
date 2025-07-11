import React, { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createProject, updateProject } from '../../api/api';
import type { ProjectFormModalProps, ProjectFormData } from '../../types/types';
import Modal from '../ui/Modal';
import '../../styles/ProjectsFormModal.css';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  image: yup
    .string()
    .url('Must be a valid URL')
    .required('Image URL is required'),
  github: yup
    .string()
    .url('Must be a valid URL')
    .required('GitHub URL is required'),
  live: yup
    .string()
    .url('Must be a valid URL')
    .required('Live URL is required'),
}).required();

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmitSuccess,
}) => {
  const [imageSource, setImageSource] = useState<'url' | 'file'>('url');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData ?? {
      title: '',
      description: '',
      image: '',
      github: '',
      live: '',
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setValue('image', reader.result as string, { shouldValidate: true });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
    try {
      if (initialData && initialData._id) {
        await updateProject(initialData._id, data);
      } else {
        await createProject(data);
      }
      onSubmitSuccess();
      reset();
      onClose();
    } catch (err) {
      console.error('Error submitting project:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {initialData ? 'Edit Project' : 'Add Project'}
        </h2>

        <input placeholder="Title" {...register('title')} />
        {errors.title && <span className="error-text">{errors.title.message}</span>}

        <textarea placeholder="Description" {...register('description')} />
        {errors.description && <span className="error-text">{errors.description.message}</span>}

        <div className="image-input-toggle">
          <button
            type="button"
            onClick={() => setImageSource(imageSource === 'url' ? 'file' : 'url')}
            style={{ marginBottom: '0.5rem', marginRight: '0.5rem' }}
          >
            {imageSource === 'url' ? 'Switch to Upload from Device' : 'Switch to Image URL'}
          </button>

          {imageSource === 'url' ? (
            <>
              <input placeholder="Image URL" {...register('image')} />
              {errors.image && <span className="error-text">{errors.image.message}</span>}
            </>
          ) : (
            <>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {errors.image && <span className="error-text">{errors.image.message}</span>}
            </>
          )}
        </div>

        <input placeholder="GitHub URL" {...register('github')} />
        {errors.github && <span className="error-text">{errors.github.message}</span>}

        <input placeholder="Live URL" {...register('live')} />
        {errors.live && <span className="error-text">{errors.live.message}</span>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : initialData ? 'Update Project' : 'Create Project'}
        </button>
      </form>
    </Modal>
  );
};

export default ProjectFormModal;

