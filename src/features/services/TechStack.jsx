import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const techStack = {
  Frontend: [
    { name: 'React 18', logo: '⚛️', color: '#61DAFB' },
    { name: 'Vite', logo: '⚡', color: '#646CFF' },
    { name: 'TypeScript', logo: 'TS', color: '#3178C6' },
    { name: 'Tailwind CSS', logo: '🎨', color: '#06B6D4' },
    { name: 'Framer Motion', logo: '🎬', color: '#FF0055' },
  ],
  Backend: [
    { name: 'Node.js', logo: '🟢', color: '#339933' },
    { name: 'Supabase', logo: '🔋', color: '#3ECF8E' },
    { name: 'Firebase', logo: '🔥', color: '#FFCA28' },
    { name: 'PostgreSQL', logo: '🐘', color: '#4169E1' },
  ],
  'E-commerce': [
    { name: 'Shopify', logo: '🛍️', color: '#7AB55C' },
    { name: 'WooCommerce', logo: '🛒', color: '#96588A' },
    { name: 'Stripe', logo: '💳', color: '#635BFF' },
  ],
  CMS: [
    { name: 'WordPress', logo: 'W', color: '#21759B' },
    { name: 'Contentful', logo: '📝', color: '#2478CC' },
    { name: 'Sanity', logo: '🖊️', color: '#F03E2F' },
  ],
  DevOps: [
    { name: 'Vercel', logo: '▲', color: '#000000' },
    { name: 'Netlify', logo: '◆', color: '#00C7B7' },
    { name: 'GitHub Actions', logo: '🤖', color: '#2088FF' },
    { name: 'Cloudflare', logo: '☁️', color: '#F38020' },
  ],
};

export default function TechStack() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-night via-night/95 to-night relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Latest technologies for modern, scalable solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(techStack).map(([category, techs], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6 text-neon">{category}</h3>
              <div className="space-y-4">
                {techs.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                    whileHover={{ x: 10, scale: 1.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                    data-hover
                  >
                    <span className="text-2xl">{tech.logo}</span>
                    <span className="text-white/80">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
