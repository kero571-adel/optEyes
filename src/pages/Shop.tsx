import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const shapes = ['All', 'Round', 'Rectangle', 'Cat-Eye', 'Square', 'Oval'];
const colors = ['All', 'Gold', 'Black', 'Tortoise', 'Navy', 'Silver', 'Clear', 'Rose Gold'];
const materials = ['All', 'Titanium', 'Acetate', 'TR90', 'Metal', 'Mixed'];
const priceRanges = [
  { label: 'All', min: 0, max: 999 },
  { label: 'Under $120', min: 0, max: 119 },
  { label: '$120 - $150', min: 120, max: 150 },
  { label: '$150 - $180', min: 150, max: 180 },
  { label: '$180+', min: 180, max: 999 },
];
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialShape = searchParams.get('shape') || 'All';

  const [search, setSearch] = useState('');
  const [shape, setShape] = useState(initialShape);
  const [color, setColor] = useState('All');
  const [material, setMaterial] = useState('All');
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const s = searchParams.get('shape');
    if (s) setShape(s);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.color.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.shape.toLowerCase().includes(q)
      );
    }

    // Shape
    if (shape !== 'All') result = result.filter((p) => p.shape === shape);

    // Color
    if (color !== 'All') result = result.filter((p) => p.color === color);

    // Material
    if (material !== 'All') result = result.filter((p) => p.material === material);

    // Price
    const range = priceRanges[priceRange];
    result = result.filter((p) => p.price >= range.min && p.price <= range.max);

    // Sort
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': result.sort((a, b) => b.reviews - a.reviews); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [search, shape, color, material, priceRange, sort]);

  const activeFilterCount = [shape !== 'All', color !== 'All', material !== 'All', priceRange !== 0].filter(Boolean).length;

  const clearFilters = () => {
    setShape('All');
    setColor('All');
    setMaterial('All');
    setPriceRange(0);
    setSearch('');
  };

  const FilterSection = ({ title, options, value, onChange }: { title: string; options: string[]; value: string; onChange: (v: string) => void }) => (
    <div className="mb-6">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              value === opt
                ? 'bg-teal text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Shop Eyeglasses</h1>
          <p className="text-gray-500 text-sm">{filtered.length} frame{filtered.length !== 1 ? 's' : ''} available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Controls Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search frames by name, color, material..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 text-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                showFilters ? 'bg-teal text-white border-teal' : 'bg-white border-gray-200 text-gray-600 hover:border-teal'
              }`}
            >
              <SlidersHorizontal size={16} />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:border-teal cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-teal font-medium hover:text-teal-dark">
                  Clear all
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
              <FilterSection title="Shape" options={shapes} value={shape} onChange={setShape} />
              <FilterSection title="Color" options={colors} value={color} onChange={setColor} />
              <FilterSection title="Material" options={materials} value={material} onChange={setMaterial} />
              <div className="mb-6">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Price Range</h4>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range, i) => (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange(i)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        priceRange === i
                          ? 'bg-teal text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick shape filter pills (always visible) */}
        {!showFilters && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {shapes.map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  shape === s
                    ? 'bg-teal text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-teal hover:text-teal'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">👓</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No frames found</h3>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search terms.</p>
            <button onClick={clearFilters} className="px-5 py-2.5 bg-teal text-white text-sm font-medium rounded-full hover:bg-teal-dark transition-colors">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
