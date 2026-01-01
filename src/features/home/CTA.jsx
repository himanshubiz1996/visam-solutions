import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react';

export default function CTA() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const benefits = [
    {
      icon: Zap,
      text: 'Free consultation & strategy session',
      color: '#F59E0B',
    },
    {
      icon: Shield,
      text: 'No hidden costs or surprise fees',
      color: '#10B981',
    },
    {
      icon: Rocket,
      text: 'Fast turnaround & dedicated support',
      color: '#0EA5E9',
    },
  ];

  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden bg-night">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Gradient Orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-neon/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="p-12 md:p-16 rounded-3xl bg-gradient-to-br from-neon/10 via-blue/5 to-purple/10 border border-white/10 backdrop-blur-sm overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-neon/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                Ready to Transform <br />
                <span className="text-gradient">Your Business?</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Let's discuss your project and create something amazing together. 
                Our team is excited to hear about your vision.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            >
              {/* Primary CTA */}
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,245,160,0.5)' }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 group"
                data-hover
              >
                Start Your Project Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="/portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 border-2 border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all flex items-center gap-3"
                data-hover
              >
                View Our Portfolio
                <ArrowRight size={20} />
              </motion.a>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10"
            >
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${benefit.color}30, ${benefit.color}10)`,
                    }}
                  >
                    <benefit.icon size={24} style={{ color: benefit.color }} />
                  </motion.div>
                  <span className="text-white/80 font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-white/60 text-sm mb-6">
            Trusted by leading brands across the globe
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { count: '200+', label: 'Happy Clients' },
              { count: '500+', label: 'Projects Completed' },
              { count: '7+', label: 'Years Experience' },
              { count: '95%', label: 'Client Satisfaction' },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-black text-gradient">{badge.count}</div>
                <div className="text-white/60 text-sm">{badge.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Alternative Contact Option */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center p-8 rounded-3xl bg-white/5 border border-white/10"
        >
          <p className="text-white/80 mb-4">
            Prefer to discuss over the phone?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="tel:+917073785326"
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-neon flex items-center gap-2"
              data-hover
            >
              +91 70737 85326
            </motion.a>
            <span className="text-white/40 hidden sm:block">•</span>
            <motion.a
              href="mailto:mukulyadav111@gmail.com"
              whileHover={{ scale: 1.05 }}
              className="text-lg font-bold text-blue flex items-center gap-2"
              data-hover
            >
              mukulyadav111@gmail.com
            </motion.a>
          </div>
          <p className="text-white/50 text-sm mt-4">
            Available Mon-Sat, 10 AM - 7 PM IST
          </p>
        </motion.div>
      </div>
    </section>
  );
}
