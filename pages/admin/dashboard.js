import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const menuItems = [
  { id: 'dashboard', label: 'டாஷ்போர்டு', icon: '🏠' },
  { id: 'posts', label: 'செய்திகள்', icon: '📰' },
  { id: 'add', label: 'புதிய செய்தி', icon: '✏️' },
  { id: 'media', label: 'Media Library', icon: '🖼️' },
  { id: 'breaking', label: 'Breaking News', icon: '⚡' },
  { id: 'users', label: 'பயனர்கள்', icon: '👥' },
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

const roles = [
  { id: 'admin', label: 'Admin', desc: 'எல்லா அனுமதிகளும்', color: '#CC0000' },
  { id: 'editor', label: 'Editor', desc: 'செய்திகள் publish செய்யலாம்', color: '#2563EB' },
  { id: 'author', label: 'Author', desc: 'சொந்த செய்திகள் மட்டும்', color: '#059669' },
];

const emptyForm = {
  id: null, title: '', content: '', category: 'batticaloa',
  categoryName: 'மட்டக்களப்பு', image: '', author: 'Minnal24 News',
  isBreaking: false, featured: false, slug: '',
};

const emptyUser = { username: '', name: '', email: '', role: 'editor', password: '' };

function autoSlug(title) {
  return title
    .toLowerCase()
    .replace(/[\u0B80-\u0BFF]/g, (char) => {
      const map = {'அ':'a','ஆ':'aa','இ':'i','ஈ':'ee','உ':'u','ஊ':'oo','எ':'e','ஏ':'ae','ஐ':'ai','ஒ':'o','ஓ':'oo','ஔ':'au','க்':'k','ச்':'s','ட்':'t','த்':'th','ந்':'n','ப்':'p','ம்':'m','ய்':'y','ர்':'r','ல்':'l','வ்':'v','ழ்':'zh','ள்':'l','ற்':'r','ன்':'n','ஜ்':'j','ஷ்':'sh','ஸ்':'s','ஹ்':'h','க':'ka','ச':'sa','ட':'ta','த':'tha','ந':'na','ப':'pa','ம':'ma','ய':'ya','ர':'ra','ல':'la','வ':'va','ழ':'zha','ள':'la','ற':'ra','ன':'na'};
      return map[char] || '';
    })
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 70)
    .replace(/^-|-$/g, '');
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [posts, setPosts] = useState([]);
  const [media, setMedia] = useState([]);
  const [breakingList, setBreakingList] = useState([]);
  const [users, setUsers] = useState([]);
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
  const [userForm, setUserForm] = useState(emptyUser);
  const [showUserForm, setShowUserForm] = useState(false);

  useEffect(() => { checkAuth(); loadData(); }, []);

  const checkAuth = async () => {
    const res = await fetch('/api/admin/check');
    if (!res.ok) router.push('/admin');
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [pr, mr, ur] = await Promise.all([
        fetch('/api/admin/posts'),
        fetch('/api/admin/media'),
        fetch('/api/admin/users'),
      ]);
      const pd = await pr.json();
      const md = await mr.json();
      const ud = await ur.json();
      if (pd.posts) setPosts(pd.posts);
      if (pd.breaking) setBreakingList(pd.breaking);
      if (Array.isArray(md)) setMedia(md);
      if (Array.isArray(ud)) setUsers(ud);
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
      if (field === 'title') {
        u.slug = autoSlug(value);
      }
      if (field === 'category') {
        const c = categories.find(x => x.id === value);
        if (c) u.categoryName = c.name;
      }
      return u;
    });
  };

  const handleEditPost = (post) => {
    setForm({ ...post, author: post.author || 'Minnal24 News' });
    setEditingId(post.id);
    setActiveTab('add');
    window.scrollTo(0, 0);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category) { showToast('தலைப்பு அவசியம்!', 'error'); return; }
    if (!form.slug) { showToast('Slug தேவை!', 'error'); return; }
    setLoading(true);
    const payload = editingId
      ? { ...form, id: editingId }
      : { ...form, date: new Date().toISOString().split('T')[0], excerpt: form.content?.slice(0, 200) || form.title };
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
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
    if (!mediaUrl.trim()) { showToast('URL உள்ளிடவும்!', 'error'); return; }
    const res = await fetch('/api/admin/media', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: mediaUrl, alt: mediaAlt }) });
    if (res.ok) { showToast('🖼️ சேர்க்கப்பட்டது!'); setMediaUrl(''); setMediaAlt(''); loadData(); }
  };

  const handleDeleteMedia = async (id) => {
    const res = await fetch('/api/admin/media?id=' + id, { method: 'DELETE' });
    if (res.ok) { showToast('நீக்கப்பட்டது!'); loadData(); }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!userForm.username || !userForm.name || !userForm.role) { showToast('அனைத்து தகவல்களும் தேவை!', 'error'); return; }
    const res = await fetch('/api/admin/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userForm) });
    if (res.ok) { showToast('✅ பயனர் சேர்க்கப்பட்டார்!'); setUserForm(emptyUser); setShowUserForm(false); loadData(); }
    else { const d = await res.json(); showToast(d.error || 'Error!', 'error'); }
  };

  const handleDeleteUser = async (id) => {
    const res = await fetch('/api/admin/users?id=' + id, { method: 'DELETE' });
    if (res.ok) { showToast('பயனர் நீக்கப்பட்டார்!'); loadData(); }
  };

  const handleLogout = async () => { await fetch('/api/admin/logout', { method: 'POST' }); router.push('/admin'); };

  const filteredPosts = posts.filter(p => !searchPosts || p.title?.toLowerCase().includes(searchPosts.toLowerCase()));

  const inp = { width: '100%', padding: '10px 14px', border: '1.5px solid #e5e7eb', borderRadius: 8, fontSize: 13, fontFamily: "'Noto Sans Tamil',sans-serif", boxSizing: 'border-box', outline: 'none', background: '#fff' };
  const lbl = { display: 'block', fontSize: 11, fontWeight: 700, color: '#6b7280', marginBottom: 5, textTransform: 'uppercase', letterSpacing: 0.6 };
  const btnR = { background: '#CC0000', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 700, fontFamily: "'Noto Sans Tamil',sans-serif" };
  const btnG = { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontSize: 12, fontFamily: "'Noto Sans Tamil',sans-serif" };
  const btnB = { background: '#2563EB', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 12, fontFamily: "'Noto Sans Tamil',sans-serif" };
  const card = { background: '#fff', borderRadius: 14, padding: 20, marginBottom: 16, border: '1px solid #e5e7eb', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' };
  const bdg = (c) => ({ display: 'inline-block', padding: '2px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: c + '18', color: c, border: `1px solid ${c}30` });

  return (
    <>
      <Head>
        <title>{editingId ? 'Edit Post' : 'Admin'} — Minnal24</title>
        <meta name="robots" content="noindex,nofollow" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: toast.type === 'error' ? '#991b1b' : '#14532d', color: '#fff', padding: '12px 20px', borderRadius: 10, fontSize: 13, boxShadow: '0 4px 20px rgba(0,0,0,0.3)', fontFamily: "'Noto Sans Tamil',sans-serif", maxWidth: 320 }}>
          {toast.msg}
        </div>
      )}

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 28, maxWidth: 340, width: '90%', textAlign: 'center', fontFamily: "'Noto Sans Tamil',sans-serif" }}>
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 9997, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, width: '100%', maxWidth: 680, maxHeight: '80vh', overflow: 'auto', fontFamily: "'Noto Sans Tamil',sans-serif" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>🖼️ படம் தேர்வு செய்யுங்கள்</h3>
              <button onClick={() => setMediaPickerOpen(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#6b7280' }}>✕</button>
            </div>
            {media.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🖼️</div>
                <p>Library காலியாக உள்ளது</p>
                <button style={{ ...btnR, marginTop: 12 }} onClick={() => { setMediaPickerOpen(false); setActiveTab('media'); }}>சேர்க்க</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 10 }}>
                {media.map(item => (
                  <div key={item.id}
                    onClick={() => { handleFormChange('image', item.url); setMediaPickerOpen(false); showToast('படம் தேர்வு!'); }}
                    style={{ cursor: 'pointer', borderRadius: 8, overflow: 'hidden', border: '2px solid #e5e7eb', transition: 'all 0.15s' }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = '#CC0000'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'scale(1)'; }}>
                    <img src={item.url} alt={item.alt} style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }} onError={e => e.target.style.background = '#f3f4f6'} />
                    <div style={{ padding: '5px 7px', fontSize: 10, color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.alt || 'படம்'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`*{box-sizing:border-box}input:focus,textarea:focus,select:focus{border-color:#CC0000!important;box-shadow:0 0 0 3px rgba(204,0,0,0.08)}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#CC0000;border-radius:3px}body{margin:0}`}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5', fontFamily: "'Noto Sans Tamil',sans-serif" }}>

        {/* Sidebar */}
        <div style={{ width: sidebarOpen ? 240 : 64, flexShrink: 0, background: 'linear-gradient(180deg,#0f0f0f 0%,#1a1a1a 100%)', transition: 'width 0.25s ease', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <div style={{ padding: '18px 16px', borderBottom: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', gap: 10 }}>
            {sidebarOpen && (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                <span style={{ color: '#CC0000', fontWeight: 900, fontSize: 18 }}>மின்னல்</span>
                <span style={{ color: '#F59E0B', fontWeight: 900, fontSize: 22, fontFamily: 'Impact,sans-serif' }}>24</span>
              </div>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 16, marginLeft: 'auto', padding: 4 }}>
              {sidebarOpen ? '◀' : '▶'}
            </button>
          </div>
          <nav style={{ flex: 1, padding: '6px 0', overflowY: 'auto' }}>
            {menuItems.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', cursor: 'pointer', border: 'none', background: activeTab === item.id ? '#CC0000' : 'transparent', color: activeTab === item.id ? '#fff' : '#888', fontSize: 13, fontFamily: "'Noto Sans Tamil',sans-serif", width: '100%', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', transition: 'all 0.15s', borderLeft: activeTab === item.id ? '3px solid #ff6b6b' : '3px solid transparent' }}>
                <span style={{ fontSize: 17, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <div style={{ padding: 12, borderTop: '1px solid #2a2a2a' }}>
            <button onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', border: 'none', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: 13, fontFamily: "'Noto Sans Tamil',sans-serif", width: '100%', borderRadius: 8, whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <span style={{ fontSize: 17 }}>🚪</span>{sidebarOpen && <span>வெளியேறு</span>}
            </button>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Topbar */}
          <div style={{ background: '#fff', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div>
              <h1 style={{ fontSize: 17, fontWeight: 700, color: '#111', margin: 0 }}>
                {menuItems.find(m => m.id === activeTab)?.icon} {menuItems.find(m => m.id === activeTab)?.label}
                {editingId && activeTab === 'add' && <span style={{ fontSize: 12, color: '#CC0000', marginLeft: 8, background: '#fff1f1', padding: '2px 8px', borderRadius: 10 }}>திருத்துகிறோம்</span>}
              </h1>
              <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>Minnal24 Admin Panel</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <a href="/" target="_blank" style={{ ...btnG, textDecoration: 'none', fontSize: 11, padding: '6px 12px' }}>🌐 Website</a>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#CC0000,#ff6b6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'default' }}>A</div>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: 20, overflowY: 'auto' }}>

            {/* ===== DASHBOARD ===== */}
            {activeTab === 'dashboard' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14, marginBottom: 20 }}>
                  {[
                    { l: 'செய்திகள்', v: posts.length, i: '📰', c: '#CC0000' },
                    { l: 'Breaking', v: breakingList.length, i: '⚡', c: '#F59E0B' },
                    { l: 'Media', v: media.length, i: '🖼️', c: '#0891B2' },
                    { l: 'பயனர்கள்', v: users.length, i: '👥', c: '#7C3AED' },
                  ].map((s, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '18px 16px', textAlign: 'center', border: '1px solid #e5e7eb', boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                      <div style={{ fontSize: 30, marginBottom: 8 }}>{s.i}</div>
                      <div style={{ fontSize: 26, fontWeight: 900, color: s.c }}>{s.v}</div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 3 }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div style={card}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: '#111' }}>சமீபத்திய செய்திகள்</h3>
                    {posts.slice(0, 5).map((p, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', borderBottom: '1px solid #f3f4f6', alignItems: 'center' }}>
                        {p.image && <img src={p.image} alt="" style={{ width: 36, height: 28, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} onError={e => e.target.style.display = 'none'} />}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: '#111', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                          <div style={{ fontSize: 10, color: '#9ca3af' }}>{p.date}</div>
                        </div>
                        <button onClick={() => handleEditPost(p)} style={{ ...btnB, padding: '3px 8px', fontSize: 10, flexShrink: 0 }}>✏️</button>
                      </div>
                    ))}
                    {posts.length === 0 && <p style={{ color: '#9ca3af', fontSize: 12, textAlign: 'center', padding: '15px 0' }}>செய்திகள் இல்லை</p>}
                  </div>
                  <div style={card}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: '#111' }}>⚡ Breaking News</h3>
                    {breakingList.slice(0, 4).map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <span style={{ color: '#CC0000', fontWeight: 700, flexShrink: 0 }}>●</span>
                        <span style={{ fontSize: 12, color: '#374151', lineHeight: 1.5 }}>{b.slice(0, 55)}...</span>
                      </div>
                    ))}
                    {breakingList.length === 0 && <p style={{ color: '#9ca3af', fontSize: 12, textAlign: 'center', padding: '15px 0' }}>இல்லை</p>}
                    <button style={{ ...btnR, marginTop: 12, width: '100%', padding: '7px', fontSize: 12 }} onClick={() => setActiveTab('breaking')}>+ சேர்க்க</button>
                  </div>
                </div>

                <div style={card}>
                  <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: '#111' }}>விரைவு செயல்கள்</h3>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button style={btnR} onClick={() => { setForm(emptyForm); setEditingId(null); setActiveTab('add'); }}>✏️ புதிய செய்தி</button>
                    <button style={btnG} onClick={() => setActiveTab('media')}>🖼️ Media Library</button>
                    <button style={btnG} onClick={() => setActiveTab('breaking')}>⚡ Breaking News</button>
                    <button style={btnG} onClick={() => setActiveTab('users')}>👥 பயனர்கள்</button>
                    <button style={btnG} onClick={() => setActiveTab('posts')}>📋 எல்லா செய்திகளும்</button>
                  </div>
                </div>
              </div>
            )}

            {/* ===== POSTS ===== */}
            {activeTab === 'posts' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, gap: 10, flexWrap: 'wrap' }}>
                  <input style={{ ...inp, maxWidth: 260, padding: '8px 14px' }} placeholder="தேடுங்கள்..."
                    value={searchPosts} onChange={e => setSearchPosts(e.target.value)} />
                  <button style={btnR} onClick={() => { setForm(emptyForm); setEditingId(null); setActiveTab('add'); }}>+ புதிய செய்தி</button>
                </div>
                <p style={{ color: '#6b7280', fontSize: 12, marginBottom: 10 }}>{filteredPosts.length} செய்திகள்</p>
                {filteredPosts.map((post, i) => {
                  const cat = categories.find(c => c.id === post.category);
                  return (
                    <div key={i} style={{ ...card, padding: '12px 16px', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {post.image && <img src={post.image} alt="" style={{ width: 72, height: 52, objectFit: 'cover', borderRadius: 7, flexShrink: 0 }} onError={e => e.target.style.display = 'none'} />}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', gap: 5, marginBottom: 4, flexWrap: 'wrap' }}>
                            {post.isBreaking && <span style={bdg('#CC0000')}>⚡ Breaking</span>}
                            {post.featured && <span style={bdg('#F59E0B')}>⭐ Featured</span>}
                            <span style={bdg(cat?.color || '#666')}>{post.categoryName}</span>
                          </div>
                          <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111', margin: '0 0 3px', lineHeight: 1.4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</h3>
                          <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>{post.author || 'Minnal24 News'} · {post.date} · /news/{post.slug}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                          <a href={`/news/${post.slug}`} target="_blank" rel="noopener noreferrer"
                            style={{ ...btnG, padding: '5px 10px', fontSize: 11, textDecoration: 'none', color: '#374151' }}>👁️</a>
                          <button style={{ ...btnB, padding: '5px 10px', fontSize: 11 }} onClick={() => handleEditPost(post)}>✏️ திருத்து</button>
                          <button style={{ ...btnG, color: '#ef4444', padding: '5px 10px', fontSize: 11 }} onClick={() => setDeleteConfirm(post.id)}>🗑️</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredPosts.length === 0 && (
                  <div style={{ ...card, textAlign: 'center', padding: 40 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>📰</div>
                    <p style={{ color: '#9ca3af' }}>செய்திகள் இல்லை</p>
                    <button style={{ ...btnR, marginTop: 14 }} onClick={() => setActiveTab('add')}>+ புதிய செய்தி</button>
                  </div>
                )}
              </div>
            )}

            {/* ===== ADD / EDIT ===== */}
            {activeTab === 'add' && (
              <div style={{ maxWidth: 760 }}>
                <div style={card}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>
                      {editingId ? '✏️ செய்தியை திருத்துங்கள்' : '✏️ புதிய செய்தி'}
                    </h2>
                    {editingId && <button style={btnG} onClick={() => { setForm(emptyForm); setEditingId(null); }}>+ புதிய செய்தி</button>}
                  </div>

                  <form onSubmit={handlePublish}>
                    {/* Title */}
                    <div style={{ marginBottom: 14 }}>
                      <label style={lbl}>செய்தி தலைப்பு *</label>
                      <input style={{ ...inp, fontSize: 15, padding: '12px 14px', fontWeight: 600 }}
                        value={form.title} onChange={e => handleFormChange('title', e.target.value)}
                        placeholder="செய்தி தலைப்பை இங்கே எழுதுங்கள்..." required />
                    </div>

                    {/* Auto Slug preview */}
                    <div style={{ marginBottom: 14, padding: '8px 12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>🔗 URL:</span>
                      <span style={{ fontSize: 11, color: '#0284C7', fontFamily: 'monospace' }}>minnal24.com/news/</span>
                      <input style={{ ...inp, flex: 1, minWidth: 200, padding: '5px 10px', fontSize: 11, fontFamily: 'monospace', color: '#CC0000', background: '#fff' }}
                        value={form.slug} onChange={e => setForm(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-') }))}
                        placeholder="auto-generated-slug" required />
                      <span style={{ fontSize: 10, color: '#94a3b8' }}>தானாக உருவாகும்</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                      <div>
                        <label style={lbl}>பிரிவு *</label>
                        <select style={inp} value={form.category} onChange={e => handleFormChange('category', e.target.value)}>
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={lbl}>ஆசிரியர்</label>
                        <input style={inp} value={form.author} onChange={e => handleFormChange('author', e.target.value)} placeholder="Minnal24 News" />
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ marginBottom: 14 }}>
                      <label style={lbl}>செய்தி உள்ளடக்கம் *</label>
                      <textarea style={{ ...inp, minHeight: 220, resize: 'vertical', lineHeight: 1.8 }}
                        value={form.content} onChange={e => handleFormChange('content', e.target.value)}
                        placeholder="முழு செய்தியை இங்கே எழுதுங்கள்... (முதல் 200 எழுத்துகள் சுருக்கமாக பயன்படும்)" required />
                      <p style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>
                        {form.content?.length || 0} எழுத்துகள் · முதல் 200 தானாக excerpt ஆகும்
                      </p>
                    </div>

                    {/* Featured Image */}
                    <div style={{ marginBottom: 14 }}>
                      <label style={lbl}>Featured Image</label>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input style={{ ...inp, flex: 1 }} value={form.image}
                          onChange={e => handleFormChange('image', e.target.value)}
                          placeholder="Image URL அல்லது Library-ல் இருந்து தேர்வு செய்யுங்கள்" />
                        <button type="button" style={{ ...btnB, whiteSpace: 'nowrap', padding: '10px 14px' }}
                          onClick={() => setMediaPickerOpen(true)}>🖼️ Library</button>
                      </div>
                      {form.image && (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <img src={form.image} alt="Preview"
                            style={{ height: 120, borderRadius: 10, objectFit: 'cover', maxWidth: '100%', display: 'block' }}
                            onError={e => e.target.style.display = 'none'} />
                          <button type="button" onClick={() => handleFormChange('image', '')}
                            style={{ position: 'absolute', top: 5, right: 5, background: '#CC0000', color: '#fff', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>✕</button>
                        </div>
                      )}
                    </div>

                    {/* Toggles */}
                    <div style={{ display: 'flex', gap: 24, marginBottom: 20, padding: '12px 14px', background: '#f8fafc', borderRadius: 10, flexWrap: 'wrap' }}>
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

                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <button type="submit" style={{ ...btnR, padding: '12px 28px', fontSize: 14 }} disabled={loading}>
                        {loading ? '⏳ சேமிக்கிறோம்...' : editingId ? '💾 Update செய்' : '🚀 Publish செய்'}
                      </button>
                      <button type="button" style={btnG} onClick={() => { setForm(emptyForm); setEditingId(null); }}>🗑️ Clear</button>
                      {editingId && (
                        <button type="button" style={{ ...btnG, color: '#CC0000' }} onClick={() => setActiveTab('posts')}>← திரும்பு</button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ===== MEDIA ===== */}
            {activeTab === 'media' && (
              <div>
                <div style={card}>
                  <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>🖼️ புதிய படம் சேர்க்கவும்</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, alignItems: 'flex-end' }}>
                    <div>
                      <label style={lbl}>Image URL *</label>
                      <input style={inp} value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} placeholder="https://images.unsplash.com/..." />
                    </div>
                    <div>
                      <label style={lbl}>Caption</label>
                      <input style={inp} value={mediaAlt} onChange={e => setMediaAlt(e.target.value)} placeholder="படத்தின் விவரம்" />
                    </div>
                    <button style={{ ...btnR, whiteSpace: 'nowrap' }} onClick={handleAddMedia}>+ சேர்</button>
                  </div>
                  {mediaUrl && (
                    <img src={mediaUrl} alt="" style={{ marginTop: 10, height: 100, borderRadius: 8, objectFit: 'cover' }}
                      onError={e => e.target.style.display = 'none'} />
                  )}
                  <div style={{ marginTop: 10, padding: '10px 12px', background: '#eff6ff', borderRadius: 8, fontSize: 12, color: '#1d4ed8', border: '1px solid #bfdbfe' }}>
                    💡 <strong>இலவச படங்கள்:</strong> unsplash.com → படம் தேர்வு → Right click → "Copy image address" → இங்கே paste செய்யுங்கள்
                  </div>
                </div>

                <div style={card}>
                  <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>📁 Library ({media.length} படங்கள்)</h2>
                  {media.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px 0', color: '#9ca3af' }}>
                      <div style={{ fontSize: 48, marginBottom: 10 }}>🖼️</div>
                      <p>படங்கள் இல்லை. மேலே சேர்க்கவும்.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 12 }}>
                      {media.map(item => (
                        <div key={item.id} style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
                          <div style={{ position: 'relative' }}>
                            <img src={item.url} alt={item.alt} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }}
                              onError={e => { e.target.style.background = '#f3f4f6'; e.target.style.minHeight = '110px'; }} />
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

            {/* ===== BREAKING ===== */}
            {activeTab === 'breaking' && (
              <div style={{ maxWidth: 700 }}>
                <div style={card}>
                  <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>⚡ Breaking News நிர்வாகம்</h2>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
                    <input style={{ ...inp, flex: 1 }} value={newBreaking}
                      onChange={e => setNewBreaking(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && handleBreakingAdd()}
                      placeholder="புதிய breaking news இங்கே தட்டச்சு செய்யுங்கள்..." />
                    <button style={btnR} onClick={handleBreakingAdd}>+ சேர்</button>
                  </div>
                  <div style={{ background: '#f9fafb', borderRadius: 10, padding: 16 }}>
                    <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      தற்போதைய ({breakingList.length})
                    </p>
                    {breakingList.length === 0 && <p style={{ color: '#9ca3af', fontSize: 13, textAlign: 'center', padding: 20 }}>இல்லை</p>}
                    {breakingList.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: '1px solid #e5e7eb', alignItems: 'flex-start' }}>
                        <span style={{ color: '#CC0000', fontWeight: 700, fontSize: 16, flexShrink: 0, lineHeight: 1.4 }}>●</span>
                        <span style={{ flex: 1, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{item}</span>
                        <button onClick={() => handleBreakingDelete(i)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: 16, padding: '0 4px', flexShrink: 0 }}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===== USERS ===== */}
            {activeTab === 'users' && (
              <div style={{ maxWidth: 800 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111', margin: 0 }}>👥 பயனர் நிர்வாகம்</h2>
                    <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Admin, Editor, Author roles</p>
                  </div>
                  <button style={btnR} onClick={() => setShowUserForm(!showUserForm)}>
                    {showUserForm ? '✕ மூடு' : '+ புதிய பயனர்'}
                  </button>
                </div>

                {/* Role info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 16 }}>
                  {roles.map(role => (
                    <div key={role.id} style={{ background: '#fff', borderRadius: 10, padding: 14, border: `2px solid ${role.color}20` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: role.color, flexShrink: 0 }}></div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: role.color }}>{role.label}</span>
                      </div>
                      <p style={{ fontSize: 11, color: '#6b7280', margin: 0 }}>{role.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Add user form */}
                {showUserForm && (
                  <div style={{ ...card, border: '2px solid #CC0000', marginBottom: 16 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: '#CC0000' }}>+ புதிய பயனரை சேர்க்கவும்</h3>
                    <form onSubmit={handleAddUser}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                        <div>
                          <label style={lbl}>Username *</label>
                          <input style={inp} value={userForm.username}
                            onChange={e => setUserForm({ ...userForm, username: e.target.value.toLowerCase().replace(/\s/g, '') })}
                            placeholder="username" required />
                        </div>
                        <div>
                          <label style={lbl}>பெயர் *</label>
                          <input style={inp} value={userForm.name}
                            onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                            placeholder="முழு பெயர்" required />
                        </div>
                        <div>
                          <label style={lbl}>Email</label>
                          <input type="email" style={inp} value={userForm.email}
                            onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                            placeholder="email@minnal24.com" />
                        </div>
                        <div>
                          <label style={lbl}>Role *</label>
                          <select style={inp} value={userForm.role}
                            onChange={e => setUserForm({ ...userForm, role: e.target.value })}>
                            {roles.map(r => <option key={r.id} value={r.id}>{r.label} — {r.desc}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={lbl}>Password</label>
                          <input type="password" style={inp} value={userForm.password}
                            onChange={e => setUserForm({ ...userForm, password: e.target.value })}
                            placeholder="default: minnal24@2024" />
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button type="submit" style={btnR}>✅ பயனரை சேர்</button>
                        <button type="button" style={btnG} onClick={() => { setUserForm(emptyUser); setShowUserForm(false); }}>ரத்து</button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Users list */}
                <div style={card}>
                  <h3 style={{ fontSize: 13, fontWeight: 700, marginBottom: 14, color: '#111' }}>தற்போதைய பயனர்கள் ({users.length})</h3>
                  {users.map((user, i) => {
                    const role = roles.find(r => r.id === user.role);
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: role?.color || '#CC0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                          {(user.name || user.username || 'A').charAt(0).toUpperCase()}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{user.name}</div>
                          <div style={{ fontSize: 11, color: '#9ca3af' }}>@{user.username} · {user.email || 'email இல்லை'}</div>
                        </div>
                        <span style={bdg(role?.color || '#666')}>{role?.label || user.role}</span>
                        {user.id !== 1 && (
                          <button onClick={() => handleDeleteUser(user.id)}
                            style={{ ...btnG, color: '#ef4444', padding: '5px 10px', fontSize: 11 }}>🗑️</button>
                        )}
                        {user.id === 1 && (
                          <span style={{ fontSize: 11, color: '#9ca3af', padding: '5px 10px' }}>🔒 Default</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ===== ADS ===== */}
            {activeTab === 'ads' && (
              <div style={{ maxWidth: 700 }}>
                <div style={card}>
                  <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📢 விளம்பர இடங்கள்</h2>
                  {[
                    { n: 'Header Leaderboard', s: '728×90', l: 'முகப்பு மேலே' },
                    { n: 'Sidebar Rectangle', s: '300×250', l: 'பக்கவாட்டு' },
                    { n: 'In-Article Banner', s: '728×90', l: 'செய்தி நடுவில்' },
                    { n: 'Mobile Banner', s: '320×50', l: 'மொபைல்' },
                    { n: 'Billboard', s: '970×120', l: 'முகப்பு நடுவில்' },
                  ].map((ad, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid #f3f4f6', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{ad.n}</div>
                        <div style={{ fontSize: 11, color: '#9ca3af' }}>{ad.s} · {ad.l}</div>
                      </div>
                      <span style={{ fontSize: 11, background: '#f3f4f6', color: '#6b7280', padding: '3px 10px', borderRadius: 20 }}>காலி</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 14, padding: 12, background: '#fff9f0', borderRadius: 8, border: '1px solid #fed7aa' }}>
                    <p style={{ fontSize: 12, color: '#92400e', margin: 0 }}>📞 விளம்பரம்: <strong>ads@minnal24.com</strong> | <strong>+94 XX XXX XXXX</strong></p>
                  </div>
                </div>
              </div>
            )}

            {/* ===== SETTINGS ===== */}
            {activeTab === 'settings' && (
              <div style={{ maxWidth: 600 }}>
                <div style={card}>
                  <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18 }}>⚙️ அமைப்புகள்</h2>
                  <div style={{ marginBottom: 18, padding: 16, background: '#fef2f2', borderRadius: 10, border: '1px solid #fecaca' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: '#991b1b', marginBottom: 12 }}>🔐 Password மாற்றுங்கள்</h3>
                    <div style={{ marginBottom: 10 }}>
                      <label style={lbl}>புதிய Password (குறைந்தது 6 எழுத்துகள்)</label>
                      <input type="password" style={inp} value={settings.adminPassword}
                        onChange={e => setSettings({ ...settings, adminPassword: e.target.value })}
                        placeholder="••••••••" />
                    </div>
                    <button style={btnR} onClick={async () => {
                      if (!settings.adminPassword || settings.adminPassword.length < 6) { showToast('குறைந்தது 6 எழுத்துகள்!', 'error'); return; }
                      const res = await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: settings.adminPassword }) });
                      if (res.ok) { showToast('✅ Password மாற்றப்பட்டது!'); setSettings({ adminPassword: '' }); }
                    }}>Password மாற்று</button>
                  </div>
                  <div style={{ padding: 16, background: '#f0fdf4', borderRadius: 10, border: '1px solid #bbf7d0' }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: '#14532d', marginBottom: 10 }}>ℹ️ System Info</h3>
                    <div style={{ fontSize: 12, color: '#166534', lineHeight: 2.2 }}>
                      <div>📰 மொத்த செய்திகள்: <strong>{posts.length}</strong></div>
                      <div>🖼️ Media files: <strong>{media.length}</strong></div>
                      <div>⚡ Breaking news: <strong>{breakingList.length}</strong></div>
                      <div>👥 பயனர்கள்: <strong>{users.length}</strong></div>
                      <div>🌐 Website: <strong>minnal24.com</strong></div>
                      <div>📦 Framework: <strong>Next.js 14</strong></div>
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
