import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const menuItems = [
  { id: 'dashboard', label: 'டாஷ்போர்டு', icon: '🏠' },
  { id: 'posts', label: 'செய்திகள்', icon: '📰' },
  { id: 'add', label: 'புதிய செய்தி', icon: '✏️' },
  { id: 'media', label: 'Media Library', icon: '🖼️' },
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

const emptyForm = {
  id: null, title: '', excerpt: '', content: '', category: 'batticaloa',
  categoryName: 'மட்டக்களப்பு', image: '', author: '', isBreaking: false, featured: false, slug: '',
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [posts, setPosts] = useState([]);
  const [media, setMedia] = useState([]);
  const [breakingList, setBreakingList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [newBreaking, setNewBreaking] = useState('');
  const [settings, setSettings] = useState({ adminPassword: '' });
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaAlt, setMediaAlt] = useState('');
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [searchPosts, setSearchPosts] = useState('');

  useEffect(() => { checkAuth(); loadData(); }, []);

  const checkAuth = async () => {
    const res = await fetch('/api/admin/check');
    if (!res.ok) router.push('/admin');
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [postsRes, mediaRes] = await Promise.all([fetch('/api/admin/posts'), fetch('/api/admin/media')]);
      const pd = await postsRes.json();
      const md = await mediaRes.json();
      if (pd.posts) setPosts(pd.posts);
      if (pd.breaking) setBreakingList(pd.breaking);
      if (Array.isArray(md)) setMedia(md);
    } catch {}
    setLoading(false);
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFormChange = (field, value) => {
    setForm(prev => {
      const u = { ...prev, [field]: value };
      if (field === 'title' && !editingId) u.slug = value.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').slice(0, 60);
      if (field === 'category') { const c = categories.find(x => x.id === value); if (c) u.categoryName = c.name; }
      return u;
    });
  };

  const handleEditPost = (post) => { setForm({ ...post }); setEditingId(post.id); setActiveTab('add'); window.scrollTo(0, 0); };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!form.title || !form.excerpt) { showToast('தலைப்பு மற்றும் சுருக்கம் அவசியம்!', 'error'); return; }
    setLoading(true);
    const payload = editingId ? { ...form, id: editingId } : { ...form, date: new Date().toISOString().split('T')[0] };
    const res = await fetch('/api/admin/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setLoading(false);
    if (res.ok) {
      showToast(editingId ? '✅ Update ஆகிவிட்டது!' : '✅ Publish ஆகிவிட்டது!');
      setForm(emptyForm); setEditingId(null); loadData(); setActiveTab('posts');
    } else showToast('Error! மீண்டும் முயற்சிக்கவும்.', 'error');
  };

  const handleDelete = async (id) => {
    const res = await fetch('/api/admin/posts?id=' + id, { method: 'DELETE' });
    if (res.ok) { showToast('நீக்கப்பட்டது!'); loadData(); }
    setDeleteConfirm(null);
  };

  const handleBreakingAdd = async () => {
    if (!newBreaking.trim()) return;
    const res = await fetch('/api/admin/breaking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: newBreaking }) });
    if (res.ok) { showToast('⚡ சேர்க்கப்பட்டது!'); setNewBreaking(''); loadData(); }
  };

  const handleBreakingDelete = async (idx) => {
    const res = await fetch('/api/admin/breaking?idx=' + idx, { method: 'DELETE' });
    if (res.ok) { showToast('நீக்கப்பட்டது!'); loadData(); }
  };

  const handleAddMedia = async () => {
    if (!mediaUrl.trim()) { showToast('Image URL உள்ளிடவும்!', 'error'); return; }
    const res = await fetch('/api/admin/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: mediaUrl, alt: mediaAlt }) });
    if (res.ok) { showToast('🖼️ படம் சேர்க்கப்பட்டது!'); setMediaUrl(''); setMediaAlt(''); loadData(); }
  };

  const handleDeleteMedia = async (id) => {
    const res = await fetch('/api/admin/media?id=' + id, { method: 'DELETE' });
    if (res.ok) { showToast('நீக்கப்பட்டது!'); loadData(); }
  };

  const handleLogout = async () => { await fetch('/api/admin/logout', { method: 'POST' }); router.push('/admin'); };

  const filteredPosts = posts.filter(p => !searchPosts || p.title?.toLowerCase().includes(searchPosts.toLowerCase()));

  const inp = { width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, fontFamily: "'Noto Sans Tamil',sans-serif", boxSizing: 'border-box', outline: 'none', background: '#fff' };
  const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 };
  const btnR = { background: '#CC0000', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: "'Noto Sans Tamil',sans-serif" };
  const btnG = { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 12, fontFamily: "'Noto Sans Tamil',sans-serif" };
  const btnB = { background: '#2563EB', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 12, fontFamily: "'Noto Sans Tamil',sans-serif" };
  const card = { background: '#fff', borderRadius: 12, padding: 20, marginBottom: 16, border: '1px solid #e5e7eb' };
  const bdg = (c) => ({ display: 'inline-block', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: c + '20', color: c });

  return (
    <>
      <Head>
        <title>Admin — Minnal24</title>
        <meta name="robots" content="noindex,nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: toast.type === 'error' ? '#991b1b' : '#14532d', color: '#fff', padding: '12px 20px', borderRadius: 10, fontSize: 13, fontFamily: "'Noto Sans Tamil',sans-serif", boxShadow: '0 4px 20px rgba(0,0,0,0.3)', zIndex: 9999 }}>
          {toast.msg}
        </div>
      )}

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, maxWidth: 340, width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>நீக்கவா?</h3>
            <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>நிரந்தரமாக நீக்கப்படும்.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button style={btnG} onClick={() => setDeleteConfirm(null)}>ரத்து</button>
              <button style={btnR} onClick={() => handleDelete(deleteConfirm)}>நீக்கு</button>
            </div>
          </div>
        </div>
      )}

      {mediaPickerOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9997, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, width: '100%', maxWidth: 680, maxHeight: '80vh', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>🖼️ படம் தேர்வு செய்யுங்கள்</h3>
              <button onClick={() => setMediaPickerOpen(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#6b7280' }}>✕</button>
            </div>
            {media.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🖼️</div>
                <p>Media Library காலியாக உள்ளது.</p>
                <button style={{ ...btnR, marginTop: 12 }} onClick={() => { setMediaPickerOpen(false); setActiveTab('media'); }}>Media Library-ல் சேர்க்க</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
                {media.map(item => (
                  <div key={item.id} onClick={() => { handleFormChange('image', item.url); setMediaPickerOpen(false); showToast('படம் தேர்வு செய்யப்பட்டது!'); }}
                    style={{ cursor: 'pointer', borderRadius: 8, overflow: 'hidden', border: '2px solid #e5e7eb', transition: 'border-color 0.15s' }}
                    onMouseOver={e => e.currentTarget.style.borderColor = '#CC0000'}
                    onMouseOut={e => e.currentTarget.style.borderColor = '#e5e7eb'}>
                    <img src={item.url} alt={item.alt} style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} onError={e => e.target.style.display = 'none'} />
                    <div style={{ padding: '5px 7px', fontSize: 10, color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.alt || 'படம்'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`*{box-sizing:border-box}input:focus,textarea:focus,select:focus{border-color:#CC0000!important}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#CC0000;border-radius:3px}`}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5', fontFamily: "'Noto Sans Tamil',sans-serif" }}>
        {/* Sidebar */}
        <div style={{ width: sidebarOpen ? 240 : 64, flexShrink: 0, background: '#111', transition: 'width 0.25s ease', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <div style={{ padding: '20px 16px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', gap: 10 }}>
            {sidebarOpen && <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}><span style={{ color: '#CC0000', fontWeight: 900, fontSize: 18 }}>மின்னல்</span><span style={{ color: '#F59E0B', fontWeight: 900, fontSize: 22, fontFamily: 'Impact' }}>24</span></div>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 18, marginLeft: 'auto', padding: 4 }}>{sidebarOpen ? '◀' : '▶'}</button>
          </div>
          <nav style={{ flex: 1, padding: '8px 0' }}>
            {menuItems.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer', transition: 'all 0.15s', border: 'none', background: activeTab === item.id ? '#CC0000' : 'none', color: activeTab === item.id ? '#fff' : '#888', fontSize: 14, fontFamily: "'Noto Sans Tamil',sans-serif", width: '100%', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <div style={{ padding: 16, borderTop: '1px solid #222' }}>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', cursor: 'pointer', border: 'none', background: 'none', color: '#ef4444', fontSize: 14, fontFamily: "'Noto Sans Tamil',sans-serif", width: '100%', borderRadius: 8 }}>
              <span style={{ fontSize: 18 }}>🚪</span>{sidebarOpen && <span>வெளியேறு</span>}
            </button>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Topbar */}
          <div style={{ background: '#fff', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: 0 }}>
                {menuItems.find(m => m.id === activeTab)?.icon} {menuItems.find(m => m.id === activeTab)?.label}
                {editingId && activeTab === 'add' && <span style={{ fontSize: 13, color: '#CC0000', marginLeft: 8 }}>— திருத்துகிறோம்</span>}
              </h1>
              <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Minnal24 Admin Panel</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <a href="/" target="_blank" style={{ ...btnG, textDecoration: 'none', fontSize: 12 }}>🌐 Website</a>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#CC0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>A</div>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: 24, overflowY: 'auto' }}>

            {/* DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 16, marginBottom: 24 }}>
                  {[
                    { label: 'மொத்த செய்திகள்', value: posts.length, icon: '📰', color: '#CC0000' },
                    { label: 'Breaking News', value: breakingList.length, icon: '⚡', color: '#F59E0B' },
                    { label: 'Media Files', value: media.length, icon: '🖼️', color: '#0891B2' },
                    { label: 'Featured', value: posts.filter(p => p.featured).length, icon: '⭐', color: '#059669' },
                  ].map((s, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #e5e7eb' }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                      <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div style={card}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>சமீபத்திய செய்திகள்</h3>
                    {posts.slice(0, 5).map((p, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid #f3f4f6', alignItems: 'center' }}>
                        <span style={{ fontSize: 13, color: '#e0e0e0', fontWeight: 900, width: 22 }}>{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: '#111', lineHeight: 1.4 }}>{p.title?.slice(0, 35)}...</div>
                          <div style={{ fontSize: 10, color: '#9ca3af' }}>{p.date}</div>
                        </div>
                        <button onClick={() => handleEditPost(p)} style={{ ...btnB, padding: '3px 8px', fontSize: 10 }}>✏️</button>
                      </div>
                    ))}
                    {posts.length === 0 && <p style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>இல்லை</p>}
                  </div>
                  <div style={card}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>⚡ Breaking News</h3>
                    {breakingList.slice(0, 4).map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <span style={{ color: '#CC0000', fontWeight: 700 }}>●</span>
                        <span style={{ fontSize: 12, color: '#374151' }}>{b.slice(0, 50)}...</span>
                      </div>
                    ))}
                    <button style={{ ...btnR, marginTop: 12, width: '100%', padding: '8px' }} onClick={() => setActiveTab('breaking')}>+ சேர்க்க</button>
                  </div>
                </div>
                <div style={card}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>விரைவு செயல்கள்</h3>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button style={btnR} onClick={() => { setForm(emptyForm); setEditingId(null); setActiveTab('add'); }}>✏️ புதிய செய்தி</button>
                    <button style={btnG} onClick={() => setActiveTab('media')}>🖼️ Media Library</button>
                    <button style={btnG} onClick={() => setActiveTab('breaking')}>⚡ Breaking News</button>
                    <button style={btnG} onClick={() => setActiveTab('posts')}>📋 எல்லா செய்திகளும்</button>
                  </div>
                </div>
              </div>
            )}

            {/* POSTS */}
            {activeTab === 'posts' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
                  <input style={{ ...inp, maxWidth: 280 }} placeholder="தேடுங்கள்..." value={searchPosts} onChange={e => setSearchPosts(e.target.value)} />
                  <button style={btnR} onClick={() => { setForm(emptyForm); setEditingId(null); setActiveTab('add'); }}>+ புதிய செய்தி</button>
                </div>
                <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 12 }}>{filteredPosts.length} செய்திகள்</p>
                {filteredPosts.map((post, i) => {
                  const cat = categories.find(c => c.id === post.category);
                  return (
                    <div key={i} style={{ ...card, padding: '14px 18px', marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                        {post.image && <img src={post.image} alt="" style={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} onError={e => e.target.style.display = 'none'} />}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', gap: 6, marginBottom: 4, flexWrap: 'wrap' }}>
                            {post.isBreaking && <span style={bdg('#CC0000')}>⚡ Breaking</span>}
                            {post.featured && <span style={bdg('#F59E0B')}>⭐ Featured</span>}
                            <span style={bdg(cat?.color || '#666')}>{post.categoryName}</span>
                          </div>
                          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111', margin: '0 0 4px', lineHeight: 1.4 }}>{post.title}</h3>
                          <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>{post.author} · {post.date}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                          <button style={btnB} onClick={() => handleEditPost(post)}>✏️ திருத்து</button>
                          <button style={btnG} onClick={() => setDeleteConfirm(post.id)}>🗑️</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredPosts.length === 0 && (
                  <div style={{ ...card, textAlign: 'center', padding: 40 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📰</div>
                    <p style={{ color: '#9ca3af' }}>செய்திகள் இல்லை</p>
                    <button style={{ ...btnR, marginTop: 16 }} onClick={() => setActiveTab('add')}>+ புதிய செய்தி</button>
                  </div>
                )}
              </div>
            )}

            {/* ADD/EDIT */}
            {activeTab === 'add' && (
              <div style={{ maxWidth: 760 }}>
                <div style={card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>{editingId ? '✏️ செய்தியை திருத்துங்கள்' : '✏️ புதிய செய்தி'}</h2>
                    {editingId && <button style={btnG} onClick={() => { setForm(emptyForm); setEditingId(null); }}>+ புதிய செய்தி</button>}
                  </div>
                  <form onSubmit={handlePublish}>
                    <div style={{ marginBottom: 16 }}>
                      <label style={lbl}>செய்தி தலைப்பு *</label>
                      <input style={inp} value={form.title} onChange={e => handleFormChange('title', e.target.value)} placeholder="தலைப்பு..." required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={lbl}>பிரிவு *</label>
                        <select style={inp} value={form.category} onChange={e => handleFormChange('category', e.target.value)}>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={lbl}>ஆசிரியர்</label>
                        <input style={inp} value={form.author} onChange={e => handleFormChange('author', e.target.value)} placeholder="பெயர்" />
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={lbl}>சுருக்கம் *</label>
                      <textarea style={{ ...inp, minHeight: 80, resize: 'vertical' }} value={form.excerpt} onChange={e => handleFormChange('excerpt', e.target.value)} placeholder="சுருக்கம்..." required />
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={lbl}>முழு செய்தி</label>
                      <textarea style={{ ...inp, minHeight: 180, resize: 'vertical' }} value={form.content} onChange={e => handleFormChange('content', e.target.value)} placeholder="முழு செய்தி..." />
                    </div>
                    {/* Featured Image */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={lbl}>Featured Image</label>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input style={{ ...inp, flex: 1 }} value={form.image} onChange={e => handleFormChange('image', e.target.value)} placeholder="Image URL அல்லது Library-ல் இருந்து தேர்வு செய்யுங்கள்" />
                        <button type="button" style={{ ...btnB, whiteSpace: 'nowrap' }} onClick={() => setMediaPickerOpen(true)}>🖼️ Library</button>
                      </div>
                      {form.image && (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <img src={form.image} alt="Preview" style={{ height: 110, borderRadius: 8, objectFit: 'cover', maxWidth: '100%' }} onError={e => e.target.style.display = 'none'} />
                          <button type="button" onClick={() => handleFormChange('image', '')}
                            style={{ position: 'absolute', top: 4, right: 4, background: '#CC0000', color: '#fff', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                        </div>
                      )}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={lbl}>URL Slug</label>
                      <input style={inp} value={form.slug} onChange={e => handleFormChange('slug', e.target.value)} placeholder="news-slug-in-english" />
                      <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>URL: /news/{form.slug || 'slug'}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
                        <input type="checkbox" checked={form.isBreaking} onChange={e => handleFormChange('isBreaking', e.target.checked)} style={{ width: 16, height: 16, accentColor: '#CC0000' }} />
                        ⚡ Breaking News
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13 }}>
                        <input type="checkbox" checked={form.featured} onChange={e => handleFormChange('featured', e.target.checked)} style={{ width: 16, height: 16, accentColor: '#CC0000' }} />
                        ⭐ Featured
                      </label>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <button type="submit" style={{ ...btnR, padding: '12px 28px', fontSize: 14 }} disabled={loading}>
                        {loading ? 'சேமிக்கிறோம்...' : editingId ? '💾 Update செய்' : '🚀 Publish செய்'}
                      </button>
                      <button type="button" style={btnG} onClick={() => { setForm(emptyForm); setEditingId(null); }}>Clear</button>
                      {editingId && <button type="button" style={{ ...btnG, color: '#CC0000' }} onClick={() => setActiveTab('posts')}>← திரும்பு</button>}
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* MEDIA */}
            {activeTab === 'media' && (
              <div>
                <div style={card}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🖼️ புதிய படம் சேர்க்கவும்</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, alignItems: 'flex-end' }}>
                    <div>
                      <label style={lbl}>Image URL *</label>
                      <input style={inp} value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
                    </div>
                    <div>
                      <label style={lbl}>Caption</label>
                      <input style={inp} value={mediaAlt} onChange={e => setMediaAlt(e.target.value)} placeholder="படத்தின் விவரம்" />
                    </div>
                    <button style={{ ...btnR, whiteSpace: 'nowrap' }} onClick={handleAddMedia}>+ சேர்</button>
                  </div>
                  {mediaUrl && <img src={mediaUrl} alt="Preview" style={{ marginTop: 10, height: 90, borderRadius: 8, objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />}
                  <div style={{ marginTop: 12, padding: 12, background: '#f0f9ff', borderRadius: 8, fontSize: 12, color: '#0369a1' }}>
                    💡 Unsplash (unsplash.com), Pexels (pexels.com) - இலவச images கிடைக்கும்.
                  </div>
                </div>
                <div style={card}>
                  <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📁 Library ({media.length} படங்கள்)</h2>
                  {media.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px 0', color: '#9ca3af' }}>
                      <div style={{ fontSize: 48, marginBottom: 12 }}>🖼️</div>
                      <p>படங்கள் இல்லை. மேலே URL சேர்க்கவும்.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(155px,1fr))', gap: 12 }}>
                      {media.map(item => (
                        <div key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
                          <div style={{ position: 'relative' }}>
                            <img src={item.url} alt={item.alt} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} onError={e => e.target.style.background = '#f3f4f6'} />
                            <button onClick={() => handleDeleteMedia(item.id)}
                              style={{ position: 'absolute', top: 4, right: 4, background: '#CC0000', color: '#fff', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                          </div>
                          <div style={{ padding: '8px 10px' }}>
                            <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.alt || 'படம்'}</div>
                            <button onClick={() => { handleFormChange('image', item.url); setActiveTab('add'); showToast('படம் தேர்வு!'); }}
                              style={{ ...btnR, padding: '4px 10px', fontSize: 11, width: '100%' }}>Use செய்</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* BREAKING */}
            {activeTab === 'breaking' && (
              <div style={{ maxWidth: 700 }}>
                <div style={card}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>⚡ Breaking News நிர்வாகம்</h2>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                    <input style={{ ...inp, flex: 1 }} value={newBreaking} onChange={e => setNewBreaking(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleBreakingAdd()} placeholder="புதிய breaking news..." />
                    <button style={btnR} onClick={handleBreakingAdd}>+ சேர்</button>
                  </div>
                  <div style={{ background: '#f9fafb', borderRadius: 8, padding: 16 }}>
                    <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      தற்போதைய ({breakingList.length})
                    </p>
                    {breakingList.length === 0 && <p style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', padding: 20 }}>இல்லை</p>}
                    {breakingList.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ color: '#CC0000', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>●</span>
                        <span style={{ flex: 1, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{item}</span>
                        <button onClick={() => handleBreakingDelete(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 16, padding: '0 4px' }}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ADS */}
            {activeTab === 'ads' && (
              <div style={{ maxWidth: 700 }}>
                <div style={card}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>📢 விளம்பர இடங்கள்</h2>
                  {[{ name: 'Header Leaderboard', size: '728×90', loc: 'முகப்பு மேலே' }, { name: 'Sidebar Rectangle', size: '300×250', loc: 'பக்கவாட்டு' }, { name: 'In-Article', size: '728×90', loc: 'செய்தி நடுவில்' }, { name: 'Mobile Banner', size: '320×50', loc: 'மொபைல்' }, { name: 'Billboard', size: '970×120', loc: 'முகப்பு நடுவில்' }].map((ad, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
                      <div><div style={{ fontSize: 14, fontWeight: 600 }}>{ad.name}</div><div style={{ fontSize: 12, color: '#9ca3af' }}>{ad.size} · {ad.loc}</div></div>
                      <span style={{ fontSize: 11, background: '#f3f4f6', color: '#6b7280', padding: '3px 10px', borderRadius: 20 }}>காலி</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, padding: 14, background: '#fff9f0', borderRadius: 8, border: '1px solid #fed7aa' }}>
                    <p style={{ fontSize: 13, color: '#92400e' }}>📞 விளம்பரம்: <strong>ads@minnal24.com</strong></p>
                  </div>
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {activeTab === 'settings' && (
              <div style={{ maxWidth: 600 }}>
                <div style={card}>
                  <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>⚙️ அமைப்புகள்</h2>
                  <div style={{ marginBottom: 20, padding: 16, background: '#fef2f2', borderRadius: 10, border: '1px solid #fecaca' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#991b1b', marginBottom: 12 }}>🔐 Password மாற்றுங்கள்</h3>
                    <div style={{ marginBottom: 12 }}>
                      <label style={lbl}>புதிய Password</label>
                      <input type="password" style={inp} value={settings.adminPassword}
                        onChange={e => setSettings({ ...settings, adminPassword: e.target.value })} placeholder="குறைந்தது 6 எழுத்துகள்" />
                    </div>
                    <button style={btnR} onClick={async () => {
                      if (!settings.adminPassword || settings.adminPassword.length < 6) { showToast('குறைந்தது 6 எழுத்துகள்!', 'error'); return; }
                      const res = await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: settings.adminPassword }) });
                      if (res.ok) { showToast('✅ Password மாற்றப்பட்டது!'); setSettings({ adminPassword: '' }); }
                    }}>Password மாற்று</button>
                  </div>
                  <div style={{ padding: 16, background: '#f0fdf4', borderRadius: 10, border: '1px solid #bbf7d0' }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#14532d', marginBottom: 8 }}>ℹ️ System Info</h3>
                    <div style={{ fontSize: 13, color: '#166534', lineHeight: 2 }}>
                      <div>📰 செய்திகள்: <strong>{posts.length}</strong></div>
                      <div>🖼️ Media: <strong>{media.length}</strong></div>
                      <div>⚡ Breaking: <strong>{breakingList.length}</strong></div>
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
