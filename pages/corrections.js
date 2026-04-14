import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

export default function CorrectionsPage() {
  return (
    <Layout>
      <NextSeo title="திருத்த கொள்கை - Corrections Policy" canonical="https://www.minnal24.com/corrections" />
      <div className="bg-gray-800 py-12 text-white text-center">
        <h1 className="text-3xl font-black tamil-text">திருத்த கொள்கை</h1>
        <p className="text-gray-400 text-sm mt-2">Corrections & Ethics Policy</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {[
          { title: 'எங்கள் உறுதிப்பாடு', content: 'Minnal24.com துல்லியமான செய்திகளை வழங்குவதில் உறுதியாக உள்ளது. தவறு ஏற்பட்டால், அதை விரைவாக திருத்தி வெளிப்படையாக தெரிவிக்கப்படும்.' },
          { title: 'திருத்தம் கோருதல்', content: 'எங்கள் செய்திகளில் தவறு இருப்பதாக நீங்கள் நம்பினால், corrections@minnal24.com என்ற மின்னஞ்சலில் தொடர்பு கொள்ளுங்கள். செய்தி தலைப்பு, URL மற்றும் தவறான தகவல் ஆகியவற்றை குறிப்பிடுங்கள்.' },
          { title: 'நெறிமுறைக் குறியீடு', content: 'எங்கள் பத்திரிகையாளர்கள் உண்மை, நியாயம், சுதந்திரம் மற்றும் மக்களுக்கான பொறுப்புணர்வு ஆகிய அடிப்படை மதிப்புகளை கடைபிடிக்கின்றனர்.' },
          { title: 'ஆதாரங்கள்', content: 'செய்திகளை வெளியிடுவதற்கு முன் சுயாதீனமான ஆதாரங்களில் சரிபார்க்கப்படும். ஊகங்கள் மற்றும் அனுமானங்கள் தெளிவாக குறிப்பிடப்படும்.' },
        ].map((sec, i) => (
          <div key={i} className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-black">{i + 1}</div>
              <h2 className="font-black text-gray-900 tamil-text">{sec.title}</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed tamil-text">{sec.content}</p>
          </div>
        ))}
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r-xl">
          <p className="text-gray-700 text-sm tamil-text">
            <strong>திருத்தம் கோர:</strong> corrections@minnal24.com
          </p>
        </div>
      </div>
    </Layout>
  );
}
