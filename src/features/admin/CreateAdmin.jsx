import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function CreateAdmin() {
  const [email, setEmail] = useState('himanshuyadav.pixipom@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage('');
    setSuccess(false);

    // Validation
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);

    // Create user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'admin',
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setSuccess(true);
      setMessage('Admin user created successfully! You can now login.');
      
      // Clear form
      setPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-6" data-admin-page>
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,160,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,160,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      {/* Glow Effect */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue/20 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue/20 to-neon/20 border border-blue/30 mb-6"
          >
            <UserPlus size={40} className="text-blue" />
          </motion.div>
          <h1 className="text-4xl font-black mb-2">
            Create <span className="text-gradient">Admin</span>
          </h1>
          <p className="text-white/60">Setup your admin account</p>
        </div>

        {/* Form Card */}
        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
          <form onSubmit={handleCreate} className="space-y-6">
            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-3"
              >
                <CheckCircle size={20} />
                <div className="flex-1">
                  <p className="font-bold mb-1">Success!</p>
                  <p className="text-xs text-green-400/80">{message}</p>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {message && !success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
              >
                <AlertCircle size={20} />
                <span>{message}</span>
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password */}
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
                  minLength={6}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  placeholder="Min 6 characters"
                />
              </div>
              <p className="text-white/40 text-xs mt-1">At least 6 characters</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-white/80 mb-2 text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-night border-t-transparent rounded-full"
                  />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus size={20} />
                  Create Admin Account
                </>
              )}
            </motion.button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
              <Shield size={14} />
              <span>This will create an admin user account</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="mt-6 text-center space-y-2">
          <motion.a
            href="/admin/login"
            whileHover={{ x: -5 }}
            className="block text-white/60 hover:text-neon transition-colors text-sm"
          >
            ← Back to Login
          </motion.a>
          <motion.a
            href="/"
            whileHover={{ x: -5 }}
            className="block text-white/40 hover:text-white/60 transition-colors text-xs"
          >
            ← Back to Website
          </motion.a>
        </div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 text-center"
        >
          <p className="text-yellow-400/80 text-xs font-bold mb-1">
            ⚠️ Development Only
          </p>
          <p className="text-white/40 text-xs">
            Remove this page before deploying to production
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
