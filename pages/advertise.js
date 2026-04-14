import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const adPackages = [
  {
    name: 'அடிப்படை',
    nameEn: 'Basic',
    price: 'Rs. 5,000',
    period: '/மாதம்',
    color: 'from-gray-600 to-gray-800',
    features: ['Mobile Banner (320×50)', '10,000+ impressions', 'அனைத்து பக்கங்களிலும்', 'செயல்படுத்தல் - 24 மணி நேரம்'],
    popular: false,
  },
  {
    name: 'நடுத்தர',
    nameEn: 'Standard',
    price: 'Rs. 15,000',
    period: '/மாதம்',
    color: 'from-red-600 to-red-800',
    features: ['Rectangle (300×250)', '50,000+ impressions', 'முகப்பு பக்க வெளிப்பாடு', 'பிரிவு இலக்கிடல்', 'செயல்படுத்தல் - 12 மணி நேரம்'],
    popular: true,
  },
  {
    name: 'பிரீமியம்',
    nameEn: 'Premium',
    price: 'Rs. 35,000',
    period: '/மாதம்',
    color: 'from-yellow-500 to-yellow-700',
    features: ['Leaderboard (728×90)', '150,000+ impressions', 'Breaking News பட்டியில் இடம்', 'சமூக ஊடக ஊக்குவிப்பு', 'விரிவான அறிக்கை', 'செயல்படுத்தல் - 6 மணி நேரம்'],
    popular: false,
  },
];

const adSizes = [
  { name: 'Leaderboard', size: '728×90 px', location: 'முகப்பு & அனைத்து பக்கங்கள்' },
  { name: 'Rectangle', size: '300×250 px', location: 'பக்கப்பட்டி' },
  { name: 'Half Page', size: '300×600 px', location: 'பக்கப்பட்டி' },
  { name: 'Billboard', size: '970×250 px', location: 'முகப்பு மட்டும்' },
  { name: 'Mobile Banner', size: '320×50 px', location: 'மொபைல் சாதனங்கள்' },
  { name: 'Breaking Ticker', size: 'உரை', location: 'Breaking News பட்டி' },
];

export default function AdvertisePage() {
  return (
    <Layout>
      <NextSeo
        title="விளம்பரம் - Advertise on Minnal24"
        description="Minnal24.com-ல் விளம்பரம் செய்து இலட்சக்கணக்கான தமிழ் வாசகர்களை அடையுங்கள்"
        canonical="https://www.minnal24.com/advertise"
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-black tamil-text mb-3">Minnal24-ல் விளம்பரம் செய்யுங்கள்</h1>
          <p className="text-gray-300 text-lg tamil-text leading-relaxed mb-6">
            5 லட்சத்திற்கும் மேற்பட்ட மாதாந்திர வாசகர்களை கொண்ட மட்டக்களப்பு மற்றும் இலங்கையின் முன்னணி 
            தமிழ் செய்தி தளத்தில் உங்கள் வணிகத்தை பிரபலப்படுத்துங்கள்.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-center">
            {[
              { n: '5L+', l: 'மாத வாசகர்கள்' },
              { n: '2L+', l: 'YouTube சந்தாதாரர்கள்' },
              { n: '3L+', l: 'Facebook பின்தொடர்வோர்' },
              { n: '95%', l: 'தமிழ் வாசகர்கள்' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-xl px-5 py-3 backdrop-blur-sm">
                <div className="text-2xl font-black text-yellow-400">{s.n}</div>
                <div className="text-xs text-gray-300 tamil-text">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Packages */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-red-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-gray-900 tamil-text">விளம்பர திட்டங்கள்</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {adPackages.map((pkg, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden ${pkg.popular ? 'ring-4 ring-red-500 ring-offset-2' : ''}`}>
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-yellow-400 text-gray-900 text-xs font-black text-center py-1.5 tamil-text">
                    ⭐ மிகவும் பிரபலமானது
                  </div>
                )}
                <div className={`bg-gradient-to-br ${pkg.color} text-white p-6 ${pkg.popular ? 'pt-9' : ''}`}>
                  <h3 className="text-xl font-black tamil-text">{pkg.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-black">{pkg.price}</span>
                    <span className="text-sm opacity-70 tamil-text">{pkg.period}</span>
                  </div>
                </div>
                <div className="bg-white p-5 border-2 border-t-0 border-gray-100 rounded-b-2xl">
                  <ul className="space-y-2 mb-5">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-700 tamil-text">
                        <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact"
                    className={`block text-center py-2.5 rounded-lg font-black text-sm transition-colors tamil-text ${pkg.popular ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                    இப்போது தொடர்பு கொள்ளுங்கள்
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ad sizes */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-red-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-gray-900 tamil-text">விளம்பர அளவுகள்</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-card overflow-hidden text-sm">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="px-5 py-3 text-left font-black tamil-text">விளம்பர வகை</th>
                  <th className="px-5 py-3 text-left font-black">அளவு</th>
                  <th className="px-5 py-3 text-left font-black tamil-text">இடம்</th>
                </tr>
              </thead>
              <tbody>
                {adSizes.map((ad, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <td className="px-5 py-3 font-semibold text-gray-800">{ad.name}</td>
                    <td className="px-5 py-3 text-gray-600 font-mono">{ad.size}</td>
                    <td className="px-5 py-3 text-gray-600 tamil-text">{ad.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-red-600 to-red-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-black tamil-text mb-2">விளம்பரம் செய்ய தயாரா?</h2>
          <p className="text-red-200 tamil-text mb-5">இப்போதே எங்களை தொடர்பு கொண்டு உங்கள் வணிகத்தை வளர்த்துக்கொள்ளுங்கள்</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:ads@minnal24.com" className="bg-white text-red-700 font-black px-6 py-3 rounded-xl hover:bg-red-50 transition-colors">
              ✉️ ads@minnal24.com
            </a>
            <a href="https://wa.me/94XXXXXXXXX" target="_blank" rel="noopener noreferrer"
              className="bg-green-500 text-white font-black px-6 py-3 rounded-xl hover:bg-green-400 transition-colors">
              📱 WhatsApp
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
