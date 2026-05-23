import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100/80 transition-all duration-300 hover:-translate-y-1">
      {/* Image Area */}
      <div className="relative h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Sale badge */}
        {product.originalPrice && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
        
        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            inWishlist 
              ? 'bg-red-50 text-red-500' 
              : 'bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500'
          }`}
        >
          <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Quick add */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product, 'Single Vision'); }}
          className="absolute bottom-3 right-3 p-2.5 bg-teal text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-teal-dark shadow-lg"
          title="Quick add to cart"
        >
          <ShoppingCart size={16} />
        </button>
      </div>

      {/* Info */}
      <Link to={`/product/${product.id}`} className="block p-4">
        <div className="flex items-center gap-1 mb-1.5">
          <Star size={13} className="text-amber-400 fill-amber-400" />
          <span className="text-xs text-gray-500 font-medium">{product.rating} ({product.reviews})</span>
        </div>
        <h3 className="font-semibold text-gray-900 text-sm mb-0.5 group-hover:text-teal transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mb-2">{product.shape} · {product.material} · {product.color}</p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
