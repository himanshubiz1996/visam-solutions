import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, DollarSign, Clock } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useCRUD } from '../../../hooks/useCRUD';

function ServiceCard({ service, onEdit, onDelete, onTogglePublish }) {
  const IconComponent = Icons[service.icon] || Icons.Wrench;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
    >
      {/* Icon & Status */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${service.color}40, ${service.color}20)`,
          }}
        >
          <IconComponent size={28} style={{ color: service.color }} />
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            service.published
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}
        >
          {service.published ? 'Published' : 'Draft'}
        </span>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold mb-2 line-clamp-1">{service.title}</h3>
      <p className="text-white/60 text-sm line-clamp-2 mb-4">
        {service.description}
      </p>

      {/* Meta Info */}
      <div className="flex items-center gap-4 mb-4 text-xs text-white/40">
        {service.pricing && (
          <span className="flex items-center gap-1">
            <DollarSign size={14} />
            {service.pricing}
          </span>
        )}
        {service.duration && (
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {service.duration}
          </span>
        )}
      </div>

      {/* Features Count */}
      {service.features && service.features.length > 0 && (
        <p className="text-white/40 text-xs mb-4">
          {service.features.length} features included
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTogglePublish(service.id, service.published)}
          className={`flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
            service.published
              ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
              : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
          }`}
        >
          {service.published ? (
            <>
              <EyeOff size={16} className="inline mr-2" />
              Unpublish
            </>
          ) : (
            <>
              <Eye size={16} className="inline mr-2" />
              Publish
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEdit(service)}
          className="px-4 py-2 rounded-xl bg-blue/10 text-blue hover:bg-blue/20 transition-all"
        >
          <Edit2 size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(service.id)}
          className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function ServiceManager() {
  const { getAll, remove, togglePublished } = useCRUD('services');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data } = await getAll({ orderBy: { column: 'created_at', ascending: false } });
    setServices(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    await remove(id);
    fetchServices();
  };

  const handleTogglePublish = async (id, currentStatus) => {
    await togglePublished(id, currentStatus);
    fetchServices();
  };

  const handleEdit = (service) => {
    console.log('Edit:', service);
    // Will implement form next
  };

  // Filter services
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Services <span className="text-gradient">Manager</span>
            </h1>
            <p className="text-white/60">Manage your service offerings</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold flex items-center gap-2"
          >
            <Plus size={20} />
            Add Service
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-white/60 text-sm mb-1">Total Services</p>
          <p className="text-2xl font-black">{services.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-green-400/80 text-sm mb-1">Published</p>
          <p className="text-2xl font-black text-green-400">
            {services.filter((s) => s.published).length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-yellow-400/80 text-sm mb-1">Drafts</p>
          <p className="text-2xl font-black text-yellow-400">
            {services.filter((s) => !s.published).length}
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon"></div>
        </div>
      )}

      {/* Services Grid */}
      {!loading && filteredServices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublish}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredServices.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/60 text-lg mb-4">
            {searchQuery
              ? 'No services found matching your search'
              : 'No services yet. Create your first one!'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold"
          >
            <Plus size={20} className="inline mr-2" />
            Add First Service
          </motion.button>
        </div>
      )}
    </div>
  );
}
