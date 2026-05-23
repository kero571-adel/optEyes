import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-teal-50 to-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-teal font-semibold text-sm mb-2 tracking-wide uppercase">Get in Touch</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            We'd Love to <span className="text-teal">Hear</span> From You
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Have questions about our frames, lenses, or your prescription? Our team is here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="space-y-4">
            {[
              { icon: Mail, title: 'Email Us', info: 'hello@optivue.com', sub: 'We reply within 24 hours' },
              { icon: Phone, title: 'Call Us', info: '(555) 123-4567', sub: 'Mon-Fri, 9am-6pm EST' },
              { icon: MapPin, title: 'Visit Us', info: '123 Vision Lane, Suite 100', sub: 'New York, NY 10001' },
              { icon: Clock, title: 'Hours', info: 'Monday - Friday', sub: '9:00 AM - 6:00 PM EST' },
            ].map(({ icon: Icon, title, info, sub }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                  <p className="text-sm text-gray-700 mt-0.5">{info}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <h2 className="font-bold text-gray-900 text-lg mb-6">Send us a Message</h2>
              
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} className="text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Message Sent!</h3>
                  <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us more..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white font-semibold rounded-xl hover:bg-teal-dark transition-colors shadow-lg shadow-teal/20"
                  >
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: 'How do I submit my prescription?', a: 'After placing your order, you can upload your prescription through your order confirmation page, or email it directly to rx@optivue.com.' },
              { q: 'What is your return policy?', a: 'We offer a 30-day no-questions-asked return policy. If you\'re not completely satisfied, we\'ll provide a full refund or exchange.' },
              { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Expedited shipping (2-3 days) is available at checkout for an additional fee.' },
              { q: 'Do you offer adjustments?', a: 'Yes! Visit any partnered optician for free adjustments, or contact us for a prepaid shipping label to send your frames in for adjustment.' },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
