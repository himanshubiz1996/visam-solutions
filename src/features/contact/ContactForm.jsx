import { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Brand Identity',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    try {
      console.log('📤 Inserting to Supabase...', formData);

      const { data, error: dbError } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim() || null,
            service: formData.service.trim(),
            message: formData.message.trim(),
          }
        ])
        .select();

      console.log('📥 Response:', { data, dbError });

      if (dbError) {
        throw new Error(dbError.message || 'Database error');
      }

      console.log('✅ Success!', data);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Brand Identity',
        message: '',
      });

      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      console.error('❌ Error:', err.message);
      setError(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Success Message - Animated */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-neon/20 to-blue/20 border border-neon/50 backdrop-blur-sm flex items-center gap-4 shadow-lg shadow-neon/20"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <CheckCircle size={28} className="text-neon" />
          </motion.div>
          <div>
            <p className="font-bold text-white text-lg">✨ Form Submitted Successfully!</p>
            <p className="text-white/70 text-sm mt-1">We've received your message. Our team will get back to you within 24 hours.</p>
          </div>
        </motion.div>
      )}

      {/* Error Message - Animated */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/50 backdrop-blur-sm flex items-center gap-4 shadow-lg shadow-red-500/20"
        >
          <motion.div
            animate={{ shake: [0, -5, 5, -5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <AlertCircle size={28} className="text-red-500" />
          </motion.div>
          <div>
            <p className="font-bold text-red-500 text-lg">⚠️ Error</p>
            <p className="text-red-400 text-sm mt-1">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-bold mb-3 text-white">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/20 transition-all duration-300"
              required
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-bold mb-3 text-white flex items-center gap-2">
              <Mail size={16} className="text-neon" />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/20 transition-all duration-300"
              required
            />
          </motion.div>
        </div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-bold mb-3 text-white flex items-center gap-2">
            <Phone size={16} className="text-neon" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 1234567890"
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/20 transition-all duration-300"
          />
        </motion.div>

        {/* Service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-bold mb-3 text-white">Service Interested In *</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/20 transition-all duration-300"
            required
          >
            <option value="Brand Identity">Brand Identity</option>
            <option value="Web Development">Web Development</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Packaging Design">Packaging Design</option>
            <option value="Business Consulting">Business Consulting</option>
          </select>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <label className="block text-sm font-bold mb-3 text-white flex items-center gap-2">
            <MessageSquare size={16} className="text-neon" />
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project..."
            rows="6"
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none focus:ring-2 focus:ring-neon/20 transition-all duration-300 resize-none"
            required
          ></textarea>
        </motion.div>

        {/* Submit Button with Arrow Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
              loading
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-neon to-blue text-night hover:shadow-xl hover:shadow-neon/50'
            }`}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                <span>Sending Message...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Send Message</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </>
            )}
          </motion.button>
        </motion.div>
      </form>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 pt-16 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          { icon: Mail, label: 'Email', value: 'mukulyadav111@gmail.com', href: 'mailto:mukulyadav111@gmail.com' },
          { icon: Phone, label: 'Phone', value: '+91 70737 85326', href: 'tel:+917073785326' },
          { icon: MessageSquare, label: 'Response Time', value: 'Within 24 hours', href: '#' },
        ].map((contact, i) => (
          <motion.a
            key={i}
            href={contact.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            whileHover={{ y: -5 }}
            className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-neon/50 transition-all group cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon/20 to-blue/20 flex items-center justify-center mx-auto mb-3"
            >
              tact.icon size={24} className="text-neon" /
            </motion.div>
            <p className="text-white/60 text-sm mb-2">{contact.label}</p>
            <p className="font-bold text-neon group-hover:text-blue transition-colors">
              {contact.value}
            </p>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
