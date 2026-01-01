import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, ShoppingCart, Blocks, Database, Palette, Rocket } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Custom React Apps',
    description: 'Lightning-fast web applications with modern React, Vite & TypeScript. Progressive Web Apps with offline support and blazing performance.',
    color: '#00F5A0',
  },
  {
    icon: ShoppingCart,
    title: 'Shopify Stores',
    description: 'High-converting e-commerce experiences with custom themes, apps, and seamless checkout flows.',
    color: '#0EA5E9',
  },
  {
    icon: Blocks,
    title: 'WordPress CMS',
    description: 'Optimized content management systems with custom plugins, headless architecture, and SEO excellence.',
    color: '#FF008C',
  },
  {
    icon: Database,
    title: 'Backend & APIs',
    description: 'Scalable Supabase, Firebase & Node.js solutions with real-time data sync and secure authentication.',
    color: '#8B5CF6',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Beautiful interfaces that convert visitors into customers. Figma to production-ready components.',
    color: '#F59E0B',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Lighthouse 100/100 guaranteed. Core Web Vitals optimization, lazy loading, and CDN integration.',
    color: '#10B981',
  },
];

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
      whileHover={{ 
        y: -10, 
        rotateX: 5,
        transition: { duration: 0.3 } 
      }}
      className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all overflow-hidden min-h-[320px]"
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      data-hover
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${service.color}15, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="mb-6"
        >
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
              boxShadow: `0 0 30px ${service.color}30`
            }}
          >
            <service.icon size={32} style={{ color: service.color }} />
          </div>
        </motion.div>

        <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-neon transition-colors">
          {service.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Hover Arrow */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="mt-auto pt-6 flex items-center gap-2 text-sm font-medium"
          style={{ color: service.color }}
        >
          Learn more →
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-32 px-6 bg-night relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            What We
            <br />
            <span className="text-gradient">Create</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl">
            Full-stack development services powered by the latest technologies
          </p>
        </motion.div>

        {/* Equal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <motion.button
            className="px-10 py-5 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-neon/30 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            Explore All Services →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
