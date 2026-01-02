import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, User, Mail, Phone, MessageSquare, CheckCircle, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// 🎊 Confetti Component
function Confetti() {
  const confettiColors = ['#00F5A0', '#0EA5E9', '#8B5CF6', '#F59E0B', '#EC4899'];
  return (
    <div className="fixed inset-0 pointer-events-none z-[1000]">
      {[...Array(80)].map((_, i) => (
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
            y: window.innerHeight + 200,
            opacity: 0,
            rotate: 720,
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: Math.random() * 2 + 3, // Long duration for more fun
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[900] cursor-pointer"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[950] p-6 pointer-events-none">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative max-w-sm w-full p-8 rounded-3xl bg-[#121212] border border-white/10 shadow-2xl pointer-events-auto"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer z-50 border border-white/5"
              >
                <X size={20} className="text-white" />
              </button>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-400" />
                </div>
                <h2 className="text-3xl font-black mb-3 text-white">
                  Message <span className="text-green-400">Sent!</span> 🎉
                </h2>
                <p className="text-white/70 text-lg">
                  Thank you! We'll get back to you soon.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ContactPage() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: submitError } = await supabase.from('contacts').insert([formData]);
    setLoading(false);

    if (submitError) {
      setError('Failed to send message. Please try again.');
      return;
    }

    setShowConfetti(true);
    setSuccess(true);
    setTimeout(() => setShowConfetti(false), 5000); 
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  // 🔥 CSS fix for autofill background and text color
  const inputClass = `
    w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl 
    text-white placeholder:text-white/30 focus:border-neon focus:outline-none 
    transition-all cursor-text
    [&-webkit-autofill]:shadow-[0_0_0_1000px_#121212_inset] 
    [&-webkit-autofill]:[-webkit-text-fill-color:white]
  `;

  return (
    <div className="bg-night min-h-screen pt-10">
      {showConfetti && <Confetti />}
      <SuccessModal show={success} onClose={() => setSuccess(false)} />

      <section ref={ref} className="px-6 py-10 relative">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Your Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="John Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-white/80 mb-2 text-sm font-medium">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+91 98765 43210" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Service Interested In *</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-[#121212] border border-white/10 rounded-xl text-white focus:border-neon focus:outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#121212]">Select a service</option>
                    <option value="Web Development" className="bg-[#121212]">Web Development</option>
                    <option value="UI/UX Design" className="bg-[#121212]">UI/UX Design</option>
                    <option value="E-commerce" className="bg-[#121212]">E-commerce</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/80 mb-2 text-sm font-medium">Project Details *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all resize-none cursor-text"
                  placeholder="Tell us about your project..."
                />
              </div>

              {error && <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</div>}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-5 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold text-lg cursor-pointer disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}