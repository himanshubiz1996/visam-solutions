import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Clock, Shield, Users, Zap, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Award-Winning Quality',
    description: 'Awwwards-level design and development standards',
    color: '#00F5A0',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: '98% projects delivered before deadline',
    color: '#0EA5E9',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'SSL, data encryption, and GDPR compliance',
    color: '#8B5CF6',
  },
  {
    icon: Users,
    title: '250+ Happy Clients',
    description: 'Trusted by startups to enterprises',
    color: '#F59E0B',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Lighthouse 100/100 performance guarantee',
    color: '#EC4899',
  },
  {
    icon: HeartHandshake,
    title: 'Lifetime Support',
    description: 'Free maintenance for 6 months post-launch',
    color: '#10B981',
  },
];

export default function WhyChooseUs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-night via-night/95 to-night relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-neon/5 via-transparent to-blue/5" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Why Choose <span className="text-gradient">VISAM</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We don't just build websites. We build long-term partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
              data-hover
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-6"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${reason.color}20, ${reason.color}10)`,
                    boxShadow: `0 0 30px ${reason.color}30`
                  }}
                >
                  <reason.icon size={28} style={{ color: reason.color }} />
                </div>
              </motion.div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-neon transition-colors">
                {reason.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
