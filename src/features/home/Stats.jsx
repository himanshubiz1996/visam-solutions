import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

const stats = [
  { count: 250, label: 'Happy Clients', suffix: '+' },
  { count: 500, label: 'Projects Completed', suffix: '+' },
  { count: 15, label: 'Team Members', suffix: '' },
  { count: 98, label: 'Client Satisfaction', suffix: '%' },
];

function CountUp({ end, suffix }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span className="text-6xl md:text-7xl font-black text-gradient">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-night via-night/95 to-night relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Trusted by <span className="text-gradient">Brands</span>
          </h2>
          <p className="text-white/60 text-lg">Real numbers, real impact</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-neon/50 transition-all group"
              data-hover
            >
              {inView && <CountUp end={stat.count} suffix={stat.suffix} />}
              <p className="text-white/70 mt-4 text-sm group-hover:text-neon transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
