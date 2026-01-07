import { motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

// Inline Logo Component
function Logo({ className = '' }) {
  return (
    <a href="/" className={`inline-block ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 group"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon via-blue to-purple flex items-center justify-center relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-br from-neon/50 to-purple/50 blur-sm"
            />
            <span className="relative z-10 text-night font-black text-xl">VS</span>
          </motion.div>
        </div>
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

export default function Footer() {
  return (
    <footer className="bg-night border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Logo className="mb-4" />
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Crafting digital experiences that transform businesses since 2017.
            </p>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.facebook.com/share/1C3Bb2AT5F/"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-neon hover:border-neon transition-all"
                data-hover
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.instagram.com/mukul.visam?igsh=MTA2MWN6aTJqNGZiYQ=="
                target="_blank"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-pink hover:border-pink transition-all"
                data-hover
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://linkedin.com/in/mukul-yadav-3a82a01b9"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-blue hover:border-blue transition-all"
                data-hover
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <div className="space-y-3">
              <a href="/about" className="block text-white/60 hover:text-neon text-sm transition-colors">
                About Us
              </a>
              <a href="/services" className="block text-white/60 hover:text-neon text-sm transition-colors">
                Services
              </a>
              <a href="/portfolio" className="block text-white/60 hover:text-neon text-sm transition-colors">
                Portfolio
              </a>
              <a href="/blog" className="block text-white/60 hover:text-neon text-sm transition-colors">
                Blog
              </a>
              <a href="/contact" className="block text-white/60 hover:text-neon text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-white">Our Services</h4>
            <div className="space-y-3">
              <a href="services/brand-identity-strategy" className="block text-white/60 hover:text-neon text-sm transition-colors">
                Brand Identity & Strategy
              </a>
              <a href="/services/product-packaging-design" className="block text-white/60 hover:text-neon text-sm transition-colors">
                Product Packaging Design
              </a>
              <a href="/services/product-photography-videography" className="block text-white/60 hover:text-neon text-sm transition-colors">
                Product Photography
              </a>
              <a href="/services/ecommerce-business-websites" className="block text-white/60 hover:text-neon text-sm transition-colors">
                E-Commerce & Business Websites
              </a>
              <a href="/services/digital-marketing-consulting" className="block text-white/60 hover:text-neon text-sm transition-colors">
                Digital Marketing Consulting
              </a>
              <a href="/services/custom-logo-design" className="block text-white/60 hover:text-neon text-sm transition-colors">
                Custom Logo Design
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4 text-white">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="mailto:mukulyadav111@gmail.com"
                className="flex items-start gap-3 text-sm text-white/60 hover:text-neon transition-colors group"
              >
                <Mail size={18} className="mt-0.5 flex-shrink-0 group-hover:text-neon" />
                <span>mukulyadav111@gmail.com</span>
              </a>
              <a
                href="tel:+917073785326"
                className="flex items-start gap-3 text-sm text-white/60 hover:text-neon transition-colors group"
              >
                <Phone size={18} className="mt-0.5 flex-shrink-0 group-hover:text-neon" />
                <span>+91 70737 85326</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>IStart Nest, Jodhpur, Rajasthan 342011</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2026 Visam Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="/privacy" className="hover:text-neon transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-neon transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
