import Link from 'next/link';
import { categories } from '../data/newsData';

const footerLinks = {
  about: [
    { label: 'எங்களைப் பற்றி', href: '/about' },
    { label: 'எங்கள் குழு', href: '/team' },
    { label: 'தொடர்பு கொள்ளுங்கள்', href: '/contact' },
    { label: 'விளம்பரம்', href: '/advertise' },
    { label: 'வேலை வாய்ப்புகள்', href: '/careers' },
  ],
  policy: [
    { label: 'தனியுரிமைக் கொள்கை', href: '/privacy' },
    { label: 'பயன்பாட்டு விதிமுறைகள்', href: '/terms' },
    { label: 'திருத்த கொள்கை', href: '/corrections' },
    { label: 'நெறிமுறைக் குறியீடு', href: '/ethics' },
  ],
  services: [
    { label: 'RSS Feed', href: '/rss.xml' },
    { label: 'நியூஸ்லெட்டர்', href: '/newsletter' },
    { label: 'மொபைல் செயலி', href: '/app' },
    { label: 'YouTube சேனல்', href: 'https://youtube.com/minnal24' },
  ],
};

const SocialButton = ({ href, label, color, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 hover:scale-105 ${color}`}
    aria-label={label}
  >
    {children}
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter section */}
      <div className="bg-red-700 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-black text-2xl tamil-text">📧 நியூஸ்லெட்டர் பதிவு</h3>
              <p className="text-red-200 text-sm mt-1 tamil-text">தினசரி முக்கிய செய்திகளை உங்கள் மின்னஞ்சலில் பெறுங்கள்</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="உங்கள் மின்னஞ்சல்"
                className="flex-1 md:w-72 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-gray-900 px-5 py-3 rounded-lg font-black text-sm hover:bg-yellow-300 transition-colors whitespace-nowrap"
              >
                பதிவு செய்
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-red-500 font-black text-3xl tamil-text">மின்னல்</div>
              <div className="text-yellow-400 font-black text-4xl" style={{ fontFamily: 'Bebas Neue, Impact, sans-serif' }}>24</div>
              <div className="text-red-400 text-sm font-bold">.com</div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 tamil-text">
              மட்டக்களப்பு மாவட்டம் மற்றும் இலங்கையின் முன்னணி தமிழ் செய்தி இணையதளம். 
              நம்பகமான, விரைவான மற்றும் துல்லியமான செய்திகளுக்கு Minnal24ஐ நம்புங்கள்.
            </p>
            <div className="text-gray-500 text-sm space-y-1 tamil-text">
              <div>📍 மட்டக்களப்பு, இலங்கை</div>
              <div>📞 +94 XX XXX XXXX</div>
              <div>✉️ news@minnal24.com</div>
            </div>
            
            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-2 mt-5">
              <SocialButton href="https://facebook.com/minnal24" label="Facebook" color="bg-blue-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                Facebook
              </SocialButton>
              <SocialButton href="https://youtube.com/minnal24" label="YouTube" color="bg-red-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
                YouTube
              </SocialButton>
              <SocialButton href="https://twitter.com/minnal24news" label="Twitter/X" color="bg-gray-800">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
                Twitter
              </SocialButton>
              <SocialButton href="https://wa.me/94XXXXXXXXX" label="WhatsApp" color="bg-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </SocialButton>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-4 pb-2 border-b border-gray-700 tamil-text">
              பகுதிகள்
            </h4>
            <ul className="space-y-2">
              {categories.slice(0, 8).map(cat => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`}
                    className="text-gray-400 text-sm hover:text-white transition-colors tamil-text flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }}></span>
                    {cat.tamilName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-4 pb-2 border-b border-gray-700">
              தகவல்
            </h4>
            <ul className="space-y-2">
              {footerLinks.about.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors tamil-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy & Services */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-4 pb-2 border-b border-gray-700">
              சேவைகள்
            </h4>
            <ul className="space-y-2">
              {footerLinks.policy.concat(footerLinks.services).map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors tamil-text">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <div className="tamil-text text-center md:text-left">
              © {currentYear} Minnal24.com. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
              மட்டக்களப்பு, இலங்கையில் இருந்து ❤️ உடன் தயாரிக்கப்பட்டது.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors tamil-text">தனியுரிமை</Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-gray-300 transition-colors tamil-text">விதிமுறைகள்</Link>
              <span>|</span>
              <Link href="/sitemap.xml" className="hover:text-gray-300 transition-colors">Sitemap</Link>
              <span>|</span>
              <a href="/rss.xml" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                <svg className="w-3 h-3 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.18 15.64a2.18 2.18 0 012.18 2.18C8.36 19.01 7.38 20 6.18 20C4.98 20 4 19.01 4 17.82a2.18 2.18 0 012.18-2.18M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 004 7.27V4.44m0 5.66a9.9 9.9 0 019.9 9.9h-2.83A7.07 7.07 0 004 12.93V10.1z" />
                </svg>
                RSS
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
