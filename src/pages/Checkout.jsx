import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('ub_customer_session') || 'null');
    if (session) {
      setCustomer(session);
      setFormData(prev => ({
        ...prev,
        fullName: session.name || '',
        email: session.email || '',
        phone: session.phone || ''
      }));
    }

    const savedCart = JSON.parse(localStorage.getItem('ub_cart') || '[]');
    if (savedCart.length === 0) {
      navigate('/cart');
    } else {
      setCart(savedCart);
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal > 0 ? subtotal + shipping : 0;

  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Create new order
    const orders = JSON.parse(localStorage.getItem('ub_orders') || '[]');
    
    const newOrder = {
      id: `ord_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      customerId: customer?.id || 'guest',
      items: cart,
      subtotal,
      shipping,
      total,
      status: 'pending',
      shippingAddress: formData,
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    localStorage.setItem('ub_orders', JSON.stringify(orders));

    // Clear Cart
    localStorage.setItem('ub_cart', JSON.stringify([]));
    window.dispatchEvent(new Event('cart_updated'));

    // Redirect to Orders
    navigate('/my-orders', { state: { orderSuccess: true } });
  };

  if (cart.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:py-20 animate-in fade-in duration-700 w-full">
      <div className="mb-8 lg:mb-10">
        <Link to="/cart" className="inline-flex items-center gap-2 text-brand-dark/60 hover:text-brand-dark uppercase tracking-widest text-xs font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-20">
        
        {/* Checkout Form */}
        <div className="w-full lg:w-3/5">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold text-brand-dark tracking-wide mb-8">
            SECURE CHECKOUT
          </h1>

          <form onSubmit={handleCheckout} className="space-y-8">
            {/* Contact Info */}
            <div>
              <h2 className="text-lg font-heading font-medium text-brand-dark uppercase tracking-wider mb-4 pb-2 border-b border-brand-tertiary/40">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-brand-tertiary/60 p-3 focus:border-brand-dark focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-brand-tertiary/60 p-3 focus:border-brand-dark focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-brand-tertiary/60 p-3 focus:border-brand-dark focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div>
              <h2 className="text-lg font-heading font-medium text-brand-dark uppercase tracking-wider mb-4 pb-2 border-b border-brand-tertiary/40">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-brand-tertiary/60 p-3 focus:border-brand-dark focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-brand-tertiary/60 p-3 focus:border-brand-dark focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-brand-tertiary/60 p-3 focus:border-brand-dark focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-brand-dark/70 mb-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-brand-tertiary/60 p-3 focus:border-brand-dark focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h2 className="text-lg font-heading font-medium text-brand-dark uppercase tracking-wider mb-4 pb-2 border-b border-brand-tertiary/40">
                Payment Method
              </h2>
              <div className="p-4 border border-brand-tertiary/60 bg-brand-tertiary/5 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-4 border-brand-dark bg-white"></div>
                <span className="font-medium text-brand-dark">Cash on Delivery (COD)</span>
              </div>
              <p className="text-xs text-brand-dark/50 mt-2 tracking-wide">
                * Other payment methods are currently unavailable.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-brand-dark text-white font-medium tracking-widest uppercase hover:bg-brand-dark/90 transition-colors shadow-lg shadow-brand-dark/10 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary sidebar */}
        <div className="w-full lg:w-2/5">
          <div className="bg-brand-tertiary/10 p-8 border border-brand-tertiary/30 sticky top-24">
            <h2 className="text-xl font-heading font-semibold text-brand-dark tracking-wide mb-6 pb-4 border-b border-brand-tertiary/40">
              IN YOUR BAG
            </h2>
            
            <div className="max-h-[40vh] overflow-y-auto mb-6 pr-2 divide-y divide-brand-tertiary/30">
              {cart.map((item, index) => (
                <div key={index} className="py-4 flex gap-4">
                  <div className="w-16 h-20 bg-brand-tertiary/20 shrink-0">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading text-sm text-brand-dark line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-brand-dark/60 mt-1">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                    <p className="text-sm font-medium text-brand-dark mt-2">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm mb-6 pt-6 border-t border-brand-tertiary/40">
              <div className="flex justify-between text-brand-dark/80">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-dark/80">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-xl font-medium text-brand-dark pt-6 border-t border-brand-dark/20">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
