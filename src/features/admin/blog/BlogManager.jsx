import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Filter, Calendar, Clock, X, Save, Upload, RefreshCw } from 'lucide-react';
import { useCRUD } from '../../../hooks/useCRUD';


// ==================== BLOG FORM COMPONENT ====================
function BlogForm({ blog, onClose, onSuccess }) {
  const { create, update } = useCRUD('blogs');
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    color: '#10B981',
    tags: [],
    author: '',
    read_time: '',
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
    if (blog) {
      setFormData({
        title: blog.title || '',
        slug: blog.slug || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        image: blog.image || '',
        category: blog.category || '',
        color: blog.color || '#10B981',
        tags: blog.tags || [],
        author: blog.author || '',
        read_time: blog.read_time || '',
        published: blog.published || false,
      });
      setImagePreview(blog.image || '');
    }
  }, [blog]);

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
      slug: blog ? prev.slug : generateSlug(title)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
        alert('Only JPG, PNG, and WebP images are allowed');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, image: url }));
    setImagePreview(url);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.title.trim() || !formData.slug.trim() || !formData.excerpt.trim() || 
          !formData.content.trim() || !formData.category.trim()) {
        alert('Please fill all required fields');
        setLoading(false);
        return;
      }

      const blogData = {
        ...formData,
        created_at: blog?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (blog) {
        await update(blog.id, blogData);
      } else {
        await create(blogData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categoryColors = [
    { name: 'Technology', color: '#3B82F6' },
    { name: 'Design', color: '#8B5CF6' },
    { name: 'Business', color: '#10B981' },
    { name: 'Marketing', color: '#F59E0B' },
    { name: 'Development', color: '#EC4899' },
    { name: 'Tutorial', color: '#06B6D4' },
    { name: 'News', color: '#EF4444' },
  ];

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
              {blog ? 'Edit' : 'Create New'} <span className="text-gradient">Blog Post</span>
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-all">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter blog post title..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-bold mb-2">
                URL Slug <span className="text-red-400">*</span>
                <span className="text-white/40 text-xs font-normal ml-2">(Auto-generated)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="url-friendly-slug"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 placeholder:text-white/30 focus:border-neon focus:outline-none transition-all font-mono text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }))}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-sm flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
              <p className="text-xs text-white/40 mt-1">
                yoursite.com/blog/<span className="text-neon">{formData.slug || 'your-blog-slug'}</span>
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Excerpt <span className="text-red-400">*</span>
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Brief description..."
                rows="3"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all resize-vertical"
                required
              />
              <p className="text-xs text-white/40 mt-1">{formData.excerpt.length} characters</p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Content <span className="text-red-400">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog content..."
                rows="10"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all resize-vertical font-mono text-sm"
                required
              />
              <p className="text-xs text-white/40 mt-1">
                {formData.content.split(' ').filter(w => w).length} words
              </p>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-bold mb-2">Featured Image</label>
              <div className="space-y-3">
                <input
                  type="url"
                  value={formData.image}
                  onChange={handleImageUrlChange}
                  placeholder="Enter image URL..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                />
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 border-dashed rounded-xl cursor-pointer hover:border-neon transition-all"
                  >
                    <Upload size={20} />
                    <span>Upload Image (Max 2MB)</span>
                  </label>
                </div>

                {imagePreview && (
                  <div className="relative rounded-xl overflow-hidden border border-white/10">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, image: '' }));
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 rounded-lg transition-all"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Category & Color */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Technology"
                  list="category-suggestions"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                  required
                />
                <datalist id="category-suggestions">
                  {categoryColors.map(cat => (
                    <option key={cat.name} value={cat.name} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Category Color</label>
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
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-red-400"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Author & Read Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Author name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Read Time</label>
                <input
                  type="text"
                  name="read_time"
                  value={formData.read_time}
                  onChange={handleChange}
                  placeholder="5 min read"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
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
                <p className="text-sm text-white/60">Make visible to everyone</p>
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
                  {blog ? 'Update' : 'Create'} Post
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


// ==================== BLOG CARD COMPONENT ====================
function BlogCard({ blog, onEdit, onDelete, onTogglePublish }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
    >
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-xl ${
              blog.published
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            }`}
          >
            {blog.published ? 'Published' : 'Draft'}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-bold backdrop-blur-xl"
            style={{
              backgroundColor: `${blog.color}30`,
              color: blog.color,
              border: `1px solid ${blog.color}50`,
            }}
          >
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-neon transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-white/60 text-sm line-clamp-2 mb-4">
          {blog.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-white/40 mb-4">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(blog.created_at)}
          </span>
          {blog.read_time && (
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {blog.read_time}
            </span>
          )}
          {blog.author && <span>• {blog.author}</span>}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-full bg-white/5 text-white/60 text-xs"
              >
                {tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-2 py-1 text-white/40 text-xs">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTogglePublish(blog.id, blog.published)}
            className={`flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              blog.published
                ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
            }`}
          >
            {blog.published ? (
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
            onClick={() => onEdit(blog)}
            className="px-4 py-2 rounded-xl bg-blue/10 text-blue hover:bg-blue/20 transition-all"
          >
            <Edit2 size={16} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(blog.id)}
            className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
          >
            <Trash2 size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}


// ==================== MAIN BLOG MANAGER COMPONENT ====================
export default function BlogManager() {
  const { getAll, remove, togglePublished } = useCRUD('blogs');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data } = await getAll({ orderBy: { column: 'created_at', ascending: false } });
    setBlogs(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    await remove(id);
    fetchBlogs();
  };

  const handleTogglePublish = async (id, currentStatus) => {
    await togglePublished(id, currentStatus);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleNewPost = () => {
    setEditingBlog(null);
    setShowForm(true);
  };

  // Filter blogs
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || blog.category === filterCategory;
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'published' && blog.published) ||
                         (filterStatus === 'draft' && !blog.published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', ...new Set(blogs.map((b) => b.category))];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Blog <span className="text-gradient">Manager</span>
            </h1>
            <p className="text-white/60">Create and manage your blog posts</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNewPost}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold flex items-center gap-2"
          >
            <Plus size={20} />
            New Post
          </motion.button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blog posts..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-neon focus:outline-none transition-all"
            />
          </div>

          {/* Category Filter */}
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

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-neon focus:outline-none transition-all appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="all" className="bg-night">All Status</option>
              <option value="published" className="bg-night">Published</option>
              <option value="draft" className="bg-night">Drafts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-white/60 text-sm mb-1">Total Posts</p>
          <p className="text-2xl font-black">{blogs.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <p className="text-green-400/80 text-sm mb-1">Published</p>
          <p className="text-2xl font-black text-green-400">
            {blogs.filter((b) => b.published).length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-yellow-400/80 text-sm mb-1">Drafts</p>
          <p className="text-2xl font-black text-yellow-400">
            {blogs.filter((b) => !b.published).length}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-blue/10 border border-blue/20">
          <p className="text-blue/80 text-sm mb-1">Categories</p>
          <p className="text-2xl font-black text-blue">
            {new Set(blogs.map((b) => b.category)).size}
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon"></div>
        </div>
      )}

      {/* Blog Grid */}
      {!loading && filteredBlogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePublish={handleTogglePublish}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredBlogs.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-white/60 text-lg mb-4">
            {searchQuery || filterCategory !== 'all' || filterStatus !== 'all'
              ? 'No blog posts found matching your filters'
              : 'No blog posts yet. Write your first one!'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNewPost}
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold"
          >
            <Plus size={20} className="inline mr-2" />
            Create First Post
          </motion.button>
        </div>
      )}

      {/* Blog Form Modal */}
      {showForm && (
        <BlogForm
          blog={editingBlog}
          onClose={() => {
            setShowForm(false);
            setEditingBlog(null);
          }}
          onSuccess={fetchBlogs}
        />
      )}
    </div>
  );
}
