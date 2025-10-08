# Serverless Deployment Guide
## Voice of the Voiceless - Production Ready

**Deployment Strategy:** Vercel (Serverless) + Custom Domain
**Estimated Setup Time:** 45 minutes
**Technical Level:** Beginner-friendly
**Monthly Cost:** $180-300 (API only, hosting is free)

---

## Overview

This guide will walk you through:
1. Purchasing a domain name
2. Setting up GitHub repository
3. Deploying to Vercel (serverless platform)
4. Creating a serverless API backend
5. Connecting your custom domain
6. Going live!

---

## Part 1: Domain Name Purchase (10 minutes)

### Recommended Domain Options

Check availability for these (in order of preference):
1. `voice-of-voiceless.com` - Most descriptive
2. `voiceofthevoiceless.com` - No hyphens, cleaner
3. `voice-of-voiceless.app` - Modern .app extension
4. `voiceless.app` - Short and memorable

### Step-by-Step Purchase (Cloudflare - Recommended)

**Why Cloudflare?**
- Cheapest: $9.77/year for .com (at-cost pricing)
- Best security features
- Free WHOIS privacy
- Easy DNS management
- No upsells or hidden fees

**Purchase Process:**

1. **Go to Cloudflare Registrar**
   - Visit: https://www.cloudflare.com/products/registrar/
   - Click "Get Started"

2. **Create Account**
   - Sign up with email
   - Verify email address
   - Set strong password + 2FA (recommended)

3. **Search for Domain**
   - Enter: `voice-of-voiceless.com`
   - Click "Search"
   - Check availability

4. **Add to Cart**
   - Click "Purchase" on available domain
   - Duration: 1 year (can extend to 10 years if you want)
   - Auto-renewal: ✅ Enable (don't lose your domain!)
   - WHOIS Privacy: ✅ Free (automatically included)

5. **Complete Purchase**
   - Add payment method
   - Review total (should be ~$9.77 for .com)
   - Complete purchase
   - Save confirmation email

6. **Initial DNS Setup (We'll configure this later)**
   - Don't touch DNS settings yet
   - We'll add records after Vercel setup
   - Just verify domain is in your account

### Alternative Registrars (If Cloudflare Unavailable)

**Option 2: Namecheap** (namecheap.com)
- Cost: $12-15/year for .com
- Enable WhoisGuard (free first year)
- Simple interface
- Good support

**Option 3: Google Domains → Squarespace** (domains.squarespace.com)
- Cost: $12/year for .com
- Simple, reliable
- Good if you're familiar with Google services

---

## Part 2: GitHub Repository Setup (10 minutes)

Your code needs to be on GitHub for Vercel to deploy it.

### Option A: If You Already Use GitHub

```bash
# Open PowerShell in your project directory
cd C:\Users\swptc\Documents\voice-of-voiceless

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Voice of the Voiceless"

# Create repository on GitHub:
# 1. Go to github.com and log in
# 2. Click "+" → "New repository"
# 3. Name: voice-of-voiceless
# 4. Description: "Give voice to inanimate objects through AI narration"
# 5. Keep it Public (or Private if you prefer)
# 6. Do NOT initialize with README (we already have files)
# 7. Click "Create repository"

# Connect local code to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/voice-of-voiceless.git
git branch -M main
git push -u origin main
```

### Option B: If New to GitHub

1. **Create GitHub Account**
   - Go to https://github.com/signup
   - Sign up with email
   - Verify account

2. **Install GitHub Desktop** (Easiest Method)
   - Download: https://desktop.github.com/
   - Install and sign in
   - Click "Add" → "Add Existing Repository"
   - Browse to: `C:\Users\swptc\Documents\voice-of-voiceless`
   - Click "Publish repository"
   - Name: `voice-of-voiceless`
   - Uncheck "Keep this code private" (or keep checked if you prefer)
   - Click "Publish repository"

3. **Verify Upload**
   - Go to github.com/YOUR_USERNAME/voice-of-voiceless
   - You should see all your files

---

## Part 3: Create Serverless Backend API (15 minutes)

We need to create an API endpoint that will handle requests without exposing your API key.

### Step 1: Create API Directory

```bash
# In your project folder
cd C:\Users\swptc\Documents\voice-of-voiceless

# Create api folder
mkdir api
cd api
```

### Step 2: Create API Function

Create a new file: `api/generate.js`

```javascript
// api/generate.js
// Vercel Serverless Function

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple rate limiting (5 requests per IP per day)
  // Note: This resets on each deployment. For production, use Vercel KV
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Get request data
  const { object, context } = req.body;
  
  if (!object || !object.trim()) {
    return res.status(400).json({ error: 'Object is required' });
  }

  // Build the prompt
  const prompt = `You are a literary artist specializing in anthropomorphic narration, in the tradition of "Death of a Cigarette" where inanimate objects gain voice, memory, and philosophical depth.

Object to anthropomorphize: ${object}
${context ? `Additional context: ${context}` : ''}

Create a lyrical, first-person narrative (250-400 words) from this object's perspective. The writing should:

1. VOICE & INTERIORITY: Give the object a distinct consciousness—awareness of its purpose, its creation, its relationship to humans
2. SENSORY DETAIL: Describe what it experiences through its unique "senses"—texture, weight, temperature, movement
3. MEMORY & TIME: Let it reflect on its journey from creation to present, moments of significance
4. PHILOSOPHICAL DEPTH: Explore themes of purpose, mortality, legacy, silence, witness
5. LYRICAL PRECISION: Use metaphor and imagery that arises naturally from the object's material nature
6. RESTRAINT: Avoid sentimentality; find the dignity in humble existence

The tone should be contemplative, quietly profound, with the cadence of literary prose. Let the object speak as a witness to human life, finding meaning in its service or obsolescence.

Begin the narrative directly in the object's voice.`;

  try {
    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API Error:', errorData);
      throw new Error(errorData.error?.message || 'Failed to generate narrative');
    }

    const data = await response.json();
    const narrative = data.content[0].text;

    // Return successful response
    return res.status(200).json({ 
      narrative,
      object,
      context: context || null
    });

  } catch (error) {
    console.error('Error generating narrative:', error);
    return res.status(500).json({ 
      error: 'Unable to generate narrative. Please try again.',
      message: error.message 
    });
  }
}
```

### Step 3: Update Frontend to Use Backend API

Update `src/ObjectVoiceApp.tsx` to call the serverless function instead of direct API:

**Find this section (around line 62-85):**
```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [
      { role: 'user', content: prompt }
    ]
  })
});

if (!response.ok) {
  throw new Error('Failed to generate narrative');
}

const data = await response.json();
const generatedText = data.content[0].text;
setNarrative(generatedText);
```

**Replace with:**
```javascript
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    object: object,
    context: context
  })
});

if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.error || 'Failed to generate narrative');
}

const data = await response.json();
setNarrative(data.narrative);
```

**Also remove all API key related code:**
- Remove `apiKey` state
- Remove `showApiKeyInput` state
- Remove the entire API key input section
- Remove `saveApiKey` function
- Remove `clearApiKey` function
- Simplify the `generateVoice` function

The app should now work without requiring users to enter an API key!

### Step 4: Create Vercel Configuration

Create `vercel.json` in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 5: Commit Changes

```bash
# Save all changes
git add .
git commit -m "Add serverless API backend"
git push origin main
```

---

## Part 4: Deploy to Vercel (10 minutes)

### Step 1: Create Vercel Account

1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. Complete account setup

### Step 2: Import Project

1. On Vercel dashboard, click "Add New" → "Project"
2. Find `voice-of-voiceless` in your repository list
3. Click "Import"

### Step 3: Configure Project

**Build & Development Settings:**
- Framework Preset: Vite (should auto-detect)
- Build Command: `npm run build` (auto-filled)
- Output Directory: `dist` (auto-filled)
- Install Command: `npm install` (auto-filled)

Leave these as default unless you need to change them.

### Step 4: Add Environment Variables

**CRITICAL STEP - Add your API key:**

1. Expand "Environment Variables" section
2. Add variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** your_actual_anthropic_api_key_here
   - **Environment:** Production, Preview, Development (check all)
3. Click "Add"

### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build
3. You'll see "Congratulations!" when done
4. Click "Visit" to see your live site
5. You'll get a URL like: `voice-of-voiceless.vercel.app`

### Step 6: Test Deployment

1. Visit your Vercel URL
2. Try generating a narrative
3. Should work without API key input!
4. Check browser console for any errors

---

## Part 5: Connect Custom Domain (10 minutes)

### Step 1: Add Domain in Vercel

1. Go to your project in Vercel
2. Click "Settings" tab
3. Click "Domains" in sidebar
4. Click "Add"
5. Enter your domain: `voice-of-voiceless.com`
6. Click "Add"

### Step 2: Configure DNS in Cloudflare

Vercel will show you DNS records to add. They'll look like:

```
Type: A
Name: @
Value: 76.76.21.21
```

And:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**In Cloudflare:**

1. Go to Cloudflare Dashboard
2. Click on your domain
3. Click "DNS" in sidebar
4. Click "Add record"
5. Add the A record:
   - Type: A
   - Name: @ (means root domain)
   - IPv4 address: (the IP Vercel showed you)
   - Proxy status: DNS only (turn OFF orange cloud)
   - TTL: Auto
   - Click "Save"

6. Add the CNAME record:
   - Type: CNAME
   - Name: www
   - Target: (the CNAME Vercel showed you)
   - Proxy status: DNS only (turn OFF orange cloud)
   - TTL: Auto
   - Click "Save"

### Step 3: Wait for Verification

1. Back in Vercel, click "Refresh"
2. DNS propagation takes 5-60 minutes
3. Vercel will automatically verify and issue SSL certificate
4. You'll see "Valid Configuration" when ready

### Step 4: Test Your Domain

1. Visit: `https://voice-of-voiceless.com`
2. Should redirect to HTTPS automatically
3. Should load your app
4. Test generating a narrative

**Congratulations! Your app is now live! 🎉**

---

## Part 6: Post-Deployment Setup (5 minutes)

### Set Up Monitoring

1. **Vercel Analytics** (Free)
   - Go to Project Settings → Analytics
   - Click "Enable"
   - Track page views, performance

2. **Anthropic API Monitoring**
   - Visit https://console.anthropic.com
   - Go to "Usage" section
   - Set up billing alerts:
     - Click "Billing" → "Set spending limit"
     - Set daily limit: $10
     - Set monthly limit: $300
     - Add email alerts at 50%, 80%, 100%

### Create Backups

```bash
# In your local project folder
cd C:\Users\swptc\Documents

# Create backup
tar -czf voice-of-voiceless-backup-$(date +%Y%m%d).tar.gz voice-of-voiceless

# Or just ensure GitHub is your backup
# Your code is safely stored on GitHub
```

---

## Cost Management

### Monthly Cost Breakdown

**Hosting:** $0 (Vercel Free Tier includes):
- Unlimited deployments
- 100GB bandwidth
- Automatic HTTPS
- Global CDN
- Serverless functions

**Domain:** $0.82/month ($9.77/year ÷ 12)

**API Costs:** Variable based on usage
- 100 narratives/day × 30 days = 3,000/month
- ~$0.06 per narrative = $180/month
- Buffer for spikes: $200-300/month

**Total Monthly: $180-300**

### Cost Protection Strategy

**Set Anthropic API Limits:**
1. Go to console.anthropic.com
2. Settings → Billing → Set Limits
3. Daily: $10 max
4. Monthly: $300 max
5. Email alerts at 50%, 80%

**If Costs Spike:**
1. Check usage dashboard
2. Look for abuse patterns
3. Add rate limiting (see Advanced section)
4. Consider adding user authentication

---

## Updating Your App

### Making Changes

```bash
# 1. Make changes to your code locally
# 2. Test locally: npm run dev
# 3. Commit changes
git add .
git commit -m "Description of changes"

# 4. Push to GitHub
git push origin main

# 5. Vercel automatically deploys!
# No need to do anything else
```

### Vercel Auto-Deploys

- Every push to `main` branch triggers deployment
- Takes 2-3 minutes
- Preview URL generated for each deployment
- Previous versions saved (can rollback)

---

## Advanced: Rate Limiting (Optional)

For better rate limiting, use Vercel KV (Redis):

### Enable Vercel KV

1. Vercel Dashboard → Storage → Create Database
2. Choose "KV" (Key-Value store)
3. Name: `voice-rate-limiter`
4. Click "Create"

### Update API Function

Install package locally:
```bash
npm install @vercel/kv
```

Update `api/generate.js` to add rate limiting at the top:

```javascript
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // ... existing CORS code ...

  // Rate limiting with Vercel KV
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const rateKey = `rate-limit:${ip}`;
  const limit = 5; // requests per day
  
  try {
    const requests = await kv.get(rateKey) || 0;
    
    if (requests >= limit) {
      return res.status(429).json({ 
        error: 'Daily limit reached. Try again tomorrow!' 
      });
    }
    
    // Increment counter (expires in 24 hours)
    await kv.set(rateKey, requests + 1, { ex: 86400 });
    
  } catch (error) {
    console.error('Rate limit error:', error);
    // Continue even if rate limiting fails
  }

  // ... rest of your API code ...
}
```

Push changes:
```bash
git add .
git commit -m "Add rate limiting with Vercel KV"
git push origin main
```

**Cost:** Vercel KV free tier includes 30,000 commands/month (plenty for your needs)

---

## Troubleshooting

### "API Key not found" Error

**Problem:** Environment variable not set
**Solution:**
1. Go to Vercel → Project Settings → Environment Variables
2. Verify `ANTHROPIC_API_KEY` exists
3. If missing, add it
4. Redeploy: Deployments → Click "..." → Redeploy

### Domain Not Working

**Problem:** DNS not configured correctly
**Solution:**
1. Check Cloudflare DNS records match Vercel's requirements
2. Turn OFF Cloudflare proxy (orange cloud)
3. Wait 1 hour for DNS propagation
4. Use https://dnschecker.org to verify

### "Failed to generate narrative"

**Problem:** API call failing
**Solution:**
1. Check browser console for detailed error
2. Verify API key is correct in Vercel
3. Check Anthropic console for API usage/errors
4. Check Vercel function logs: Project → Logs

### Build Failing

**Problem:** Build errors during deployment
**Solution:**
1. Check Vercel deployment logs
2. Verify `package.json` has all dependencies
3. Test build locally: `npm run build`
4. Check for TypeScript errors
5. Push fix to GitHub

---

## Maintenance Checklist

### Daily (First Week)
- [ ] Check Anthropic API usage/costs
- [ ] Monitor Vercel deployment status
- [ ] Test app functionality

### Weekly
- [ ] Review Vercel analytics
- [ ] Check API costs
- [ ] Review any error logs

### Monthly
- [ ] Review total costs
- [ ] Check domain renewal date (set calendar reminder)
- [ ] Update dependencies if needed: `npm update`
- [ ] Review user feedback (if collecting)

### Annually
- [ ] Renew domain (auto-renews if enabled)
- [ ] Review overall costs and optimization
- [ ] Consider feature additions based on usage

---

## Going Live Checklist

Before announcing to the public:

- [ ] Domain purchased and connected
- [ ] App deployed and working on custom domain
- [ ] HTTPS working (green padlock in browser)
- [ ] Test narrative generation (try 5+ objects)
- [ ] API key secure (not visible in frontend)
- [ ] Anthropic API spending limits set
- [ ] Email alerts configured for API usage
- [ ] Analytics enabled (Vercel + Google Analytics optional)
- [ ] Error monitoring set up
- [ ] Backup of code on GitHub
- [ ] README.md updated with project info
- [ ] Test on mobile devices
- [ ] Test in different browsers (Chrome, Firefox, Safari)
- [ ] Share link with 2-3 beta testers
- [ ] Prepare social media announcements
- [ ] Add link in book materials

---

## Launch Strategy

### Pre-Launch (2 weeks before book)
1. Deploy app with "Coming Soon" message
2. Add email signup for launch notification
3. Share with small group for feedback
4. Create social media graphics

### Launch Day (with book release)
1. Remove "Coming Soon" message
2. Post on social media
3. Email subscribers
4. Add QR code in book pointing to app
5. Monitor closely for first 24 hours

### Post-Launch (first month)
1. Share interesting generated narratives
2. Gather user feedback
3. Make iterative improvements
4. Monitor costs daily
5. Celebrate success! 🎉

---

## Support Resources

### Documentation
- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev/guide/
- **React Docs:** https://react.dev
- **Anthropic API:** https://docs.anthropic.com

### Community Help
- **Vercel Discord:** https://vercel.com/discord
- **Stack Overflow:** Tag questions with `vercel` and `react`

### Get Help
- **Vercel Support:** support@vercel.com (free tier has community support)
- **Anthropic Support:** support@anthropic.com

---

## Summary

**What you've accomplished:**
✅ Purchased custom domain
✅ Set up GitHub repository
✅ Created serverless API backend
✅ Deployed to production
✅ Connected custom domain with HTTPS
✅ Implemented cost protection
✅ Set up monitoring

**What you get:**
- Professional custom domain
- Fast, global hosting (CDN)
- Automatic HTTPS/SSL
- Zero server maintenance
- Automatic deployments
- 99.99% uptime
- Scalability
- Free hosting forever

**Total Time Investment:**
- Setup: 45 minutes
- Weekly maintenance: 0 minutes
- Monthly review: 5 minutes

**Total Monthly Cost:**
- $180-300 (API usage only)
- Hosting: $0
- Domain: $0.82/month

---

**Congratulations! You're ready to give voice to the voiceless! 🎉**

---

**Document Version:** 1.0  
**Last Updated:** October 2025  
**Deployment Method:** Vercel Serverless  
**Domain Registrar:** Cloudflare
