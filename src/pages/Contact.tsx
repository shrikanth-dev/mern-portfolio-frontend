import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import '../styles/Contact.css'; 
import type { FormData } from '../types/types';


const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required(),
});

const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, data);
      alert('Message sent successfully! You will receive a summarized response soon.');
      reset();
    } catch (error) {
      console.error(error);
      alert('Error sending message. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="contact-card"
    >
      <h2 className="contact-title">Contact Me</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <input placeholder="Name" {...register('name')} />
        {errors.name && <span className="error-text">Name is required</span>}

        <input placeholder="Email" {...register('email')} />
        {errors.email && <span className="error-text">Valid email is required</span>}

        <textarea placeholder="Message" rows={5} {...register('message')} />
        {errors.message && <span className="error-text">Message is required</span>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </motion.div>
  );
};

export default Contact;


