import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Map() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 px-6 bg-night">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="rounded-3xl overflow-hidden border border-white/10"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.6084847677647!2d73.02495647544985!3d26.303080676984767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418dad59c1afdf%3A0x4bdfdb3f67c9f551!2sIStart%20Nest!5e0!3m2!1sen!2sin!4v1735695000000!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale brightness-90 hover:grayscale-0 transition-all duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
}
