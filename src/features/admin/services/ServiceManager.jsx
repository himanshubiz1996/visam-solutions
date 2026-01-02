import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, DollarSign, Clock, X, Save, Palette, Package } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useCRUD } from '../../../hooks/useCRUD';


// ==================== SERVICE FORM COMPONENT ====================
function ServiceForm({ service, onSave, onClose }) {
  const [loading, setLoading] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    icon: 'Wrench',
    color: '#10B981',
    pricing: '',
    duration: '',
    features: [],
    process_steps: [],
    deliverables: [],
    published: false,
  });

  const [featureInput, setFeatureInput] = useState('');
  const [processStepInput, setProcessStepInput] = useState({ title: '', description: '' });
  const [deliverableInput, setDeliverableInput] = useState('');

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        slug: service.slug || '',
        description: service.description || '',
        icon: service.icon || 'Wrench',
        color: service.color || '#10B981',
        pricing: service.pricing || '',
        duration: service.duration || '',
        features: service.features || [],
        process_steps: service.process_steps || [],
        deliverables: service.deliverables || [],
        published: service.published || false,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: title,
      slug: service ? prev.slug : generateSlug(title)
    }));
  };

  // Features handlers
  const handleAddFeature = () => {
    const feature = featureInput.trim();
    if (feature && !formData.features.includes(feature)) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== featureToRemove)
    }));
  };

  // Process Steps handlers
  const handleAddProcessStep = () => {
    if (processStepInput.title.trim() && processStepInput.description.trim()) {
      setFormData(prev => ({
        ...prev,
        process_steps: [...prev.process_steps, processStepInput]
      }));
      setProcessStepInput({ title: '', description: '' });
    }
  };

  const handleRemoveProcessStep = (index) => {
    setFormData(prev => ({
      ...prev,
      process_steps: prev.process_steps.filter((_, i) => i !== index)
    }));
  };

  // Deliverables handlers
  const handleAddDeliverable = () => {
    const deliverable = deliverableInput.trim();
    if (deliverable && !formData.deliverables.includes(deliverable)) {
      setFormData(prev => ({
        ...prev,
        deliverables: [...prev.deliverables, deliverable]
      }));
      setDeliverableInput('');
    }
  };

  const handleRemoveDeliverable = (deliverableToRemove) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter(d => d !== deliverableToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.title.trim() || !formData.slug.trim() || !formData.description.trim()) {
        alert('Please fill all required fields');
        setLoading(false);
        return;
      }

      const serviceData = {
        ...formData,
        created_at: service?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await onSave(serviceData);
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Popular icons for services
  const popularIcons = [
    'Code', 'Palette', 'Smartphone', 'Monitor', 'Globe', 'Zap',
    'Layers', 'Layout', 'Package', 'ShoppingCart', 'TrendingUp', 'Target',
    'Lightbulb', 'Cpu', 'Cloud', 'Database', 'Lock', 'MessageSquare',
    'Camera', 'Video', 'Music', 'PenTool', 'Wrench', 'Settings'
  ];

  // Get current icon component
  const CurrentIcon = Icons[formData.icon] || Icons.Wrench;

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
          className="bg-night border border-white/10 rounded-2xl w-full max-w-4xl my-8"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-black">
              {service ? 'Edit' : 'Add New'} <span className="text-gradient">Service</span>
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-all">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">
                  Service Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g., Web Development"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  URL Slug <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="web-development"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 placeholder:text-white/30 focus:border-neon focus:outline-none transition-all font-mono text-sm"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your service..."
                rows="4"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all resize-vertical"
                required
              />
            </div>

            {/* Icon & Color */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Icon</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowIconPicker(!showIconPicker)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon focus:outline-none transition-all flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <CurrentIcon size={20} />
                      {formData.icon}
                    </span>
                    <Palette size={16} />
                  </button>

                  {showIconPicker && (
                    <div className="absolute top-full mt-2 w-full bg-night border border-white/10 rounded-xl p-4 grid grid-cols-6 gap-2 max-h-64 overflow-y-auto z-10">
                      {popularIcons.map((iconName) => {
                        const IconComp = Icons[iconName];
                        return (
                          <button
                            key={iconName}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, icon: iconName }));
                              setShowIconPicker(false);
                            }}
                            className={`p-3 rounded-lg hover:bg-white/10 transition-all ${
                              formData.icon === iconName ? 'bg-neon/20 border border-neon' : 'bg-white/5'
                            }`}
                            title={iconName}
                          >
                            <IconComp size={20} />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-16 h-12 rounded-xl cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="#10B981"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Pricing</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input
                    type="text"
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleChange}
                    placeholder="Starting from $999"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Duration</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="2-4 weeks"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-bold mb-2">Features</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    placeholder="Add a feature and press Enter..."
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-3 bg-neon/10 text-neon hover:bg-neon/20 border border-neon/20 rounded-xl transition-all"
                  >
                    Add
                  </button>
                </div>
                
                {formData.features.length > 0 && (
                  <div className="space-y-2">
                    {formData.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
                        <span className="flex-1 text-sm">{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(feature)}
                          className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Process Steps */}
            <div>
              <label className="block text-sm font-bold mb-2">Process Steps</label>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  <input
                    type="text"
                    value={processStepInput.title}
                    onChange={(e) => setProcessStepInput(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Step title..."
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={processStepInput.description}
                      onChange={(e) => setProcessStepInput(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Step description..."
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleAddProcessStep}
                      className="px-4 py-3 bg-neon/10 text-neon hover:bg-neon/20 border border-neon/20 rounded-xl transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                {formData.process_steps.length > 0 && (
                  <div className="space-y-2">
                    {formData.process_steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                        <div className="flex-1">
                          <p className="font-bold text-sm mb-1">{step.title}</p>
                          <p className="text-sm text-white/60">{step.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveProcessStep(i)}
                          className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Deliverables */}
            <div>
              <label className="block text-sm font-bold mb-2">Deliverables</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={deliverableInput}
                    onChange={(e) => setDeliverableInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDeliverable())}
                    placeholder="Add deliverable and press Enter..."
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-4 py-3 bg-neon/10 text-neon hover:bg-neon/20 border border-neon/20 rounded-xl transition-all flex items-center gap-2"
                  >
                    <Package size={16} />
                    Add
                  </button>
                </div>
                
                {formData.deliverables.length > 0 && (
                  <div className="space-y-2">
                    {formData.deliverables.map((deliverable, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl">
                        <Package size={14} className="text-white/40" />
                        <span className="flex-1 text-sm">{deliverable}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDeliverable(deliverable)}
                          className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-all"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Publish Status */}
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
              <input
                type="checkbox"
                name="published"
                id="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 rounded cursor-pointer"
              />
              <label htmlFor="published" className="cursor-pointer">
                <span className="font-bold">Publish immediately</span>
                <p className="text-sm text-white/60">Make this service visible on website</p>
              </label>
            </div>

          </form>

          <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-all"
            >
              Cancel
            </motion.button>
            
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-night"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  {service ? 'Update' : 'Save'} Service
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


// ==================== SERVICE CARD COMPONENT ====================
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


// ==================== MAIN SERVICE MANAGER COMPONENT ====================
export default function ServiceManager() {
  const { getAll, create, update, remove, togglePublished } = useCRUD('services');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data } = await getAll({ orderBy: { column: 'created_at', ascending: false } });
    setServices(data || []);
    setLoading(false);
  };

  const handleAddNew = () => {
    setEditingService(null);
    setShowForm(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingService(null);
  };

  const handleSave = async (serviceData) => {
    try {
      if (editingService) {
        await update(editingService.id, serviceData);
      } else {
        await create(serviceData);
      }
      handleCloseForm();
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error: ' + error.message);
    }
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
            onClick={handleAddNew}
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
          <div className="text-6xl mb-4">🛠️</div>
          <p className="text-white/60 text-lg mb-4">
            {searchQuery
              ? 'No services found matching your search'
              : 'No services yet. Create your first one!'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddNew}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold"
          >
            <Plus size={20} className="inline mr-2" />
            Add First Service
          </motion.button>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <ServiceForm
          service={editingService}
          onSave={handleSave}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
