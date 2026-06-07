import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/ui/Logo';
import { ArrowRight, ChevronRight, ShieldCheck, Leaf, Sparkles } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import ProductDetailsModal from '../components/ui/ProductDetailsModal';

const HERO_IMAGES = [
  '/images/hero.png',
  '/images/hero2.png',
  '/images/hero3.png'
];

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Initial load animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Carousel interval
    const carouselTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    // Fetch Featured Products
    const savedProducts = localStorage.getItem('ub_products');
    if (savedProducts) {
      const allProducts = JSON.parse(savedProducts);
      const featured = allProducts.filter(p => p.featured === true).slice(0, 4);
      setFeaturedProducts(featured);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(carouselTimer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-brand-bg">
        <Logo className="w-12 h-12 animate-pulse text-brand-dark" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-brand-bg">
      {/* HERO SECTION */}
      <div className="relative flex items-center min-h-[100dvh] -mt-16 pt-16 overflow-hidden bg-brand-dark">
        {/* Background Carousel */}
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className={`absolute inset-0 bg-cover bg-top sm:bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear ${
                index === currentImageIndex ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
          </div>
        ))}

        {/* Hero Content - Left Aligned for Editorial Look */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-start animate-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
          
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-heading text-brand-light mb-6 tracking-tight leading-[1.1] max-w-4xl">
            Elegance, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-primary/80">
              Woven in Tradition
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-brand-light/80 font-light tracking-wide max-w-2xl mb-12 leading-relaxed">
            Discover our meticulously crafted ethnic wear. A timeless blend of authentic Indian heritage and modern minimalist aesthetics.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link 
              to="/shop" 
              className="group relative flex items-center justify-center gap-3 px-8 py-5 bg-brand-light text-brand-dark font-medium tracking-widest uppercase hover:bg-white transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Collection
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link 
              to="/auth" 
              className="group flex items-center justify-center gap-3 px-8 py-5 bg-transparent border border-brand-light/50 text-brand-light font-medium tracking-widest uppercase hover:bg-white/10 hover:border-brand-light transition-colors backdrop-blur-sm"
            >
              Join the Waitlist
              <ChevronRight className="w-4 h-4 opacity-0 -ml-4 transition-all group-hover:opacity-100 group-hover:ml-0" />
            </Link>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 left-4 sm:left-8 flex gap-3 z-20">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1 transition-all duration-500 ${
                  idx === currentImageIndex ? 'w-12 bg-brand-light' : 'w-4 bg-brand-light/30 hover:bg-brand-light/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED COLLECTION SECTION */}
      {featuredProducts.length > 0 && (
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-brand-dark/50 font-medium tracking-[0.2em] uppercase text-sm mb-2 block">
                Curated Selection
              </span>
              <h2 className="text-4xl md:text-5xl font-heading text-brand-dark">
                Featured Collection
              </h2>
            </div>
            <Link 
              to="/shop"
              className="group flex items-center gap-2 text-brand-dark tracking-widest uppercase text-sm font-medium border-b border-brand-dark pb-1 hover:text-brand-primary hover:border-brand-primary transition-colors mt-6 md:mt-0"
            >
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={setSelectedProduct} 
              />
            ))}
          </div>
        </section>
      )}

      {/* BRAND PROMISE SECTION */}
      <section className="py-24 bg-brand-tertiary/10 border-t border-b border-brand-tertiary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-brand-dark/20 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-brand-dark" />
              </div>
              <h3 className="text-xl font-heading text-brand-dark mb-4">Artisan Crafted</h3>
              <p className="text-brand-dark/70 font-light leading-relaxed">
                Every piece is meticulously handcrafted by generational artisans ensuring unparalleled attention to detail.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-brand-dark/20 flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6 text-brand-dark" />
              </div>
              <h3 className="text-xl font-heading text-brand-dark mb-4">Heritage Materials</h3>
              <p className="text-brand-dark/70 font-light leading-relaxed">
                Sourced from the finest silk and cotton weavers across India, celebrating authentic, sustainable textiles.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-brand-dark/20 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-brand-dark" />
              </div>
              <h3 className="text-xl font-heading text-brand-dark mb-4">Premium Guarantee</h3>
              <p className="text-brand-dark/70 font-light leading-relaxed">
                We stand by our quality. Enjoy secure global shipping and a flawless customer experience.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      <ProductDetailsModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </div>
  );
}
