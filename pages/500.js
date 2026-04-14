import Link from 'next/link';
import Layout from '../components/Layout';

export default function Custom500() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-8xl font-black text-red-600 mb-2">500</div>
          <h1 className="text-2xl font-black text-gray-800 tamil-text mb-2">சேவை பிழை</h1>
          <p className="text-gray-500 tamil-text mb-8">ஒரு பிழை ஏற்பட்டுள்ளது. சிறிது நேரத்திற்கு பிறகு மீண்டும் முயற்சிக்கவும்.</p>
          <Link href="/" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold tamil-text hover:bg-red-700 transition-colors">
            🏠 முகப்பிற்கு செல்லுங்கள்
          </Link>
        </div>
      </div>
    </Layout>
  );
}
