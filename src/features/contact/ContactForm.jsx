import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, User, Mail, Phone, MessageSquare, CheckCircle, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// 🎊 Confetti Component
function Confetti() {
  const confettiColors = ['#00F5A0', '#0EA5E9', '#8B5CF6', '#F59E0B', '#EC4899'];
  const confettiCount = 50;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {[...Array(confettiCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            left: `${Math.random() * 100}%`,
            top: '-5%',
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 100,
            opacity: 0,
            rotate: Math.random() * 720 - 360,
            x: Math.random() * 200 - 100,
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}

// 🎉 Success Modal Component
function SuccessModal({ show, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[95] p-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-md w-full p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500/30 to-green-500/10 flex items-center justify-center"
              >
                <CheckCircle size={48} className="text-green-400" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <h2 className="text-3xl font-black mb-3">
                  Message <span className="text-gradient">Sent!</span> 🎉
                </h2>
                <p className="text-white/70 text-lg mb-2">
                  Thank you for reaching out!
                </p>
                <p className="text-white/50 text-sm mb-6">
                  We've received your message and will get back to you within 24 hours.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold"
                  >
                    Awesome! ✨
                  </motion.button>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 border border-white/20 rounded-xl font-bold hover:bg-white/5 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// 🎯 Main Contact Page
export default function ContactPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const { error: submitError } = await supabase
      .from('contacts')
      .insert([formData]);

    setLoading(false);

    if (submitError) {
      setError('Failed to send message. Please try again.');
      console.error(submitError);
      return;
    }

    // 🎊 Trigger confetti and success modal
    setShowConfetti(true);
    setTimeout(() => {
      setSuccess(true);
      setShowConfetti(false);
    }, 500);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  const handleCloseModal = () => {
    setSuccess(false);
  };

  const services = [
    'Web Development',
    'Brand Identity',
    'E-commerce Solutions',
    'Digital Marketing',
    'UI/UX Design',
    'Mobile App Development',
    'Other',
  ];

  return (
    <div className="bg-night min-h-screen">
      {/* 🎊 Confetti Animation */}
      {showConfetti && <Confetti />}

      {/* 🎉 Success Modal */}
      <SuccessModal show={success} onClose={handleCloseModal} />

      {/* Hero Section */}
      <section ref={ref} className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Glow Effect */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              Ready to start your project? Send us a message and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2 text-sm font-medium">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Service Interested In *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-night">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service} className="bg-night">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all resize-none"
                    placeholder="Tell us about your project, timeline, and budget..."
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                  >
                    <span className="text-2xl">⚠️</span>
                    <p className="text-red-400 text-sm font-medium">{error}</p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-neon/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  data-hover
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-night border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Bottom Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-white/40 text-sm">
              By submitting this form, you agree to our{' '}
              <a href="/privacy" className="text-neon hover:underline">
                Privacy Policy
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-night to-night/95">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Why Choose <span className="text-gradient">Us?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Fast Response</h3>
                <p className="text-white/60 text-sm">
                  We reply to all inquiries within 24 hours
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-xl font-bold mb-2">Quality Work</h3>
                <p className="text-white/60 text-sm">
                  Premium quality delivered on time, every time
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
                <p className="text-white/60 text-sm">
                  Ongoing support even after project completion
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
