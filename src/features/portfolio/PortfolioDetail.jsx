// src/features/portfolio/PortfolioDetail.jsx
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, CheckCircle, Calendar, User } from 'lucide-react';
import { usePortfolioBySlug } from '../../hooks/useDatabase';

export default function PortfolioDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Fetch project from Supabase by slug
  const { data: project, loading, error } = usePortfolioBySlug(slug);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center px-6 pt-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-neon mx-auto mb-4"></div>
          <p className="text-white/60">Loading project...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center px-6 pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4 text-red-400">Error Loading Project</h1>
          <p className="text-white/60 mb-8">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/portfolio')}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold"
          >
            Back to Portfolio
          </motion.button>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!project) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center px-6 pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Project Not Found</h1>
          <p className="text-white/60 mb-8">The project you're looking for doesn't exist.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/portfolio')}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold"
          >
            Back to Portfolio
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-night">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-6">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Gradient Orb */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${project.color}30` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-2 text-white/70 hover:text-neon mb-12 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Portfolio</span>
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Category Badge */}
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm font-black mb-6"
                style={{
                  backgroundColor: `${project.color}20`,
                  color: project.color,
                  border: `1px solid ${project.color}50`,
                }}
              >
                {project.category}
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-black leading-[0.9] mb-6">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 mb-8">
                {project.client && (
                  <div className="flex items-center gap-2 text-white/60">
                    <User size={20} style={{ color: project.color }} />
                    <span className="text-sm">
                      <span className="text-white/40">Client:</span> {project.client}
                    </span>
                  </div>
                )}
                {project.year && (
                  <div className="flex items-center gap-2 text-white/60">
                    <Calendar size={20} style={{ color: project.color }} />
                    <span className="text-sm">
                      <span className="text-white/40">Year:</span> {project.year}
                    </span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Button */}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold shadow-lg hover:shadow-neon/50 transition-all"
                  data-hover
                >
                  <ExternalLink size={20} />
                  Visit Live Project
                </motion.a>
              )}
            </motion.div>

            {/* Right: Featured Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={project.thumbnail || (project.images && project.images[0]) || 'https://via.placeholder.com/800x600'}
                  alt={project.title}
                  className="w-full h-auto"
                />
                {/* Gradient Overlay */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}00, ${project.color}80)`,
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution Section */}
      {(project.challenge || project.solution) && (
        <section className="py-20 px-6 bg-gradient-to-b from-night to-night/95">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Challenge */}
              {project.challenge && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10"
                >
                  <h2 className="text-3xl font-black mb-4">
                    <span style={{ color: project.color }}>The Challenge</span>
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    {project.challenge}
                  </p>
                </motion.div>
              )}

              {/* Solution */}
              {project.solution && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10"
                >
                  <h2 className="text-3xl font-black mb-4">
                    <span style={{ color: project.color }}>The Solution</span>
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    {project.solution}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {project.results && (
        <section className="py-20 px-6 bg-night">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Results & <span className="text-gradient">Impact</span>
              </h2>
            </motion.div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <p className="text-white/80 leading-relaxed whitespace-pre-line">
                {project.results}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-20 px-6 bg-gradient-to-b from-night to-night/95">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Project <span className="text-gradient">Gallery</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video cursor-pointer"
                  data-hover
                >
                  <img
                    src={image}
                    alt={`${project.title} - Image ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      {project.testimonial_text && (
        <section className="py-20 px-6 bg-night">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-center"
            >
              <div className="text-6xl mb-6" style={{ color: project.color }}>❝</div>
              <p className="text-2xl md:text-3xl font-bold text-white/90 leading-relaxed mb-6">
                {project.testimonial_text}
              </p>
              {project.testimonial_author && (
                <p className="text-white/60 font-medium">
                  — {project.testimonial_author}
                </p>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-night to-night/95">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Start Your <span className="text-gradient">Project?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Let's create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg shadow-lg hover:shadow-neon/50 transition-all"
                data-hover
              >
                Get Free Quote
              </motion.a>
              <motion.a
                href="/portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all"
                data-hover
              >
                View More Projects
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
