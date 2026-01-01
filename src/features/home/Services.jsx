// src/features/home/Services.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as Icons from 'lucide-react';
import { useServices } from '../../hooks/useDatabase';

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Get icon component dynamically
  const IconComponent = Icons[service.icon] || Icons.Code2;

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
            <IconComponent size={32} style={{ color: service.color }} />
          </div>
        </motion.div>

        <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-neon transition-colors">
          {service.title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed">
          {service.description}
        </p>

        {/* Hover Arrow with Link */}
        <motion.a
          href={`/services/${service.slug}`}
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="mt-auto pt-6 flex items-center gap-2 text-sm font-medium"
          style={{ color: service.color }}
        >
          Learn more →
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Fetch services from Supabase (limit to 6 for homepage)
  const { data: allServices, loading, error } = useServices({
    orderBy: { column: 'created_at', ascending: false }
  });

  // Get first 6 services for homepage
  const services = allServices.slice(0, 6);

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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400">Error loading services: {error}</p>
          </div>
        )}

        {/* Services Grid */}
        {!loading && !error && services.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-20"
            >
              <motion.a
                href="/services"
                className="inline-block px-10 py-5 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-neon/30 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                data-hover
              >
                Explore All Services →
              </motion.a>
            </motion.div>
          </>
        )}

        {/* No Services State */}
        {!loading && !error && services.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No services available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
