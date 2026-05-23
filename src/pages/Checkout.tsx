import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

const lensPrice: Record<string, number> = {
  'Single Vision': 0,
  'Progressive': 50,
  'Blue Light': 30,
};

export default function Checkout() {
  const { cart, getCartTotal, placeOrder } = useApp();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = getCartTotal();
  const shipping = total >= 99 ? 0 : 9.99;
  const grandTotal = total + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Nothing to checkout</h2>
          <p className="text-gray-500 text-sm mb-6">Add some frames to your cart first.</p>
          <Link to="/shop" className="px-6 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors">
            Browse Frames
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.zip.trim()) newErrors.zip = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      const orderId = placeOrder(form);
      navigate(`/order-confirmation/${orderId}`);
    }, 1500);
  };

  const InputField = ({ label, name, type = 'text', placeholder }: { label: string; name: string; type?: string; placeholder: string }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={(form as Record<string, string>)[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors[name] ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-teal/20'
        } focus:outline-none focus:border-teal focus:ring-2 text-sm transition-all`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-teal mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-5">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Full Name" name="name" placeholder="John Doe" />
                  <InputField label="Email" name="email" type="email" placeholder="john@example.com" />
                  <InputField label="Phone" name="phone" type="tel" placeholder="(555) 123-4567" />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-5">Shipping Address</h2>
                <div className="space-y-4">
                  <InputField label="Street Address" name="address" placeholder="123 Main Street, Apt 4B" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <InputField label="City" name="city" placeholder="New York" />
                    <InputField label="State" name="state" placeholder="NY" />
                    <InputField label="ZIP Code" name="zip" placeholder="10001" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-4">Payment</h2>
                <div className="bg-teal-50 rounded-xl p-4 flex items-start gap-3">
                  <ShieldCheck size={20} className="text-teal shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Secure Demo Checkout</p>
                    <p className="text-xs text-gray-500 mt-0.5">This is a demo. No real payment will be processed. Your order will be saved locally.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.lensType}`} className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-medium line-clamp-1 text-xs">{item.product.name}</p>
                        <p className="text-gray-400 text-xs">{item.lensType} × {item.quantity}</p>
                      </div>
                      <span className="font-medium text-gray-900 text-xs shrink-0">
                        ${((item.product.price + (lensPrice[item.lensType] || 0)) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span><span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? <span className="text-teal font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                    <span>Total</span><span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full mt-6 py-3.5 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    submitting
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-teal hover:bg-teal-dark shadow-lg shadow-teal/20'
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check size={18} /> Place Order — ${grandTotal.toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
