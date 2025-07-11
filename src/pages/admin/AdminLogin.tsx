import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginAdmin } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import '../../styles/AdminLogin.css';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const AdminLogin: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await loginAdmin(data);
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="admin-login-form">
      <h2>Admin Login</h2>
      <input placeholder="Email" {...register('email')} />
      {errors.email && <span className="error-text">{errors.email.message}</span>}

      <div className="password-input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          {...register('password')}
        />
        <span
          className="toggle-password-visibility"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            // Eye Off SVG
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="eye-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M9.878 9.879a3 3 0 004.242 4.242M15 12a3 3 0 00-3-3M9.879 9.879L15 15m0 0l1.121 1.121M15 15L9.879 9.879" />
            </svg>
          ) : (
            // Eye SVG
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="eye-icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.927 3.056-3.642 5.447-6.959 6.362M2.458 12H2.5m0 0c1.274 4.057 5.065 7 9.542 7s8.268-2.943 9.542-7" />
            </svg>
          )}
        </span>
      </div>
      {errors.password && <span className="error-text">{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default AdminLogin;

