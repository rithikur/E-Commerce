import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, Inbox } from 'lucide-react';

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const showSuccess = location.state?.orderSuccess;

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('ub_customer_session') || 'null');
    if (!session) return;

    const allOrders = JSON.parse(localStorage.getItem('ub_orders') || '[]');
    const myOrders = allOrders.filter(o => o.customerId === session.id);
    
    // Sort by newest first
    myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    setOrders(myOrders);
    window.scrollTo(0, 0);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Inbox className="w-5 h-5 text-orange-500" />;
      case 'processing': return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped': return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 animate-in fade-in duration-700 w-full">
      {showSuccess && (
        <div className="mb-10 p-6 bg-green-50 text-green-800 border border-green-200 flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="w-12 h-12 text-green-600 mb-4" />
          <h2 className="text-2xl font-heading font-semibold mb-2">Order Placed Successfully!</h2>
          <p className="text-green-700/80">Thank you for your purchase. We have received your order.</p>
        </div>
      )}

      <div className="flex justify-between items-end mb-10 pb-4 border-b border-brand-tertiary/40">
        <h1 className="text-3xl md:text-4xl font-heading font-semibold text-brand-dark tracking-wide">
          ORDER HISTORY
        </h1>
        <Link 
          to="/shop" 
          className="text-sm uppercase tracking-widest font-medium text-brand-dark border-b border-brand-dark pb-1 hover:text-brand-primary hover:border-brand-primary transition-colors"
        >
          Continue Shopping
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-brand-tertiary/5 border border-brand-tertiary/30">
          <Package className="w-12 h-12 mx-auto text-brand-dark/20 mb-4" />
          <h3 className="font-heading text-xl text-brand-dark mb-2">No orders found</h3>
          <p className="text-brand-dark/60">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-brand-tertiary/40 shadow-sm">
              <div className="p-6 border-b border-brand-tertiary/40 bg-brand-tertiary/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full text-sm">
                  <div>
                    <span className="block text-brand-dark/50 uppercase tracking-widest text-[10px] mb-1">Order Placed</span>
                    <span className="font-medium text-brand-dark">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="block text-brand-dark/50 uppercase tracking-widest text-[10px] mb-1">Total Amount</span>
                    <span className="font-medium text-brand-dark">₹{order.total.toFixed(2)}</span>
                  </div>
                  <div className="col-span-2 md:col-span-1 md:text-right">
                    <span className="block text-brand-dark/50 uppercase tracking-widest text-[10px] mb-1">Order Number</span>
                    <span className="font-medium text-brand-dark">{order.id}</span>
                  </div>
                  <div className="col-span-2 md:col-span-1 md:text-right flex items-center md:justify-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 divide-y divide-brand-tertiary/20">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-4 flex gap-6 items-center first:pt-0 last:pb-0">
                    <div className="w-20 h-24 bg-brand-tertiary/20 shrink-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-heading font-medium text-lg text-brand-dark mb-1">{item.name}</h4>
                        <p className="text-sm text-brand-dark/60">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                      </div>
                      <div className="text-brand-dark font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-brand-tertiary/40 bg-brand-tertiary/5 text-sm text-brand-dark/70">
                <span className="font-medium text-brand-dark">Shipping to:</span> {order.shippingAddress.fullName}, {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
