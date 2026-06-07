import { useState, useEffect } from 'react';
import { Eye, Pencil, Trash2, Search, User } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import Modal from '../../components/ui/Modal';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false); // true if only viewing
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const savedCustomers = localStorage.getItem('ub_customers');
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
  }, []);

  const saveCustomers = (newCustomers) => {
    setCustomers(newCustomers);
    localStorage.setItem('ub_customers', JSON.stringify(newCustomers));
  };

  const handleOpenModal = (customer, isViewOnly = false) => {
    setEditingCustomer(customer);
    setViewMode(isViewOnly);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewMode) {
      setIsModalOpen(false);
      return;
    }

    const updated = customers.map(c => 
      c.id === editingCustomer.id ? { ...c, ...formData } : c
    );
    saveCustomers(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      saveCustomers(customers.filter(c => c.id !== id));
      
      // If the admin deletes the currently logged-in customer, we should ideally invalidate their session,
      // but since they are in admin context, we just handle the data deletion.
    }
  };

  const filteredCustomers = customers.filter(c => {
    const query = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(query) || 
           c.email.toLowerCase().includes(query) ||
           (c.phone && c.phone.includes(query));
  });

  const formatDate = (isoString) => {
    if (!isoString) return 'Unknown';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark mb-1 tracking-wide">CUSTOMERS</h1>
          <p className="text-brand-dark/70 text-sm">Manage registered users</p>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-brand-tertiary/40">
        <div className="p-4 border-b border-brand-tertiary/40 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-brand-tertiary text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-brand-dark/40" />
          </div>
          <div className="text-sm text-brand-dark/60 font-medium uppercase tracking-wider">
            Total: {filteredCustomers.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-bg text-brand-dark uppercase text-xs tracking-wider border-b border-brand-tertiary/40">
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-tertiary/20">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-brand-dark/50">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-brand-bg/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-tertiary/20 rounded-full flex items-center justify-center text-brand-dark">
                          <User className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-brand-dark">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-brand-dark">{customer.email}</div>
                      <div className="text-xs text-brand-dark/60 mt-1">{customer.phone || 'No phone'}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-dark/80">
                      {formatDate(customer.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(customer, true)}
                          className="p-2 text-brand-dark/60 hover:text-brand-dark hover:bg-brand-tertiary/20 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal(customer, false)}
                          className="p-2 text-brand-dark/60 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Customer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="p-2 text-brand-dark/60 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Customer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
        title={viewMode ? "Customer Details" : "Edit Customer"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Name</label>
            <input
              type="text"
              required
              disabled={viewMode}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:bg-brand-bg/50 disabled:text-brand-dark/60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Email</label>
            <input
              type="email"
              required
              disabled={viewMode}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:bg-brand-bg/50 disabled:text-brand-dark/60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark mb-1">Phone</label>
            <input
              type="tel"
              disabled={viewMode}
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-3 py-2 border border-brand-tertiary text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary disabled:bg-brand-bg/50 disabled:text-brand-dark/60"
            />
          </div>

          {viewMode && editingCustomer && (
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1">Joined Date</label>
              <input
                type="text"
                disabled
                value={formatDate(editingCustomer.createdAt)}
                className="w-full px-3 py-2 border border-brand-tertiary bg-brand-bg/50 text-brand-dark/60"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-brand-dark border border-brand-tertiary hover:bg-brand-bg transition-colors uppercase tracking-wider"
            >
              {viewMode ? 'Close' : 'Cancel'}
            </button>
            {!viewMode && (
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-brand-light bg-brand-dark hover:bg-brand-dark/90 transition-colors uppercase tracking-wider"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
