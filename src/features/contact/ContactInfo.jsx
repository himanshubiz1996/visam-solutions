import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const contactDetails = [
  {
    icon: MapPin,
    title: 'Our Office',
    info: '726G+25W IStart Nest, Vikramaditya Nagar',
    subInfo: 'Surya Colony, Jodhpur, Rajasthan 342011',
    color: '#00F5A0',
    link: 'https://maps.app.goo.gl/your-google-maps-link',
  },
  {
    icon: Mail,
    title: 'Email Us',
    info: 'mukulyadav111@gmail.com',
    subInfo: 'We reply within 24 hours',
    color: '#0EA5E9',
    link: 'mailto:mukulyadav111@gmail.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    info: '+91 70737 85326',
    subInfo: 'Mon-Sat: 10 AM - 7 PM',
    color: '#8B5CF6',
    link: 'tel:+917073785326',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    info: 'Monday - Saturday',
    subInfo: '10:00 AM - 7:00 PM IST',
    color: '#F59E0B',
  },
];

function InfoCard({ detail, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const CardContent = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-center h-full"
      data-hover
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{
          background: `linear-gradient(135deg, ${detail.color}40, ${detail.color}20)`,
        }}
      >
        <detail.icon size={28} style={{ color: detail.color }} />
      </motion.div>

      <h3 className="text-lg font-bold mb-2">{detail.title}</h3>
      <p className="text-white/80 text-sm font-medium mb-1">{detail.info}</p>
      <p className="text-white/50 text-xs">{detail.subInfo}</p>
    </motion.div>
  );

  return detail.link ? (
    <a href={detail.link} target="_blank" rel="noopener noreferrer" className="block">
      {CardContent}
    </a>
  ) : (
    CardContent
  );
}

export default function ContactInfo() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 px-6 bg-night">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-gradient">Get In Touch</span>
          </h2>
          <p className="text-white/60 text-lg">
            Multiple ways to reach us. We're here to help!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((detail, index) => (
            <InfoCard key={detail.title} detail={detail} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
