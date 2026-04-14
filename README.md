# Minnal24.com - Next.js News Website
## Hostinger Shared Hosting Deployment Guide

---

## 📁 Project Structure
```
minnal24/
├── components/          # React components
│   ├── Header.js        # Navigation & header
│   ├── Footer.js        # Footer
│   ├── Layout.js        # Page wrapper
│   ├── BreakingNewsTicker.js  # Breaking news bar
│   ├── NewsCard.js      # Various news card types
│   └── AdSlot.js        # Advertisement slots
├── data/
│   └── newsData.js      # Sample news data (replace with CMS/API)
├── lib/
│   └── utils.js         # Utility functions
├── pages/
│   ├── index.js         # Homepage
│   ├── about.js
│   ├── contact.js
│   ├── advertise.js
│   ├── breaking.js
│   ├── videos.js
│   ├── privacy.js
│   ├── search.js
│   ├── 404.js
│   ├── 500.js
│   ├── news/[slug].js   # Article pages
│   ├── category/[slug].js  # Category pages
│   └── api/
│       ├── sitemap.js   # XML sitemap
│       └── rss.js       # RSS feed
├── public/
│   ├── manifest.json    # PWA manifest
│   ├── .htaccess        # Apache config
│   └── logo.png         # YOUR LOGO FILE (add this)
├── styles/
│   └── globals.css
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 LOCAL DEVELOPMENT SETUP

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Steps
```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# http://localhost:3000
```

---

## 🌐 HOSTINGER SHARED HOSTING DEPLOYMENT

### Method 1: Static Export (Recommended for Shared Hosting)

Hostinger shared hosting doesn't support Node.js server processes in most plans.
Use Next.js static export mode:

**Step 1: Update next.config.js**
Add this line to next.config.js:
```js
const nextConfig = {
  output: 'export',  // ADD THIS LINE
  trailingSlash: true,
  // ... rest of config
}
```

**Step 2: Build the static site**
```bash
npm run build
```
This creates an `out/` folder with all static files.

**Step 3: Upload to Hostinger**
- Log in to Hostinger hPanel
- Go to File Manager
- Navigate to `public_html/` folder
- Upload ALL contents of the `out/` folder to `public_html/`
- Also upload the `.htaccess` file from `public/`

**Step 4: Domain & SSL**
- Point minnal24.com to your Hostinger nameservers
- Enable Free SSL in hPanel → SSL → Let's Encrypt

---

### Method 2: Hostinger VPS or Business Plan (Node.js Support)

If your Hostinger plan supports Node.js:

**Step 1: SSH into your server**
```bash
ssh u123456789@your-server-ip
```

**Step 2: Clone/upload your project**
```bash
cd /home/u123456789/domains/minnal24.com/public_html
# Upload your files here
```

**Step 3: Install and build**
```bash
npm install
npm run build
```

**Step 4: Start with PM2**
```bash
npm install -g pm2
pm2 start npm --name "minnal24" -- start
pm2 save
pm2 startup
```

**Step 5: Configure Node.js in hPanel**
- hPanel → Hosting → Node.js
- Set startup file: `node_modules/.bin/next`
- Set port: 3000

---

## 📝 ADDING REAL NEWS (Replace Sample Data)

### Option 1: WordPress as Headless CMS
1. Install WordPress on a subdomain (api.minnal24.com)
2. Install plugins: WPGraphQL, Advanced Custom Fields
3. Fetch news from WordPress API:
```js
const res = await fetch('https://api.minnal24.com/wp-json/wp/v2/posts');
const posts = await res.json();
```

### Option 2: Strapi CMS
1. Deploy Strapi separately
2. Configure Tamil language content types
3. Fetch via REST or GraphQL API

### Option 3: Google Sheets as Database (Budget Option)
1. Create a Google Sheet with columns: title, excerpt, category, image, date, slug
2. Publish as CSV
3. Fetch and parse in getStaticProps

---

## 🖼️ ADDING YOUR LOGO

1. Save your logo PNG as: `public/logo.png`
2. In Header.js, replace the text logo with:
```jsx
<Image src="/logo.png" alt="Minnal24" width={220} height={55} priority />
```

---

## 💡 SEO FEATURES INCLUDED

✅ Tamil language meta tags (lang="ta")
✅ Open Graph tags for social sharing
✅ Twitter Card meta tags
✅ Structured data (Schema.org NewsMediaOrganization)
✅ Article structured data for news pages
✅ XML Sitemap (/sitemap.xml)
✅ RSS Feed (/rss.xml)
✅ robots.txt
✅ Canonical URLs
✅ Geographic meta tags (Batticaloa, Sri Lanka)
✅ PWA manifest.json
✅ Gzip compression via .htaccess
✅ Cache headers for static assets

---

## 📊 HOSTINGER RESOURCE USAGE ESTIMATE

| Resource | Allocated | Expected Usage |
|----------|-----------|----------------|
| Disk Space | 200 GB | ~2-5 GB |
| RAM | 3072 MB | ~512 MB |
| Inodes | 600,000 | ~50,000 |
| Bandwidth | Unlimited | ~50-200 GB/month |

Your Hostinger plan has more than enough resources for this website.

---

## 📞 ADVERTISING CONTACT
- Email: ads@minnal24.com
- Phone: +94 XX XXX XXXX
- Rates in: /pages/advertise.js

---

## 🔧 CUSTOMIZATION

1. **Colors**: Edit `tailwind.config.js` → colors.primary
2. **News Data**: Edit `data/newsData.js` → Connect to your CMS/API
3. **Breaking News**: Edit `data/newsData.js` → breakingNews array
4. **Social Links**: Edit `components/Header.js` → socialLinks array
5. **Ad Slots**: Edit `components/AdSlot.js` → Add your Google AdSense code

---

Built with ❤️ for Batticaloa Tamil Community | Minnal24.com
