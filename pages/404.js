import Link from 'next/link';
import Layout from '../components/Layout';
import { categories } from '../data/newsData';

export default function Custom404() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-8xl font-black text-red-600 mb-2">404</div>
          <h1 className="text-2xl font-black text-gray-800 tamil-text mb-2">பக்கம் கிடைக்கவில்லை</h1>
          <p className="text-gray-500 tamil-text mb-8">நீங்கள் தேடும் பக்கம் இல்லை அல்லது நகர்த்தப்பட்டுள்ளது.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Link href="/" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold tamil-text hover:bg-red-700 transition-colors">
              🏠 முகப்பிற்கு செல்லுங்கள்
            </Link>
            <Link href="/breaking" className="bg-gray-800 text-white px-6 py-3 rounded-xl font-bold tamil-text hover:bg-gray-700 transition-colors">
              ⚡ உடனடி செய்திகள்
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <Link key={cat.id} href={`/category/${cat.slug}`}
                className="px-3 py-1.5 rounded-full text-sm font-semibold tamil-text transition-all hover:scale-105 border"
                style={{ color: cat.color, borderColor: cat.color + '40', backgroundColor: cat.color + '10' }}>
                {cat.tamilName}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
