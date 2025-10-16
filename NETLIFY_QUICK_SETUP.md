# ⚡ Netlify Quick Setup - Copy & Paste

**Site**: Aggelos Rentals  
**Repo**: https://github.com/otouristas/pireasleasing

---

## 🚀 **Step-by-Step Netlify Setup**

### **1. Add Environment Variables** (2 minutes)

Go to: **Netlify Dashboard → Your Site → Site Settings → Environment Variables**

Click **"Add a variable"** and copy-paste each:

#### **Variable 1: Supabase URL**
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://hjgukvbkurboxkrgrruz.supabase.co
Scopes: ✓ All
```

#### **Variable 2: Supabase Anon Key**
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjUzNDYsImV4cCI6MjA3NjE0MTM0Nn0.chylpB7Vc9Nl-wk7JGq-ddxwtQ-28Cs_EHmlJ2dZ3QA
Scopes: ✓ All
```

#### **Variable 3: Site URL**
```
Key: NEXT_PUBLIC_SITE_URL
Value: https://aggelosrentals.com
Scopes: ✓ All
```

*(Or use your Netlify URL if no custom domain yet)*

#### **Variable 4: Service Role Key** (Optional - for admin features)
```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqZ3VrdmJrdXJib3hrcmdycnV6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDU2NTM0NiwiZXhwIjoyMDc2MTQxMzQ2fQ.ciVElRZtA0jvNKz4TLMdFYLSOynbEGt_pwRdnn3YzE0
Scopes: ✓ Production only
```

---

### **2. Verify Build Settings** (30 seconds)

Go to: **Site Settings → Build & Deploy → Build Settings**

Should show:
```
Repository: otouristas/pireasleasing
Branch: main
Build command: npm run build
Publish directory: .next
```

---

### **3. Trigger Deploy** (30 seconds)

Go to: **Deploys** tab

Click: **"Trigger deploy" → "Deploy site"**

---

### **4. Wait for Build** (3-5 minutes)

Watch the deploy log. Should see:
```
✓ Installing dependencies
✓ Running npm run build
✓ Creating optimized production build
✓ Build completed
✓ Deploying to CDN
✓ Site is live!
```

---

## ✅ **Done!**

Your site is now live with:
- ✅ Enhanced booking system
- ✅ Mobile navigation
- ✅ Live price calculator
- ✅ SEO optimization
- ✅ Supabase connected
- ✅ All features working

---

## 📱 **Test Your Live Site**

Visit: `https://your-site.netlify.app/en`

Test:
1. Homepage loads ✅
2. Booking form works ✅
3. Mobile menu opens ✅
4. Fleet page shows cars ✅

---

## 🎯 **Total Setup Time**: ~5 minutes
## ✅ **Result**: Production site LIVE! 🎉

