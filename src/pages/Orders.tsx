import { Link } from 'react-router-dom';
import { Package, ShoppingBag, ArrowRight, Clock, Truck, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  'Processing': { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  'Shipped': { icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
  'Delivered': { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
};

export default function Orders() {
  const { orders } = useApp();

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Package size={32} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 text-sm mb-6">When you place an order, it will appear here.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors">
            <ShoppingBag size={16} /> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">My Orders</h1>
        <p className="text-gray-500 text-sm mb-8">{orders.length} order{orders.length !== 1 ? 's' : ''} total</p>

        <div className="space-y-4">
          {orders.map((order) => {
            const config = statusConfig[order.status] || statusConfig['Processing'];
            const StatusIcon = config.icon;
            const date = new Date(order.date);
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="p-5 sm:p-6 border-b border-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-sm font-bold text-gray-900">{order.id}</span>
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
                          <StatusIcon size={12} />
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Placed on {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">{order.items.reduce((s, i) => s + i.quantity, 0)} item{order.items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-5 sm:p-6">
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={`${item.product.id}-${item.lensType}`} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-gray-400">{item.lensType} · Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-semibold text-gray-700 shrink-0">${item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping info */}
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      <span className="font-medium text-gray-500">Ship to:</span> {order.customer.name}, {order.customer.city}, {order.customer.state}
                    </div>
                    <Link to={`/order-confirmation/${order.id}`} className="text-xs font-semibold text-teal hover:text-teal-dark flex items-center gap-1">
                      Details <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
