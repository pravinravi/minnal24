import { useState, useEffect } from 'react';
import Link from 'next/link';
import { categories } from '../data/newsData';

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/minnal24', icon: 'fb' },
  { name: 'YouTube', href: 'https://youtube.com/minnal24', icon: 'yt' },
  { name: 'Twitter', href: 'https://twitter.com/minnal24news', icon: 'tw' },
  { name: 'WhatsApp', href: 'https://wa.me/94XXXXXXXXX', icon: 'wa' },
];

const SocialIcon = ({ icon }) => {
  if (icon === 'fb') return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
  if (icon === 'yt') return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
  if (icon === 'tw') return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
  );
  if (icon === 'wa') return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
  return null;
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') { setDarkMode(true); document.documentElement.classList.add('dark'); }
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', next);
    if (next) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString('ta-LK', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
      }));
    };
    updateTime();
    const t = setInterval(updateTime, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div className="bg-gray-900 text-gray-300 text-xs py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="tamil-text">{currentTime}</span>
            <span className="text-gray-600">|</span>
            <a href="tel:+94XXXXXXXXX" className="hover:text-white transition-colors">📞 +94 XX XXX XXXX</a>
            <span className="text-gray-600">|</span>
            <a href="mailto:news@minnal24.com" className="hover:text-white transition-colors">✉️ news@minnal24.com</a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-xs">எங்களை பின்தொடருங்கள்:</span>
            {socialLinks.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors p-1" aria-label={s.name}>
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`bg-white dark:bg-gray-900 sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg border-b-2 border-red-600' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 md:py-3">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-red-700 font-black text-2xl md:text-3xl tamil-text leading-none">மின்னல்</span>
                <span className="text-yellow-500 font-black text-3xl md:text-4xl leading-none" style={{ fontFamily: 'Impact, sans-serif' }}>24</span>
                <span className="text-red-600 text-xs font-bold">.com</span>
              </div>
            </Link>

            {/* Desktop ad */}
            <div className="hidden lg:flex flex-1 max-w-md mx-6">
              <div className="w-full h-16 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-xs text-gray-400">விளம்பரம் - 728×90</span>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search */}
              <button onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-600 transition-colors" aria-label="Search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Dark mode toggle */}
              <button onClick={toggleDark}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-600 transition-colors"
                aria-label="Toggle dark mode"
                title={darkMode ? 'Light Mode' : 'Dark Mode'}>
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.592-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              {/* Mobile menu */}
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-600 transition-colors" aria-label="Menu">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-3 border-t border-gray-100 dark:border-gray-700 pt-2">
              <form action="/search" method="get" className="flex gap-2">
                <input type="search" name="q" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="செய்திகளை தேடுங்கள்..."
                  className="flex-1 px-4 py-2.5 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:border-red-500 focus:outline-none tamil-text text-sm"
                  autoFocus />
                <button type="submit" className="bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm tamil-text">
                  தேடு
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="bg-red-700 hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center overflow-x-auto">
              <li>
                <Link href="/" className="flex items-center gap-1.5 px-4 py-3 text-white text-sm font-bold hover:bg-red-800 transition-colors whitespace-nowrap tamil-text">
                  🏠 முகப்பு
                </Link>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`}
                    className="block px-4 py-3 text-white text-sm font-semibold hover:bg-red-800 transition-colors whitespace-nowrap tamil-text border-l border-red-600">
                    {cat.tamilName}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/videos"
                  className="flex items-center gap-1.5 px-4 py-3 text-yellow-300 text-sm font-bold hover:bg-red-800 transition-colors whitespace-nowrap border-l border-red-600">
                  📹 வீடியோ
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`mobile-menu md:hidden bg-gray-900 dark:bg-gray-950 ${mobileOpen ? 'open' : ''}`}>
          <div className="px-4 py-3 space-y-0.5">
            <Link href="/" onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-3 text-white text-sm tamil-text hover:bg-gray-800 rounded-lg transition-colors">
              🏠 முகப்பு
            </Link>
            {categories.map(cat => (
              <Link key={cat.id} href={`/category/${cat.slug}`} onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 text-white text-sm tamil-text hover:bg-gray-800 rounded-lg transition-colors border-b border-gray-800">
                {cat.tamilName}
              </Link>
            ))}
            <Link href="/videos" onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-yellow-400 text-sm tamil-text hover:bg-gray-800 rounded-lg font-bold">
              📹 வீடியோ
            </Link>
            <div className="flex items-center gap-3 px-3 pt-3 border-t border-gray-700">
              {socialLinks.map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors" aria-label={s.name}>
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
