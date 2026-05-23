import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, RotateCcw, Star, Eye } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products, categories, testimonials } from '../data/products';

export default function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div>
      <Hero />

      {/* Features Strip */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, text: 'Free Shipping', sub: 'On orders $99+' },
              { icon: Shield, text: '1-Year Warranty', sub: 'Full coverage' },
              { icon: RotateCcw, text: '30-Day Returns', sub: 'Hassle-free' },
              { icon: Eye, text: 'Rx Verified', sub: 'Licensed opticians' },
            ].map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-teal" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{text}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-teal font-semibold text-sm mb-1 tracking-wide uppercase">Bestsellers</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Eyeglasses</h2>
            </div>
            <Link to="/shop" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-teal hover:text-teal-dark transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-teal">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-teal font-semibold text-sm mb-1 tracking-wide uppercase">Browse By</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frame Shapes</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/shop?shape=${cat.name}`}
                className="group bg-white rounded-2xl p-6 text-center hover:shadow-lg hover:shadow-gray-100/80 transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-teal transition-colors">{cat.name}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{cat.count} styles</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lens Options Banner */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal to-teal-dark rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-20 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Customize Your Lenses
              </h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                Choose from Single Vision, Progressive, or Blue Light filtering lenses. 
                Every pair is crafted by licensed opticians with precision lab equipment.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {['Single Vision', 'Progressive', 'Blue Light'].map((lens) => (
                  <span key={lens} className="px-4 py-2 bg-white/15 rounded-full text-sm font-medium backdrop-blur-sm">
                    {lens}
                  </span>
                ))}
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal font-semibold rounded-full hover:bg-gray-50 transition-colors"
              >
                Browse Frames <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-teal font-semibold text-sm mb-1 tracking-wide uppercase">Reviews</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                    <span className="text-teal font-bold text-xs">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Stay in Focus</h2>
          <p className="text-gray-500 mb-8">Get exclusive offers, new frame alerts, and vision care tips.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 text-sm"
            />
            <button className="px-6 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
