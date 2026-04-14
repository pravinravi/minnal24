import { useState, useEffect } from 'react';
import Link from 'next/link';
import { breakingNews as staticBreaking } from '../data/newsData';

export default function BreakingNewsTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [breakingList, setBreakingList] = useState(staticBreaking);

  useEffect(() => {
    fetch('/api/public/posts')
      .then(r => r.json())
      .then(d => { if (d.breaking && d.breaking.length > 0) setBreakingList(d.breaking); })
      .catch(() => {});
  }, []);

  const tickerText = breakingList.join('  ●  ');

  return (
    <div className="bg-gray-900 border-b-2 border-red-600">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-stretch">
          <div className="pulse-red flex-shrink-0 flex items-center gap-2 px-4 py-2.5 z-10">
            <span className="inline-flex items-center gap-1.5 text-white font-black text-xs tracking-wider uppercase tamil-text">
              <span className="inline-block w-2 h-2 bg-white rounded-full animate-ping"></span>
              உடனடி செய்தி
            </span>
          </div>
          <div className="w-0.5 bg-red-800 flex-shrink-0"></div>
          <div
            className="flex-1 overflow-hidden relative flex items-center cursor-pointer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="whitespace-nowrap text-sm text-gray-200 tamil-text font-medium py-2.5"
              style={{
                display: 'inline-block',
                animation: isPaused ? 'none' : 'ticker 80s linear infinite',
              }}
            >
              {tickerText}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{tickerText}
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center px-3">
            <Link href="/breaking"
              className="text-yellow-400 text-xs font-bold whitespace-nowrap hover:text-yellow-300 transition-colors tamil-text hidden sm:block">
              அனைத்தும் →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
