import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Opti<span className="text-teal">Vue</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Premium prescription eyeglasses crafted with precision, designed for comfort, and styled for you.
            </p>
            <div className="flex gap-3">
              {['Twitter', 'Instagram', 'Facebook'].map((social) => (
                <button key={social} className="w-9 h-9 rounded-full bg-gray-800 hover:bg-teal transition-colors flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white">
                  {social[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/shop', label: 'Shop All' },
                { to: '/orders', label: 'My Orders' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-teal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-4">Help</h3>
            <ul className="space-y-2.5">
              {['Shipping Info', 'Returns & Exchanges', 'Lens Guide', 'Frame Sizing', 'FAQ'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-gray-400 hover:text-teal transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={16} className="text-teal shrink-0" />
                hello@optivue.com
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={16} className="text-teal shrink-0" />
                (555) 123-4567
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-teal shrink-0 mt-0.5" />
                123 Vision Lane, Suite 100<br />New York, NY 10001
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 OptiVue. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer">Privacy Policy</span>
            <span className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
