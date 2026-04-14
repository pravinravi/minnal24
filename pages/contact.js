import { NextSeo } from 'next-seo';
import { useState } from 'react';
import Layout from '../components/Layout';
import AdSlot from '../components/AdSlot';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <NextSeo
        title="தொடர்பு கொள்ளுங்கள் - Contact Minnal24"
        description="Minnal24.com - செய்திகள், விளம்பரம் அல்லது பிற தேவைகளுக்கு தொடர்பு கொள்ளுங்கள்"
        canonical="https://www.minnal24.com/contact"
      />

      <div className="bg-gradient-to-br from-red-700 to-red-900 py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black tamil-text mb-2">தொடர்பு கொள்ளுங்கள்</h1>
          <p className="text-red-200 tamil-text">உங்கள் கருத்துக்கள், செய்திகள் மற்றும் விளம்பர தேவைகளுக்கு</p>
        </div>
      </div>

      <div className="bg-white py-3 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <AdSlot size="leaderboard" className="mx-auto" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            <div className="bg-white rounded-xl shadow-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-xl">📍</div>
                <h3 className="font-black text-gray-800 tamil-text">முகவரி</h3>
              </div>
              <p className="text-gray-600 text-sm tamil-text leading-relaxed">
                Minnal24 News Office,<br />
                Batticaloa, Sri Lanka
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">📞</div>
                <h3 className="font-black text-gray-800 tamil-text">தொலைபேசி</h3>
              </div>
              <a href="tel:+94XXXXXXXXX" className="text-blue-600 text-sm font-semibold hover:underline">
                +94 XX XXX XXXX
              </a>
            </div>
            <div className="bg-white rounded-xl shadow-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">✉️</div>
                <h3 className="font-black text-gray-800 tamil-text">மின்னஞ்சல்</h3>
              </div>
              <a href="mailto:news@minnal24.com" className="text-green-600 text-sm font-semibold hover:underline block">news@minnal24.com</a>
              <a href="mailto:ads@minnal24.com" className="text-green-600 text-sm font-semibold hover:underline block mt-1">ads@minnal24.com</a>
            </div>
            <div className="bg-white rounded-xl shadow-card p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">🕐</div>
                <h3 className="font-black text-gray-800 tamil-text">செயல்பாட்டு நேரம்</h3>
              </div>
              <p className="text-gray-600 text-sm tamil-text">24 மணி நேரமும், 7 நாட்களும்</p>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-black text-gray-800 tamil-text mb-2">நன்றி!</h3>
                  <p className="text-gray-600 tamil-text">உங்கள் செய்தி வெற்றிகரமாக அனுப்பப்பட்டது. விரைவில் தொடர்பு கொள்வோம்.</p>
                  <button onClick={() => setSubmitted(false)}
                    className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg font-bold tamil-text hover:bg-red-700 transition-colors">
                    மீண்டும் அனுப்பு
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-black text-gray-900 tamil-text mb-5">செய்தி அனுப்புங்கள்</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 tamil-text mb-1.5">பெயர் *</label>
                      <input type="text" required value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none tamil-text text-sm transition-colors"
                        placeholder="உங்கள் பெயர்" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 tamil-text mb-1.5">மின்னஞ்சல் *</label>
                      <input type="email" required value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm transition-colors"
                        placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 tamil-text mb-1.5">தொலைபேசி</label>
                      <input type="tel" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm transition-colors"
                        placeholder="+94 XX XXX XXXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 tamil-text mb-1.5">தலைப்பு *</label>
                      <select required value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm transition-colors tamil-text bg-white">
                        <option value="">தேர்வு செய்யுங்கள்</option>
                        <option value="news">செய்தி அனுப்புதல்</option>
                        <option value="ads">விளம்பரம்</option>
                        <option value="correction">திருத்தம் கோருதல்</option>
                        <option value="feedback">கருத்து</option>
                        <option value="other">மற்றவை</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 tamil-text mb-1.5">செய்தி *</label>
                    <textarea required rows={5} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm transition-colors tamil-text resize-none"
                      placeholder="உங்கள் செய்தியை இங்கே எழுதுங்கள்..."></textarea>
                  </div>
                  <button type="submit"
                    className="w-full bg-red-600 text-white py-3.5 rounded-xl font-black text-base tamil-text hover:bg-red-700 transition-colors">
                    செய்தி அனுப்பு →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
