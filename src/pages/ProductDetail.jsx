import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('ub_products') || '[]');
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      if (found.sizes?.length > 0) {
        setSelectedSize(found.sizes[0]);
      }
    } else {
      navigate('/shop');
    }
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;
    
    const cart = JSON.parse(localStorage.getItem('ub_cart') || '[]');
    
    // Check if item with same size already exists
    const existingIndex = cart.findIndex(item => item.productId === product.id && item.selectedSize === selectedSize);
    
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        selectedSize,
        quantity: 1
      });
    }
    
    localStorage.setItem('ub_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart_updated'));
    navigate('/cart');
  };

  if (!product) return null;

  return (
    <div className="animate-in fade-in duration-700">
      {/* Mobile Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 lg:py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-brand-dark/60 hover:text-brand-dark uppercase tracking-widest text-xs font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pb-12 lg:pb-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
          {/* Image Section - Flush on mobile, rounded/padded on desktop */}
          <div className="w-full lg:w-1/2 aspect-[4/5] sm:aspect-[3/4] bg-brand-tertiary/20">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover sm:rounded-sm"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand-dark/30">
                No Image
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-0">
            <div className="mb-3 uppercase tracking-widest text-brand-dark/50 text-[10px] sm:text-xs font-bold">
              {product.gender}
            </div>
          
          <h1 className="text-4xl md:text-5xl font-heading text-brand-dark tracking-wide mb-6">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-brand-tertiary/40">
            <span className="text-2xl text-brand-dark font-medium">
              ₹{product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-brand-dark/40 text-lg line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.stock <= 0 && (
              <span className="ml-auto bg-red-600 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
                Out of Stock
              </span>
            )}
          </div>

          <div className="prose prose-sm text-brand-dark/80 mb-10 max-w-none font-light leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm font-medium tracking-widest uppercase text-brand-dark">Select Size</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center text-sm font-medium transition-all ${
                      selectedSize === size 
                        ? 'bg-brand-dark text-white border-2 border-brand-dark scale-105' 
                        : 'border border-brand-tertiary/60 text-brand-dark hover:border-brand-dark'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto">
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`w-full py-5 flex items-center justify-center gap-3 font-medium tracking-widest uppercase transition-colors ${
                product.stock > 0 
                  ? 'bg-brand-dark text-brand-light hover:bg-brand-dark/90 shadow-xl shadow-brand-dark/10' 
                  : 'bg-brand-tertiary/40 text-brand-dark/40 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {product.stock > 0 ? 'Add to Bag' : 'Sold Out'}
            </button>
            <div className="mt-6 flex flex-col gap-2 text-center text-xs tracking-wider text-brand-dark/50 uppercase font-medium">
              <p>Free Standard Shipping over ₹10,000</p>
              <p>14-Day Easy Returns</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
