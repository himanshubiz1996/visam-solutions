// src/features/home/PortfolioPreview.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';
import { usePortfolios } from '../../hooks/useDatabase';

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.a
      href={`/portfolio/${project.slug}`}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer block"
      data-hover
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        
        {/* Category Badge */}
        <div
          className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-black backdrop-blur-xl"
          style={{
            backgroundColor: `${project.color}30`,
            color: project.color,
            border: `1px solid ${project.color}50`,
          }}
        >
          {project.category}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-neon transition-colors">
          {project.title}
        </h3>
        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center gap-2 text-sm font-bold group-hover:text-neon transition-colors">
          <span>View Project</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </motion.a>
  );
}

export default function PortfolioPreview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Fetch portfolios from Supabase (limit to 3 for homepage)
  const { data: portfolioProjects, loading, error } = usePortfolios({
    orderBy: { column: 'created_at', ascending: false }
  });

  // Get first 3 featured projects
  const featuredProjects = portfolioProjects.slice(0, 3);

  return (
    <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-night to-night/95">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Our Best <span className="text-gradient">Work</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Real projects, real results. From startups to enterprises, we've helped businesses transform digitally.
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
            <p className="text-red-400">Error loading projects: {error}</p>
          </div>
        )}

        {/* Portfolio Grid */}
        {!loading && !error && featuredProjects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {/* View More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <motion.a
                href="/portfolio"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-neon/30 transition-all"
                data-hover
              >
                <span>View All Projects</span>
                <ArrowRight size={20} />
              </motion.a>
            </motion.div>
          </>
        )}

        {/* No Projects State */}
        {!loading && !error && featuredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg">No projects available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
