// src/features/home/Portfolio.jsx (or wherever this file is)
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { usePortfolios } from '../../hooks/useDatabase';

const categories = ['All', 'Web Development', 'E-commerce', 'Branding', 'Web Design'];

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
      data-hover
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ y: -15, scale: 1.02 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Hover Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <a
            href={`/portfolio/${project.slug}`}
            className="px-6 py-3 bg-neon text-night rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <ExternalLink size={18} />
            View Project
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span 
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{ 
              backgroundColor: `${project.color}20`,
              color: project.color 
            }}
          >
            {project.category}
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-2 group-hover:text-neon transition-colors">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack (Tags) */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i}
                className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch portfolios from Supabase
  const { data: projects, loading, error } = usePortfolios({
    orderBy: { column: 'created_at', ascending: false }
  });

  // Filter by category
  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section ref={ref} className="py-32 px-6 bg-night relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Real projects that delivered measurable results for our clients
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-neon text-night shadow-lg shadow-neon/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
              data-hover
            >
              {category}
            </motion.button>
          ))}
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
            <p className="text-red-400">Error loading projects: {error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        )}

        {/* No Projects */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No projects found in this category.</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <motion.a
            href="/portfolio"
            className="inline-block px-10 py-5 bg-gradient-to-r from-pink to-neon text-white rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-pink/30 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            data-hover
          >
            View All Projects →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
