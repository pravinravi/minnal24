import Head from 'next/head';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <>
      <Head>
        <title>இணைப்பு இல்லை - Minnal24</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Noto Sans Tamil', sans-serif",
          background: '#f3f4f6',
          padding: '1rem',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          {/* Logo */}
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: '#CC0000' }}>மின்னல்</span>
            <span style={{ fontSize: 38, fontWeight: 900, color: '#F59E0B', fontFamily: 'Impact, sans-serif' }}>24</span>
            <span style={{ fontSize: 14, color: '#CC0000', fontWeight: 700 }}>.com</span>
          </div>

          <div style={{ fontSize: 64, marginBottom: 16 }}>📡</div>

          <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1a1a1a', marginBottom: 8 }}>
            இணைப்பு இல்லை
          </h1>
          <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
            இந்த நேரத்தில் இணையத்துடன் இணைக்க முடியவில்லை. உங்கள் இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்.
          </p>

          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#CC0000',
              color: '#fff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              marginBottom: 12,
              display: 'block',
              width: '100%',
            }}
          >
            மீண்டும் முயற்சி →
          </button>

          <a
            href="/"
            style={{
              display: 'block',
              background: '#f3f4f6',
              color: '#374151',
              padding: '12px 28px',
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            🏠 முகப்பிற்கு செல்
          </a>
        </div>
      </div>
    </>
  );
}
