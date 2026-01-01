import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Award, Zap } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const features = [
    {
      icon: CheckCircle,
      title: 'Expert Team',
      desc: 'Experienced designers & developers with 7+ years track record',
      color: '#00F5A0',
    },
    {
      icon: Award,
      title: 'Award Winning',
      desc: 'Recognized for excellence in design and digital innovation',
      color: '#0EA5E9',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      desc: 'Quick turnarounds without compromising on quality',
      color: '#8B5CF6',
    },
  ];

  return (
    <section ref={ref} className="py-20 px-6 bg-gradient-to-b from-night to-night/95">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                alt="About Us"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Why Choose <span className="text-gradient">Us?</span>
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              At Visam Solutions, we don't just build websites and design logos. We create digital 
              experiences that solve real business problems and drive measurable results. Our approach 
              combines creativity with strategy to deliver solutions that work.
            </p>

            <div className="space-y-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <feature.icon size={24} style={{ color: feature.color }} className="flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/60">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/about"
              whileHover={{ x: 10 }}
              className="inline-block mt-8 text-neon font-bold flex items-center gap-2"
              data-hover
            >
              Learn More About Us →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
