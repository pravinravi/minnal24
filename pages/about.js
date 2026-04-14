import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import AdSlot from '../components/AdSlot';

const teamMembers = [
  { name: 'சிவகுமார் ராஜேந்திரன்', role: 'தலைமை ஆசிரியர்', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
  { name: 'கமலா சுப்பிரமணியம்', role: 'மூத்த செய்தியாளர்', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80' },
  { name: 'முரளிதரன் நடராஜன்', role: 'சர்வதேச செய்தியாளர்', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
  { name: 'யோகநாதன் தவராஜா', role: 'வீடியோ தயாரிப்பாளர்', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
];

export default function AboutPage() {
  return (
    <Layout>
      <NextSeo
        title="எங்களைப் பற்றி - About Minnal24"
        description="Minnal24.com - மட்டக்களப்பு மற்றும் இலங்கை தமிழரின் நம்பகமான செய்தி ஊடகம்"
        canonical="https://www.minnal24.com/about"
      />

      {/* Hero */}
      <div className="bg-gradient-to-br from-red-700 to-red-900 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black tamil-text mb-4">எங்களைப் பற்றி</h1>
          <p className="text-red-200 text-lg tamil-text leading-relaxed">
            மட்டக்களப்பிலிருந்து தொடங்கி உலக தமிழர்களை இணைக்கும் நம்பகமான செய்தி ஊடகம்
          </p>
        </div>
      </div>

      <div className="bg-white py-3 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <AdSlot size="leaderboard" className="mx-auto" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Mission */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-red-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-gray-900 tamil-text">எங்கள் நோக்கம்</h2>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 tamil-text text-gray-700 leading-loose text-base space-y-4">
            <p>
              <strong className="text-red-700">Minnal24.com</strong> என்பது மட்டக்களப்பு மாவட்டம் மற்றும் இலங்கை தமிழர்களுக்கென 
              உருவாக்கப்பட்ட முன்னணி தமிழ் செய்தி இணையதளமாகும். 2020 ஆம் ஆண்டில் தொடங்கப்பட்ட இந்த 
              தளம், இன்று இலட்சக்கணக்கான வாசகர்களை கொண்ட மிக முக்கியமான ஊடகமாக வளர்ந்துள்ளது.
            </p>
            <p>
              நாங்கள் நம்பகமான, விரைவான மற்றும் துல்லியமான செய்திகளை வழங்குவதில் உறுதியாக இருக்கிறோம். 
              மட்டக்களப்பு மாவட்ட செய்திகள் முதல் சர்வதேச தமிழ் செய்திகள் வரை, அனைத்தும் ஒரே இடத்தில் 
              கிடைக்கும்.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: '5L+', label: 'மாதாந்திர வாசகர்கள்', icon: '👥' },
              { number: '50+', label: 'நாளாந்த செய்திகள்', icon: '📰' },
              { number: '4+', label: 'ஆண்டுகள் சேவை', icon: '⭐' },
              { number: '24/7', label: 'செய்தி தகவல்', icon: '🕐' },
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-5 text-white text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-black">{stat.number}</div>
                <div className="text-red-200 text-xs mt-1 tamil-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-red-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-gray-900 tamil-text">எங்கள் குழு</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamMembers.map((member, i) => (
              <div key={i} className="bg-white rounded-xl shadow-card p-4 text-center hover:shadow-card-hover transition-shadow">
                <img src={member.image} alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-red-100" />
                <h3 className="font-black text-gray-800 text-sm tamil-text">{member.name}</h3>
                <p className="text-red-600 text-xs mt-1 tamil-text">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-red-600 rounded-full"></div>
            <h2 className="text-2xl font-black text-gray-900 tamil-text">எங்கள் மதிப்புகள்</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '🎯', title: 'துல்லியம்', desc: 'சரிபார்க்கப்பட்ட உண்மையான செய்திகள் மட்டுமே' },
              { icon: '⚡', title: 'வேகம்', desc: 'நிகழ்வுகள் நடந்த சில நிமிடங்களில் செய்திகள்' },
              { icon: '🤝', title: 'நம்பகத்தன்மை', desc: 'மக்களின் நம்பிக்கையே எங்கள் மிகப் பெரிய சொத்து' },
            ].map((v, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border-l-4 border-red-500">
                <div className="text-3xl mb-2">{v.icon}</div>
                <h3 className="font-black text-gray-900 tamil-text mb-1">{v.title}</h3>
                <p className="text-gray-600 text-sm tamil-text">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-black tamil-text mb-2">தொடர்பு கொள்ளுங்கள்</h2>
          <p className="text-red-200 tamil-text mb-6">செய்திகள், விளம்பரம் அல்லது பிற தேவைகளுக்கு</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:news@minnal24.com" className="bg-white text-red-700 font-bold px-5 py-2.5 rounded-lg hover:bg-red-50 transition-colors">
              ✉️ news@minnal24.com
            </a>
            <a href="tel:+94XXXXXXXXX" className="bg-red-500 text-white font-bold px-5 py-2.5 rounded-lg hover:bg-red-400 transition-colors border border-red-400">
              📞 +94 XX XXX XXXX
            </a>
            <a href="/advertise" className="bg-yellow-400 text-gray-900 font-bold px-5 py-2.5 rounded-lg hover:bg-yellow-300 transition-colors tamil-text">
              விளம்பரம் செய்ய
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
