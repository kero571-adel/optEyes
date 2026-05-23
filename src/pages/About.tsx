import { Link } from 'react-router-dom';
import { Eye, Award, Users, Leaf, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-teal font-semibold text-sm mb-2 tracking-wide uppercase">Our Story</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Crafted for <span className="text-teal">Clarity</span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
            At OptiVue, we believe everyone deserves exceptional vision without compromising on style. 
            Since 2018, we've been redefining how people experience prescription eyewear.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We started OptiVue with a simple question: why should quality prescription glasses cost a fortune? 
                By working directly with master craftsmen and cutting out unnecessary middlemen, we deliver premium 
                eyewear at honest prices.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Every pair is inspected by licensed opticians, assembled with precision-engineered components, 
                and backed by our comprehensive warranty. Because your vision is too important for compromises.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '50K+', label: 'Happy Customers' },
                  { num: '4.8★', label: 'Average Rating' },
                  { num: '200+', label: 'Frame Styles' },
                  { num: '99%', label: 'Satisfaction Rate' },
                ].map(({ num, label }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-teal">{num}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl h-80 lg:h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">👓</div>
                <p className="text-teal font-semibold text-lg">Precision Crafted</p>
                <p className="text-teal-dark text-sm">Since 2018</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal font-semibold text-sm mb-1 tracking-wide uppercase">What Drives Us</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Eye, title: 'Vision First', desc: 'Every lens is crafted with clinical precision by licensed opticians for perfect clarity.' },
              { icon: Award, title: 'Quality Always', desc: 'Premium materials, Japanese hinges, and rigorous quality control on every pair.' },
              { icon: Users, title: 'Customer Care', desc: 'Dedicated support team, free adjustments, and a no-questions-asked return policy.' },
              { icon: Leaf, title: 'Sustainable', desc: 'Eco-friendly packaging, carbon-neutral shipping, and a frame recycling program.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-teal" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Ready to See the Difference?</h2>
          <p className="text-gray-500 mb-8">Browse our collection and find your perfect pair today.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-all shadow-lg shadow-teal/20">
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
