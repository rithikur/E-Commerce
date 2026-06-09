import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Pencil, Trash2, Search, ImageIcon, Star, Upload, X } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import Modal from '../../components/ui/Modal';

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    gender: 'Unisex',
    sizes: [],
    price: '',
    originalPrice: '',
    stock: '',
    description: '',
    image: '',
    featured: false,
    uploadedImages: []
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem('ub_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));

    const savedCategories = localStorage.getItem('ub_categories');
    if (savedCategories) {
      const parsedCats = JSON.parse(savedCategories);
      setCategories(parsedCats);
      if (parsedCats.length > 0) {
        setFormData(prev => ({ ...prev, categoryId: parsedCats[0].id }));
      }
    }
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('ub_products', JSON.stringify(newProducts));
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        categoryId: product.categoryId,
        gender: product.gender,
        sizes: product.sizes || [],
        price: product.price,
        originalPrice: product.originalPrice || '',
        stock: product.stock,
        description: product.description,
        image: product.image,
        featured: product.featured || false,
        uploadedImages: product.uploadedImages || []
      });
    } else {
      setEditingProduct(null);
      setFormData({ 
        name: '', 
        categoryId: categories.length > 0 ? categories[0].id : '', 
        gender: 'Unisex', 
        sizes: [], 
        price: '', 
        originalPrice: '', 
        stock: '', 
        description: '', 
        image: '', 
        featured: false,
        uploadedImages: []
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      stock: parseInt(formData.stock, 10),
    };

    if (editingProduct) {
      const updated = products.map(p => 
        p.id === editingProduct.id ? { ...p, ...formattedData } : p
      );
      saveProducts(updated);
    } else {
      const newProduct = {
        id: `prod_${Date.now()}_${uuidv4().substring(0,6)}`,
        ...formattedData,
        createdAt: new Date().toISOString()
      };
      saveProducts([newProduct, ...products]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      saveProducts(products.filter(p => p.id !== id));
    }
  };

  const toggleSize = (size) => {
    setFormData(prev => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          uploadedImages: [...prev.uploadedImages, {
            id: uuidv4(),
            data: event.target.result,
            name: file.name
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeUploadedImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter(img => img.id !== imageId)
    }));
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (id) => {
    return categories.find(c => c.id === id)?.name || 'Unknown';
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark mb-1 tracking-wide">PRODUCTS</h1>
          <p className="text-brand-dark/70 text-sm">Manage inventory and details</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-brand-dark text-brand-light px-4 py-2 hover:bg-brand-dark/90 transition-colors text-sm uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="bg-white shadow-sm border border-brand-tertiary/40">
        {/* Toolbar */}
        <div className="p-4 border-b border-brand-tertiary/40 bg-brand-bg/30 flex flex-col md:flex-row gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/40" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-brand-tertiary text-brand-dark text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-2 bg-white border border-brand-tertiary text-brand-dark text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none"
          >
            <option value="All">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-brand-bg/50 text-brand-dark font-medium border-b border-brand-tertiary/40 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-tertiary/20">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-brand-dark/60">
                    No products found. Add some inventory to start.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-brand-bg/10 transition-colors">
                    <td className="px-6 py-4">
                      {prod.image ? (
                        <img src={prod.image} alt={prod.name} className="w-12 h-16 object-cover border border-brand-tertiary/40" />
                      ) : (
                        <div className="w-12 h-16 bg-brand-tertiary/20 flex items-center justify-center text-brand-dark/30 border border-brand-tertiary/40">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-brand-dark">{prod.name}</td>
                    <td className="px-6 py-4 text-brand-dark/80">{getCategoryName(prod.categoryId)}</td>
                    <td className="px-6 py-4 text-brand-dark">
                      ₹{prod.price.toFixed(2)}
                      {prod.originalPrice && <span className="text-brand-dark/40 line-through ml-2 text-xs">₹{prod.originalPrice.toFixed(2)}</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium ${prod.stock > 10 ? 'bg-green-100 text-green-800' : prod.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {prod.stock > 0 ? `${prod.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {prod.featured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => handleOpenModal(prod)}
                        className="text-brand-dark/60 hover:text-brand-primary transition-colors uppercase text-xs font-medium tracking-wider"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(prod.id)}
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
        title={editingProduct ? "EDIT PRODUCT" : "ADD PRODUCT"}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-brand-dark mb-1">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Category</label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none bg-white"
              >
                <option value="" disabled>Select Category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
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
              <label className="block text-sm font-medium text-brand-dark mb-1">Price (₹)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Original Price (₹) <span className="text-brand-dark/50 font-normal">(Optional)</span></label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.originalPrice}
                onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-brand-dark mb-1">Available Sizes</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SIZES.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`w-10 h-10 border flex items-center justify-center text-sm font-medium transition-colors ${
                      formData.sizes.includes(size)
                        ? 'bg-brand-dark text-white border-brand-dark'
                        : 'bg-white text-brand-dark border-brand-tertiary hover:border-brand-dark'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Stock Quantity</label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none"
              />
            </div>

            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-brand-tertiary"
                />
                <span className="text-sm font-medium text-brand-dark">Feature on storefront</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-brand-dark mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-none min-h-[80px] resize-y"
              />
            </div>

            <div className="md:col-span-2">
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-brand-dark mb-1">Or Upload Image Files</label>
              <div className="border-2 border-dashed border-brand-tertiary/50 hover:border-brand-primary transition-colors p-4 rounded-none bg-brand-bg/20">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="product-file-input"
                />
                <label
                  htmlFor="product-file-input"
                  className="flex flex-col items-center justify-center cursor-pointer gap-2"
                >
                  <Upload className="w-6 h-6 text-brand-dark/40" />
                  <span className="text-sm font-medium text-brand-dark/60">Click to upload or drag images here</span>
                  <span className="text-xs text-brand-dark/40">Supports: JPG, PNG, GIF, WebP - Upload multiple images</span>
                </label>
              </div>

              {formData.uploadedImages.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-medium text-brand-dark/70 mb-3 uppercase">Uploaded Files ({formData.uploadedImages.length})</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {formData.uploadedImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.data}
                          alt={img.name}
                          className="w-full h-24 object-cover border border-brand-tertiary/40"
                        />
                        <button
                          type="button"
                          onClick={() => removeUploadedImage(img.id)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <p className="text-xs text-brand-dark/60 mt-1 truncate">{img.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-brand-tertiary/40 mt-6">
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
              {editingProduct ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
