import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/visam-solutions', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/visam-solutions', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/visamtech', label: 'Twitter' },
  ];

  return (
    <footer className="bg-night border-t border-white/10 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold mb-4"
            >
              VISAM<span className="text-neon">•</span>
            </motion.div>
            <p className="text-white/60 mb-6 max-w-md">
              Full-stack web development studio based in Jodhpur, Rajasthan. 
              Crafting digital experiences that convert.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon/20 transition-colors"
                  data-hover
                >
                  <social.icon size={18} className="text-white/70 hover:text-neon" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['About', 'Services', 'Portfolio', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`/${link.toLowerCase()}`}
                    className="text-white/60 hover:text-neon transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/60">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-neon" />
                <span>Jodhpur, Rajasthan, India</span>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <Phone size={18} className="flex-shrink-0 text-neon" />
                <a href="tel:+919876543210" className="hover:text-neon transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60">
                <Mail size={18} className="flex-shrink-0 text-neon" />
                <a href="mailto:hello@visam.solutions" className="hover:text-neon transition-colors">
                  hello@visam.solutions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm">
          <p>© 2026 VISAM Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-neon transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-neon transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
