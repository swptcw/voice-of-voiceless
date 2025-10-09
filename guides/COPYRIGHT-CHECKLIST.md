# Copyright & Trademark Action Checklist
## Voice of the Voiceless

**Use this checklist to protect your intellectual property before launch.**

---

## ✅ IMMEDIATE ACTIONS (Do Before Deployment) - FREE

### Add Copyright Notices to Code

- [ ] **Update `src/ObjectVoiceApp.tsx`** - Add copyright to footer
  ```javascript
  <p style={{ marginTop: '15px', fontSize: '12px' }}>
    © 2025 Timothy Webber. All rights reserved.<br/>
    Inspired by "Death of a Cigarette"
  </p>
  ```

- [ ] **Update `api/generate.js`** - Add header comment
  ```javascript
  /**
   * Voice of the Voiceless - Serverless API
   * Copyright (c) 2025 Timothy Webber. All rights reserved.
   * 
   * PROPRIETARY AND CONFIDENTIAL
   * This prompt engineering methodology is a trade secret.
   * Unauthorized use, copying, or disclosure is strictly prohibited.
   */
  ```

- [ ] **Update all source files** - Add copyright headers

### Create Legal Documents

- [x ] **Review `LICENSE.txt`** - Already created in your project folder
- [x ] **Review `legal/TERMS-OF-SERVICE.md`** - Already created
- [x ] **Review `legal/PRIVACY-POLICY.md`** - Already created
- [x ] **Add your email address** to all legal documents (search for "[your email]")
- [x ] **Add your mailing address** to Privacy Policy (search for "[Your mailing address]")
- [x ] **Add your state/county** to Terms of Service (search for "[Your State]")

### Update Website

- [ ] **Add Terms & Privacy links to footer**
  - Link to: `/terms` and `/privacy`
  - Create pages or host PDFs of the documents

- [ ] **Create About page** with:
  - Copyright notice
  - Book connection
  - Author information

### Update Repository

- [x ] **Update README.md** - Already updated with license section
- [ ] **Create `.github/` folder** (optional but good)
- [ ] **Add copyright to package.json**
  ```json
  "author": "Timothy Webber",
  "license": "PROPRIETARY"
  ```

---

## 💰 SHORT-TERM ACTIONS (Before Public Launch) - $130-190

### Register Copyrights ($130)

- [ ] **Register "Death of a Cigarette" book**
  - Go to: https://www.copyright.gov/registration/
  - Form: Literary Work (Form TX)
  - Cost: $65
  - Upload: PDF of published book
  - Wait: 3-6 months for certificate

- [ ] **Register "Voice of the Voiceless" software**
  - Go to: https://www.copyright.gov/registration/
  - Form: Computer Program (Form PA or TX)
  - Cost: $65
  - Upload: Source code (first 25 and last 25 pages)
  - Wait: 3-6 months for certificate

### Purchase Protective Domains ($30-60)

- [ ] **Buy primary domain**
  - `voice-of-voiceless.com` - Already in your plan

- [ ] **Buy 2-3 protective domains**
  - [ ] `voiceofthevoiceless.com` (no hyphens)
  - [ ] `voice-of-voiceless.app` (.app extension)
  - [ ] Optional: `voiceofthevoiceless.app`

- [ ] **Set up redirects** - Point all domains to main site

---

## 🔍 MEDIUM-TERM ACTIONS (3-6 Months After Launch) - $350-2,000

### Evaluate Trademark Need

- [ ] **Assess if trademarking makes sense**
  - Is the app gaining traction?
  - Are there copycat concerns?
  - Do you plan to expand the brand?

### Search Existing Trademarks

- [ ] **Search USPTO database**
  - Go to: https://tmsearch.uspto.gov/
  - Search: "Voice of the Voiceless"
  - Search similar variations
  - Document results

### File Trademark (if decided)

**DIY Route ($350-600):**
- [ ] Create USPTO account at https://www.uspto.gov/
- [ ] File TEAS Standard application
- [ ] Choose classes:
  - [ ] Class 009 (Software)
  - [ ] Class 042 (SaaS)
- [ ] Provide "specimen of use" (screenshot of live app)
- [ ] Pay filing fees ($350 per class)
- [ ] Monitor application (8-12 months)

**Attorney Route ($1,000-2,000):**
- [ ] Find trademark attorney
  - Use AVVO or state bar referral
  - Look for IP specialists
- [ ] Initial consultation (often free)
- [ ] Attorney handles filing
- [ ] Review office actions together
- [ ] Finalize registration

---

## 📝 DOCUMENTATION CHECKLIST

### Files to Update

- [ ] `src/ObjectVoiceApp.tsx` - Footer with copyright
- [ ] `api/generate.js` - Header with confidentiality notice
- [ ] `src/main.tsx` - Add copyright header
- [ ] `package.json` - Add author and license fields
- [ ] `README.md` - Already updated
- [ ] `LICENSE.txt` - Review and customize
- [ ] `legal/TERMS-OF-SERVICE.md` - Add your contact info
- [ ] `legal/PRIVACY-POLICY.md` - Add your contact info

### Information to Add

Find and replace these in all legal documents:
- [ ] `[your email]` → Your actual email
- [ ] `[Your mailing address]` → Your mailing address
- [ ] `[Your State]` → Your state (for governing law)
- [ ] `[Your County, State]` → Your county and state (for jurisdiction)
- [ ] `[your domain]` → voice-of-voiceless.com

---

## 🔐 SECURITY CHECKLIST

- [ ] **API Key** - Stored in Vercel environment variables (never in code)
- [ ] **Prompt** - Hidden in backend, marked as confidential
- [ ] **Source code** - Private GitHub repository recommended
- [ ] **Sensitive data** - No personal info collected
- [ ] **HTTPS** - Automatic with Vercel
- [ ] **CORS** - Properly configured in API

---

## 📊 MONITORING CHECKLIST

### Set Up Alerts

- [ ] **Google Alerts**
  - Alert for: "Voice of the Voiceless"
  - Alert for: "Death of a Cigarette"

- [ ] **Domain monitoring**
  - Check for similar domain registrations
  - Use: https://domaintyper.com/

- [ ] **GitHub searches**
  - Search for: "Voice of the Voiceless"
  - Look for clones or similar projects

### Track Usage

- [ ] **Anthropic API costs** - Check daily first week
- [ ] **Vercel analytics** - Monitor traffic
- [ ] **Error logs** - Check for abuse patterns

---

## 🚨 IF SOMEONE COPIES YOUR APP

### Immediate Actions

1. [ ] **Document everything**
   - Take screenshots
   - Save URLs
   - Record dates
   - Document similarities

2. [ ] **Verify it's actually infringement**
   - Is it your exact code?
   - Is it your exact prompt?
   - Is it just a similar idea?

3. [ ] **Send cease and desist** (use template in COPYRIGHT-TRADEMARK-GUIDE.md)

4. [ ] **File DMCA takedown** (if hosted on GitHub, Vercel, etc.)

5. [ ] **Report to their hosting provider**

6. [ ] **Consult attorney** if it's serious

---

## 📧 CONTACT INFORMATION TO KEEP HANDY

### Your Information
- [ ] Email for legal notices: _______________
- [ ] Mailing address: _______________
- [ ] Phone (optional): _______________

### Service Providers
- Vercel Support: support@vercel.com
- Anthropic Support: support@anthropic.com
- Cloudflare Support: (in dashboard)
- USPTO: (800) 786-9199

### Legal Resources
- US Copyright Office: (202) 707-3000
- USPTO Trademark: (800) 786-9199
- State Bar Association: _______________

---

## 💡 REMEMBER

### You Already Have Protection
- ✅ Copyright exists automatically
- ✅ Your code is protected
- ✅ Your prompt is protected
- ✅ Registration adds extra benefits

### Priority Order
1. **Free notices** (do immediately)
2. **Copyright registration** (before launch)
3. **Protective domains** (before launch)
4. **Trademark** (only if successful)

### Don't Panic
- Most people won't copy you
- Legal notices deter casual copying
- Registration enables enforcement
- Focus on making your app great

---

## ✅ FINAL PRE-LAUNCH CHECK

Before making your app public:

### Legal
- [ ] Copyright notices on all pages
- [ ] Terms of Service accessible
- [ ] Privacy Policy accessible
- [ ] LICENSE.txt in repository
- [ ] Contact info in all documents

### Technical
- [ ] API key secure (in environment variables)
- [ ] Prompt marked confidential
- [ ] Source code headers added
- [ ] README updated

### Registration
- [ ] Copyright applications filed
- [ ] Receipts saved
- [ ] Calendar reminders set for certificate arrival

### Monitoring
- [ ] Google Alerts set up
- [ ] Domain monitoring active
- [ ] Regular check schedule established

---

## 📚 REFERENCE DOCUMENTS

- **Full Guide:** COPYRIGHT-TRADEMARK-GUIDE.md
- **License:** LICENSE.txt
- **Terms:** legal/TERMS-OF-SERVICE.md
- **Privacy:** legal/PRIVACY-POLICY.md
- **Cease & Desist Template:** In COPYRIGHT-TRADEMARK-GUIDE.md

---

## 🎯 BOTTOM LINE

**Minimum to do before launch:**
1. Add copyright notices (1 hour, free)
2. Create/review legal documents (1 hour, free)
3. File copyright registrations ($130)

**That's it! You're protected!**

Everything else is optional and can wait until you see how the app performs.

---

**Checklist Version:** 1.0  
**Last Updated:** October 2025  
**Next Review:** After app launches
