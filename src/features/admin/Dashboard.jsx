import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Briefcase, 
  Wrench, 
  FileText, 
  Mail,
  Eye,
  Clock,
  Calendar
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

function StatCard({ icon: Icon, label, value, color, trend, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${color}30, ${color}10)`,
          }}
        >
          <Icon size={24} style={{ color }} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs font-medium text-neon">
            <TrendingUp size={14} />
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div>
        <p className="text-white/60 text-sm mb-1">{label}</p>
        {loading ? (
          <div className="h-8 w-20 bg-white/5 rounded animate-pulse" />
        ) : (
          <p className="text-3xl font-black">{value}</p>
        )}
      </div>
    </motion.div>
  );
}

function RecentItem({ item, type, color }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${color}30, ${color}10)`,
          }}
        >
          {type === 'portfolio' && <Briefcase size={18} style={{ color }} />}
          {type === 'service' && <Wrench size={18} style={{ color }} />}
          {type === 'blog' && <FileText size={18} style={{ color }} />}
          {type === 'contact' && <Mail size={18} style={{ color }} />}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white truncate mb-1">
            {item.title || item.name || 'Untitled'}
          </h4>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {formatDate(item.created_at)}
            </span>
            {item.category && (
              <span className="px-2 py-0.5 rounded-full bg-white/5">
                {item.category}
              </span>
            )}
          </div>
        </div>

        {item.published !== undefined && (
          <div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.published
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-yellow-500/10 text-yellow-400'
              }`}
            >
              {item.published ? 'Published' : 'Draft'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    portfolios: 0,
    services: 0,
    blogs: 0,
    contacts: 0,
  });
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentItems();
  }, []);

  const fetchStats = async () => {
    setLoading(true);

    const [portfolios, services, blogs, contacts] = await Promise.all([
      supabase.from('portfolios').select('id', { count: 'exact', head: true }),
      supabase.from('services').select('id', { count: 'exact', head: true }),
      supabase.from('blogs').select('id', { count: 'exact', head: true }),
      supabase.from('contacts').select('id', { count: 'exact', head: true }),
    ]);

    setStats({
      portfolios: portfolios.count || 0,
      services: services.count || 0,
      blogs: blogs.count || 0,
      contacts: contacts.count || 0,
    });

    setLoading(false);
  };

  const fetchRecentItems = async () => {
    const [portfolios, blogs, contacts] = await Promise.all([
      supabase
        .from('portfolios')
        .select('id, title, category, created_at, published')
        .order('created_at', { ascending: false })
        .limit(3),
      supabase
        .from('blogs')
        .select('id, title, category, created_at, published')
        .order('created_at', { ascending: false })
        .limit(3),
      supabase
        .from('contacts')
        .select('id, name, email, service, created_at')
        .order('created_at', { ascending: false })
        .limit(3),
    ]);

    const combined = [
      ...(portfolios.data || []).map((item) => ({ ...item, type: 'portfolio' })),
      ...(blogs.data || []).map((item) => ({ ...item, type: 'blog' })),
      ...(contacts.data || []).map((item) => ({ ...item, type: 'contact' })),
    ];

    combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setRecentItems(combined.slice(0, 8));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black mb-2"
        >
          {getGreeting()}, <span className="text-gradient">{user?.email?.split('@')[0]}</span>! 👋
        </motion.h1>
        <p className="text-white/60 flex items-center gap-2">
          <Calendar size={16} />
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Briefcase}
          label="Total Projects"
          value={stats.portfolios}
          color="#00F5A0"
          trend="+12%"
          loading={loading}
        />
        <StatCard
          icon={Wrench}
          label="Services"
          value={stats.services}
          color="#0EA5E9"
          loading={loading}
        />
        <StatCard
          icon={FileText}
          label="Blog Posts"
          value={stats.blogs}
          color="#F59E0B"
          trend="+8%"
          loading={loading}
        />
        <StatCard
          icon={Mail}
          label="New Contacts"
          value={stats.contacts}
          color="#EC4899"
          trend="+5"
          loading={loading}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Items */}
        <div>
          <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
            <Clock size={24} className="text-neon" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentItems.map((item) => (
              <RecentItem
                key={`${item.type}-${item.id}`}
                item={item}
                type={item.type}
                color={
                  item.type === 'portfolio'
                    ? '#00F5A0'
                    : item.type === 'blog'
                    ? '#F59E0B'
                    : '#EC4899'
                }
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
            <TrendingUp size={24} className="text-blue" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <motion.a
              href="/admin/portfolio"
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-gradient-to-br from-neon/10 to-neon/5 border border-neon/20 hover:border-neon/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <Briefcase size={24} className="text-neon" />
                <div>
                  <h3 className="font-bold">Add New Project</h3>
                  <p className="text-xs text-white/60">Create portfolio item</p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="/admin/blog"
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-gradient-to-br from-amber/10 to-amber/5 border border-amber/20 hover:border-amber/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-amber" />
                <div>
                  <h3 className="font-bold">Write Blog Post</h3>
                  <p className="text-xs text-white/60">Share your insights</p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="/admin/services"
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-gradient-to-br from-blue/10 to-blue/5 border border-blue/20 hover:border-blue/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <Wrench size={24} className="text-blue" />
                <div>
                  <h3 className="font-bold">Manage Services</h3>
                  <p className="text-xs text-white/60">Update offerings</p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="/admin/contacts"
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-gradient-to-br from-pink/10 to-pink/5 border border-pink/20 hover:border-pink/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <Mail size={24} className="text-pink" />
                <div>
                  <h3 className="font-bold">View Messages</h3>
                  <p className="text-xs text-white/60">{stats.contacts} unread</p>
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
