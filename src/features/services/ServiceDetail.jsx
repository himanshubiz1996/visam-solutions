// src/features/services/ServiceDetail.jsx
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useServiceBySlug } from '../../hooks/useDatabase';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Fetch service from Supabase by slug
  const { data: service, loading, error } = useServiceBySlug(slug);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center px-6 pt-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon mx-auto mb-4"></div>
          <p className="text-white/60">Loading service...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center px-6 pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4 text-red-400">Error Loading Service</h1>
          <p className="text-white/60 mb-8">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/services')}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold"
          >
            Back to Services
          </motion.button>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!service) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center px-6 pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Service Not Found</h1>
          <p className="text-white/60 mb-8">The service doesn't exist.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/services')}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold"
          >
            Back to Services
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-night">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${service.color}30` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 text-white/70 hover:text-neon mb-12 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Services</span>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm font-black mb-6"
                style={{
                  backgroundColor: `${service.color}20`,
                  color: service.color,
                  border: `1px solid ${service.color}50`,
                }}
              >
                Service
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-[0.9] mb-6">
                {service.title}
              </h1>

              <p className="text-xl text-white/70 leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Pricing & Duration */}
              {(service.pricing || service.duration) && (
                <div className="flex flex-wrap gap-6 mb-8">
                  {service.pricing && (
                    <div>
                      <span className="text-white/40 text-sm block mb-1">Starting From</span>
                      <span className="text-2xl font-black" style={{ color: service.color }}>
                        {service.pricing}
                      </span>
                    </div>
                  )}
                  {service.duration && (
                    <div>
                      <span className="text-white/40 text-sm block mb-1">Duration</span>
                      <span className="text-2xl font-black text-white">
                        {service.duration}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                className="inline-block px-10 py-4 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg"
                data-hover
              >
                Get Free Quote
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={service.hero || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'}
                  alt={service.title}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <section className="py-20 px-6 bg-gradient-to-b from-night to-night/95">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">
              What's <span className="text-gradient">Included</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <CheckCircle size={20} style={{ color: service.color }} className="flex-shrink-0 mt-1" />
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Steps (Optional) */}
      {service.process_steps && service.process_steps.length > 0 && (
        <section className="py-20 px-6 bg-night">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">
              Our <span className="text-gradient">Process</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process_steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}40, ${service.color}20)`,
                      color: service.color,
                    }}
                  >
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deliverables (Optional) */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="py-20 px-6 bg-gradient-to-b from-night to-night/95">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-12">
              What You'll <span className="text-gradient">Receive</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.deliverables.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <CheckCircle size={20} style={{ color: service.color }} className="flex-shrink-0" />
                  <span className="text-white/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-6 bg-night">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black mb-6">
              Ready to Get <span className="text-gradient">Started?</span>
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Let's discuss your project and create something amazing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                className="px-10 py-4 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg"
                data-hover
              >
                Get Free Quote
              </motion.a>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.05 }}
                className="px-10 py-4 border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all"
                data-hover
              >
                View All Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
