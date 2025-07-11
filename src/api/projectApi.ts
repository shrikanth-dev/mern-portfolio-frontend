import API from './api';  
import type { Project } from '../types/types'

// Fetch all projects from your backend
export const fetchProjects = () => API.get('/api/projects');

// Create a new project in your backend
export const createProject = (projectData: Project) => API.post('/api/projects', projectData);
