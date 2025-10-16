# Sentry Error Monitoring Setup Guide

## 🎯 Overview

Sentry has been configured for the Aggelos Rentals platform to provide real-time error tracking, performance monitoring, and crash reporting.

---

## 📦 Installation (Already Complete)

```bash
npm install @sentry/nextjs
```

---

## 🔧 Configuration Files Created

1. **sentry.client.config.ts** - Client-side error tracking
2. **sentry.server.config.ts** - Server-side error tracking  
3. **sentry.edge.config.ts** - Edge runtime error tracking
4. **instrumentation.ts** - Automatic instrumentation
5. **next.config.ts** - Updated with Sentry webpack plugin

---

## 🚀 Setup Steps

### Step 1: Create Sentry Account

1. Go to https://sentry.io/signup/
2. Create a free account
3. Create a new project and select "Next.js"
4. Copy your DSN (looks like: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)

### Step 2: Add Environment Variables

Add to your `.env.local` file:

```bash
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
SENTRY_ORG=your-organization-slug
SENTRY_PROJECT=aggelos-rentals
SENTRY_AUTH_TOKEN=your_auth_token_here
```

**How to get these values**:
- **DSN**: From Sentry project settings → Client Keys (DSN)
- **ORG**: Your organization slug from Sentry URL
- **PROJECT**: Your project name in Sentry
- **AUTH_TOKEN**: Create at https://sentry.io/settings/account/api/auth-tokens/
  - Permissions needed: `project:read`, `project:releases`, `org:read`

### Step 3: Update next.config.ts

Replace these placeholders in `next.config.ts`:

```typescript
org: "your-organization", // Replace with your actual org slug
project: "aggelos-rentals", // Your project name
```

### Step 4: Test Sentry

Create a test error to verify Sentry is working:

**In any page component**:
```typescript
<button onClick={() => {
  throw new Error('Sentry Test Error!');
}}>
  Test Sentry
</button>
```

Click the button and check your Sentry dashboard for the error.

---

## 🎨 Features Enabled

### 1. Error Tracking
- Automatic capture of unhandled errors
- Stack traces with source maps
- User context (if authenticated)
- Breadcrumbs showing user actions

### 2. Performance Monitoring
- Transaction tracing  
- API route performance
- Page load times
- Database query tracking

### 3. Session Replay
- Record user sessions when errors occur
- Visual playback of what went wrong
- Privacy-focused (masks sensitive data)

### 4. Release Tracking
- Automatic release creation on deploy
- Source map upload for better stack traces
- Commit tracking

---

## 📊 What Gets Tracked

### Automatically:
- ✅ Unhandled exceptions
- ✅ Promise rejections
- ✅ Console errors
- ✅ Network failures
- ✅ React component errors
- ✅ API route errors
- ✅ Middleware errors

### Manual Tracking:
```typescript
import * as Sentry from '@sentry/nextjs';

// Capture custom error
try {
  // risky operation
} catch (error) {
  Sentry.captureException(error);
}

// Add context
Sentry.setUser({ id: userId, email: userEmail });
Sentry.setTag('booking_id', bookingId);
Sentry.addBreadcrumb({
  category: 'booking',
  message: 'User selected car',
  level: 'info',
});

// Capture custom message
Sentry.captureMessage('Payment processing started', 'info');
```

---

## 🔒 Privacy & Security

### Data Scrubbing (Already Configured):
- ✅ Passwords automatically filtered
- ✅ Credit card numbers masked
- ✅ Email addresses can be masked
- ✅ IP addresses can be anonymized
- ✅ Session replay masks all text by default

### Customize in Sentry Dashboard:
- Settings → Security & Privacy
- Data Scrubbing Rules
- IP Address Handling
- Cookie Tracking

---

## 📈 Recommended Sentry Settings

### 1. Alert Rules
Create alerts for:
- New issues in production
- High-volume errors (>100/hour)
- Performance degradation
- Failed transactions

### 2. Performance Thresholds
Set thresholds for:
- Page load time: < 3s
- API response time: < 500ms
- Database queries: < 100ms

### 3. Release Notifications
Enable notifications for:
- New releases deployed
- Regression detection
- Error spikes after release

---

## 🧪 Testing Your Setup

### 1. Test Client-Side Error
```typescript
// In any React component
<button onClick={() => { throw new Error('Client Test'); }}>
  Test Client Error
</button>
```

### 2. Test Server-Side Error
```typescript
// In app/api/test-sentry/route.ts
export async function GET() {
  throw new Error('Server Test');
}
```

### 3. Test Performance Monitoring
```typescript
import * as Sentry from '@sentry/nextjs';

export async function GET() {
  const transaction = Sentry.startTransaction({
    name: 'test-transaction',
    op: 'test',
  });
  
  // Your code here
  await someOperation();
  
  transaction.finish();
}
```

---

## 📊 Sentry Dashboard Guide

### Key Sections:

1. **Issues**: All errors and exceptions
   - Filter by: Browser, OS, Release, User
   - View stack traces and breadcrumbs
   - Mark as resolved or ignored

2. **Performance**: Transaction monitoring
   - View slowest transactions
   - Database query performance
   - API endpoint metrics

3. **Releases**: Deployment tracking
   - See errors by release version
   - Track regressions
   - Compare releases

4. **Replays**: Session recordings
   - Watch what users did before error
   - Visual debugging

---

## 🚨 Common Issues & Solutions

### Issue: "DSN not found"
**Solution**: Make sure `NEXT_PUBLIC_SENTRY_DSN` is in `.env.local`

### Issue: "Source maps not uploading"
**Solution**: Ensure `SENTRY_AUTH_TOKEN` has correct permissions

### Issue: "Too many events"
**Solution**: Adjust `tracesSampleRate` in config files (default is 1.0 = 100%)

### Issue: "Localhost errors flooding Sentry"
**Solution**: Add environment filter in Sentry or use:
```typescript
if (process.env.NODE_ENV === 'production') {
  Sentry.captureException(error);
}
```

---

## 💰 Pricing Considerations

### Free Tier Includes:
- 5,000 errors/month
- 10,000 performance units/month
- 50 session replays/month
- 1 GB attachments

### Recommendations:
- Start with free tier
- Use sampling to reduce costs:
  ```typescript
  tracesSampleRate: 0.1, // Sample 10% of transactions
  replaysSessionSampleRate: 0.05, // 5% of sessions
  ```

---

## 📚 Additional Resources

- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Performance Monitoring](https://docs.sentry.io/product/performance/)
- [Session Replay](https://docs.sentry.io/product/session-replay/)
- [Release Tracking](https://docs.sentry.io/product/releases/)

---

## ✅ Quick Start Checklist

- [ ] Create Sentry account at sentry.io
- [ ] Create new Next.js project in Sentry
- [ ] Copy DSN and add to `.env.local`
- [ ] Create auth token and add to `.env.local`
- [ ] Update `org` and `project` in `next.config.ts`
- [ ] Test with a sample error
- [ ] Verify error appears in Sentry dashboard
- [ ] Configure alert rules
- [ ] Set up performance thresholds
- [ ] Enable release tracking

---

## 🎉 You're All Set!

Once configured, Sentry will automatically:
- ✅ Capture all errors in production
- ✅ Track performance issues
- ✅ Record sessions when errors occur
- ✅ Send alerts for critical issues
- ✅ Help you ship better code faster

**Remember**: Sentry is your safety net, not a replacement for testing! 🚀

