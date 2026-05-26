import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Heart, Package, Search } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getCartCount, wishlist } = useApp();
  const location = useLocation();
  const cartCount = getCartCount();

  const links = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/orders", label: "Orders" },
    { to: "/about", label: "About" },
    { to: "/wishlist", label: "wishlist" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Opti<span className="text-teal">Vue</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive(link.to)
                    ? "text-teal"
                    : "text-gray-600 hover:text-teal"
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-500 hover:text-teal transition-colors hidden sm:block"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/orders"
              className="relative p-2 text-gray-500 hover:text-teal transition-colors hidden sm:block"
            >
              <Package size={20} />
            </Link>
            <Link
              to="/cart"
              className="relative p-2 text-gray-500 hover:text-teal transition-colors"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-teal text-white text-[10px] font-bold rounded-full flex items-center justify-center badge-animate">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-teal transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "bg-teal-50 text-teal"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
