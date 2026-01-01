import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Eye, Heart } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To empower businesses with cutting-edge web solutions that drive growth, enhance user experience, and deliver measurable results.',
    color: '#00F5A0',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To be the most trusted web development partner for ambitious brands across India, recognized for innovation and excellence.',
    color: '#0EA5E9',
  },
  {
    icon: Heart,
    title: 'Core Values',
    description: 'Quality over quantity. Client success is our success. Transparent communication. Continuous learning. Delivering on promises.',
    color: '#FF008C',
  },
];

export default function Mission() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-32 px-6 bg-night relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Why We <span className="text-gradient">Exist</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            More than just code. We're on a mission to transform businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all text-center"
              data-hover
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block mb-6"
              >
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ 
                    background: `linear-gradient(135deg, ${value.color}20, ${value.color}10)`,
                    boxShadow: `0 0 40px ${value.color}30`
                  }}
                >
                  <value.icon size={36} style={{ color: value.color }} />
                </div>
              </motion.div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-neon transition-colors">
                {value.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
