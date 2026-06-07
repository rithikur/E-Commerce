import { useState, useEffect } from 'react';
import { Search, Package, CheckCircle2, Truck, Inbox, Edit2 } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Edit Status Modal State
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem('ub_orders') || '[]');
    // Sort newest first
    savedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setOrders(savedOrders);
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    const newStatus = e.target.status.value;
    
    const updatedOrders = orders.map(o => {
      if (o.id === editingOrder.id) {
        return { ...o, status: newStatus };
      }
      return o;
    });

    localStorage.setItem('ub_orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    setEditingOrder(null);
  };

  // Filter Logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': 
        return <span className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 w-fit"><Inbox className="w-3 h-3" /> Pending</span>;
      case 'processing': 
        return <span className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 w-fit"><Package className="w-3 h-3" /> Processing</span>;
      case 'shipped': 
        return <span className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 w-fit"><Truck className="w-3 h-3" /> Shipped</span>;
      case 'delivered': 
        return <span className="bg-green-100 text-green-700 border-green-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 w-fit"><CheckCircle2 className="w-3 h-3" /> Delivered</span>;
      default: 
        return <span className="bg-gray-100 text-gray-700 border-gray-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 w-fit">{status}</span>;
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-brand-dark tracking-wide">
            ORDERS
          </h1>
          <p className="text-brand-dark/60 mt-1 font-light">
            Manage customer orders and fulfillment
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-brand-tertiary/60 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark/40" />
          <input 
            type="text" 
            placeholder="Search by Order ID or Customer Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-brand-tertiary/60 bg-brand-bg/50 focus:border-brand-dark focus:outline-none transition-colors text-sm"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <label className="text-xs font-medium tracking-widest text-brand-dark/60 uppercase">Filter Status:</label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-brand-tertiary/60 bg-transparent py-2 px-4 focus:border-brand-dark focus:outline-none text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-brand-tertiary/60 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-bg border-b border-brand-tertiary/60 text-xs tracking-widest uppercase text-brand-dark/60">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-tertiary/40">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-brand-dark/50">
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-brand-tertiary/5 transition-colors">
                    <td className="p-4 font-medium text-brand-dark text-sm">{order.id}</td>
                    <td className="p-4 text-brand-dark/70 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="font-medium text-brand-dark text-sm">{order.shippingAddress.fullName}</div>
                      <div className="text-xs text-brand-dark/60">{order.shippingAddress.email}</div>
                    </td>
                    <td className="p-4 font-medium text-brand-dark text-sm">₹{order.total.toFixed(2)}</td>
                    <td className="p-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => setEditingOrder(order)}
                        className="p-2 text-brand-dark/60 hover:text-brand-dark hover:bg-brand-tertiary/20 transition-colors inline-flex items-center gap-1 text-xs uppercase tracking-wider font-medium"
                      >
                        <Edit2 className="w-4 h-4" /> Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Status Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md p-6 sm:p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading font-semibold text-xl text-brand-dark">Update Order Status</h3>
              <button 
                onClick={() => setEditingOrder(null)}
                className="text-brand-dark/50 hover:text-brand-dark transition-colors"
              >
                Cancel
              </button>
            </div>
            
            <div className="mb-6 bg-brand-bg p-4 border border-brand-tertiary/60">
              <p className="text-sm text-brand-dark/60 mb-1">Order ID</p>
              <p className="font-medium text-brand-dark">{editingOrder.id}</p>
            </div>

            <form onSubmit={handleUpdateStatus}>
              <div className="mb-8">
                <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-3">Status</label>
                <select 
                  name="status"
                  defaultValue={editingOrder.status}
                  className="w-full border border-brand-tertiary/60 bg-transparent p-3 focus:border-brand-dark focus:outline-none transition-colors"
                >
                  <option value="pending">Pending (Awaiting fulfillment)</option>
                  <option value="processing">Processing (Being packed)</option>
                  <option value="shipped">Shipped (On the way)</option>
                  <option value="delivered">Delivered (Completed)</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-brand-dark text-white font-medium tracking-widest uppercase hover:bg-brand-dark/90 transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
