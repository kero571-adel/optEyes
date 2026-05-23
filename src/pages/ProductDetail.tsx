import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Check, ArrowLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const lensInfo: Record<string, { price: number; desc: string }> = {
  'Single Vision': { price: 0, desc: 'Standard single focal point correction for near or farsightedness.' },
  'Progressive': { price: 50, desc: 'Seamless multi-focal lenses for near, intermediate, and distance vision.' },
  'Blue Light': { price: 30, desc: 'Filters harmful blue light from screens. Ideal for digital device users.' },
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [selectedLens, setSelectedLens] = useState('Single Vision');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <Link to="/shop" className="text-teal font-medium hover:text-teal-dark">Browse all frames →</Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const totalPrice = (product.price + lensInfo[selectedLens].price) * quantity;
  const related = products.filter((p) => p.id !== product.id && (p.shape === product.shape || p.color === product.color)).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedLens, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="hover:text-teal">Home</Link>
            <ChevronRight size={14} />
            <Link to="/shop" className="hover:text-teal">Shop</Link>
            <ChevronRight size={14} />
            <span className="text-gray-600">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-teal mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl h-80 sm:h-96 lg:h-[500px] flex items-center justify-center relative overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.originalPrice && (
              <span className="absolute top-5 left-5 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full">
                Save ${product.originalPrice - product.price}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-5 right-5 p-3 rounded-full transition-all ${
                inWishlist ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Frame specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Shape', value: product.shape },
                { label: 'Color', value: product.color },
                { label: 'Material', value: product.material },
                { label: 'Gender', value: product.gender },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl px-4 py-3">
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>

            {/* Lens Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Lens Type</h3>
              <div className="space-y-2">
                {product.lensOptions.map((lens) => (
                  <button
                    key={lens}
                    onClick={() => setSelectedLens(lens)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border-2 transition-all text-left ${
                      selectedLens === lens
                        ? 'border-teal bg-teal-50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedLens === lens ? 'border-teal' : 'border-gray-300'
                      }`}>
                        {selectedLens === lens && <div className="w-2.5 h-2.5 rounded-full bg-teal" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{lens}</p>
                        <p className="text-xs text-gray-400">{lensInfo[lens].desc}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-600 shrink-0 ml-3">
                      {lensInfo[lens].price === 0 ? 'Included' : `+$${lensInfo[lens].price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-500 hover:bg-gray-50 transition-colors font-medium"
                >
                  −
                </button>
                <span className="px-4 py-3 text-sm font-semibold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-500 hover:bg-gray-50 transition-colors font-medium"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all ${
                  added ? 'bg-green-500' : 'bg-teal hover:bg-teal-dark shadow-lg shadow-teal/20'
                }`}
              >
                {added ? (
                  <><Check size={18} /> Added to Cart!</>
                ) : (
                  <><ShoppingCart size={18} /> Add to Cart — ${totalPrice}</>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
              {['Free Shipping', '30-Day Returns', '1-Year Warranty'].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Check size={14} className="text-teal" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
