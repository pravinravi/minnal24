import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const sections = [
  {
    title: 'சேவை பயன்பாடு',
    content: 'Minnal24.com-ஐ பயன்படுத்துவதன் மூலம், நீங்கள் இந்த விதிமுறைகளை ஏற்றுக்கொள்கிறீர்கள். எங்கள் செய்திகளை தனிப்பட்ட, வணிகமற்ற நோக்கங்களுக்காக பயன்படுத்தலாம். எங்கள் உள்ளடக்கத்தை அனுமதியின்றி வணிக நோக்கங்களுக்கு பயன்படுத்துவது தடைசெய்யப்பட்டுள்ளது.',
  },
  {
    title: 'அறிவுசார் சொத்துரிமை',
    content: 'Minnal24.com-ல் வெளியிடப்படும் அனைத்து செய்திகள், படங்கள், வீடியோக்கள் மற்றும் பிற உள்ளடக்கங்கள் எங்கள் சொத்தாகும் அல்லது உரிய அனுமதியுடன் பயன்படுத்தப்படுகின்றன. நகலெடுத்தல், வெளியிடுதல் அல்லது விநியோகிக்க எங்கள் எழுத்துப்பூர்வ அனுமதி தேவை.',
  },
  {
    title: 'பயனர் உள்ளடக்கம்',
    content: 'நீங்கள் கருத்துகள் அல்லது செய்திகளை அனுப்பும்போது, அவை சட்டவிரோதமானதாக, அவதூறானதாக, இனவெறியுடையதாக அல்லது தீங்கிழைக்கக்கூடியதாக இருக்கக்கூடாது. இத்தகைய உள்ளடக்கங்களை நாங்கள் அகற்றுவோம் மற்றும் சட்ட நடவடிக்கை எடுக்கவும் உரிமை உண்டு.',
  },
  {
    title: 'பொறுப்பு வரம்பு',
    content: 'Minnal24.com செய்திகளை மூலங்களிலிருந்து துல்லியமாக வழங்க முயற்சிக்கிறது. இருப்பினும், தகவல்களின் முழுமை அல்லது துல்லியத்திற்கு நாங்கள் பொறுப்பேற்கவில்லை. முக்கியமான முடிவுகளை எடுக்கும் முன் தகவல்களை சரிபார்க்கவும்.',
  },
  {
    title: 'இணைப்புகள்',
    content: 'எங்கள் தளம் வெளிப்புற இணையதளங்களுக்கு இணைப்புகளை கொண்டிருக்கலாம். இந்த தளங்களின் உள்ளடக்கம் அல்லது தனியுரிமைக் கொள்கைகளுக்கு நாங்கள் பொறுப்பல்ல.',
  },
  {
    title: 'விதிமுறை மாற்றங்கள்',
    content: 'இந்த விதிமுறைகளை எந்த நேரத்திலும் மாற்றுவதற்கான உரிமை எங்களுக்கு உண்டு. தொடர்ந்த பயன்பாடு புதுப்பிக்கப்பட்ட விதிமுறைகளை ஏற்றுக்கொள்வதாக கருதப்படும்.',
  },
  {
    title: 'சட்ட அதிகார வரம்பு',
    content: 'இந்த விதிமுறைகள் இலங்கை சட்டத்தின் கீழ் நிர்வகிக்கப்படும். எந்தவொரு தகராறும் இலங்கை நீதிமன்றங்களில் தீர்க்கப்படும்.',
  },
];

export default function TermsPage() {
  return (
    <Layout>
      <NextSeo
        title="பயன்பாட்டு விதிமுறைகள் - Terms of Service"
        description="Minnal24.com பயன்பாட்டு விதிமுறைகள் மற்றும் நிபந்தனைகள்"
        canonical="https://www.minnal24.com/terms"
      />

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 py-12 text-white text-center">
        <h1 className="text-3xl font-black tamil-text">பயன்பாட்டு விதிமுறைகள்</h1>
        <p className="text-gray-400 text-sm mt-2">Terms of Service | கடைசியாக புதுப்பிக்கப்பட்டது: டிசம்பர் 2024</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
          <p className="text-gray-700 text-sm tamil-text">
            <strong>முக்கிய குறிப்பு:</strong> Minnal24.com-ஐ பயன்படுத்துவதன் மூலம், கீழேயுள்ள விதிமுறைகளை 
            நீங்கள் ஏற்றுக்கொள்கிறீர்கள். தயவுசெய்து கவனமாக படிக்கவும்.
          </p>
        </div>

        {sections.map((sec, i) => (
          <div key={i} className="bg-white rounded-xl shadow-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-black">
                {i + 1}
              </div>
              <h2 className="font-black text-gray-900 tamil-text">{sec.title}</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed tamil-text">{sec.content}</p>
          </div>
        ))}

        <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl">
          <p className="text-gray-600 text-sm tamil-text">
            <strong>தொடர்பிற்கு:</strong> legal@minnal24.com அல்லது +94 XX XXX XXXX
          </p>
        </div>
      </div>
    </Layout>
  );
}
