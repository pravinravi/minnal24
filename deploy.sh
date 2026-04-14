#!/bin/bash
# ============================================================
# Minnal24.com - Hostinger Deployment Script
# Run this on your Hostinger server via SSH
# ============================================================

set -e

echo "🚀 Minnal24 Deployment Starting..."
echo "=================================="

# --- CONFIG ---
DOMAIN="minnal24.com"
APP_DIR="/home/$(whoami)/domains/$DOMAIN/public_html"
NODE_VERSION="18"

# 1. Check Node.js
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Install via Hostinger hPanel → Node.js"
  exit 1
fi
NODE_VER=$(node -v)
echo "✅ Node.js $NODE_VER found"

# 2. Navigate to app directory
echo "📂 Setting up directory..."
mkdir -p $APP_DIR
cd $APP_DIR

# 3. Install dependencies
echo "📦 Installing dependencies..."
npm install --production=false

# 4. Build the app
echo "🔨 Building Next.js app..."
npm run build
echo "✅ Build complete"

# 5. Install PM2 globally if needed
if ! command -v pm2 &> /dev/null; then
  echo "📦 Installing PM2..."
  npm install -g pm2
fi

# 6. Stop existing process if running
pm2 stop minnal24 2>/dev/null || true
pm2 delete minnal24 2>/dev/null || true

# 7. Start the app with PM2
echo "🚀 Starting app with PM2..."
mkdir -p logs
pm2 start ecosystem.config.js --env production
pm2 save

# 8. Setup PM2 to start on reboot
pm2 startup 2>/dev/null || echo "Note: Run the pm2 startup command shown above as root"

echo ""
echo "=================================="
echo "✅ Minnal24 deployment complete!"
echo "🌐 Site: https://www.$DOMAIN"
echo "📊 Status: pm2 status"
echo "📋 Logs: pm2 logs minnal24"
echo "=================================="
