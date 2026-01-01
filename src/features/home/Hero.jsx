import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-night pt-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Gradient Orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute top-32 right-20 w-96 h-96 bg-purple/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute bottom-32 left-20 w-96 h-96 bg-neon/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-8 rounded-full bg-neon/10 border border-neon/30 text-neon text-sm font-medium"
          >
            <Sparkles size={16} />
            Welcome to Visam Solutions
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
            Transform Your <br />
            <span className="text-gradient">Business Digitally</span>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Award-winning digital solutions that drive growth. From stunning design to powerful development,
            we create experiences that convert.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg shadow-lg hover:shadow-neon/50 transition-all flex items-center gap-3"
              data-hover
            >
              Start Your Project
              <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all"
              data-hover
            >
              View Our Work
            </motion.a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 text-white/60 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon rounded-full" />
              200+ Happy Clients
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon rounded-full" />
              500+ Projects Delivered
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon rounded-full" />
              7+ Years Experience
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image / Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-w-5xl mx-auto">
            {/* <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"
              alt="Hero"
              className="w-full h-auto"
            /> */}
            <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent opacity-60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
