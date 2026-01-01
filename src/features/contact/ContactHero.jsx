import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-night pt-32 pb-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Gradient Orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute top-20 right-20 w-96 h-96 bg-neon/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-8 rounded-full bg-neon/10 border border-neon/30 text-neon text-sm font-medium"
          >
            <MessageSquare size={16} />
            Get In Touch
          </motion.div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
            Let's Build
            <br />
            <span className="text-gradient">Something Great</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Have a project in mind? We'd love to hear about it.
            <br />
            Fill out the form and we'll respond within 24 hours.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
