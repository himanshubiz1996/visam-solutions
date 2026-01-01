import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MouseFollower from './components/MouseFollower';
import HomePage from './pages/HomePage';
import AboutPage from './features/about';
import ServicesPage from './features/services';
import ServiceDetail from './features/services/ServiceDetail';
import PortfolioPage from './features/portfolio';
import PortfolioDetail from './features/portfolio/PortfolioDetail';
import BlogPage from './features/blog';
import BlogDetail from './features/blog/BlogDetail';
import ContactPage from './features/contact';

function App() {
  return (
    <Router>
      <MouseFollower />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
