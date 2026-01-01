// src/features/blog/BlogGrid.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import BlogCard from './BlogCard';
import { useBlogs } from '../../hooks/useDatabase';

const categories = ['All', 'Design', 'Development', 'Branding', 'Marketing', 'Technology', 'E-commerce'];

export default function BlogGrid() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');

  // Fetch blogs from Supabase
  const { data: blogPosts, loading, error } = useBlogs({
    orderBy: { column: 'created_at', ascending: false }
  });

  // Filter by category
  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

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
            <p className="text-red-400 text-lg">Error loading blogs: {error}</p>
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/60 text-lg">
              No articles found in this category.
            </p>
          </motion.div>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-white/20 text-white rounded-full font-bold hover:bg-white/5 hover:border-neon transition-all"
              data-hover
            >
              Load More Articles
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
