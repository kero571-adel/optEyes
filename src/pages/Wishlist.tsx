import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useApp();
  const wishlistProducts = products.filter((p) => wishlist.some((w) => w.productId === p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Heart size={32} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 text-sm mb-6">Save your favorite frames to find them later.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors">
            Browse Frames <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">My Wishlist</h1>
        <p className="text-gray-500 text-sm mb-8">{wishlistProducts.length} saved frame{wishlistProducts.length !== 1 ? 's' : ''}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
