import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    icon: Sparkles,
    price: '₹30,000',
    description: 'Perfect for small businesses and startups',
    color: '#0EA5E9',
    features: [
      '5-page responsive website',
      'Basic SEO optimization',
      'Mobile-friendly design',
      'Contact form integration',
      '1 month support',
      'Social media links',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    icon: Zap,
    price: '₹75,000',
    description: 'Ideal for growing businesses',
    color: '#00F5A0',
    features: [
      'Up to 15 pages',
      'Advanced SEO & Analytics',
      'Custom animations',
      'Blog/CMS integration',
      'E-commerce (up to 50 products)',
      '3 months support',
      'Email marketing setup',
      'Payment gateway integration',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: 'Custom',
    description: 'Complete digital transformation',
    color: '#8B5CF6',
    features: [
      'Unlimited pages',
      'Custom web application',
      'Advanced integrations (CRM, ERP)',
      'Multi-language support',
      'Advanced security features',
      '6 months support',
      'Dedicated account manager',
      'Priority support 24/7',
    ],
    popular: false,
  },
];

function PricingCard({ plan, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-3xl backdrop-blur-xl transition-all ${
        plan.popular
          ? 'bg-gradient-to-b from-white/10 to-white/5 border-2 shadow-2xl scale-105'
          : 'bg-white/5 border border-white/10'
      }`}
      style={{
        borderColor: plan.popular ? plan.color : undefined,
        boxShadow: plan.popular ? `0 0 60px ${plan.color}40` : undefined,
      }}
      data-hover
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-xs font-black"
          style={{
            backgroundColor: plan.color,
            color: '#0A0E27',
          }}
        >
          ⚡ MOST POPULAR
        </div>
      )}

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{
          background: `linear-gradient(135deg, ${plan.color}40, ${plan.color}20)`,
        }}
      >
        <plan.icon size={32} style={{ color: plan.color }} />
      </motion.div>

      {/* Plan Name */}
      <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
      <p className="text-white/60 text-sm mb-6">{plan.description}</p>

      {/* Price */}
      <div className="mb-8">
        <div className="text-5xl font-black mb-2" style={{ color: plan.color }}>
          {plan.price}
        </div>
        {plan.price !== 'Custom' && (
          <div className="text-white/50 text-sm">One-time payment</div>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15 + i * 0.05 }}
            className="flex items-start gap-3 text-sm"
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ backgroundColor: `${plan.color}30` }}
            >
              <Check size={12} style={{ color: plan.color }} />
            </div>
            <span className="text-white/80">{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className={`w-full py-4 rounded-xl font-bold transition-all ${
          plan.popular
            ? 'text-night shadow-lg'
            : 'border-2 text-white hover:bg-white/5'
        }`}
        style={{
          background: plan.popular
            ? `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`
            : 'transparent',
          borderColor: plan.popular ? 'transparent' : `${plan.color}80`,
        }}
        data-hover
      >
        {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
      </motion.button>
    </motion.div>
  );
}

export default function Pricing() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="py-32 px-6 bg-gradient-to-b from-night via-night/95 to-night relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,245,160,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(139,92,246,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-neon/10 border border-neon/30 text-neon text-xs font-medium mb-6">
            → Transparent Pricing
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Choose Your
            <br />
            <span className="text-gradient">Perfect Plan</span>
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            No hidden fees. No surprises. Just honest pricing for quality work.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Small CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-20 p-12 rounded-3xl bg-gradient-to-br from-neon/10 via-blue/5 to-purple/10 border border-white/10"
        >
          {/* Heading */}
          <h3 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Start Your{' '}
            <span className="text-gradient">Project?</span>
          </h3>

          {/* Subtitle */}
          <p className="text-white/60 mb-8 text-lg max-w-2xl mx-auto">
            Let's discuss your requirements and create something amazing together.
            Get a free quote within 24 hours.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg hover:shadow-xl transition-all"
              style={{ boxShadow: '0 0 40px rgba(0,245,160,0.3)' }}
              data-hover
            >
              Get Free Quote
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 hover:border-white/40 transition-all"
              data-hover
            >
              Schedule a Call
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-neon" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-neon" />
              <span>No Hidden Charges</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-neon" />
              <span>24-Hour Response</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
