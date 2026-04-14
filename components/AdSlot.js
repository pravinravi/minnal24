// components/AdSlot.js — Fixed: No floating, proper static positioning

function AdContent({ label, size }) {
  return (
    <div style={{ textAlign: 'center', padding: '8px' }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#d1d5db', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
        விளம்பரம்
      </div>
      <div style={{ fontSize: 11, color: '#d1d5db' }}>{label || size}</div>
      <div style={{ fontSize: 10, color: '#e5e7eb', marginTop: 4 }}>
        📞 +94 XX XXX XXXX | ads@minnal24.com
      </div>
    </div>
  );
}

export default function AdSlot({ size = 'leaderboard', className = '', label }) {
  return (
    <div className={`ad-container ${className}`}
      style={{ width: '100%', display: 'block', position: 'static', float: 'none', clear: 'both' }}>
      <div className="ad-slot ad-leaderboard"
        style={{ width: '100%', maxWidth: 728, height: 90, margin: '0 auto', display: 'flex', position: 'static', float: 'none' }}
        role="complementary" aria-label="Advertisement">
        <AdContent label={label} size="Leaderboard 728×90" />
      </div>
      <div className="ad-slot ad-mobile-only"
        style={{ width: '100%', maxWidth: 320, height: 50, margin: '0 auto', display: 'none', position: 'static', float: 'none' }}
        role="complementary" aria-label="Advertisement">
        <AdContent label={label} size="Mobile 320×50" />
      </div>
    </div>
  );
}

export function InlineAd({ className = '' }) {
  return (
    <div className={`ad-inline ${className}`}
      style={{ width: '100%', display: 'block', position: 'static', float: 'none', clear: 'both', margin: '20px 0' }}>
      <div style={{ fontSize: 10, color: '#d1d5db', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6, textAlign: 'center' }}>விளம்பரம்</div>
      <div className="ad-slot ad-leaderboard"
        style={{ width: '100%', maxWidth: 728, height: 90, margin: '0 auto', position: 'static', float: 'none' }}
        role="complementary" aria-label="Advertisement">
        <AdContent size="Leaderboard 728×90" />
      </div>
      <div className="ad-slot ad-mobile-only"
        style={{ width: '100%', maxWidth: 320, height: 50, margin: '0 auto', display: 'none', position: 'static', float: 'none' }}
        role="complementary" aria-label="Advertisement">
        <AdContent size="Mobile 320×50" />
      </div>
    </div>
  );
}

export function SidebarAd({ className = '' }) {
  return (
    <div className={`ad-sidebar ${className}`}
      style={{ display: 'block', position: 'static', float: 'none', clear: 'both', width: '100%' }}>
      <div style={{ fontSize: 10, color: '#d1d5db', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6, textAlign: 'center' }}>விளம்பரம்</div>
      <div className="ad-slot"
        style={{ width: '100%', maxWidth: 300, height: 250, margin: '0 auto', position: 'static', float: 'none', borderRadius: 10 }}
        role="complementary" aria-label="Advertisement">
        <AdContent size="300×250" />
      </div>
      <div style={{ marginTop: 16 }}>
        <div className="ad-slot"
          style={{ width: '100%', maxWidth: 300, height: 250, margin: '0 auto', position: 'static', float: 'none', borderRadius: 10 }}
          role="complementary" aria-label="Advertisement">
          <AdContent size="300×250" />
        </div>
      </div>
    </div>
  );
}

export function BillboardAd({ className = '' }) {
  return (
    <div className={`ad-inline ${className}`}
      style={{ width: '100%', display: 'block', position: 'static', float: 'none', clear: 'both', margin: '24px 0' }}>
      <div style={{ fontSize: 10, color: '#d1d5db', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6, textAlign: 'center' }}>விளம்பரம்</div>
      <div className="ad-slot ad-leaderboard"
        style={{ width: '100%', maxWidth: 970, height: 120, margin: '0 auto', position: 'static', float: 'none', borderRadius: 10 }}
        role="complementary" aria-label="Advertisement">
        <AdContent size="Billboard 970×120" />
      </div>
    </div>
  );
}
