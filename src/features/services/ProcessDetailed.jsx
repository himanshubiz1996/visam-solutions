import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lightbulb, FileSearch, Pencil, Code, TestTube, Rocket, LifeBuoy } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Discovery & Planning',
    description: 'Understanding your business, goals, and competition through detailed research and strategy sessions.',
    duration: '1-2 weeks',
    color: '#00F5A0',
  },
  {
    number: '02',
    icon: FileSearch,
    title: 'Research & Strategy',
    description: 'Market research, user personas, SEO planning, and content strategy development.',
    duration: '1 week',
    color: '#0EA5E9',
  },
  {
    number: '03',
    icon: Pencil,
    title: 'Design & Prototyping',
    description: 'High-fidelity mockups, interactive prototypes, and complete design systems in Figma.',
    duration: '2-3 weeks',
    color: '#8B5CF6',
  },
  {
    number: '04',
    icon: Code,
    title: 'Development',
    description: 'Clean, scalable code with React, Shopify, or WordPress. Full API integrations.',
    duration: '4-6 weeks',
    color: '#F59E0B',
  },
  {
    number: '05',
    icon: TestTube,
    title: 'Testing & QA',
    description: 'Rigorous testing across devices, browsers, and comprehensive performance audits.',
    duration: '1 week',
    color: '#EC4899',
  },
  {
    number: '06',
    icon: Rocket,
    title: 'Launch & Deploy',
    description: 'Domain setup, SSL certificates, CDN configuration, and smooth deployment.',
    duration: '3-5 days',
    color: '#10B981',
  },
  {
    number: '07',
    icon: LifeBuoy,
    title: 'Support & Maintenance',
    description: '6 months free support including bug fixes, updates, and ongoing optimization.',
    duration: 'Ongoing',
    color: '#06B6D4',
  },
];

function StepCard({ step, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative"
    >
      {/* Connecting Line */}
      {index < steps.length - 1 && (
        <div className="hidden md:block absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-white/20 to-transparent" />
      )}

      <div className="relative flex gap-6 items-start group">
        {/* Left: Icon Circle */}
        <motion.div
          whileHover={{ scale: 1.15, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="flex-shrink-0 relative z-10"
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ 
              background: `linear-gradient(135deg, ${step.color}40, ${step.color}20)`,
              boxShadow: `0 0 30px ${step.color}50`,
              border: `3px solid ${step.color}`
            }}
          >
            <step.icon size={28} style={{ color: step.color }} />
          </div>
        </motion.div>

        {/* Right: Content Card */}
        <motion.div
          whileHover={{ x: 10 }}
          className="flex-1 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all"
          data-hover
        >
          {/* Number Badge */}
          <div 
            className="inline-block px-3 py-1 rounded-lg text-xs font-black mb-3"
            style={{ 
              backgroundColor: `${step.color}20`,
              color: step.color 
            }}
          >
            STEP {step.number}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-2 group-hover:text-neon transition-colors">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            {step.description}
          </p>

          {/* Duration */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: step.color }} />
            <span className="text-xs font-medium text-white/50">
              Duration: {step.duration}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProcessDetailed() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-night via-night/95 to-night relative overflow-hidden">
      {/* Section Separator Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-neon to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-neon/10 border border-neon/30 text-neon text-xs font-medium mb-6">
            → Our 7-Step Process
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black leading-tight">
            From Idea to
            <br />
            <span className="text-gradient">Launch & Beyond</span>
          </h2>
          
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            A proven methodology refined over 7 years and 500+ projects. 
            Transparent, collaborative, and results-driven.
          </p>
        </motion.div>

        {/* Steps List */}
        <div className="space-y-6 mt-16">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Timeline Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-neon/10 to-blue/10 border border-neon/30 text-center"
        >
          <div className="text-5xl font-black text-gradient mb-2">8-12 Weeks</div>
          <div className="text-white/60 text-sm">Average Project Timeline</div>
          
          {/* Mini Timeline Bar */}
          <div className="mt-6 relative h-2 bg-white/10 rounded-full overflow-hidden max-w-md mx-auto">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ duration: 2, delay: 1 }}
              className="h-full bg-gradient-to-r from-neon via-blue to-pink rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
