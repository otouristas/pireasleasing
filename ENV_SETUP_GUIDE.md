# 🔐 Environment Variables Setup Guide

**Last Updated**: October 16, 2025  
**Project**: Aggelos Rentals (Piraeus Leasing)

---

## 🎯 **Quick Setup**

### **Your Supabase Credentials:**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://hjgukvbkurboxkrgrruz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjUzNDYsImV4cCI6MjA3NjE0MTM0Nn0.chylpB7Vc9Nl-wk7JGq-ddxwtQ-28Cs_EHmlJ2dZ3QA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDU2NTM0NiwiZXhwIjoyMDc2MTQxMzQ2fQ.ciVElRZtA0jvNKz4TLMdFYLSOynbEGt_pwRdnn3YzE0
```

---

## 📋 **Setup Instructions**

### **For Local Development**

Create a file named `.env.local` in your project root:

```bash
# .env.local (DO NOT COMMIT THIS FILE!)

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://hjgukvbkurboxkrgrruz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjUzNDYsImV4cCI6MjA3NjE0MTM0Nn0.chylpB7Vc9Nl-wk7JGq-ddxwtQ-28Cs_EHmlJ2dZ3QA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDU2NTM0NiwiZXhwIjoyMDc2MTQxMzQ2fQ.ciVElRZtA0jvNKz4TLMdFYLSOynbEGt_pwRdnn3YzE0

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Sentry Error Monitoring
# NEXT_PUBLIC_SENTRY_DSN=
# SENTRY_ORG=
# SENTRY_PROJECT=aggelos-rentals
# SENTRY_AUTH_TOKEN=
```

**Then run:**
```bash
npm run dev
```

---

### **For Netlify Production**

#### **Step 1: Go to Netlify Dashboard**
1. Open https://app.netlify.com
2. Select your site
3. Go to **Site Settings** → **Environment Variables**

#### **Step 2: Add Variables One by One**

Click **"Add a variable"** and add each of these:

| Key | Value | Scopes |
|-----|-------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://hjgukvbkurboxkrgrruz.supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...chylpB7Vc9Nl-wk7JGq-ddxwtQ-28Cs_EHmlJ2dZ3QA` | All |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...ciVElRZtA0jvNKz4TLMdFYLSOynbEGt_pwRdnn3YzE0` | Production only |
| `NEXT_PUBLIC_SITE_URL` | `https://your-actual-domain.netlify.app` | All |

#### **Step 3: Trigger Redeploy**

After adding environment variables:
1. Click **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**

---

## 🔒 **Security Best Practices**

### **Public vs Private Keys:**

✅ **NEXT_PUBLIC_*** - Safe to expose to browser
- `NEXT_PUBLIC_SUPABASE_URL` ← Client-side OK
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ← Client-side OK (has RLS protection)
- `NEXT_PUBLIC_SITE_URL` ← Client-side OK
- `NEXT_PUBLIC_SENTRY_DSN` ← Client-side OK

🔒 **NO NEXT_PUBLIC prefix** - Server-only (secure)
- `SUPABASE_SERVICE_ROLE_KEY` ← NEVER expose to client! (bypasses RLS)
- `SENTRY_AUTH_TOKEN` ← Server-only
- `VIVA_CLIENT_SECRET` ← Server-only (stored in database)
- `RESEND_API_KEY` ← Server-only (stored in database)

---

## 📊 **Environment Variable Checklist**

### **Required (Must Have)**:
- [x] ✅ NEXT_PUBLIC_SUPABASE_URL
- [x] ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
- [x] ✅ NEXT_PUBLIC_SITE_URL

### **Recommended**:
- [ ] ⏳ NEXT_PUBLIC_SENTRY_DSN (error monitoring)
- [ ] ⏳ SENTRY_AUTH_TOKEN (source map uploads)

### **Optional**:
- [ ] ⏳ SUPABASE_SERVICE_ROLE_KEY (admin operations)

---

## 🗄️ **Database-Managed Settings**

Some sensitive keys are stored in Supabase `settings` table instead of env vars:

| Setting Key | Description | Required? |
|-------------|-------------|-----------|
| `viva_client_id` | Viva Wallet OAuth client ID | Yes (payments) |
| `viva_client_secret` | Viva Wallet OAuth secret | Yes (payments) |
| `viva_merchant_id` | Your Viva merchant ID | Yes (payments) |
| `viva_api_key` | Viva API key | Yes (payments) |
| `viva_source_code` | Viva source code | Yes (payments) |
| `viva_webhook_key` | Webhook verification key | Yes (security) |
| `resend_api_key` | Resend email API key | Yes (emails) |
| `admin_email_1` | Primary admin email | Yes (notifications) |
| `admin_email_2` | Secondary admin email | Optional |

**Setup**: Run `RUN_THIS_IN_SUPABASE.sql` to create settings table and add these values.

---

## 🚀 **Netlify Environment Variables - Step by Step**

### **Method 1: Via Dashboard (Recommended)**

1. **Login to Netlify**: https://app.netlify.com
2. **Select your site** from the list
3. **Site Settings** (left sidebar)
4. **Environment Variables** (under "Build & deploy")
5. **Click "Add a variable"**
6. **For each variable**:
   - Enter **Key** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Enter **Value** (copy from above)
   - Select **Scopes**: All scopes (or Production only for secrets)
   - Click **"Create variable"**

### **Method 2: Via Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Link to your site
netlify link

# Add environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://hjgukvbkurboxkrgrruz.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
netlify env:set NEXT_PUBLIC_SITE_URL "https://your-site.netlify.app"

# Trigger deploy
netlify deploy --prod
```

---

## ✅ **Verification Steps**

### **After Adding Environment Variables:**

1. **Redeploy the site**:
   - Deploys → Trigger deploy → Deploy site

2. **Check the build log**:
   - Look for: "✓ Environment variables loaded"
   - Should NOT see: "Supabase URL and Key required"

3. **Test the live site**:
   - Visit your Netlify URL
   - Open browser console (F12)
   - Should NOT see Supabase errors

4. **Test booking flow**:
   - Go to `/en/booking`
   - Should load cars from database
   - Should show locations

---

## 🎯 **Complete .env.local Template**

Copy this into `.env.local` in your project root:

```bash
# ===================================
# AGGELOS RENTALS - ENVIRONMENT VARIABLES
# ===================================

# ============= SUPABASE =============
NEXT_PUBLIC_SUPABASE_URL=https://hjgukvbkurboxkrgrruz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjUzNDYsImV4cCI6MjA3NjE0MTM0Nn0.chylpB7Vc9Nl-wk7JGq-ddxwtQ-28Cs_EHmlJ2dZ3QA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDU2NTM0NiwiZXhwIjoyMDc2MTQxMzQ2fQ.ciVElRZtA0jvNKz4TLMdFYLSOynbEGt_pwRdnn3YzE0

# ============= SITE =============
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# ============= SENTRY (OPTIONAL) =============
# NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
# SENTRY_ORG=your-organization-slug
# SENTRY_PROJECT=aggelos-rentals
# SENTRY_AUTH_TOKEN=your_sentry_auth_token

# ============= DEVELOPMENT =============
NODE_ENV=development
```

---

## 📝 **Netlify Environment Variables Quick Reference**

Copy and paste these into Netlify:

### **Variable 1**:
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://hjgukvbkurboxkrgrruz.supabase.co
Scopes: All
```

### **Variable 2**:
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjUzNDYsImV4cCI6MjA3NjE0MTM0Nn0.chylpB7Vc9Nl-wk7JGq-ddxwtQ-28Cs_EHmlJ2dZ3QA
Scopes: All
```

### **Variable 3**:
```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDU2NTM0NiwiZXhwIjoyMDc2MTQxMzQ2fQ.ciVElRZtA0jvNKz4TLMdFYLSOynbEGt_pwRdnn3YzE0
Scopes: Production (keep secure!)
```

### **Variable 4**:
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://your-actual-netlify-url.netlify.app
Scopes: All
```

*(Update this with your actual Netlify URL after first deploy)*

---

## 🎯 **Verification**

After adding environment variables to Netlify:

### **1. Trigger Redeploy**
```
Deploys → Trigger deploy → Deploy site
```

### **2. Check Build Log**
Should see:
```
✓ Environment variables loaded
✓ NEXT_PUBLIC_SUPABASE_URL: https://hjgukvbkurboxkrgrruz.supabase.co
✓ Building with Supabase connection...
```

### **3. Test Live Site**
```
https://your-site.netlify.app/en
```

Should:
- ✅ Load without Supabase errors
- ✅ Show fleet from database
- ✅ Display locations
- ✅ Allow bookings

---

## ⚠️ **Security Warnings**

### **DO NOT:**
- ❌ Commit `.env.local` to Git
- ❌ Share Service Role Key publicly
- ❌ Expose Service Role Key to client-side code

### **DO:**
- ✅ Keep `.env.local` in `.gitignore` (already done)
- ✅ Use ANON key for client-side (has RLS protection)
- ✅ Use Service Role key for server-side only
- ✅ Rotate keys if accidentally exposed

---

## 🔄 **Key Rotation (If Compromised)**

If you accidentally expose your keys:

1. **Go to Supabase Dashboard**
2. **Settings** → **API**
3. **Project API Keys** → **Reset anon/service_role key**
4. **Update everywhere**:
   - `.env.local` (local)
   - Netlify environment variables
   - Any other deployments

---

## 📊 **Environment Priority**

Variables are loaded in this order:

1. `.env.local` (local development only, ignored by Git)
2. Netlify Environment Variables (production)
3. Default values in code (fallbacks)

---

## 🎉 **You're All Set!**

With these environment variables configured:
- ✅ Local development will work
- ✅ Netlify deployment will work
- ✅ Supabase connection established
- ✅ All features enabled

**Next step**: Add these to Netlify and watch your site go live! 🚀

