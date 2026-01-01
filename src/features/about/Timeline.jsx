import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const milestones = [
  { year: '2018', title: 'Founded', description: 'Started in Jodhpur with 2 team members' },
  { year: '2020', title: '100 Projects', description: 'Crossed 100+ successful project deliveries' },
  { year: '2022', title: 'Team Expansion', description: 'Grew to 15 talented developers and designers' },
  { year: '2024', title: '250+ Clients', description: 'Trusted by brands across India' },
  { year: '2026', title: 'Awwwards Recognition', description: 'Portfolio featured on Awwwards' },
];

export default function Timeline() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-night via-night/95 to-night relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6">
            Our <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-white/60 text-lg">
            Key milestones that shaped VISAM Solutions
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon via-blue to-pink hidden md:block" />

          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="inline-block p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-neon/50 transition-all"
                  data-hover
                >
                  <div className="text-4xl font-black text-neon mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-white/60">{milestone.description}</p>
                </motion.div>
              </div>

              {/* Timeline Dot */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-neon rounded-full border-4 border-night shadow-lg shadow-neon/50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
