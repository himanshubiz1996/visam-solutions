import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase, 
  Wrench, 
  FileText, 
  Mail, 
  LogOut, 
  Menu, 
  X,
  User,
  Settings
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/admin/dashboard',
      color: '#00F5A0' 
    },
    { 
      icon: Briefcase, 
      label: 'Portfolio', 
      path: '/admin/portfolio',
      color: '#0EA5E9' 
    },
    { 
      icon: Wrench, 
      label: 'Services', 
      path: '/admin/services',
      color: '#8B5CF6' 
    },
    { 
      icon: FileText, 
      label: 'Blog Posts', 
      path: '/admin/blog',
      color: '#F59E0B' 
    },
    { 
      icon: Mail, 
      label: 'Contacts', 
      path: '/admin/contacts',
      color: '#EC4899' 
    },
  ];

  return (
    <div className="min-h-screen bg-night flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-72 bg-gradient-to-b from-night to-night/95 border-r border-white/10 flex flex-col fixed h-screen z-50"
          >
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-black">
                  <span className="text-gradient">Admin</span> Panel
                </h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-white/40 text-sm">Visam Solutions CMS</p>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon/20 to-blue/20 flex items-center justify-center">
                  <User size={20} className="text-neon" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {user?.email?.split('@')[0] || 'Admin'}
                  </p>
                  <p className="text-white/40 text-xs">Administrator</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                      isActive
                        ? 'bg-white/10 border border-white/20'
                        : 'hover:bg-white/5 border border-transparent'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isActive ? 'scale-110' : 'group-hover:scale-105'
                        }`}
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${item.color}30, ${item.color}10)`
                            : 'transparent',
                        }}
                      >
                        <item.icon
                          size={20}
                          style={{ color: isActive ? item.color : '#ffffff80' }}
                        />
                      </div>
                      <span
                        className={`font-medium ${
                          isActive ? 'text-white' : 'text-white/60'
                        }`}
                      >
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/10 space-y-2">
             

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all"
              >
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-72' : 'ml-0'
        }`}
      >
        {/* Top Bar */}
        <header className="h-16 bg-night/50 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-xl border border-white/10 hover:border-neon/50 text-white/70 hover:text-neon transition-all text-sm font-medium"
            >
              View Website →
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
