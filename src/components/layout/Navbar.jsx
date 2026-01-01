import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// Inline Logo Component (No separate import needed)
function Logo({ className = '' }) {
  return (
    <a href="/" className={`inline-block ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 group"
      >
        {/* Icon - VS Monogram */}
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon via-blue to-purple flex items-center justify-center relative overflow-hidden"
          >
            {/* Animated background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-br from-neon/50 to-purple/50 blur-sm"
            />
            
            {/* VS Text */}
            <span className="relative z-10 text-night font-black text-xl">VS</span>
          </motion.div>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span className="text-xl font-black leading-none">
            <span className="text-gradient">VISAM</span>
          </span>
          <span className="text-[10px] font-medium text-white/50 leading-none mt-0.5 tracking-wider">
            SOLUTIONS
          </span>
        </div>
      </motion.div>
    </a>
  );
}

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-night/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors relative group ${
                  location.pathname === link.path ? 'text-neon' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-neon to-blue"
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-sm shadow-lg hover:shadow-neon/50 transition-all"
            data-hover
          >
            Get Started
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white z-[110]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-sm font-medium ${
                  location.pathname === link.path ? 'text-neon' : 'text-white/70'
                }`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
