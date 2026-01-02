import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Search, Filter, Trash2, Eye, Phone, ExternalLink, Calendar, Clock, X, User, Briefcase } from 'lucide-react';
import { useCRUD } from '../../../hooks/useCRUD';


// ==================== MESSAGE MODAL COMPONENT ====================
function MessageModal({ contact, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-night border border-white/10 rounded-2xl w-full max-w-2xl my-8"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-black">
              <span className="text-gradient">Message Details</span>
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-all">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <User size={16} />
                  <span>Name</span>
                </div>
                <p className="font-bold">{contact.name}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <Mail size={16} />
                  <span>Email</span>
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-bold text-neon hover:underline break-all"
                >
                  {contact.email}
                </a>
              </div>

              {contact.phone && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                    <Phone size={16} />
                    <span>Phone</span>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="font-bold text-blue hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>
              )}

              {contact.service && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                    <Briefcase size={16} />
                    <span>Service</span>
                  </div>
                  <p className="font-bold">{contact.service}</p>
                </div>
              )}

              {contact.company && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                    <Briefcase size={16} />
                    <span>Company</span>
                  </div>
                  <p className="font-bold">{contact.company}</p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <Calendar size={16} />
                  <span>Received</span>
                </div>
                <p className="font-bold text-sm">{formatDate(contact.created_at)}</p>
              </div>
            </div>

            {/* Subject */}
            {contact.subject && (
              <div>
                <label className="block text-sm font-bold mb-2 text-white/60">Subject</label>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-bold">{contact.subject}</p>
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-bold mb-2 text-white/60">Message</label>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 min-h-[120px]">
                <p className="whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3">
              <a
                href={`mailto:${contact.email}?subject=Re: ${contact.subject || 'Your Message'}`}
                className="flex-1 px-4 py-3 bg-neon/10 text-neon hover:bg-neon/20 border border-neon/20 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                <Mail size={16} />
                Reply via Email
              </a>

              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex-1 px-4 py-3 bg-blue/10 text-blue hover:bg-blue/20 border border-blue/20 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  Call Now
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


// ==================== CONTACT CARD COMPONENT ====================
function ContactCard({ contact, onView, onDelete, onMarkRead }) {
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

  const isUnread = contact.status === 'unread' || !contact.status;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 rounded-2xl border transition-all cursor-pointer ${
        isUnread
          ? 'bg-neon/5 border-neon/20 hover:border-neon/40'
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
      onClick={() => onView(contact)}
    >
      {/* Unread Indicator */}
      {isUnread && (
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 rounded-full bg-neon animate-pulse" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink/20 to-pink/10 flex items-center justify-center flex-shrink-0">
          <User size={24} className="text-pink" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`font-bold mb-1 ${isUnread ? 'text-white' : 'text-white/80'}`}>
            {contact.name}
          </h3>
          <p className="text-white/60 text-sm break-all">{contact.email}</p>
        </div>
      </div>

      {/* Message Preview */}
      <p className="text-white/60 text-sm line-clamp-2 mb-4">
        {contact.message}
      </p>

      {/* Meta Info */}
      <div className="flex items-center justify-between text-xs text-white/40">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {formatDate(contact.created_at)}
          </span>
          {contact.service && (
            <span className="px-2 py-1 rounded-full bg-white/5">
              {contact.service}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onMarkRead(contact)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
            title={isUnread ? 'Mark as read' : 'Mark as unread'}
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}


// ==================== MAIN CONTACT MANAGER COMPONENT ====================
export default function ContactManager() {
  const { getAll, remove, update } = useCRUD('contacts');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const { data } = await getAll({ orderBy: { column: 'created_at', ascending: false } });
    setContacts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    await remove(id);
    fetchContacts();
  };

  const handleMarkRead = async (contact) => {
    const newStatus = contact.status === 'unread' || !contact.status ? 'read' : 'unread';
    await update(contact.id, { status: newStatus });
    fetchContacts();
  };

  const handleViewContact = async (contact) => {
    setSelectedContact(contact);
    
    // Mark as read when opened
    if (contact.status === 'unread' || !contact.status) {
      await update(contact.id, { status: 'read' });
      fetchContacts();
    }
  };

  // Filter contacts
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = 
      contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.message?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'unread' && (contact.status === 'unread' || !contact.status)) ||
      (filterStatus === 'read' && contact.status === 'read');
    
    return matchesSearch && matchesStatus;
  });

  const unreadCount = contacts.filter(c => c.status === 'unread' || !c.status).length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Contact <span className="text-gradient">Messages</span>
            </h1>
            <p className="text-white/60">View and manage contact form submissions</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or message..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon focus:outline-none transition-all appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="all" className="bg-night">All Messages</option>
              <option value="unread" className="bg-night">Unread</option>
              <option value="read" className="bg-night">Read</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-white/60 text-sm mb-1">Total Messages</p>
          <p className="text-2xl font-black">{contacts.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-neon/10 border border-neon/20">
          <p className="text-neon/80 text-sm mb-1">Unread</p>
          <p className="text-2xl font-black text-neon">{unreadCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-blue/10 border border-blue/20">
          <p className="text-blue/80 text-sm mb-1">Read</p>
          <p className="text-2xl font-black text-blue">
            {contacts.length - unreadCount}
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon"></div>
        </div>
      )}

      {/* Contacts Grid */}
      {!loading && filteredContacts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onView={handleViewContact}
              onDelete={handleDelete}
              onMarkRead={handleMarkRead}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredContacts.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-white/60 text-lg mb-4">
            {searchQuery || filterStatus !== 'all'
              ? 'No messages found matching your filters'
              : 'No contact messages yet'}
          </p>
        </div>
      )}

      {/* Message Modal */}
      {selectedContact && (
        <MessageModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
}
