import { X, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetailsModal({ isOpen, onClose, product }) {
  const [selectedSize, setSelectedSize] = useState('');

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-dark/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur text-brand-dark hover:bg-brand-dark hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section (Left) */}
        <div className="w-full md:w-1/2 bg-brand-tertiary/20 relative h-[40vh] md:h-[90vh]">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-dark/30">
              No Image
            </div>
          )}
        </div>

        {/* Details Section (Right) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto h-[50vh] md:h-[90vh] flex flex-col">
          <div className="mb-2 uppercase tracking-widest text-brand-dark/50 text-xs font-semibold">
            {product.gender}
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading text-brand-dark tracking-wide mb-4">
            {product.name}
          </h2>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-xl text-brand-dark font-medium">
              ₹{product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-brand-dark/40 line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.stock <= 0 && (
              <span className="ml-auto bg-red-600 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
                Out of Stock
              </span>
            )}
          </div>

          <div className="prose prose-sm text-brand-dark/80 mb-8 max-w-none font-light leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-medium tracking-widest uppercase text-brand-dark">Select Size</span>
                <button className="text-xs tracking-widest uppercase text-brand-dark/50 border-b border-brand-dark/30 hover:text-brand-dark transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-sm font-medium transition-colors ${
                      selectedSize === size 
                        ? 'bg-brand-dark text-white border-2 border-brand-dark' 
                        : 'border border-brand-tertiary/60 text-brand-dark hover:border-brand-dark'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-8 border-t border-brand-tertiary/40">
            <button
              onClick={() => alert("Cart functionality is currently under construction!")}
              disabled={product.stock <= 0}
              className={`w-full py-4 flex items-center justify-center gap-3 font-medium tracking-widest uppercase transition-colors ${
                product.stock > 0 
                  ? 'bg-brand-dark text-brand-light hover:bg-brand-dark/90' 
                  : 'bg-brand-tertiary/40 text-brand-dark/40 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {product.stock > 0 ? 'Add to Bag' : 'Sold Out'}
            </button>
            <p className="text-center mt-4 text-xs tracking-wider text-brand-dark/50 uppercase">
              Free Shipping & Returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
