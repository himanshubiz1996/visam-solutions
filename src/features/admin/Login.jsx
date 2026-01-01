import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // ✅ Hide custom cursor on mount
  useEffect(() => {
    document.body.style.cursor = 'default';
    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { data, error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // Check if admin email
    if (data.user?.email === 'himanshuyadav.pixipom@gmail.com') {
      navigate('/admin/dashboard');
    } else {
      setError('Unauthorized: Admin access only');
      await supabase.auth.signOut();
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-6" data-admin-page>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Animated Glow Effect */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: 'spring',
              stiffness: 200,
              delay: 0.2 
            }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-neon/20 to-blue/20 border border-neon/30 mb-6"
          >
            <Shield size={40} className="text-neon" />
          </motion.div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-black mb-2"
          >
            Admin <span className="text-gradient">Panel</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/60"
          >
            Visam Solutions CMS
          </motion.p>
        </div>

        {/* Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
              >
                <AlertCircle size={20} className="flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  placeholder="himanshuyadav.pixipom@gmail.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold text-lg shadow-lg hover:shadow-neon/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      ease: 'linear' 
                    }}
                    className="w-5 h-5 border-2 border-night border-t-transparent rounded-full"
                  />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <Lock size={20} />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Info Footer */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
              <Shield size={14} />
              <span>Secure admin access only</span>
            </div>
          </div>
        </motion.div>

        {/* Back to Website Link */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ x: -5 }}
          className="block mt-6 text-center text-white/60 hover:text-neon transition-colors text-sm"
        >
          ← Back to Website
        </motion.a>

        {/* Development Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 rounded-xl bg-blue/5 border border-blue/10 text-center"
        >
          <p className="text-white/40 text-xs mb-1">
            💡 <span className="font-bold">Development Mode</span>
          </p>
          <p className="text-white/30 text-xs">
            Admin: himanshuyadav.pixipom@gmail.com
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
