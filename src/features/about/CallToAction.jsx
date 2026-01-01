import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Calendar } from 'lucide-react';

export default function CallToAction() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-night to-night relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center p-12 md:p-20 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8">
            Ready to Build
            <br />
            <span className="text-gradient">Something Amazing?</span>
          </h2>
          
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-12">
            Let's turn your vision into reality. Schedule a free consultation 
            and discover how we can help grow your business.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-neon/30 transition-all"
              data-hover
            >
              Start Your Project
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-white/20 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
              data-hover
            >
              <Calendar size={20} />
              Book a Call
            </motion.button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-12 border-t border-white/10 flex flex-wrap justify-center gap-8 text-white/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon rounded-full" />
              <span>250+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue rounded-full" />
              <span>98% Satisfaction Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink rounded-full" />
              <span>On-Time Delivery</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
