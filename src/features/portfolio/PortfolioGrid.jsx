// src/features/portfolio/PortfolioGrid.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import PortfolioCard from './PortfolioCard';
import { usePortfolios } from '../../hooks/useDatabase';

const categories = ['All', 'E-commerce', 'Branding', 'Web Development', 'Packaging', 'Marketing', 'App Design'];

export default function PortfolioGrid() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Fetch portfolios from Supabase
  const { data: portfolioProjects, loading, error } = usePortfolios({
    orderBy: { column: 'created_at', ascending: false }
  });

  const filteredProjects = activeCategory === 'All'
    ? portfolioProjects
    : portfolioProjects.filter(project => project.category === activeCategory);

  // Loading State
  if (loading) {
    return (
      <section className="py-20 px-6 bg-night relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-20 px-6 bg-night relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <p className="text-red-400 text-lg">Error loading portfolios: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-20 px-6 bg-night relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-neon to-blue text-night shadow-lg'
                  : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
              }`}
              data-hover
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/60 text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
