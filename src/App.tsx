import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

import Navbar from '../src/components/_layout/Navbar'
import Footer from '../src/components/_layout/Footer'
import { ThemeProvider } from './contexts/ThemeProvider'
import SingleBlog from './pages/SingleBlog';
import Certifications from './pages/Certifications';
import Testimonials from './pages/Testimonials';

import AdminDashboardBlogs from './pages/admin/AdminDashboardBlogs';
import AdminDashboardProjects from './pages/admin/AdminDashboardProjects';
import AdminDashboardCertifications from './pages/admin/AdminDashboardCertifications'
import AdminDashboard from './pages/admin/AdminDashboard';

import AdminLogin from './pages/admin/AdminLogin';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Navbar />
          <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/testimonials" element={<Testimonials />} /> 

            <Route path="/admin/blogs" element={<AdminDashboardBlogs />} />
            <Route path="/admin/projects" element={<AdminDashboardProjects />} />
            <Route path="/admin/certifications" element={<AdminDashboardCertifications />} />
              <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
              } />

    


          </Routes>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App


