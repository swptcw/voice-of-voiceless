# 🚀 Quick Start Guide - Serverless Deployment
## Voice of the Voiceless

---

## ⏱️ Total Time: 45 Minutes

### Phase 1: Buy Domain (10 min)
1. Go to https://cloudflare.com/products/registrar/
2. Search for `voice-of-voiceless.com`
3. Purchase ($9.77/year)
4. Enable auto-renewal ✅
5. WHOIS privacy included ✅

---

### Phase 2: Push to GitHub (5 min)

**Option A - Using Git Command Line:**
```bash
cd C:\Users\swptc\Documents\voice-of-voiceless
git init
git add .
git commit -m "Initial commit"
# Create repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/voice-of-voiceless.git
git push -u origin main
```

**Option B - Using GitHub Desktop (Easier):**
1. Download GitHub Desktop: https://desktop.github.com/
2. Sign in
3. Add existing repository
4. Browse to your project folder
5. Publish repository

---

### Phase 3: Deploy to Vercel (15 min)

1. **Sign up:** https://vercel.com/signup
   - Click "Continue with GitHub"
   - Authorize Vercel

2. **Import Project:**
   - Click "Add New" → "Project"
   - Find `voice-of-voiceless`
   - Click "Import"

3. **Add Environment Variable:**
   - Expand "Environment Variables"
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-your-key-here`
   - Check all environments
   - Click "Add"

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Click "Visit" to test

---

### Phase 4: Connect Domain (10 min)

**In Vercel:**
1. Project Settings → Domains
2. Add `voice-of-voiceless.com`
3. Note the DNS records shown

**In Cloudflare:**
1. Go to your domain
2. Click "DNS"
3. Add A record:
   - Type: A
   - Name: @
   - Value: (IP from Vercel)
   - Proxy: OFF (gray cloud)
4. Add CNAME record:
   - Type: CNAME
   - Name: www
   - Target: (CNAME from Vercel)
   - Proxy: OFF
5. Wait 10-30 minutes for propagation

---

### Phase 5: Set Cost Limits (5 min)

1. Go to https://console.anthropic.com
2. Click "Billing" → "Set Limits"
3. Daily limit: $10
4. Monthly limit: $300
5. Email alerts: 50%, 80%, 100%

---

## ✅ Verification Checklist

- [ ] Domain purchased
- [ ] Code on GitHub
- [ ] Deployed to Vercel
- [ ] Environment variable added
- [ ] Domain connected and showing HTTPS
- [ ] Test narrative generation works
- [ ] API spending limits set
- [ ] Email alerts configured

---

## 🎯 Testing Your Deployment

1. Visit: `https://voice-of-voiceless.com`
2. Should have green padlock (HTTPS)
3. Enter object: "a pocket watch"
4. Add context: "carried through three wars"
5. Click "Grant Voice"
6. Should generate narrative in 5-10 seconds

---

## 📊 What You're Running

```
User Browser
    ↓
Cloudflare DNS
    ↓
Vercel CDN (Global, Fast)
    ↓
React App (Frontend)
    ↓
/api/generate (Serverless Function)
    ↓
Anthropic API (Claude)
```

---

## 💰 Monthly Costs

- **Hosting:** $0 (Vercel Free Tier)
- **Domain:** $0.82/month ($9.77/year)
- **API:** $180-300 (based on usage)
- **Total:** $180-300/month

---

## 🔄 Making Updates

```bash
# 1. Edit your code locally
# 2. Test: npm run dev
# 3. Commit and push
git add .
git commit -m "Your changes"
git push

# Vercel automatically deploys!
```

---

## 🆘 Common Issues

### "API Key not found"
- Go to Vercel → Settings → Environment Variables
- Verify `ANTHROPIC_API_KEY` exists
- Redeploy if you just added it

### Domain not working
- Wait 1 hour for DNS propagation
- Check DNS at: https://dnschecker.org
- Verify Cloudflare proxy is OFF (gray cloud)

### Build failed
- Check Vercel deployment logs
- Look for red error messages
- Usually a typo in code

---

## 📱 Support

- **Vercel Docs:** https://vercel.com/docs
- **Anthropic API:** https://docs.anthropic.com
- **Full Guide:** See SERVERLESS-DEPLOYMENT.md

---

## 🎉 You're Live!

Once everything works:
- Share the link with friends
- Test on mobile devices
- Monitor costs first week
- Prepare for book launch

**Congratulations! You've deployed a production app! 🚀**

---

**Quick Reference Card v1.0**
