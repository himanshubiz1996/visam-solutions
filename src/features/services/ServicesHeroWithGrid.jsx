import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Palette, Code2, ShoppingCart, TrendingUp, Package, MessageSquare, ArrowRight 
} from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Brand Identity',
    desc: 'Custom logos and complete brand identity that makes you stand out',
    features: ['Logo Design', 'Brand Guidelines', 'Color Palette'],
    slug: 'brand-identity',
    color: '#00F5A0',
  },
  {
    icon: Code2,
    title: 'Web Development',
    desc: 'Fast, responsive, and SEO-optimized websites built with latest tech',
    features: ['React.js', 'Responsive Design', 'SEO Ready'],
    slug: 'web-development',
    color: '#0EA5E9',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    desc: 'Convert visitors into customers with optimized online stores',
    features: ['Shopify Setup', 'Payment Gateway', 'Inventory'],
    slug: 'ecommerce',
    color: '#10B981',
  },
  {
    icon: Package,
    title: 'Packaging Design',
    desc: 'Eye-catching packaging that sells on retail shelves',
    features: ['Print Ready', '3D Mockups', 'Material Advice'],
    slug: 'packaging-design',
    color: '#F59E0B',
  },
  {
    icon: MessageSquare,
    title: 'Digital Marketing',
    desc: 'Data-driven strategies to grow your business online',
    features: ['Social Media', 'Google Ads', 'Analytics'],
    slug: 'digital-marketing',
    color: '#EC4899',
  },
  {
    icon: TrendingUp,
    title: 'Business Consulting',
    desc: 'Expert guidance for digital transformation and growth',
    features: ['Strategy', 'Analysis', 'Implementation'],
    slug: 'business-consulting',
    color: '#8B5CF6',
  },
];

function ServiceCard({ service, i }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.a
      href={`/services/${service.slug}`}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08 }}
      whileHover={{ y: -15, scale: 1.02 }}
      className="relative group p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden block cursor-pointer"
      data-hover
    >
      {/* Hover Gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 5 }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${service.color}40, ${service.color}20)`,
          }}
        >
          <service.icon size={32} style={{ color: service.color }} />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3 group-hover:text-neon transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/60 mb-6 leading-relaxed">
          {service.desc}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.features.map((feature, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className="flex items-center gap-2 font-bold transition-colors group-hover:text-neon"
          style={{ color: service.color }}
        >
          Learn More
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight size={18} />
          </motion.div>
        </div>
      </div>

      {/* Border Gradient on Hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          border: `2px solid ${service.color}`,
          boxShadow: `inset 0 0 30px ${service.color}30`,
        }}
      />
    </motion.a>
  );
}

export default function ServicesHeroWithGrid() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 px-6 bg-night relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Complete digital solutions for every stage of your business growth
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} i={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center pt-12 border-t border-white/10"
        >
          <p className="text-white/60 mb-6 text-lg">
            Need a custom solution? Let's discuss your project.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold shadow-lg hover:shadow-neon/50 transition-all"
            data-hover
          >
            Get Free Consultation
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
  