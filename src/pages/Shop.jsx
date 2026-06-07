import { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const savedProducts = localStorage.getItem('ub_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));

    const savedCategories = localStorage.getItem('ub_categories');
    if (savedCategories) setCategories(JSON.parse(savedCategories));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === 'All' || p.categoryId === selectedCategory;
      const matchGen = selectedGender === 'All' || p.gender === selectedGender;
      const matchPrice = p.price <= maxPrice;
      return matchCat && matchGen && matchPrice;
    });
  }, [products, selectedCategory, selectedGender, maxPrice]);

  const genders = ['All', 'Men', 'Women', 'Kids', 'Unisex'];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full animate-in fade-in duration-700">
        <div className="flex justify-between items-end mb-8 border-b border-brand-tertiary/40 pb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-semibold text-brand-dark tracking-wide">
              SHOP COLLECTION
            </h1>
            <p className="text-brand-dark/70 mt-2 font-light">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
            </p>
          </div>
          <button 
            className="md:hidden flex items-center gap-2 text-sm font-medium tracking-widest uppercase border border-brand-dark px-4 py-2"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`w-full md:w-64 space-y-8 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
            {/* Category Filter */}
            <div>
              <h3 className="font-heading font-semibold text-lg tracking-wide border-b border-brand-tertiary/40 pb-2 mb-4">
                CATEGORY
              </h3>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className={`text-sm tracking-wide ${selectedCategory === 'All' ? 'font-semibold text-brand-dark' : 'text-brand-dark/70 hover:text-brand-dark'}`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map(c => (
                  <li key={c.id}>
                    <button 
                      onClick={() => setSelectedCategory(c.id)}
                      className={`text-sm tracking-wide ${selectedCategory === c.id ? 'font-semibold text-brand-dark' : 'text-brand-dark/70 hover:text-brand-dark'}`}
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gender Filter */}
            <div>
              <h3 className="font-heading font-semibold text-lg tracking-wide border-b border-brand-tertiary/40 pb-2 mb-4">
                GENDER
              </h3>
              <ul className="space-y-3">
                {genders.map(g => (
                  <li key={g}>
                    <button 
                      onClick={() => setSelectedGender(g)}
                      className={`text-sm tracking-wide uppercase ${selectedGender === g ? 'font-semibold text-brand-dark' : 'text-brand-dark/70 hover:text-brand-dark'}`}
                    >
                      {g}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-heading font-semibold text-lg tracking-wide border-b border-brand-tertiary/40 pb-2 mb-4">
                MAX PRICE: ₹{maxPrice}
              </h3>
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-dark h-1 bg-brand-tertiary/40 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-brand-dark/60 mt-2">
                <span>₹0</span>
                <span>₹10000+</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-brand-tertiary/40">
                <h3 className="font-heading text-xl text-brand-dark mb-2">No products found</h3>
                <p className="text-brand-dark/60">Try adjusting your filters to see more results.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedGender('All');
                    setMaxPrice(10000);
                  }}
                  className="mt-6 border-b border-brand-dark pb-1 text-sm font-medium tracking-widest uppercase hover:text-brand-primary hover:border-brand-primary transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
