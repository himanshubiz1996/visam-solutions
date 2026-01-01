import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Twitter, Github } from 'lucide-react';

const team = [
  {
    id: 1,
    name: 'Your Name',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Full-stack developer with 8+ years experience. Passionate about React & performance.',
    social: {
      linkedin: 'https://linkedin.com/in/yourname',
      twitter: 'https://twitter.com/yourname',
      github: 'https://github.com/yourname',
    },
  },
  {
    id: 2,
    name: 'Team Member 2',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'React & Node.js expert. Building scalable web applications since 2016.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    id: 3,
    name: 'Team Member 3',
    role: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Creating beautiful interfaces that users love. Figma & Framer enthusiast.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    id: 4,
    name: 'Team Member 4',
    role: 'Shopify Expert',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80',
    bio: 'E-commerce specialist. Built 100+ Shopify stores with proven conversion rates.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    id: 5,
    name: 'Team Member 5',
    role: 'WordPress Developer',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    bio: 'WordPress & WooCommerce expert. Custom plugins and theme development.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
  {
    id: 6,
    name: 'Team Member 6',
    role: 'Digital Marketer',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
    bio: 'SEO & performance marketing specialist. Data-driven growth strategies.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    },
  },
];

function TeamCard({ member, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative"
      data-hover
    >
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-neon/50 transition-all overflow-hidden">
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(0,245,160,0.15), transparent 70%)',
          }}
        />

        {/* Image */}
        <div className="relative mb-6">
          <motion.img
            src={member.image}
            alt={member.name}
            className="w-32 h-32 rounded-2xl object-cover mx-auto border-4 border-white/10 group-hover:border-neon/50 transition-all"
            whileHover={{ scale: 1.05, rotate: 3 }}
          />
          
          {/* Status Dot */}
          <div className="absolute bottom-2 right-1/2 translate-x-14 w-4 h-4 bg-neon rounded-full border-2 border-night animate-pulse" />
        </div>

        {/* Info */}
        <div className="text-center relative z-10">
          <h3 className="text-2xl font-bold mb-1 group-hover:text-neon transition-colors">
            {member.name}
          </h3>
          <p className="text-neon text-sm font-medium mb-3">{member.role}</p>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            {member.bio}
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-3">
            <motion.a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-neon/20 transition-colors"
            >
              <Linkedin size={18} className="text-white/70 group-hover:text-neon" />
            </motion.a>
            <motion.a
              href={member.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue/20 transition-colors"
            >
              <Twitter size={18} className="text-white/70 group-hover:text-blue" />
            </motion.a>
            <motion.a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Github size={18} className="text-white/70 group-hover:text-white" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
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
            Meet The <span className="text-gradient">Team</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Talented developers, designers, and marketers working together to build amazing digital experiences
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
