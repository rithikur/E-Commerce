import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight } from 'lucide-react';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('ub_cart') || '[]');
    setCart(savedCart);
    window.scrollTo(0, 0);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('ub_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cart_updated'));
  };

  const handleQuantityChange = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    updateCart(newCart);
  };

  const handleRemove = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    updateCart(newCart);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal > 0 ? subtotal + shipping : 0;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center animate-in fade-in duration-700">
        <h1 className="text-4xl font-heading text-brand-dark mb-6">Your Cart is Empty</h1>
        <p className="text-brand-dark/60 mb-10">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/shop"
          className="inline-flex items-center justify-center px-8 py-4 bg-brand-dark text-white font-medium tracking-widest uppercase hover:bg-brand-dark/90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 animate-in fade-in duration-700 w-full">
      <h1 className="text-3xl md:text-4xl font-heading font-semibold text-brand-dark tracking-wide mb-10">
        SHOPPING CART
      </h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-brand-tertiary/40 text-xs font-semibold tracking-widest uppercase text-brand-dark/50">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          <div className="divide-y divide-brand-tertiary/40">
            {cart.map((item, index) => (
              <div key={`${item.productId}-${item.selectedSize}-${index}`} className="py-6 flex flex-col md:grid md:grid-cols-12 gap-6 items-center">
                
                {/* Product Info */}
                <div className="col-span-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full">
                  <div className="w-full sm:w-24 aspect-[4/5] sm:h-32 bg-brand-tertiary/20 shrink-0">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg text-brand-dark mb-1">{item.name}</h3>
                    <p className="text-sm text-brand-dark/60 mb-2">Size: {item.selectedSize}</p>
                    <p className="text-sm font-medium text-brand-dark">₹{item.price.toFixed(2)}</p>
                    {/* Mobile Remove Button */}
                    <button 
                      onClick={() => handleRemove(index)}
                      className="md:hidden mt-3 text-xs tracking-wider uppercase text-red-600 hover:text-red-700 flex items-center gap-1 pb-1 border-b border-red-600/30 w-fit"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="col-span-3 flex justify-between md:justify-center w-full md:w-auto items-center mt-4 md:mt-0 pt-4 md:pt-0 border-t border-brand-tertiary/20 md:border-t-0">
                  <span className="md:hidden text-xs font-semibold uppercase tracking-widest text-brand-dark/50">Quantity</span>
                  <div className="flex items-center border border-brand-tertiary/60">
                    <button 
                      onClick={() => handleQuantityChange(index, -1)}
                      className="w-10 h-10 flex items-center justify-center text-brand-dark/70 hover:bg-brand-tertiary/20 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(index, 1)}
                      className="w-10 h-10 flex items-center justify-center text-brand-dark/70 hover:bg-brand-tertiary/20 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Total & Desktop Remove */}
                <div className="col-span-3 flex justify-between md:justify-end w-full md:w-auto items-center gap-6 mt-4 md:mt-0 pt-4 md:pt-0 border-t border-brand-tertiary/20 md:border-t-0">
                  <span className="md:hidden text-xs font-semibold uppercase tracking-widest text-brand-dark/50">Total</span>
                  <span className="text-lg font-medium text-brand-dark">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button 
                    onClick={() => handleRemove(index)}
                    className="hidden md:flex text-brand-dark/40 hover:text-red-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-brand-tertiary/10 p-8 border border-brand-tertiary/30 sticky top-24">
            <h2 className="text-xl font-heading font-semibold text-brand-dark tracking-wide mb-6 pb-4 border-b border-brand-tertiary/40">
              ORDER SUMMARY
            </h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-brand-dark/80">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-brand-dark/80">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-lg font-medium text-brand-dark mb-8 pt-6 border-t border-brand-tertiary/40">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 flex items-center justify-center gap-3 bg-brand-dark text-white font-medium tracking-widest uppercase hover:bg-brand-dark/90 transition-colors shadow-lg shadow-brand-dark/10"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
