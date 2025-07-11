// src/api/auth.ts

import API from './api';

export const loginAdmin = (data: { email: string; password: string }) => 
  API.post('/api/admin/login', data);
