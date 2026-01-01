import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Linkedin } from 'lucide-react';

export default function FounderMessage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-night via-night/95 to-night relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-neon/10 to-blue/10 backdrop-blur-sm border border-neon/30"
        >
          {/* Quote Icon */}
          <div className="absolute -top-6 -left-6 w-20 h-20 bg-neon/20 rounded-2xl flex items-center justify-center">
            <Quote size={40} className="text-neon" />
          </div>

          {/* Message */}
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              A Message from Our <span className="text-gradient">Founder</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6">
              "When I founded VISAM Solutions in 2017, my vision was simple: help businesses 
              in Rajasthan and across India build brands that truly stand out. Not just with 
              beautiful designs, but with strategic thinking that drives real growth."
            </p>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6">
              "Over the past 7 years, we've had the privilege of working with 250+ clients—from 
              local startups to national brands. Every project taught us something new, and 
              every client became part of our VISAM family."
            </p>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6">
              "Whether you need a logo, a complete brand identity, packaging design, or a 
              high-converting website, we approach every project with the same commitment: 
              delivering excellence that exceeds expectations."
            </p>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              "We're not just a creative agency—we're your growth partners. Let's build 
              something remarkable together."
            </p>
          </div>

          {/* Founder Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8 border-t border-white/20"
          >
            {/* Photo */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                alt="Mukul Yadav"
                className="w-24 h-24 rounded-full object-cover border-4 border-neon/50 shadow-lg shadow-neon/20"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neon rounded-full border-4 border-night flex items-center justify-center">
                <span className="text-night text-xs font-bold">7+</span>
              </div>
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold text-white mb-1">Mukul Yadav</h4>
              <p className="text-white/60 mb-3">Founder & CEO, Visam Solutions</p>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="text-xs text-white/50 bg-white/10 px-3 py-1 rounded-full">
                  ⭐ 7 Years Experience
                </span>
                <span className="text-xs text-white/50 bg-white/10 px-3 py-1 rounded-full">
                  📍 Jodhpur, Rajasthan
                </span>
              </div>
            </div>

            {/* LinkedIn Button */}
            <motion.a
              href="https://www.linkedin.com/in/mukul-yadav-3a82a01b9"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#0A66C2] text-white rounded-full font-semibold text-sm flex items-center gap-2 hover:shadow-lg hover:shadow-[#0A66C2]/30 transition-all"
              data-hover
            >
              <Linkedin size={18} />
              Connect on LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
