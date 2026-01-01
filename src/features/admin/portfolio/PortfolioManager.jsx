import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, Filter } from 'lucide-react';
import { useCRUD } from '../../../hooks/useCRUD';


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
