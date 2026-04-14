import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const principles = [
  {
    icon: '🎯',
    title: 'உண்மை',
    desc: 'நாங்கள் எப்போதும் உண்மையான, சரிபார்க்கப்பட்ட தகவல்களை மட்டுமே வெளியிடுவோம். ஊகங்கள் அல்லது அனுமானங்களை செய்தியாக வழங்கமாட்டோம்.',
  },
  {
    icon: '⚖️',
    title: 'நியாயம்',
    desc: 'அனைத்து தரப்பினரின் கருத்துகளையும் நியாயமாக பிரதிநிதித்துவப்படுத்துவோம். ஒரு தரப்பை மட்டும் ஆதரிக்கும் வகையில் செய்திகளை திரிக்கமாட்டோம்.',
  },
  {
    icon: '🔓',
    title: 'சுதந்திரம்',
    desc: 'எந்த அரசியல் கட்சி, வணிக நிறுவனம் அல்லது அமைப்பின் தாக்கத்திலிருந்தும் விலகி, சுதந்திரமான பத்திரிகை செய்வோம்.',
  },
  {
    icon: '🤝',
    title: 'பொறுப்புணர்வு',
    desc: 'நாங்கள் வெளியிடும் ஒவ்வொரு செய்திக்கும் நாங்கள் பொறுப்புடையவர்கள். தவறுகள் ஏற்பட்டால் திறந்த மனதுடன் ஒப்புக்கொண்டு திருத்துவோம்.',
  },
  {
    icon: '🛡️',
    title: 'தனியுரிமை',
    desc: 'ஆதாரங்களின் அடையாளத்தை பாதுகாப்போம். பொது நலனுக்கு தேவையற்ற தனிப்பட்ட தகவல்களை வெளியிடமாட்டோம்.',
  },
  {
    icon: '👥',
    title: 'சமூக பொறுப்பு',
    desc: 'நாங்கள் வழங்கும் செய்திகள் சமூகத்தில் எவ்வாறு தாக்கத்தை ஏற்படுத்தும் என்பதை கவனமாக கருத்தில் கொள்வோம். வெறுப்பூட்டும் அல்லது அமைதியை கலைக்கும் உள்ளடக்கத்தை வெளியிடமாட்டோம்.',
  },
];

export default function EthicsPage() {
  return (
    <Layout>
      <NextSeo
        title="நெறிமுறைக் குறியீடு - Ethics Policy"
        description="Minnal24.com நெறிமுறை கொள்கைகள் மற்றும் பத்திரிகை தரநிலைகள்"
        canonical="https://www.minnal24.com/ethics"
      />

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 py-14 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-black tamil-text mb-3">நெறிமுறைக் குறியீடு</h1>
          <p className="text-gray-400 tamil-text leading-relaxed">
            Minnal24-ன் பத்திரிகை நெறிமுறைகளும் மதிப்புகளும் — நம்பகமான செய்தி ஊடகமாக இருப்பதற்கான எங்கள் உறுதிப்பாடு
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 mb-8">
          <p className="text-gray-700 tamil-text leading-loose text-base">
            <strong className="text-red-700">Minnal24.com</strong> மட்டக்களப்பு மாவட்டம் மற்றும் 
            இலங்கை தமிழர்களுக்கு நம்பகமான, துல்லியமான மற்றும் நியாயமான செய்திகளை வழங்குவதற்கு 
            அர்ப்பணிக்கப்பட்டுள்ளது. கீழேயுள்ள நெறிமுறைகள் நமது பத்திரிகை பணியை வழிநடத்துகின்றன.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {principles.map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow-card p-5 flex gap-4">
              <div className="text-3xl flex-shrink-0">{p.icon}</div>
              <div>
                <h3 className="font-black text-gray-900 tamil-text mb-1 text-base">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed tamil-text">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reporting violations */}
        <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-xl font-black tamil-text mb-2">நெறிமுறை மீறல்களை புகாரளிக்கவும்</h2>
          <p className="text-red-200 tamil-text text-sm mb-5 leading-relaxed">
            எங்கள் ஊழியர்கள் நெறிமுறைகளை மீறியதாக நம்பினால், கீழ்க்காணும் வழிகளில் புகாரளிக்கவும்.
            அனைத்து புகார்களும் இரகசியமாக கையாளப்படும்.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:ethics@minnal24.com"
              className="bg-white text-red-700 font-bold px-5 py-2.5 rounded-xl hover:bg-red-50 transition-colors"
            >
              ✉️ ethics@minnal24.com
            </a>
            <a
              href="/contact"
              className="bg-red-500 text-white font-bold px-5 py-2.5 rounded-xl border border-red-400 hover:bg-red-400 transition-colors tamil-text"
            >
              தொடர்பு படிவம்
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
