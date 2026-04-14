// components/ShareButtons.js
import { useState } from 'react';

export default function ShareButtons({ url, title, className = '' }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
    }
  };

  const buttons = [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      label: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-gray-800 hover:bg-gray-700',
      icon: (
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-green-600 hover:bg-green-700',
      icon: '📱',
      emoji: true,
    },
    {
      label: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-blue-400 hover:bg-blue-500',
      icon: '✈️',
      emoji: true,
    },
  ];

  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      <span className="text-sm text-gray-500 tamil-text font-semibold">பகிர்:</span>

      {buttons.map(btn => (
        <a
          key={btn.label}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-1.5 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${btn.color}`}
        >
          {btn.emoji ? (
            <span className="text-sm">{btn.icon}</span>
          ) : (
            btn.icon
          )}
          {btn.label}
        </a>
      ))}

      {/* Copy link */}
      <button
        onClick={handleCopy}
        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
          copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {copied ? '✓ நகலெடுக்கப்பட்டது' : '🔗 நகலெடு'}
      </button>

      {/* Native share (mobile) */}
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-1.5 bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          ↗ பகிர்
        </button>
      )}
    </div>
  );
}
