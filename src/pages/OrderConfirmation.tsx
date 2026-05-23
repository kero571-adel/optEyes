import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useApp();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Order not found</h2>
          <Link to="/orders" className="text-teal font-medium hover:text-teal-dark">View all orders →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-gray-500">Thank you for your purchase, {order.customer.name.split(' ')[0]}!</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
            <div>
              <p className="text-xs text-gray-400">Order ID</p>
              <p className="font-mono text-sm font-bold text-gray-900">{order.id}</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-semibold">
              <Package size={12} />
              {order.status}
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={`${item.product.id}-${item.lensType}`} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                  <p className="text-xs text-gray-400">{item.lensType} × {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-bold text-gray-900 text-lg">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Shipping To</h3>
          <p className="text-sm text-gray-600">{order.customer.name}</p>
          <p className="text-sm text-gray-600">{order.customer.address}</p>
          <p className="text-sm text-gray-600">{order.customer.city}, {order.customer.state} {order.customer.zip}</p>
          <p className="text-sm text-gray-600">{order.customer.phone}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/orders" className="flex-1 py-3 text-center border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-teal hover:text-teal transition-all">
            View All Orders
          </Link>
          <Link to="/shop" className="flex-1 py-3 text-center bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark transition-colors flex items-center justify-center gap-2">
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
