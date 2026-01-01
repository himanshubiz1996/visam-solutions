import { motion } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';

export default function PortfolioHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-night pt-32 pb-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Gradient Orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute top-20 right-20 w-96 h-96 bg-purple/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-neon/20 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 px-6 py-2 mb-8 rounded-full bg-purple/10 border border-purple/30 text-purple text-sm font-medium"
          >
            <Briefcase size={16} />
            Our Portfolio
          </motion.div>

          {/* Headline */}
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
            Our Best
            <br />
            <span className="text-gradient">Work</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Real projects, real results. From startups to enterprises,
            <br />
            we've helped businesses transform digitally.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-12 mt-12"
          >
            <div className="text-center">
              <div className="text-5xl font-black text-gradient mb-2">500+</div>
              <div className="text-white/60 text-sm">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-gradient mb-2">200+</div>
              <div className="text-white/60 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-gradient mb-2">7+</div>
              <div className="text-white/60 text-sm">Years Experience</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
