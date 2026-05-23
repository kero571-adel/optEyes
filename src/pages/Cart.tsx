import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const lensPrice: Record<string, number> = {
  'Single Vision': 0,
  'Progressive': 50,
  'Blue Light': 30,
};

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useApp();
  const total = getCartTotal();
  const shipping = total >= 99 ? 0 : 9.99;
  const grandTotal = total + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={32} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-sm mb-6">Looks like you haven't found your perfect pair yet.</p>
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
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({cart.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const itemPrice = item.product.price + (lensPrice[item.lensType] || 0);
              return (
                <div key={`${item.product.id}-${item.lensType}`} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 flex gap-4 sm:gap-6">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/product/${item.product.id}`} className="font-semibold text-gray-900 hover:text-teal transition-colors text-sm sm:text-base line-clamp-1">
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.product.shape} · {item.product.color} · {item.product.material}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal font-medium">
                            {item.lensType}
                          </span>
                          {lensPrice[item.lensType] > 0 && (
                            <span className="text-xs text-gray-400">+${lensPrice[item.lensType]}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.lensType)}
                        className="p-1.5 text-gray-300 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.lensType, item.quantity - 1)}
                          className="p-2 text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-semibold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.lensType, item.quantity + 1)}
                          className="p-2 text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold text-gray-900">${(itemPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-teal font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">Add ${(99 - total).toFixed(2)} more for free shipping</p>
                )}
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between font-bold text-gray-900 text-base">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full mt-6 py-3.5 bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark transition-colors text-center shadow-lg shadow-teal/20"
              >
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="block text-center text-sm text-gray-500 hover:text-teal mt-3 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
