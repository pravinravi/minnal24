import { useState } from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <Layout>
      <NextSeo
        title="நியூஸ்லெட்டர் பதிவு - Newsletter"
        description="Minnal24 நியூஸ்லெட்டருக்கு பதிவு செய்து தமிழ் செய்திகளை உங்கள் மின்னஞ்சலில் பெறுங்கள்"
        canonical="https://www.minnal24.com/newsletter"
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-2 mb-3">
              <span className="text-red-700 font-black text-4xl tamil-text">மின்னல்</span>
              <span className="text-yellow-500 font-black text-5xl" style={{ fontFamily: 'Impact, sans-serif' }}>24</span>
              <span className="text-red-600 text-sm font-bold">.com</span>
            </div>
            <p className="text-gray-500 tamil-text text-sm">மட்டக்களப்பு & இலங்கை தமிழ் செய்திகள்</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {done ? (
              <div className="text-center py-6">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-black text-gray-900 tamil-text mb-2">பதிவு வெற்றிகரமானது!</h2>
                <p className="text-gray-600 tamil-text">
                  நன்றி! தினசரி முக்கிய செய்திகள் உங்கள் மின்னஞ்சலுக்கு அனுப்பப்படும்.
                </p>
                <button
                  onClick={() => setDone(false)}
                  className="mt-5 bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold tamil-text hover:bg-red-700 transition-colors">
                  மீண்டும் பதிவு செய்
                </button>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-black text-gray-900 tamil-text mb-1">📧 நியூஸ்லெட்டர் பதிவு</h1>
                <p className="text-gray-500 text-sm tamil-text mb-6">
                  சமீபத்திய செய்திகளை உங்கள் மின்னஞ்சலில் பெறுங்கள். விளம்பரங்கள் இல்லை!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 tamil-text mb-1.5">
                      உங்கள் பெயர்
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="பெயர் உள்ளிடுக"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none tamil-text text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      மின்னஞ்சல் *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 tamil-text mb-1.5">
                      செய்தி அதிர்வெண்
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 'daily', label: 'தினசரி' },
                        { val: 'weekly', label: 'வாராந்திரம்' },
                        { val: 'breaking', label: 'உடனடி மட்டும்' },
                      ].map(opt => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setFrequency(opt.val)}
                          className={`py-2.5 rounded-xl text-sm font-bold transition-all tamil-text ${
                            frequency === opt.val
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { id: 'cat_batticaloa', label: 'மட்டக்களப்பு செய்திகள்' },
                      { id: 'cat_srilanka', label: 'இலங்கை செய்திகள்' },
                      { id: 'cat_international', label: 'சர்வதேச செய்திகள்' },
                      { id: 'cat_sports', label: 'விளையாட்டு' },
                    ].map(cat => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 rounded text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700 tamil-text">{cat.label}</span>
                      </label>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-4 rounded-xl font-black text-base tamil-text hover:bg-red-700 active:scale-[0.99] transition-all">
                    இலவசமாக பதிவு செய் →
                  </button>

                  <p className="text-center text-xs text-gray-400 tamil-text">
                    எந்த நேரத்திலும் பதிவை நீக்கலாம். உங்கள் தகவல்கள் பாதுகாப்பானவை.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: '⚡', title: 'உடனடி', desc: 'நிகழ்வுகள் நடந்தவுடன்' },
              { icon: '🎯', title: 'துல்லியம்', desc: 'சரிபார்க்கப்பட்ட செய்திகள்' },
              { icon: '🆓', title: 'இலவசம்', desc: 'எந்த கட்டணமும் இல்லை' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl mb-1">{f.icon}</div>
                <div className="text-xs font-black text-gray-800 tamil-text">{f.title}</div>
                <div className="text-xs text-gray-400 tamil-text">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
