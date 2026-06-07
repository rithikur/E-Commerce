export default function ProductCard({ product }) {
  return (
    <div className="group flex flex-col cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-tertiary/20 mb-4">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-dark/20 font-medium">
            NO IMAGE
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <span className="bg-brand-dark text-brand-light text-xs font-semibold uppercase tracking-wider px-2 py-1">
              Featured
            </span>
          )}
          {product.stock <= 0 && (
            <span className="bg-red-600 text-white text-xs font-semibold uppercase tracking-wider px-2 py-1">
              Out of Stock
            </span>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/10 transition-colors duration-300" />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1">
        <h3 className="font-heading font-medium text-lg text-brand-dark tracking-wide mb-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-brand-dark/60 mb-2">
          {product.gender}
        </p>

        <div className="mt-auto flex items-center gap-2">
          <span className="text-brand-dark font-medium">
            ₹{product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-brand-dark/40 text-sm line-through">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
