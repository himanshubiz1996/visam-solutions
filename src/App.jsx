import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './features/admin/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './features/about';
import ServicesPage from './features/services';
import ServiceDetail from './features/services/ServiceDetail';
import PortfolioPage from './features/portfolio';
import PortfolioDetail from './features/portfolio/PortfolioDetail';
import BlogPage from './features/blog';
import BlogDetail from './features/blog/BlogDetail';
import ContactPage from './features/contact';

// Admin Pages
import Login from './features/admin/Login';
import CreateAdmin from './features/admin/CreateAdmin';
import Dashboard from './features/admin/Dashboard';
import PortfolioManager from './features/admin/portfolio/PortfolioManager';
import ServiceManager from './features/admin/services/ServiceManager';
import BlogManager from './features/admin/blog/BlogManager';
import ProtectedRoute from './components/ProtectedRoute';

// ✅ Isko Import Karo (Messages dekhne ke liye)
// Agar file name ya folder alag hai toh yahan path sahi kar lena bhai
import ContactManager from './features/admin/contact/ContactManager.jsx'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* ========================================
            PUBLIC ROUTES
        ======================================== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* ========================================
            ADMIN AUTH ROUTES (No Layout)
        ======================================== */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/create" element={<CreateAdmin />} />

        {/* ========================================
            PROTECTED ADMIN ROUTES
        ======================================== */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/portfolio" element={<PortfolioManager />} />
          <Route path="/admin/services" element={<ServiceManager />} />
          <Route path="/admin/blog" element={<BlogManager />} />
          
          {/* ✅ Naya Route: Messages ke liye */}
          <Route path="/admin/contacts" element={<ContactManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;