import axios from 'axios';
import type { Blog, ProjectFormData, Certification, CertificationFormData } from '../types/types'; //



const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


export const fetchBlogs = () => API.get<Blog[]>('/api/blogs');

export const createBlog = (data: Partial<Blog>) =>
  API.post<Blog>('/api/blogs', data);

export const updateBlog = (id: string, data: Partial<Blog>) =>
  API.put<Blog>(`/api/blogs/${id}`, data);

export const deleteBlog = (id: string) =>
  API.delete<{ message: string }>(`/api/blogs/${id}`);

// Projects
export const fetchProjects = () => API.get('/api/projects');
export const createProject = (data: ProjectFormData) => API.post('/api/projects', data);
export const updateProject = (id: string, data: ProjectFormData) => API.put(`/api/projects/${id}`, data);
// export const createProject = (data: Project) => API.post('/api/projects', data);
// export const updateProject = (id: string, data: Project) => API.put(`/api/projects/${id}`, data);
export const deleteProject = (id: string) => API.delete(`/api/projects/${id}`);

// Certifications
export const fetchCertifications = () => API.get<Certification[]>('/api/certifications');
export const deleteCertification = (id: string) => API.delete<{ message: string }>(`/api/certifications/${id}`);
export const createCertification = (data: CertificationFormData) => API.post<Certification>('/api/certifications', data);



export default API;
