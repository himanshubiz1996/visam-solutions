import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`inline-block ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-3 group"
      >
        {/* Icon - VS Monogram */}
        <div className="relative">
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon via-blue to-purple flex items-center justify-center relative overflow-hidden"
          >
            {/* Animated background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-br from-neon/50 to-purple/50 blur-sm"
            />
            
            {/* VS Text */}
            <span className="relative z-10 text-night font-black text-xl">VS</span>
          </motion.div>
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span className="text-xl font-black leading-none">
            <span className="text-gradient">VISAM</span>
          </span>
          <span className="text-[10px] font-medium text-white/50 leading-none mt-0.5 tracking-wider">
            SOLUTIONS
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
