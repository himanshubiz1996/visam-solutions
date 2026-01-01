import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lightbulb, Pencil, Code, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Lightbulb,
    title: 'Discovery',
    description: 'Understanding your business, goals, target audience, and competition',
    color: '#00F5A0',
  },
  {
    number: '02',
    icon: Pencil,
    title: 'Design',
    description: 'Creating wireframes, mockups, and prototypes in Figma',
    color: '#0EA5E9',
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description: 'Building with React, Shopify, WordPress using best practices',
    color: '#8B5CF6',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Support',
    description: 'Deployment, testing, training, and ongoing maintenance',
    color: '#FF008C',
  },
];

export default function Process() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-32 px-6 bg-night relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Our <span className="text-gradient">Process</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A proven 4-step methodology that delivers results every time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
              data-hover
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
              )}

              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all h-full">
                {/* Step Number */}
                <div 
                  className="text-6xl font-black mb-6 opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ color: step.color }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-6"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                      boxShadow: `0 0 30px ${step.color}30`
                    }}
                  >
                    <step.icon size={28} style={{ color: step.color }} />
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-neon transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
