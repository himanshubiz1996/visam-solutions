import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

export default function PortfolioCard({ project, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.a
      href={`/portfolio/${project.slug}`} // CORRECT LINK
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer block" // ADD block
      data-hover
    >
      {/* Image Container */}
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

        {/* View Project Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-night/80 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="px-8 py-4 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold flex items-center gap-2"
          >
            View Project
            <ArrowRight size={20} />
          </motion.div>
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Client & Year */}
        <div className="flex items-center justify-between text-xs text-white/50 mb-3">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3 group-hover:text-neon transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Details Link */}
        <div className="flex items-center gap-2 text-sm font-bold group-hover:text-neon transition-colors">
          <span>View Details</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${project.color}15, transparent 40%)`,
        }}
      />
    </motion.a>
  );
}
