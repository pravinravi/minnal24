import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';

const openings = [
  { title: 'தமிழ் செய்தியாளர்', type: 'முழுநேரம்', location: 'மட்டக்களப்பு', dept: 'செய்தி அறை', desc: 'மட்டக்களப்பு மாவட்டத்தில் செய்திகளை சேகரிக்கவும், எழுதவும் திறமையான செய்தியாளர் தேவை.' },
  { title: 'சமூக ஊடக மேலாளர்', type: 'முழுநேரம்', location: 'தொலைவிலிருந்து', dept: 'டிஜிட்டல்', desc: 'Facebook, YouTube, Instagram கணக்குகளை நிர்வகிக்க ஆர்வமான நபர் தேவை.' },
  { title: 'வீடியோ ஆசிரியர்', type: 'பகுதி நேரம்', location: 'தொலைவிலிருந்து', dept: 'வீடியோ', desc: 'YouTube வீடியோக்களை திருத்தவும் தயாரிக்கவும் திறமை வேண்டும்.' },
  { title: 'வலைத்தள டெவலப்பர்', type: 'ஒப்பந்தம்', location: 'தொலைவிலிருந்து', dept: 'தொழில்நுட்பம்', desc: 'Next.js, React அனுபவம் கொண்ட டெவலப்பர் தேவை.' },
];

export default function CareersPage() {
  return (
    <Layout>
      <NextSeo title="வேலை வாய்ப்புகள் - Careers at Minnal24" canonical="https://www.minnal24.com/careers" />

      <div className="bg-gradient-to-br from-red-700 to-red-900 py-14 text-white text-center">
        <h1 className="text-4xl font-black tamil-text mb-3">எங்களுடன் இணையுங்கள்</h1>
        <p className="text-red-200 tamil-text text-lg">Minnal24 குழுவின் ஒரு பகுதியாக ஆகுங்கள்</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Why join */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { icon: '🚀', t: 'வளர்ச்சி', d: 'தொழில் வளர்ச்சிக்கான ஏராளமான வாய்ப்புகள்' },
            { icon: '🌍', t: 'தாக்கம்', d: 'இலட்சக்கணக்கான தமிழர்களை சென்றடையும் ஊடகம்' },
            { icon: '💼', t: 'நெகிழ்வுத்தன்மை', d: 'தொலைவிலிருந்தும் பணிபுரியும் வாய்ப்பு' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-card p-5 text-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-black text-gray-900 tamil-text mb-1">{item.t}</h3>
              <p className="text-gray-500 text-sm tamil-text">{item.d}</p>
            </div>
          ))}
        </div>

        {/* Job openings */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-7 bg-red-600 rounded-full"></div>
          <h2 className="text-xl font-black text-gray-900 tamil-text">தற்போதைய வாய்ப்புகள்</h2>
        </div>

        <div className="space-y-4 mb-10">
          {openings.map((job, i) => (
            <div key={i} className="bg-white rounded-xl shadow-card p-5 hover:shadow-card-hover transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-black text-gray-900 tamil-text text-lg">{job.title}</h3>
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full tamil-text">{job.dept}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">📍 {job.location}</span>
                    <span className="flex items-center gap-1">⏰ {job.type}</span>
                  </div>
                  <p className="text-gray-600 text-sm tamil-text">{job.desc}</p>
                </div>
                <a
                  href={`mailto:careers@minnal24.com?subject=${encodeURIComponent(job.title + ' - விண்ணப்பம்')}`}
                  className="flex-shrink-0 bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors tamil-text whitespace-nowrap self-start">
                  விண்ணப்பிக்கவும்
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* General application */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-black tamil-text mb-2">உங்கள் வாய்ப்பை உருவாக்குங்கள்</h2>
          <p className="text-gray-400 tamil-text mb-5 text-sm">
            ஏதேனும் வேலை வாய்ப்பு தெரியாதபோதும், உங்கள் சுயவிவரத்தை அனுப்புங்கள்.
          </p>
          <a href="mailto:careers@minnal24.com"
            className="inline-block bg-white text-gray-900 font-black px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors">
            📧 careers@minnal24.com
          </a>
        </div>
      </div>
    </Layout>
  );
}
