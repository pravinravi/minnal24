import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const menuItems = [
  { id: 'dashboard', label: 'டாஷ்போர்டு', icon: '🏠' },
  { id: 'posts', label: 'செய்திகள்', icon: '📰' },
  { id: 'add', label: 'புதிய செய்தி', icon: '✏️' },
  { id: 'breaking', label: 'Breaking News', icon: '⚡' },
  { id: 'ads', label: 'விளம்பரங்கள்', icon: '📢' },
  { id: 'settings', label: 'அமைப்புகள்', icon: '⚙️' },
];

const categories = [
  { id: 'batticaloa', name: 'மட்டக்களப்பு', color: '#059669' },
  { id: 'srilanka', name: 'இலங்கை', color: '#2563EB' },
  { id: 'politics', name: 'அரசியல்', color: '#7C3AED' },
  { id: 'international', name: 'சர்வதேசம்', color: '#D97706' },
  { id: 'sports', name: 'விளையாட்டு', color: '#0891B2' },
  { id: 'entertainment', name: 'பொழுதுபோக்கு', color: '#DB2777' },
  { id: 'business', name: 'வணிகம்', color: '#65A30D' },
  { id: 'technology', name: 'தொழில்நுட்பம்', color: '#0284C7' },
  { id: 'health', name: 'சுகாதாரம்', color: '#16A34A' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [posts, setPosts] = useState([]);
  const [breakingList, setBreakingList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // New post form state
  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: 'batticaloa',
    categoryName: 'மட்டக்களப்பு', image: '', author: '', isBreaking: false,
    featured: false, slug: '',
  });

  // Breaking news form
  const [newBreaking, setNewBreaking] = useState('');

  // Settings
  const [settings, setSettings] = useState({ siteName: 'Minnal24', adminPassword: '' });

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    const res = await fetch('/api/admin/check');
    if (!res.ok) router.push('/admin');
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/posts');
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
      if (data.breaking) setBreakingList(data.breaking);
    } catch (e) {}
    setLoading(false);
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFormChange = (field, value) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && !prev.slug) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 60);
      }
      if (field === 'category') {
        const cat = categories.find(c => c.id === value);
        if (cat) updated.categoryName = cat.name;
      }
      return updated;
    });
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.category) {
      showToast('தலைப்பு, சுருக்கம் மற்றும் பிரிவு அவசியம்!', 'error'); return;
    }
    setLoading(true);
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, date: new Date().toISOString().split('T')[0], views: 0, id: Date.now() }),
    });
    setLoading(false);
    if (res.ok) {
      showToast('செய்தி வெற்றிகரமாக publish ஆகிவிட்டது! ✅');
      setForm({ title: '', excerpt: '', content: '', category: 'batticaloa', categoryName: 'மட்டக்களப்பு', image: '', author: '', isBreaking: false, featured: false, slug: '' });
      loadData();
      setActiveTab('posts');
    } else {
      showToast('Error! மீண்டும் முயற்சிக்கவும்.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/admin/posts?id=${id}`, { method: 'DELETE' });
    if (res.ok) { showToast('செய்தி நீக்கப்பட்டது!'); loadData(); }
    setDeleteConfirm(null);
  };

  const handleBreakingAdd = async () => {
    if (!newBreaking.trim()) return;
    const res = await fetch('/api/admin/breaking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newBreaking }),
    });
    if (res.ok) { showToast('Breaking news சேர்க்கப்பட்டது! ⚡'); setNewBreaking(''); loadData(); }
  };

  const handleBreakingDelete = async (idx) => {
    const res = await fetch(`/api/admin/breaking?idx=${idx}`, { method: 'DELETE' });
    if (res.ok) { showToast('நீக்கப்பட்டது!'); loadData(); }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const s = {
    wrap: { display: 'flex', minHeight: '100vh', background: '#f0f2f5', fontFamily: "'Noto Sans Tamil', sans-serif" },
    sidebar: {
      width: sidebarOpen ? 240 : 64, flexShrink: 0, background: '#111', transition: 'width 0.25s ease',
      display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
    },
    logo: { padding: '20px 16px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', gap: 10 },
    menuItem: (active) => ({
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
      cursor: 'pointer', transition: 'all 0.15s', borderRadius: 0, border: 'none',
      background: active ? '#CC0000' : 'none', color: active ? '#fff' : '#888',
      fontSize: 14, fontFamily: "'Noto Sans Tamil', sans-serif", width: '100%', textAlign: 'left',
      whiteSpace: 'nowrap', overflow: 'hidden',
    }),
    main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    topbar: {
      background: '#fff', padding: '14px 24px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', flexShrink: 0,
    },
    content: { flex: 1, padding: 24, overflowY: 'auto' },
    card: { background: '#fff', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid #e5e7eb' },
    statCard: { background: '#fff', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #e5e7eb' },
    input: {
      width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb',
      borderRadius: 8, fontSize: 13, fontFamily: "'Noto Sans Tamil', sans-serif",
      boxSizing: 'border-box', outline: 'none', background: '#fff',
      transition: 'border-color 0.2s',
    },
    label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
    btnRed: {
      background: '#CC0000', color: '#fff', border: 'none', borderRadius: 8,
      padding: '10px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 700,
      fontFamily: "'Noto Sans Tamil', sans-serif",
    },
    btnGray: {
      background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb',
      borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 12,
      fontFamily: "'Noto Sans Tamil', sans-serif",
    },
    badge: (color) => ({
      display: 'inline-block', padding: '2px 8px', borderRadius: 20,
      fontSize: 11, fontWeight: 600, background: color + '20', color: color,
    }),
  };

  const stats = [
    { label: 'மொத்த செய்திகள்', value: posts.length, icon: '📰', color: '#CC0000' },
    { label: 'Breaking News', value: breakingList.length, icon: '⚡', color: '#F59E0B' },
    { label: 'Featured', value: posts.filter(p => p.featured).length, icon: '⭐', color: '#0891B2' },
    { label: 'இன்று', value: posts.filter(p => p.date === new Date().toISOString().split('T')[0]).length, icon: '📅', color: '#059669' },
  ];

  return (
    <>
      <Head>
        <title>Admin Dashboard — Minnal24</title>
        <meta name="robots" content="noindex,nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 20, right: 20, zIndex: 9999,
          background: toast.type === 'error' ? '#991b1b' : '#14532d',
          color: '#fff', padding: '12px 20px', borderRadius: 10,
          fontSize: 13, fontFamily: "'Noto Sans Tamil', sans-serif",
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)', animation: 'fadeIn 0.3s ease',
        }}>
          {toast.msg}
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, maxWidth: 360, width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>செய்தியை நீக்கவா?</h3>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>இந்த செய்தி நிரந்தரமாக நீக்கப்படும்.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button style={s.btnGray} onClick={() => setDeleteConfirm(null)}>ரத்து செய்</button>
              <button style={{ ...s.btnRed }} onClick={() => handleDelete(deleteConfirm)}>நீக்கு</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        input:focus, textarea:focus, select:focus { border-color: #CC0000 !important; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #CC0000; border-radius: 3px; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={s.wrap}>
        {/* Sidebar */}
        <div style={s.sidebar}>
          <div style={s.logo}>
            {sidebarOpen && (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span style={{ color: '#CC0000', fontWeight: 900, fontSize: 18 }}>மின்னல்</span>
                <span style={{ color: '#F59E0B', fontWeight: 900, fontSize: 22, fontFamily: 'Impact' }}>24</span>
              </div>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 18, marginLeft: 'auto', padding: 4 }}>
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>

          <nav style={{ flex: 1, padding: '8px 0' }}>
            {menuItems.map(item => (
              <button key={item.id} style={s.menuItem(activeTab === item.id)} onClick={() => setActiveTab(item.id)}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          <div style={{ padding: '16px', borderTop: '1px solid #222' }}>
            <button onClick={handleLogout}
              style={{ ...s.menuItem(false), color: '#ef4444', padding: '10px 16px', borderRadius: 8 }}>
              <span style={{ fontSize: 18 }}>🚪</span>
              {sidebarOpen && <span>வெளியேறு</span>}
            </button>
          </div>
        </div>

        {/* Main */}
        <div style={s.main}>
          {/* Topbar */}
          <div style={s.topbar}>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: 0 }}>
                {menuItems.find(m => m.id === activeTab)?.icon} {menuItems.find(m => m.id === activeTab)?.label}
              </h1>
              <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Minnal24 Admin Panel</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <a href="/" target="_blank" style={{ ...s.btnGray, textDecoration: 'none', fontSize: 12 }}>🌐 Website பாருங்கள்</a>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#CC0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>A</div>
            </div>
          </div>

          {/* Content */}
          <div style={s.content}>

            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
                  {stats.map((stat, i) => (
                    <div key={i} style={s.statCard}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</div>
                      <div style={{ fontSize: 28, fontWeight: 900, color: stat.color }}>{stat.value}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={s.card}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#111' }}>சமீபத்திய செய்திகள்</h3>
                    {posts.slice(0, 5).map((p, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <span style={{ fontSize: 20, color: '#ccc', fontWeight: 900, width: 24 }}>{String(i + 1).padStart(2, '0')}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#111', lineHeight: 1.4 }}>{p.title?.slice(0, 45)}...</div>
                          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{p.date} · {p.categoryName}</div>
                        </div>
                      </div>
                    ))}
                    {posts.length === 0 && <p style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>இன்னும் செய்திகள் இல்லை</p>}
                  </div>

                  <div style={s.card}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#111' }}>⚡ Breaking News</h3>
                    {breakingList.slice(0, 5).map((b, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <span style={{ color: '#CC0000', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>●</span>
                        <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{b}</span>
                      </div>
                    ))}
                    {breakingList.length === 0 && <p style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Breaking news இல்லை</p>}
                    <button style={{ ...s.btnRed, marginTop: 12, width: '100%', padding: '8px' }} onClick={() => setActiveTab('breaking')}>
                      + சேர்க்க
                    </button>
                  </div>
                </div>

                <div style={{ ...s.card, marginTop: 0 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: '#111' }}>விரைவு செயல்கள்</h3>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button style={s.btnRed} onClick={() => setActiveTab('add')}>✏️ புதிய செய்தி</button>
                    <button style={s.btnGray} onClick={() => setActiveTab('breaking')}>⚡ Breaking News</button>
                    <button style={s.btnGray} onClick={() => setActiveTab('posts')}>📋 எல்லா செய்திகளும்</button>
                    <button style={s.btnGray} onClick={() => setActiveTab('settings')}>⚙️ அமைப்புகள்</button>
                  </div>
                </div>
              </div>
            )}

            {/* ALL POSTS */}
            {activeTab === 'posts' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <p style={{ color: '#6b7280', fontSize: 13 }}>{posts.length} செய்திகள்</p>
                  <button style={s.btnRed} onClick={() => setActiveTab('add')}>+ புதிய செய்தி</button>
                </div>
                {loading && <p style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>ஏற்றுகிறோம்...</p>}
                {posts.length === 0 && !loading && (
                  <div style={{ ...s.card, textAlign: 'center', padding: 40 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📰</div>
                    <p style={{ color: '#9ca3af' }}>இன்னும் செய்திகள் இல்லை. புதிய செய்தி சேர்க்கவும்!</p>
                    <button style={{ ...s.btnRed, marginTop: 16 }} onClick={() => setActiveTab('add')}>+ புதிய செய்தி</button>
                  </div>
                )}
                {posts.map((post, i) => {
                  const cat = categories.find(c => c.id === post.category);
                  return (
                    <div key={i} style={{ ...s.card, padding: '14px 18px', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                        {post.image && (
                          <img src={post.image} alt="" style={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                            {post.isBreaking && <span style={{ ...s.badge('#CC0000'), fontSize: 10 }}>⚡ Breaking</span>}
                            {post.featured && <span style={{ ...s.badge('#F59E0B'), fontSize: 10 }}>⭐ Featured</span>}
                            <span style={s.badge(cat?.color || '#666')}>{post.categoryName}</span>
                          </div>
                          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111', margin: '0 0 4px', lineHeight: 1.4 }}>{post.title}</h3>
                          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>{post.author} · {post.date} · /news/{post.slug}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                          <button style={s.btnGray} onClick={() => setDeleteConfirm(post.id)}>🗑️ நீக்கு</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ADD POST */}
            {activeTab === 'add' && (
              <div style={{ maxWidth: 760 }}>
                <div style={s.card}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#111' }}>✏️ புதிய செய்தி எழுதுங்கள்</h2>
                  <form onSubmit={handlePublish}>
                    <div style={{ marginBottom: 16 }}>
                      <label style={s.label}>செய்தி தலைப்பு *</label>
                      <input style={s.input} value={form.title} onChange={e => handleFormChange('title', e.target.value)}
                        placeholder="செய்தி தலைப்பை இங்கே எழுதுங்கள்..." required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={s.label}>பிரிவு *</label>
                        <select style={s.input} value={form.category} onChange={e => handleFormChange('category', e.target.value)}>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={s.label}>ஆசிரியர்</label>
                        <input style={s.input} value={form.author} onChange={e => handleFormChange('author', e.target.value)} placeholder="உங்கள் பெயர்" />
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={s.label}>சுருக்கம் *</label>
                      <textarea style={{ ...s.input, minHeight: 80, resize: 'vertical' }}
                        value={form.excerpt} onChange={e => handleFormChange('excerpt', e.target.value)}
                        placeholder="செய்தியின் சுருக்கத்தை எழுதுங்கள் (2-3 வாக்கியங்கள்)..." required />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={s.label}>முழு செய்தி</label>
                      <textarea style={{ ...s.input, minHeight: 200, resize: 'vertical' }}
                        value={form.content} onChange={e => handleFormChange('content', e.target.value)}
                        placeholder="முழு செய்தியை இங்கே எழுதுங்கள்..." />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={s.label}>படம் (Image URL)</label>
                      <input style={s.input} value={form.image} onChange={e => handleFormChange('image', e.target.value)}
                        placeholder="https://example.com/image.jpg" />
                      {form.image && (
                        <img src={form.image} alt="" style={{ marginTop: 8, height: 120, borderRadius: 8, objectFit: 'cover' }}
                          onError={e => e.target.style.display = 'none'} />
                      )}
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={s.label}>URL Slug</label>
                      <input style={s.input} value={form.slug} onChange={e => handleFormChange('slug', e.target.value)}
                        placeholder="news-title-in-english" />
                      <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>URL: /news/{form.slug || 'your-news-slug'}</p>
                    </div>

                    <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
                        <input type="checkbox" checked={form.isBreaking} onChange={e => handleFormChange('isBreaking', e.target.checked)}
                          style={{ width: 16, height: 16, accentColor: '#CC0000' }} />
                        ⚡ Breaking News
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
                        <input type="checkbox" checked={form.featured} onChange={e => handleFormChange('featured', e.target.checked)}
                          style={{ width: 16, height: 16, accentColor: '#CC0000' }} />
                        ⭐ Featured
                      </label>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <button type="submit" style={{ ...s.btnRed, padding: '12px 28px', fontSize: 14 }} disabled={loading}>
                        {loading ? 'Publish ஆகிறது...' : '🚀 Publish செய்'}
                      </button>
                      <button type="button" style={s.btnGray} onClick={() => setForm({ title: '', excerpt: '', content: '', category: 'batticaloa', categoryName: 'மட்டக்களப்பு', image: '', author: '', isBreaking: false, featured: false, slug: '' })}>
                        🗑️ Clear
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* BREAKING NEWS */}
            {activeTab === 'breaking' && (
              <div style={{ maxWidth: 700 }}>
                <div style={s.card}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111' }}>⚡ Breaking News நிர்வாகம்</h2>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                    <input style={{ ...s.input, flex: 1 }} value={newBreaking}
                      onChange={e => setNewBreaking(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleBreakingAdd()}
                      placeholder="புதிய breaking news இங்கே தட்டச்சு செய்யுங்கள்..." />
                    <button style={s.btnRed} onClick={handleBreakingAdd}>+ சேர்</button>
                  </div>

                  <div style={{ background: '#f9fafb', borderRadius: 8, padding: 16 }}>
                    <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      தற்போதைய Breaking News ({breakingList.length})
                    </p>
                    {breakingList.length === 0 && (
                      <p style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>Breaking news இல்லை</p>
                    )}
                    {breakingList.map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ color: '#CC0000', fontWeight: 700, fontSize: 18, flexShrink: 0, lineHeight: 1 }}>●</span>
                        <span style={{ flex: 1, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{item}</span>
                        <button onClick={() => handleBreakingDelete(i)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 16, padding: '0 4px', flexShrink: 0 }}>
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ADS */}
            {activeTab === 'ads' && (
              <div style={{ maxWidth: 700 }}>
                <div style={s.card}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#111' }}>📢 விளம்பர இடங்கள்</h2>
                  {[
                    { name: 'Header Leaderboard', size: '728×90', location: 'முகப்பு பக்கம் மேலே' },
                    { name: 'Sidebar Rectangle', size: '300×250', location: 'பக்கவாட்டு' },
                    { name: 'In-Article Banner', size: '728×90', location: 'செய்தி நடுவில்' },
                    { name: 'Mobile Banner', size: '320×50', location: 'மொபைல் கீழே' },
                    { name: 'Billboard', size: '970×250', location: 'முகப்பு நடுவில்' },
                  ].map((ad, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{ad.name}</div>
                        <div style={{ fontSize: 12, color: '#9ca3af' }}>{ad.size} · {ad.location}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, background: '#f3f4f6', color: '#6b7280', padding: '3px 10px', borderRadius: 20 }}>காலி உள்ளது</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, padding: 14, background: '#fff9f0', borderRadius: 8, border: '1px solid #fed7aa' }}>
                    <p style={{ fontSize: 13, color: '#92400e' }}>📞 விளம்பரதாரர்களை தொடர்பு கொள்ள: <strong>ads@minnal24.com</strong> அல்லது <strong>+94 XX XXX XXXX</strong></p>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {activeTab === 'settings' && (
              <div style={{ maxWidth: 600 }}>
                <div style={s.card}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#111' }}>⚙️ அமைப்புகள்</h2>

                  <div style={{ marginBottom: 20, padding: 16, background: '#fef2f2', borderRadius: 10, border: '1px solid #fecaca' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#991b1b', marginBottom: 12 }}>🔐 Password மாற்றுங்கள்</h3>
                    <div style={{ marginBottom: 12 }}>
                      <label style={s.label}>புதிய Password</label>
                      <input type="password" style={s.input} value={settings.adminPassword}
                        onChange={e => setSettings({ ...settings, adminPassword: e.target.value })}
                        placeholder="புதிய password உள்ளிடுங்கள்" />
                    </div>
                    <button style={s.btnRed} onClick={async () => {
                      if (!settings.adminPassword) { showToast('Password உள்ளிடவும்!', 'error'); return; }
                      const res = await fetch('/api/admin/settings', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ password: settings.adminPassword }),
                      });
                      if (res.ok) { showToast('Password மாற்றப்பட்டது! ✅'); setSettings({ ...settings, adminPassword: '' }); }
                    }}>
                      Password மாற்று
                    </button>
                  </div>

                  <div style={{ padding: 16, background: '#f0fdf4', borderRadius: 10, border: '1px solid #bbf7d0' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#14532d', marginBottom: 8 }}>ℹ️ System Info</h3>
                    <div style={{ fontSize: 13, color: '#166534', lineHeight: 2 }}>
                      <div>🌐 Website: <strong>minnal24.com</strong></div>
                      <div>📦 Framework: <strong>Next.js 14</strong></div>
                      <div>📰 மொத்த செய்திகள்: <strong>{posts.length}</strong></div>
                      <div>⚡ Breaking News: <strong>{breakingList.length}</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
