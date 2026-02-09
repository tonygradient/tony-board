# TONY Board Deployment Guide

## Repository
**GitHub:** https://github.com/tonygradient/tony-board  
**Branch:** `main`  
**Auto-deploy:** Push to main triggers rebuild

---

## Coolify Setup

### 1. Access Coolify Dashboard
- **URL:** http://localhost:8000 (or your Coolify instance)
- **Credentials:** In `.secrets/coolify.env`

### 2. Create New Application

1. **New Resource** → **Public Repository**
2. **Git Repository URL:** `https://github.com/tonygradient/tony-board`
3. **Branch:** `main`
4. **Build Pack:** Nixpacks (auto-detects Next.js)

### 3. Configure Build

**Build settings (usually auto-detected):**
- **Install Command:** `npm install`
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Port:** `3000`

### 4. Environment Variables

Add these in Coolify → Environment:

```env
# Required
DATABASE_PATH=./data/tasks.db
SESSION_SECRET=<generate-random-32-char-string>
API_TOKENS=<comma-separated-bearer-tokens>

# Optional
NODE_ENV=production
PORT=3000
```

**Generate secrets:**
```bash
# SESSION_SECRET
openssl rand -hex 32

# API_TOKENS (for cron/webhooks)
./scripts/generate-tokens.sh
```

### 5. Configure Domain

**Subdomain:** `tony-board.ashketing.com` (or your preferred subdomain)

Coolify will:
- Auto-provision SSL via Let's Encrypt
- Handle DNS (wildcard configured)
- Redirect HTTP → HTTPS

### 6. Persistent Storage

**Database path:** Mount volume for SQLite persistence

In Coolify → Storage:
- **Source:** `/data/tony-board`
- **Mount:** `/app/data`
- **Purpose:** Persist `tasks.db` across deployments

### 7. Deploy

Click **Deploy** button.

Coolify will:
1. Clone repo
2. Install dependencies
3. Build Next.js app
4. Start production server
5. Provision SSL

**Watch build logs for errors.**

---

## Post-Deployment

### 1. Verify Deployment

**Check these:**
- [ ] App loads at `https://tony-board.ashketing.com`
- [ ] Login page accessible
- [ ] Can create/view tasks
- [ ] Calendar view works
- [ ] Command palette (⌘K) works
- [ ] No console errors

### 2. Initialize Database

**First-time setup:**

```bash
# SSH to Coolify server
ssh user@server

# Access container
docker exec -it <container-id> sh

# Run migrations
cd src/db/migrations
./run-migration.js 001_add_calendar_fields.sql
./run-migration.js 002_redesign.sql
```

Or database will auto-initialize on first run.

### 3. Create Admin Session

**Login via web UI:**
- Password set in deployment environment
- Creates session cookie
- Access full board

### 4. Generate API Tokens

**For external integrations:**

```bash
# In project directory
./scripts/generate-tokens.sh

# Add tokens to Coolify environment
# Comma-separated: token1,token2,token3
```

---

## Auto-Deploy on Push

**Coolify webhook configured:**

Every push to `main` branch triggers:
1. Pull latest code
2. Rebuild app
3. Rolling restart (zero downtime)

**To deploy a change:**
```bash
git commit -m "feat: new feature"
git push origin main

# Coolify auto-deploys in ~2-3 minutes
```

**Watch deployment:**
- Coolify dashboard → Deployments tab
- Live build logs
- Status: Building → Running

---

## Monitoring

### Application Logs

**In Coolify:**
- Runtime logs
- Error tracking
- Request logs

**Export logs:**
```bash
# Last 100 lines
coolify logs tony-board -n 100

# Follow logs live
coolify logs tony-board -f
```

### Database Backup

**Automatic backups:**

```bash
# Backup script (runs daily via cron)
./scripts/backup.sh

# Manual backup
./scripts/backup.sh
```

**Restore:**
```bash
./scripts/restore.sh backup-2026-02-09.db
```

---

## Troubleshooting

### Build Fails

**Check:**
1. TypeScript errors → Run `npm run build` locally
2. Missing dependencies → Check `package.json`
3. Environment variables → Verify in Coolify

### Runtime Errors

**Database connection:**
```bash
# Check volume mount
docker exec -it <container-id> ls -la /app/data

# Should see tasks.db
```

**Port conflicts:**
```bash
# Check port 3000 is mapped
docker ps | grep tony-board
```

**Environment variables:**
```bash
# Verify in container
docker exec -it <container-id> env | grep SESSION_SECRET
```

### Rolling Back

**In Coolify:**
1. Deployments tab
2. Click previous deployment
3. Click "Redeploy this version"

---

## Architecture

```
┌─────────────────────────────────────────┐
│ GitHub: tonygradient/tony-board         │
│ Branch: main                            │
└────────────┬────────────────────────────┘
             │ push
             ↓
┌─────────────────────────────────────────┐
│ Coolify Auto-Deploy                     │
│ - Pull code                             │
│ - npm install                           │
│ - npm run build                         │
│ - npm start                             │
└────────────┬────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ Production Server                       │
│ https://tony-board.ashketing.com        │
│                                         │
│ ┌─────────────┐  ┌──────────────┐     │
│ │  Next.js    │  │  SQLite DB   │     │
│ │  App (3000) │─→│  tasks.db    │     │
│ └─────────────┘  └──────────────┘     │
└─────────────────────────────────────────┘
```

---

## Security

**Production checklist:**
- [ ] `.env` not committed to git
- [ ] `SESSION_SECRET` is random and secure
- [ ] API tokens rotated regularly
- [ ] HTTPS enforced (Coolify default)
- [ ] Rate limiting configured (if needed)
- [ ] Database backups automated

---

## Updates

**To update TONY Board:**

1. Make changes locally
2. Test with `npm run build`
3. Commit and push to GitHub
4. Coolify auto-deploys
5. Verify at live URL

**No downtime deployments.**

---

## Support

**Issues:**
- GitHub issues: https://github.com/tonygradient/tony-board/issues
- Deployment docs: This file
- Design system: `DESIGN_SYSTEM.md`

**Logs:**
- Coolify dashboard for build/runtime logs
- Check browser console for client errors
