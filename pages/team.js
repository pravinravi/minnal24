import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const team = [
  {
    name: 'சிவகுமார் ராஜேந்திரன்',
    role: 'தலைமை ஆசிரியர்',
    bio: 'மட்டக்களப்பு பத்திரிகைத் துறையில் 15 ஆண்டுகள் அனுபவம். இலங்கை தமிழ் பத்திரிகை விருது பெற்றவர்.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80',
    email: 'siva@minnal24.com',
    social: { tw: '@sivakumar_m24' },
  },
  {
    name: 'கமலா சுப்பிரமணியம்',
    role: 'மூத்த செய்தியாளர் — அரசியல்',
    bio: 'இலங்கை அரசியல் செய்திகளில் நிபுணத்துவம் பெற்றவர். கொழும்பு நாடாளுமன்றத்தில் 10 ஆண்டுகள் நிருபர்.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    email: 'kamala@minnal24.com',
    social: { tw: '@kamala_m24' },
  },
  {
    name: 'முரளிதரன் நடராஜன்',
    role: 'சர்வதேச செய்தியாளர்',
    bio: 'உலக தமிழர் நிலைமை குறித்து விரிவாக கவரேஜ் செய்து வருகிறார். மலேசியா, கனடா, UK இல் செய்தி சேகரித்தவர்.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    email: 'murali@minnal24.com',
    social: { tw: '@murali_m24' },
  },
  {
    name: 'யோகநாதன் தவராஜா',
    role: 'வீடியோ தயாரிப்பாளர்',
    bio: 'YouTube வீடியோ தயாரிப்பில் 8 ஆண்டுகள் அனுபவம். Minnal24 YouTube சேனலை 2 லட்சம் subscribers வரை வளர்த்தவர்.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    email: 'yoga@minnal24.com',
    social: { tw: '@yoga_m24' },
  },
  {
    name: 'அனுராதா கனகரத்னம்',
    role: 'சுகாதார & சமூக செய்தியாளர்',
    bio: 'இலங்கையில் சுகாதாரம், கல்வி மற்றும் சமூக நலன் தொடர்பான செய்திகளில் கவனம் செலுத்துகிறார்.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    email: 'anu@minnal24.com',
    social: { tw: '@anu_m24' },
  },
  {
    name: 'செல்வராஜ் குணசேகரன்',
    role: 'விளையாட்டு செய்தியாளர்',
    bio: 'கிரிக்கெட், கால்பந்து மற்றும் இலங்கை விளையாட்டு தொடர்பான செய்திகளில் நிபுணர்.',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&q=80',
    email: 'selva@minnal24.com',
    social: { tw: '@selva_m24' },
  },
];

export default function TeamPage() {
  return (
    <Layout>
      <NextSeo
        title="எங்கள் குழு - Our Team"
        description="Minnal24 செய்தி குழுவினரை அறியுங்கள் — மட்டக்களப்பு மற்றும் இலங்கை தமிழ் பத்திரிகையாளர்கள்"
        canonical="https://www.minnal24.com/team"
      />

      <div className="bg-gradient-to-br from-red-700 to-red-900 py-14 text-white text-center">
        <h1 className="text-4xl font-black tamil-text mb-3">எங்கள் குழு</h1>
        <p className="text-red-200 tamil-text">உங்களுக்கு செய்திகளை வழங்கும் அர்ப்பணிப்பான பத்திரிகையாளர்கள்</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-white font-black text-base tamil-text leading-snug">{member.name}</div>
                  <div className="text-red-300 text-xs font-semibold mt-0.5 tamil-text">{member.role}</div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm leading-relaxed tamil-text mb-3">{member.bio}</p>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 transition-colors font-medium"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {member.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="mt-12 bg-gray-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-black tamil-text mb-2">எங்கள் குழுவில் இணையுங்கள்</h2>
          <p className="text-gray-400 tamil-text text-sm mb-5">
            திறமையான பத்திரிகையாளர்கள், வீடியோ ஆசிரியர்கள் மற்றும் டிஜிட்டல் நிபுணர்களை தேடுகிறோம்
          </p>
          <a
            href="/careers"
            className="inline-block bg-red-600 text-white font-black px-6 py-3 rounded-xl hover:bg-red-700 transition-colors tamil-text"
          >
            வேலை வாய்ப்புகளை காணுங்கள் →
          </a>
        </div>
      </div>
    </Layout>
  );
}
