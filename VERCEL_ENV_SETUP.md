# ⚡ Vercel Environment Variables - Quick Setup

**Error**: `500: INTERNAL_SERVER_ERROR - MIDDLEWARE_INVOCATION_FAILED`  
**Cause**: Missing Supabase environment variables  
**Fix**: Add 3 environment variables (takes 2 minutes)

---

## 🎯 **Quick Fix (Copy & Paste)**

### **Go to Vercel Dashboard**
👉 https://vercel.com/dashboard

---

## 📋 **Step-by-Step Instructions**

### **1. Find Your Project**
- Look for **"pireasleasing"** in your projects list
- Click on it

### **2. Open Environment Variables**
- Click **"Settings"** (top navigation tabs)
- Click **"Environment Variables"** (left sidebar)

### **3. Add Variable #1**

Click **"Add New"** button

```
KEY: NEXT_PUBLIC_SUPABASE_URL

VALUE (copy exactly):
https://hjgukvbkurboxkrgrruz.supabase.co

ENVIRONMENTS:
✓ Production
✓ Preview
✓ Development
```

Click **"Save"**

---

### **4. Add Variable #2**

Click **"Add New"** button again

```
KEY: NEXT_PUBLIC_SUPABASE_ANON_KEY

VALUE (copy exactly):
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjUzNDYsImV4cCI6MjA3NjE0MTM0Nn0.chylpB7Vc9Nl-wk7JGq-ddxwtQ-28Cs_EHmlJ2dZ3QA

ENVIRONMENTS:
✓ Production
✓ Preview
✓ Development
```

Click **"Save"**

---

### **5. Add Variable #3**

Click **"Add New"** button again

```
KEY: NEXT_PUBLIC_SITE_URL

VALUE (your actual Vercel URL):
https://pireasleasing.vercel.app

ENVIRONMENTS:
✓ Production
✓ Preview
✓ Development
```

Click **"Save"**

---

### **6. Redeploy** ⚠️ **CRITICAL STEP**

**After adding variables, you MUST redeploy!**

**Method A - Via Dashboard:**
1. Go to **"Deployments"** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Click **"Redeploy"** to confirm

**Method B - Trigger from GitHub:**
Just push any change to GitHub and Vercel auto-deploys

---

## ✅ **How to Verify**

After redeployment:

1. **Check Deployment Logs**:
   - Go to Deployments → Click latest deployment
   - Look for: "✓ Building..."
   - Should NOT see middleware errors

2. **Visit Your Site**:
   - Go to: `https://your-project.vercel.app`
   - Should load WITHOUT 500 error
   - Should redirect to: `https://your-project.vercel.app/en`

3. **Test Features**:
   - Homepage should load
   - `/en/booking` should work
   - `/en/fleet` should show cars from database

---

## 🔍 **Visual Reference**

The Environment Variables page should look like this:

```
Environment Variables
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[+ Add New]

┌─────────────────────────────────────────────────────┐
│ NEXT_PUBLIC_SUPABASE_URL                           │
│ https://hjgukvbkurboxkrgrruz.supabase.co          │
│ Production, Preview, Development                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ NEXT_PUBLIC_SUPABASE_ANON_KEY                      │
│ eyJhbGci... (hidden)                               │
│ Production, Preview, Development                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ NEXT_PUBLIC_SITE_URL                               │
│ https://pireasleasing.vercel.app                   │
│ Production, Preview, Development                    │
└─────────────────────────────────────────────────────┘
```

---

## ⚠️ **Why This Error Happened**

The middleware runs on **every request** and tries to:

1. Create Supabase client
2. Check user authentication
3. Handle locale redirects

**Without environment variables**, the Supabase client creation fails → middleware crashes → 500 error.

---

## 🎯 **Summary**

**Problem**: Middleware needs Supabase credentials  
**Solution**: Add 3 environment variables to Vercel  
**Time**: 2 minutes  
**Result**: Site works perfectly ✅

---

## 📊 **After Adding Variables**

Your site will:
- ✅ Load without 500 errors
- ✅ Connect to Supabase database
- ✅ Show fleet vehicles
- ✅ Accept bookings
- ✅ Handle authentication
- ✅ Work on all pages

---

## 🚀 **Quick Checklist**

- [ ] Go to Vercel dashboard
- [ ] Open your project settings
- [ ] Click Environment Variables
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Add `NEXT_PUBLIC_SITE_URL`
- [ ] Click "Redeploy" on latest deployment
- [ ] Wait 2-3 minutes
- [ ] ✅ Site is LIVE!

---

**DO THIS NOW: Add the 3 environment variables in Vercel dashboard, then click "Redeploy"!** 🚀

Your site will be live in 3 minutes after you add them!

