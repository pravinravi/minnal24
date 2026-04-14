import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const sections = [
  {
    title: 'தகவல் சேகரிப்பு',
    content: 'Minnal24.com பயனர் அனுபவத்தை மேம்படுத்த சில அடிப்படை தகவல்களை சேகரிக்கலாம். இதில் IP முகவரி, உலாவி வகை மற்றும் தளத்தில் நீங்கள் பார்க்கும் பக்கங்கள் ஆகியவை அடங்கும். இந்த தகவல்கள் புள்ளிவிவர நோக்கங்களுக்கு மட்டுமே பயன்படுத்தப்படும்.',
  },
  {
    title: 'குக்கிகள் பயன்பாடு',
    content: 'எங்கள் தளம் உங்கள் அனுபவத்தை மேம்படுத்த குக்கிகளை பயன்படுத்தலாம். நீங்கள் உங்கள் உலாவி அமைப்புகளில் குக்கிகளை முடக்கலாம், இருப்பினும் இது சில சேவைகளை பாதிக்கலாம்.',
  },
  {
    title: 'தனியுரிமை பாதுகாப்பு',
    content: 'உங்கள் தனிப்பட்ட தகவல்கள் பாதுகாக்கப்படும். நாங்கள் உங்கள் தகவல்களை மூன்றாம் தரப்பினருக்கு விற்கவோ, வாடகைக்கு கொடுக்கவோ மாட்டோம். சட்டத்தின் தேவைப்படும் சந்தர்ப்பங்களில் மட்டுமே அதிகாரிகளுக்கு வழங்கப்படும்.',
  },
  {
    title: 'பயனர் உரிமைகள்',
    content: 'நீங்கள் உங்களைப் பற்றி சேகரிக்கப்பட்ட தகவல்களை அணுக, திருத்த அல்லது நீக்க கோரலாம். இதற்கு privacy@minnal24.com என்ற மின்னஞ்சலில் தொடர்பு கொள்ளுங்கள்.',
  },
  {
    title: 'குழந்தைகளின் தனியுரிமை',
    content: 'Minnal24.com 13 வயதுக்கும் குறைவான குழந்தைகளிடமிருந்து தெரிந்தே தகவல்களை சேகரிப்பதில்லை.',
  },
  {
    title: 'கொள்கை மாற்றங்கள்',
    content: 'இந்த தனியுரிமைக் கொள்கை அவ்வப்போது புதுப்பிக்கப்படலாம். முக்கிய மாற்றங்கள் இருந்தால் தளத்தில் அறிவிக்கப்படும். தொடர்ந்த பயன்பாடு புதுப்பிக்கப்பட்ட கொள்கையை ஏற்றுக்கொள்வதாக கருதப்படும்.',
  },
];

export default function PrivacyPage() {
  return (
    <Layout>
      <NextSeo title="தனியுரிமைக் கொள்கை - Privacy Policy" canonical="https://www.minnal24.com/privacy" />

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 py-12 text-white text-center">
        <h1 className="text-3xl font-black tamil-text">தனியுரிமைக் கொள்கை</h1>
        <p className="text-gray-400 text-sm mt-2">கடைசியாக புதுப்பிக்கப்பட்டது: டிசம்பர் 2024</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {sections.map((sec, i) => (
          <div key={i} className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-black">{i + 1}</div>
              <h2 className="font-black text-gray-900 tamil-text">{sec.title}</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed tamil-text">{sec.content}</p>
          </div>
        ))}
        <div className="bg-red-50 border-l-4 border-red-600 p-5 rounded-r-xl">
          <p className="text-gray-700 text-sm tamil-text">
            <strong>தொடர்பிற்கு:</strong> privacy@minnal24.com | +94 XX XXX XXXX
          </p>
        </div>
      </div>
    </Layout>
  );
}
