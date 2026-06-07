import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/ui/Logo';
import { ArrowRight, ChevronRight, ShieldCheck, Leaf, Sparkles } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';

const HERO_IMAGES = [
  '/images/hero.png',
  '/images/hero2.png',
  '/images/hero3.png'
];

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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

    // Fetch Categories
    const savedCategories = localStorage.getItem('ub_categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories).slice(0, 3)); // show top 3
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
      <div className="relative flex items-center min-h-[85vh] sm:min-h-[100dvh] -mt-16 pt-16 overflow-hidden bg-brand-dark">
        {/* Background Carousel */}
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear ${
                index === currentImageIndex ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
            <div className="absolute inset-0 bg-black/40 sm:bg-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/90 via-black/60 sm:via-black/50 to-transparent"></div>
          </div>
        ))}

        {/* Hero Content - Left Aligned for Editorial Look */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-32 flex flex-col items-start animate-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards mt-12 sm:mt-0">
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-heading text-brand-light mb-8 sm:mb-6 tracking-tight leading-[1.15] max-w-4xl">
            Elegance, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-primary/80">
              Woven in Tradition
            </span>
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl text-brand-light/90 font-light tracking-wide max-w-2xl mb-12 sm:mb-10 leading-loose">
            Discover our meticulously crafted ethnic wear. A timeless blend of authentic Indian heritage and modern minimalist aesthetics.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 w-full sm:w-auto">
            <Link 
              to="/shop" 
              className="group relative flex items-center justify-center gap-3 px-8 py-4 sm:py-5 bg-brand-light text-brand-dark font-medium tracking-widest uppercase hover:bg-white transition-all overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-semibold">
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link 
              to="/auth" 
              className="group flex items-center justify-center gap-2 text-brand-light/80 hover:text-brand-light font-medium tracking-widest uppercase transition-colors text-xs sm:text-sm w-full sm:w-auto pb-1 border-b border-brand-light/30 hover:border-brand-light"
            >
              Join the Waitlist
              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
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
              />
            ))}
          </div>
        </section>
      )}

      {/* SHOP BY CATEGORY SECTION */}
      {categories.length > 0 && (
        <section className="py-24 bg-white border-t border-brand-tertiary/30 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-brand-dark/50 font-medium tracking-[0.2em] uppercase text-sm mb-2 block">
                Explore
              </span>
              <h2 className="text-4xl md:text-5xl font-heading text-brand-dark">
                Shop by Category
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-10">
              {categories.map((category) => (
                <Link 
                  key={category.id} 
                  to="/shop" 
                  className="group relative aspect-[4/5] sm:h-[70vh] overflow-hidden flex items-center justify-center bg-brand-tertiary/20"
                >
                  <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-brand-dark/30 transition-colors duration-700 z-10" />
                  <div className="relative z-20 text-center p-4 sm:p-6 border border-white/20 bg-white/10 backdrop-blur-md group-hover:bg-white/20 transition-colors duration-500 w-4/5 max-w-[200px] sm:max-w-none">
                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl text-white tracking-widest uppercase mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 font-medium tracking-widest text-[10px] sm:text-xs uppercase flex items-center justify-center gap-1 group-hover:gap-3 transition-all">
                      Explore <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
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
    </div>
  );
}
