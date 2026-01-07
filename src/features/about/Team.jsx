import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const teamMembers = [
  {
    name: 'Dheeraj Rankawat',
    role: 'Production',
    bio: 'Creative visionary with expertise in video production, cinematography, and post-production workflows. Brings technical excellence and artistic direction to every project.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80',
    color: '#00F5A0',
  },
  {
    name: 'Rakesh Parihar',
    role: 'Strategist',
    bio: 'Strategic thinker and business consultant with years of experience in brand strategy, market positioning, and growth planning. Guides our clients towards measurable success.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80',
    color: '#0EA5E9',
  },
  {
    name: 'Vinit Lakhara',
    role: 'Post Production',
    bio: 'Post-production specialist with mastery in color grading, video editing, and motion graphics. Transforms raw footage into polished, captivating content that resonates with audiences.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&q=80',
    color: '#8B5CF6',
  },
];


function TeamMemberCard({ member, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all h-full">
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${member.color}15, transparent 70%)`,
          }}
        />

        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02]">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Role Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="mb-3"
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: `${member.color}20`,
                color: member.color,
                border: `1px solid ${member.color}40`,
              }}
            >
              {member.role}
            </span>
          </motion.div>

          {/* Name */}
          <h3 className="text-2xl font-black mb-2 group-hover:text-neon transition-colors">
            {member.name}
          </h3>

          {/* Bio */}
          <p className="text-white/60 text-sm leading-relaxed">
            {member.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="bg-night min-h-screen pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Meet Our <span className="text-gradient">Creative Team</span>
          </h1>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
            Talented professionals dedicated to bringing your vision to life. 
            <span className="text-neon font-semibold"> Every project gets our best work.</span>
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              index={index}
            />
          ))}
        </div>

        {/* Join Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 text-center"
        >
          <h2 className="text-3xl font-black mb-4">
            Join Our <span className="text-gradient">Team</span>
          </h2>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about creative excellence. 
            If you're interested in joining Visam Solutions, we'd love to hear from you!
          </p>
          <motion.a
            href="mailto:careers@visamsolulions.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold hover:shadow-2xl hover:shadow-neon/30 transition-all cursor-pointer"
          >
            Send Us Your Resume
          </motion.a>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-20"
        >
          <p className="text-white/60 mb-6">
            Ready to work with our amazing team?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-neon to-blue text-night rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-neon/30 transition-all cursor-pointer inline-flex items-center justify-center"
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-all cursor-pointer inline-flex items-center justify-center"
            >
              See Our Work
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
