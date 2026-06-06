import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Pencil, Trash2, Search, ImageIcon } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import Modal from '../../components/ui/Modal';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Unisex',
    description: '',
    image: ''
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ub_categories');
    if (saved) {
      setCategories(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  const saveCategories = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem('ub_categories', JSON.stringify(newCategories));
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        gender: category.gender,
        description: category.description,
        image: category.image
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', gender: 'Unisex', description: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      const updated = categories.map(c => 
        c.id === editingCategory.id ? { ...c, ...formData } : c
      );
      saveCategories(updated);
    } else {
      const newCategory = {
        id: `cat_${Date.now()}_${uuidv4().substring(0,6)}`,
        ...formData,
        createdAt: new Date().toISOString()
      };
      saveCategories([newCategory, ...categories]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      saveCategories(categories.filter(c => c.id !== id));
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.gender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark mb-1 tracking-wide">CATEGORIES</h1>
          <p className="text-brand-dark/70 text-sm">Manage product categories</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-dark text-brand-light px-4 py-2 hover:bg-brand-dark/90 transition-colors text-sm uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="bg-white shadow-sm border border-brand-tertiary/40">
        {/* Toolbar */}
        <div className="p-4 border-b border-brand-tertiary/40 bg-brand-bg/30">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
            <input 
              type="text" 
              placeholder="Search categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-brand-tertiary text-brand-dark text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-brand-bg/50 text-brand-dark font-medium border-b border-brand-tertiary/40 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-tertiary/20">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-brand-dark/60">
                    No categories found. Start by adding one.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-brand-bg/10 transition-colors">
                    <td className="px-6 py-4">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="w-12 h-16 object-cover border border-brand-tertiary/40" />
                      ) : (
                        <div className="w-12 h-16 bg-brand-tertiary/20 flex items-center justify-center text-brand-dark/30 border border-brand-tertiary/40">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-brand-dark">{cat.name}</td>
                    <td className="px-6 py-4">
                      <span className="text-brand-dark/80">
                        {cat.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-[200px] truncate text-brand-dark/70" title={cat.description}>
                      {cat.description || '-'}
                    </td>
                    <td className="px-6 py-4 text-brand-dark/60">
                      {new Date(cat.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => handleOpenModal(cat)}
                        className="text-brand-dark/60 hover:text-brand-primary transition-colors uppercase text-xs font-medium tracking-wider"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="text-brand-dark/60 hover:text-red-600 transition-colors uppercase text-xs font-medium tracking-wider"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingCategory ? "EDIT CATEGORY" : "ADD CATEGORY"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Category Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none bg-white"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none min-h-[100px] resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none"
              placeholder="https://..."
            />
            {formData.image && (
              <div className="mt-3">
                <img src={formData.image} alt="Preview" className="w-24 h-32 object-cover border border-brand-tertiary/40" onError={(e) => e.target.style.display='none'} />
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-brand-tertiary/40">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-brand-dark border border-brand-tertiary hover:bg-brand-bg transition-colors uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-brand-dark text-brand-light hover:bg-brand-dark/90 transition-colors uppercase tracking-wider"
            >
              {editingCategory ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
