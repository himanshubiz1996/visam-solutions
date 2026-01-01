import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Filter, Calendar, Clock } from 'lucide-react';
import { useCRUD } from '../../../hooks/useCRUD';

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

export default function BlogManager() {
  const { getAll, remove, togglePublished } = useCRUD('blogs');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

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
    console.log('Edit:', blog);
    // Will implement form next
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
            className="px-6 py-3 bg-gradient-to-r from-neon to-blue text-night rounded-xl font-bold"
          >
            <Plus size={20} className="inline mr-2" />
            Create First Post
          </motion.button>
        </div>
      )}
    </div>
  );
}
