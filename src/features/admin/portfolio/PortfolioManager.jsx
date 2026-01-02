import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Filter, X, Save, Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { useCRUD } from '../../../hooks/useCRUD';


// ==================== PORTFOLIO FORM COMPONENT ====================
function PortfolioForm({ portfolio, onSave, onClose }) {
  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [imageInput, setImageInput] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    client: '',
    year: new Date().getFullYear().toString(),
    thumbnail: '',
    color: '#10B981',
    tags: [],
    description: '',
    challenge: '',
    solution: '',
    results: '',
    images: [],
    testimonial_text: '',
    testimonial_author: '',
    link: '',
    published: false,
  });

  const [tagInput, setTagInput] = useState('');

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  useEffect(() => {
    if (portfolio) {
      setFormData({
        title: portfolio.title || '',
        slug: portfolio.slug || '',
        category: portfolio.category || '',
        client: portfolio.client || '',
        year: portfolio.year || new Date().getFullYear().toString(),
        thumbnail: portfolio.thumbnail || '',
        color: portfolio.color || '#10B981',
        tags: portfolio.tags || [],
        description: portfolio.description || '',
        challenge: portfolio.challenge || '',
        solution: portfolio.solution || '',
        results: portfolio.results || '',
        images: portfolio.images || [],
        testimonial_text: portfolio.testimonial_text || '',
        testimonial_author: portfolio.testimonial_author || '',
        link: portfolio.link || '',
        published: portfolio.published || false,
      });
      setThumbnailPreview(portfolio.thumbnail || '');
    }
  }, [portfolio]);

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
      slug: portfolio ? prev.slug : generateSlug(title)
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
        setFormData(prev => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, thumbnail: url }));
    setThumbnailPreview(url);
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !formData.tags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }));
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddImage = () => {
    const url = imageInput.trim();
    if (url && !formData.images.includes(url)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, url]
      }));
      setImageInput('');
    }
  };

  const handleRemoveImage = (imageToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.title.trim() || !formData.slug.trim() || !formData.category.trim() || 
          !formData.description.trim()) {
        alert('Please fill all required fields');
        setLoading(false);
        return;
      }

      const portfolioData = {
        ...formData,
        created_at: portfolio?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await onSave(portfolioData);
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Failed to save portfolio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Web Design', 'Mobile App', 'Branding', 'E-commerce', 'UI/UX', 'Development'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

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
              {portfolio ? 'Edit' : 'Add New'} <span className="text-gradient">Project</span>
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
                  Project Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter project title..."
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
                  placeholder="project-url-slug"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 placeholder:text-white/30 focus:border-neon focus:outline-none transition-all font-mono text-sm"
                  required
                />
              </div>
            </div>

            {/* Category, Client, Year */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Web Design"
                  list="category-list"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  required
                />
                <datalist id="category-list">
                  {categories.map(cat => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Client</label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  placeholder="Client name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon focus:outline-none transition-all appearance-none cursor-pointer"
                >
                  {years.map(year => (
                    <option key={year} value={year} className="bg-night">{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Thumbnail Image <span className="text-red-400">*</span>
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={handleThumbnailUrlChange}
                  placeholder="Enter thumbnail URL..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                />
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 border-dashed rounded-xl cursor-pointer hover:border-neon transition-all"
                  >
                    <Upload size={20} />
                    <span>Upload Thumbnail (Max 2MB)</span>
                  </label>
                </div>

                {thumbnailPreview && (
                  <div className="relative rounded-xl overflow-hidden border border-white/10">
                    <img src={thumbnailPreview} alt="Preview" className="w-full h-48 object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailPreview('');
                        setFormData(prev => ({ ...prev, thumbnail: '' }));
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-all"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-bold mb-2">Accent Color</label>
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

            {/* Tags */}
            <div>
              <label className="block text-sm font-bold mb-2">Tags</label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Press Enter or comma to add..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                />
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-neon/10 text-neon rounded-full text-sm flex items-center gap-2">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-red-400">
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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
                placeholder="Brief project description..."
                rows="3"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all resize-vertical"
                required
              />
            </div>

            {/* Challenge */}
            <div>
              <label className="block text-sm font-bold mb-2">Challenge</label>
              <textarea
                name="challenge"
                value={formData.challenge}
                onChange={handleChange}
                placeholder="What was the challenge..."
                rows="3"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all resize-vertical"
              />
            </div>

            {/* Solution */}
            <div>
              <label className="block text-sm font-bold mb-2">Solution</label>
              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                placeholder="How did you solve it..."
                rows="3"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all resize-vertical"
              />
            </div>

            {/* Results */}
            <div>
              <label className="block text-sm font-bold mb-2">Results</label>
              <textarea
                name="results"
                value={formData.results}
                onChange={handleChange}
                placeholder="What were the results..."
                rows="3"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all resize-vertical"
              />
            </div>

            {/* Gallery Images */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Gallery Images <span className="text-white/40 text-xs font-normal">(URLs)</span>
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
                    placeholder="Enter image URL and press Enter..."
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-3 bg-neon/10 text-neon hover:bg-neon/20 border border-neon/20 rounded-xl transition-all flex items-center gap-2"
                  >
                    <ImageIcon size={16} />
                    Add
                  </button>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {formData.images.map((img, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden border border-white/10">
                        <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-24 object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(img)}
                          className="absolute top-1 right-1 p-1 bg-red-500/80 hover:bg-red-500 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Testimonial */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Testimonial Text</label>
                <textarea
                  name="testimonial_text"
                  value={formData.testimonial_text}
                  onChange={handleChange}
                  placeholder="Client testimonial..."
                  rows="3"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all resize-vertical"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Testimonial Author</label>
                <input
                  type="text"
                  name="testimonial_author"
                  value={formData.testimonial_author}
                  onChange={handleChange}
                  placeholder="Client name & position"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-bold mb-2">Project Link</label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://project-url.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                />
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
                <p className="text-sm text-white/60">Make this project visible on portfolio</p>
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
                  {portfolio ? 'Update' : 'Save'} Project
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


// ==================== PORTFOLIO CARD COMPONENT ====================
function PortfolioCard({ portfolio, onEdit, onDelete, onTogglePublish }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
    >
      {/* Thumbnail */}
      <div className="relative h-48 rounded-xl overflow-hidden mb-4">
        <img
          src={portfolio.thumbnail}
          alt={portfolio.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              portfolio.published
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            }`}
          >
            {portfolio.published ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{portfolio.title}</h3>
        <p className="text-white/60 text-sm line-clamp-2 mb-3">
          {portfolio.description}
        </p>
        
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-white/40">
          <span className="px-2 py-1 rounded-full bg-white/5">
            {portfolio.category}
          </span>
          <span>{portfolio.year}</span>
          {portfolio.client && <span>• {portfolio.client}</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTogglePublish(portfolio.id, portfolio.published)}
          className={`flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all cursor-pointer ${
            portfolio.published
              ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
              : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
          }`}
        >
          {portfolio.published ? (
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
          onClick={() => onEdit(portfolio)}
          className="px-4 py-2 rounded-xl bg-blue/10 text-blue hover:bg-blue/20 transition-all cursor-pointer"
        >
          <Edit2 size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(portfolio.id)}
          className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
        >
          <Trash2 size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}


// ==================== MAIN PORTFOLIO MANAGER COMPONENT ====================
export default function PortfolioManager() {
  const { getAll, create, update, remove, togglePublished } = useCRUD('portfolios');
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    setLoading(true);
    const { data } = await getAll({ orderBy: { column: 'created_at', ascending: false } });
    setPortfolios(data || []);
    setLoading(false);
  };

  const handleAddNew = () => {
    setEditingPortfolio(null);
    setShowForm(true);
  };

  const handleEdit = (portfolio) => {
    setEditingPortfolio(portfolio);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPortfolio(null);
  };

  const handleSave = async (portfolioData) => {
    try {
      if (editingPortfolio) {
        await update(editingPortfolio.id, portfolioData);
      } else {
        await create(portfolioData);
      }
      handleCloseForm();
      fetchPortfolios();
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Error: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await remove(id);
    fetchPortfolios();
  };

  const handleTogglePublish = async (id, currentStatus) => {
    await togglePublished(id, currentStatus);
    fetchPortfolios();
  };

  const filteredPortfolios = portfolios.filter((portfolio) => {
    const matchesSearch = portfolio.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || portfolio.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(portfolios.map((p) => p.category))];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Portfolio <span className="text-gradient">Manager</span>
            </h1>
            <p className="text-white/60">Manage your projects and case studies</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddNew}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold flex items-center gap-2 cursor-pointer"
          >
            <Plus size={20} />
            Add Project
          </motion.button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon focus:outline-none transition-all appearance-none cursor-pointer min-w-[200px]"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-night">
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-white/60 text-sm mb-1">Total Projects</p>
          <p className="text-2xl font-black">{portfolios.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-green-400/80 text-sm mb-1">Published</p>
          <p className="text-2xl font-black text-green-400">
            {portfolios.filter((p) => p.published).length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-yellow-400/80 text-sm mb-1">Drafts</p>
          <p className="text-2xl font-black text-yellow-400">
            {portfolios.filter((p) => !p.published).length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-blue/10 border border-blue/20">
          <p className="text-blue/80 text-sm mb-1">Categories</p>
          <p className="text-2xl font-black text-blue">
            {new Set(portfolios.map((p) => p.category)).size}
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon"></div>
        </div>
      )}

      {/* Portfolio Grid */}
      {!loading && filteredPortfolios.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublish}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredPortfolios.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💼</div>
          <p className="text-white/60 text-lg mb-4">No projects found</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddNew}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold cursor-pointer"
          >
            <Plus size={20} className="inline mr-2" />
            Add First Project
          </motion.button>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <PortfolioForm
          portfolio={editingPortfolio}
          onSave={handleSave}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
