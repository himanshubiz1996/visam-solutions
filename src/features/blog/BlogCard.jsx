import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogCard({ post, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.a
      href={`/blog/${post.id}`} // CHANGE THIS - use post.id
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer block" // ADD block
      data-hover
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        
        {/* Category Badge */}
        <div
          className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-black backdrop-blur-xl"
          style={{
            backgroundColor: `${post.color}30`,
            color: post.color,
            border: `1px solid ${post.color}50`,
          }}
        >
          {post.category}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-neon transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Author & Read More */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50">
            By {post.author}
          </span>
          
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-sm font-bold group-hover:text-neon transition-colors"
            style={{ color: post.color }}
          >
            Read More
            <ArrowRight size={16} />
          </motion.div>
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${post.color}15, transparent 40%)`,
        }}
      />
    </motion.a>
  );
}
