import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from './blogData';

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(p => p.id === parseInt(slug));

  if (!post) {
    return (
      <div className="min-h-screen bg-night flex items-center justify-center px-6 pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Post Not Found</h1>
          <p className="text-white/60 mb-8">The blog post you're looking for doesn't exist.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold"
          >
            Back to Blog
          </motion.button>
        </div>
      </div>
    );
  }

  // Related posts (same category)
  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-night">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${post.color}30` }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-white/70 hover:text-neon mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Blog</span>
          </motion.button>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-black mb-6"
            style={{
              backgroundColor: `${post.color}20`,
              color: post.color,
              border: `1px solid ${post.color}50`,
            }}
          >
            {post.category}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black leading-tight mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 text-white/60 mb-8"
          >
            <div className="flex items-center gap-2">
              <User size={18} style={{ color: post.color }} />
              <span className="text-sm">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} style={{ color: post.color }} />
              <span className="text-sm">{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} style={{ color: post.color }} />
              <span className="text-sm">{post.readTime}</span>
            </div>
          </motion.div>

          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 pb-8 border-b border-white/10"
          >
            <span className="text-white/60 text-sm flex items-center gap-2">
              <Share2 size={18} />
              Share:
            </span>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-blue hover:border-blue transition-all"
              data-hover
            >
              <Facebook size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-blue hover:border-blue transition-all"
              data-hover
            >
              <Twitter size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-blue hover:border-blue transition-all"
              data-hover
            >
              <Linkedin size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto"
            />
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: `linear-gradient(135deg, ${post.color}00, ${post.color}80)`,
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Introduction */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <p className="text-xl text-white/80 leading-relaxed mb-6">
              {post.excerpt}
            </p>

            <h2 className="text-3xl font-black mt-12 mb-6" style={{ color: post.color }}>
              Introduction
            </h2>
            <p className="text-white/70 leading-relaxed">
              In today's rapidly evolving digital landscape, staying ahead of the curve is essential for success. 
              This comprehensive guide explores the latest trends, best practices, and actionable strategies that 
              can help you achieve your goals. Whether you're a beginner or an experienced professional, you'll 
              find valuable insights to elevate your skills and drive meaningful results.
            </p>

            <h2 className="text-3xl font-black mt-12 mb-6" style={{ color: post.color }}>
              Key Takeaways
            </h2>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span style={{ color: post.color }}>▸</span>
                <span>Understanding the fundamentals is crucial for long-term success</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: post.color }}>▸</span>
                <span>Implementing best practices can significantly improve outcomes</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: post.color }}>▸</span>
                <span>Continuous learning and adaptation are essential in this field</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: post.color }}>▸</span>
                <span>Measuring results and iterating based on data is key</span>
              </li>
            </ul>

            <h2 className="text-3xl font-black mt-12 mb-6" style={{ color: post.color }}>
              Why This Matters
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              The digital ecosystem is constantly evolving, and what worked yesterday might not work tomorrow. 
              By staying informed about the latest developments and implementing proven strategies, you can 
              maintain a competitive edge and achieve sustainable growth.
            </p>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 my-12">
              <p className="text-xl italic text-white/90 leading-relaxed">
                "Success in the digital age requires a combination of creativity, technical expertise, 
                and strategic thinking. Those who master these elements will thrive in the years to come."
              </p>
              <p className="text-white/50 mt-4">— Industry Expert</p>
            </div>

            <h2 className="text-3xl font-black mt-12 mb-6" style={{ color: post.color }}>
              Step-by-Step Guide
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Let's break down the process into actionable steps that you can implement immediately:
            </p>

            <div className="space-y-6 mb-12">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black"
                    style={{
                      background: `linear-gradient(135deg, ${post.color}40, ${post.color}20)`,
                      color: post.color,
                    }}
                  >
                    {step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Step {step}: Getting Started</h3>
                    <p className="text-white/60 leading-relaxed">
                      Begin by assessing your current situation and identifying areas for improvement. 
                      This foundational step will guide your strategy moving forward.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-black mt-12 mb-6" style={{ color: post.color }}>
              Common Mistakes to Avoid
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Even experienced professionals make these mistakes. Here's what to watch out for:
            </p>
            <ul className="space-y-3 text-white/70 mb-12">
              <li className="flex items-start gap-3">
                <span className="text-red-500">✗</span>
                <span>Rushing implementation without proper planning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500">✗</span>
                <span>Ignoring data and analytics in decision-making</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500">✗</span>
                <span>Not allocating sufficient resources for success</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500">✗</span>
                <span>Failing to adapt to changing market conditions</span>
              </li>
            </ul>

            <h2 className="text-3xl font-black mt-12 mb-6" style={{ color: post.color }}>
              Conclusion
            </h2>
            <p className="text-white/70 leading-relaxed">
              Mastering these concepts takes time and dedication, but the results are well worth the effort. 
              By following the strategies outlined in this guide and avoiding common pitfalls, you'll be 
              well-positioned to achieve your goals and stay ahead of the competition. Remember, success 
              is a journey, not a destination—keep learning, adapting, and growing.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-8 border-t border-white/10">
            <span className="text-white/60 text-sm">Tags:</span>
            {['Tutorial', 'Best Practices', 'Guide', '2026 Trends'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Author Section */}
      <section className="py-12 px-6 bg-gradient-to-b from-night to-night/95">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10"
          >
            <div className="flex gap-6 items-start">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl font-black"
                style={{
                  background: `linear-gradient(135deg, ${post.color}40, ${post.color}20)`,
                  color: post.color,
                }}
              >
                VS
              </div>
              <div>
                <h3 className="text-2xl font-black mb-2">Visam Solutions Team</h3>
                <p className="text-white/60 leading-relaxed mb-4">
                  We're a team of passionate designers, developers, and marketers dedicated to 
                  helping businesses grow through innovative digital solutions. With over 7 years 
                  of experience, we've helped 200+ clients achieve their goals.
                </p>
                <div className="flex gap-3">
                  <motion.a
                    href="https://facebook.com"
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    className="text-white/60 hover:text-neon transition-colors"
                  >
                    <Facebook size={20} />
                  </motion.a>
                  <motion.a
                    href="https://twitter.com"
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    className="text-white/60 hover:text-neon transition-colors"
                  >
                    <Twitter size={20} />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    target="_blank"
                    whileHover={{ scale: 1.1 }}
                    className="text-white/60 hover:text-neon transition-colors"
                  >
                    <Linkedin size={20} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 px-6 bg-night">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Related <span className="text-gradient">Articles</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, i) => (
                <motion.a
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all block"
                  data-hover
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-black mb-3"
                      style={{
                        backgroundColor: `${relatedPost.color}20`,
                        color: relatedPost.color,
                      }}
                    >
                      {relatedPost.category}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-neon transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-white/60 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-night to-night/95">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-12 rounded-3xl bg-gradient-to-br from-neon/10 via-blue/5 to-purple/10 border border-white/10"
          >
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              Never Miss an <span className="text-gradient">Update</span>
            </h3>
            <p className="text-white/60 mb-8 text-lg">
              Subscribe to our newsletter for weekly insights, tips, and industry news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold whitespace-nowrap"
                data-hover
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
