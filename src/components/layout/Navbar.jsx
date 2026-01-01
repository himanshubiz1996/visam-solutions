import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 bg-night/80 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="/"
          className="text-2xl font-bold font-display tracking-tight"
          whileHover={{ scale: 1.05 }}
          data-hover
        >
          VISAM<span className="text-neon">•</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {['About', 'Services', 'Portfolio', 'Blog', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm text-white/70 hover:text-neon transition-colors"
              whileHover={{ y: -2 }}
              data-hover
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.button
          className="px-6 py-3 bg-neon text-night rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-neon/50 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-hover
        >
          Let's Talk
        </motion.button>
      </div>
    </motion.nav>
  );
}
