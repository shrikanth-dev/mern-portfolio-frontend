import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createCertification } from '../../api/api';
import Modal from '../ui/Modal';
import type { Props, CertificationFormData } from '../../types/types';
import '../../styles/CertificationFormModal.css';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  issuer: yup.string().required('Issuer is required'),
  date: yup.string().required('Date is required'),
  link: yup.string().url('Must be a valid URL').nullable(),
  image: yup.string().url('Must be a valid URL').nullable(),
}).required();

const CertificationFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialData,
  onSubmitSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CertificationFormData>({
  resolver: yupResolver(schema as yup.ObjectSchema<CertificationFormData>),
    defaultValues: initialData
      ? {
          title: initialData.title,
          issuer: initialData.issuer,
          date: initialData.date.slice(0, 10), // for input type="date"
          link: initialData.link ?? null,
          image: initialData.image ?? null,
        }
      : {
          title: '',
          issuer: '',
          date: '',
          link: null,
          image: null,
        },
  });

  const onSubmit: SubmitHandler<CertificationFormData> = async (data) => {
    try {
      await createCertification(data);
      onSubmitSuccess();
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating certification:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {initialData ? 'Edit Certification' : 'Add Certification'}
        </h2>

        <input placeholder="Title" {...register('title')} />
        {errors.title && <span className="error-text">{errors.title.message}</span>}

        <input placeholder="Issuer" {...register('issuer')} />
        {errors.issuer && <span className="error-text">{errors.issuer.message}</span>}

        <input type="date" {...register('date')} />
        {errors.date && <span className="error-text">{errors.date.message}</span>}

        <input placeholder="Certificate Link (optional)" {...register('link')} />
        {errors.link && <span className="error-text">{errors.link.message}</span>}

        <input placeholder="Image URL (optional)" {...register('image')} />
        {errors.image && <span className="error-text">{errors.image.message}</span>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : initialData ? 'Update Certification' : 'Create Certification'}
        </button>
      </form>
    </Modal>
  );
};

export default CertificationFormModal;
