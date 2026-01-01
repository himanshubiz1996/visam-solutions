import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../blog/blogData';

function BlogCard({ post, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.a
      href={`/blog/${post.id}`}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer block"
      data-hover
    >
      {/* Image */}
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
        {/* Meta */}
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

        {/* Read More */}
        <div className="flex items-center gap-2 text-sm font-bold group-hover:text-neon transition-colors">
          <span>Read Article</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </motion.a>
  );
}

export default function BlogPreview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section ref={ref} className="py-32 px-6 bg-night">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Insights & <span className="text-gradient">Inspiration</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Expert tips, industry trends, and success stories to help your business grow.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
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
            href="/blog"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-neon/30 transition-all"
            data-hover
          >
            <span>Read More Articles</span>
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
