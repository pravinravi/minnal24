import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      router.push('/admin/dashboard');
    } else {
      setError('தவறான username அல்லது password. மீண்டும் முயற்சிக்கவும்.');
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login — Minnal24</title>
        <meta name="robots" content="noindex,nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Noto Sans Tamil', sans-serif",
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(204,0,0,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.05) 0%, transparent 40%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          width: '100%', maxWidth: 420,
          background: '#111',
          border: '1px solid #222',
          borderRadius: 20,
          padding: '2.5rem 2rem',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#CC0000' }}>மின்னல்</span>
              <span style={{ fontSize: 34, fontWeight: 900, color: '#F59E0B', fontFamily: 'Impact, sans-serif' }}>24</span>
              <span style={{ fontSize: 12, color: '#CC0000', fontWeight: 700 }}>.com</span>
            </div>
            <div style={{ color: '#444', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>Admin Panel</div>
          </div>

          <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
            உள்நுழைக
          </h1>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase' }}>
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                required
                style={{
                  width: '100%', padding: '12px 14px',
                  background: '#1a1a1a', border: '1px solid #2a2a2a',
                  borderRadius: 10, color: '#fff', fontSize: 14,
                  outline: 'none', boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#CC0000'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#888', fontSize: 12, marginBottom: 6, letterSpacing: 1, textTransform: 'uppercase' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%', padding: '12px 42px 12px 14px',
                    background: '#1a1a1a', border: '1px solid #2a2a2a',
                    borderRadius: 10, color: '#fff', fontSize: 14,
                    outline: 'none', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#CC0000'}
                  onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#555', fontSize: 16,
                  }}
                >{showPass ? '🙈' : '👁'}</button>
              </div>
            </div>

            {error && (
              <div style={{
                background: 'rgba(204,0,0,0.1)', border: '1px solid rgba(204,0,0,0.3)',
                borderRadius: 8, padding: '10px 14px', color: '#ff6b6b',
                fontSize: 13, marginBottom: '1rem',
              }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? '#333' : '#CC0000',
                border: 'none', borderRadius: 10,
                color: '#fff', fontSize: 15, fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Noto Sans Tamil', sans-serif",
                transition: 'all 0.2s',
                letterSpacing: 0.5,
              }}
            >
              {loading ? 'சரிபார்க்கிறோம்...' : 'உள்நுழை →'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#333', fontSize: 12 }}>
            Default: admin / minnal24@admin
          </div>
        </div>
      </div>
    </>
  );
}
