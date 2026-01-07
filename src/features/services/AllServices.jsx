import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Palette, Package, TrendingUp, Share2, MessageSquare, Lightbulb,
  Code2, ShoppingCart, Globe, PrinterIcon, ArrowRight
} from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Brand Identity & Logo Design',
    description: 'Premium logo systems, brand guidelines, and complete visual identity that makes your brand unforgettable.',
    features: ['Custom Logo Design', 'Brand Guidelines', 'Business Cards', 'Letterheads', 'Social Media Kits'],
    color: '#00F5A0',
    price: 'From ₹15,000',
    slug: 'brand-identity',
  },
  {
    icon: Package,
    title: 'Premium Packaging Design',
    description: 'Eye-catching packaging that stands out on shelves and drives sales. From concept to print-ready files.',
    features: ['3D Mockups', 'Die-line Design', 'Label Design', 'Box Packaging', 'Pouch Design'],
    color: '#FF008C',
    price: 'From ₹20,000',
    slug: 'packaging-design',
  },
  {
    icon: TrendingUp,
    title: 'Product Branding & Positioning',
    description: 'Strategic brand positioning that captures market share and builds lasting customer relationships.',
    features: ['Market Research', 'Competitor Analysis', 'Brand Strategy', 'Positioning Map', 'Messaging Framework'],
    color: '#8B5CF6',
    price: 'From ₹25,000',
    slug: 'brand-identity',
  },
  {
    icon: Share2,
    title: 'Social Media Branding',
    description: 'Instagram-worthy content, post designs, and complete social media visual strategies.',
    features: ['Instagram Posts', 'Story Templates', 'Carousel Designs', 'Reels Graphics', 'Content Calendar'],
    color: '#EC4899',
    price: 'From ₹10,000/month',
    slug: 'digital-marketing',
  },
  {
    icon: Lightbulb,
    title: 'Business & Startup Consulting',
    description: 'Expert guidance for startups and businesses on branding, marketing, and growth strategies.',
    features: ['Business Strategy', 'Brand Workshops', 'Marketing Roadmap', 'Growth Consulting', 'Pitch Decks'],
    color: '#F59E0B',
    price: 'From ₹5,000/session',
    slug: 'business-consulting',
  },
  {
    icon: Code2,
    title: 'Custom Website Development',
    description: 'Lightning-fast websites built with React, WordPress, or PHP. Fully responsive and SEO-optimized.',
    features: ['React/Next.js', 'WordPress', 'PHP Custom', 'CMS Integration', 'API Development'],
    color: '#0EA5E9',
    price: 'From ₹30,000',
    slug: 'web-development',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Solutions',
    description: 'High-converting Shopify and WooCommerce stores with payment gateway and inventory management.',
    features: ['Shopify Stores', 'WooCommerce', 'Payment Gateway', 'Product Management', 'Order Tracking'],
    color: '#10B981',
    price: 'From ₹40,000',
    slug: 'ecommerce',
  },
  {
    icon: Globe,
    title: 'Web Design & UI/UX',
    description: 'Beautiful, user-friendly websites designed in Figma. Mobile-first approach for maximum conversions.',
    features: ['Figma Design', 'Prototyping', 'Mobile Responsive', 'User Testing', 'A/B Testing'],
    color: '#06B6D4',
    price: 'From ₹20,000',
    slug: 'web-development',
  },
  {
    icon: PrinterIcon,
    title: 'Printing Solutions',
    description: 'Complete printing services from business cards to large-format banners. Premium quality guaranteed.',
    features: ['Business Cards', 'Brochures', 'Flyers', 'Banners', 'Product Labels'],
    color: '#9333EA',
    price: 'From ₹500',
    slug: 'packaging-design',
  },
  {
    icon: MessageSquare,
    title: 'Advertising & Marketing',
    description: 'Digital and print advertising campaigns that drive results. Google Ads, Facebook Ads, and more.',
    features: ['Google Ads', 'Facebook Ads', 'Instagram Ads', 'Content Marketing', 'Campaign Management'],
    color: '#EF4444',
    price: 'From ₹15,000/month',
    slug: 'digital-marketing',
  },
];

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative"
      data-hover
    >
      {/* ✅ REMOVE <a> TAG - Just DIV */}
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all h-full">
        {/* Glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${service.color}15, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="mb-6"
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                boxShadow: `0 0 30px ${service.color}30`
              }}
            >
              <service.icon size={28} style={{ color: service.color }} />
            </div>
          </motion.div>

          {/* Title & Description */}
          <h3 className="text-2xl font-bold mb-3 group-hover:text-neon transition-colors">
            {service.title}
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-white/50 text-sm">
                <div 
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: service.color }}
                />
                {feature}
              </li>
            ))}
          </ul>

          {/* Price & Button */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xl font-bold" style={{ color: service.color }}>
              {service.price}
            </span>
            {/* <motion.div
              whileHover={{ scale: 1.05, x: 5 }}
              className="text-sm text-white/70 group-hover:text-neon flex items-center gap-1 transition-colors"
            >
              View Details
              <ArrowRight size={16} />
            </motion.div> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AllServices() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-32 px-6 bg-night relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Complete <span className="text-gradient">Creative Solutions</span>
          </h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
            From branding to web development, we're your one-stop creative agency. 
            <span className="text-neon font-semibold"> 7 years of excellence</span> in making brands stand out.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={`${service.slug}-${index}`} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-white/60 mb-6">
            Not sure which service you need? Let's talk!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-neon/30 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              data-hover
            >
              <ArrowRight size={20} />
              Schedule Free Consultation
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/mukul-yadav-3a82a01b9"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              data-hover
            >
              Connect on LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
