# Voice of the Voiceless

A literary web application that gives voice to inanimate objects through AI-powered anthropomorphic narration, inspired by the book "Death of a Cigarette."

🌐 **Live Demo:** [Coming Soon]

---

## ✨ About

Voice of the Voiceless allows you to grant consciousness and narrative breath to any object—from a pocket watch to a lighthouse, from a train ticket to a wedding ring. Enter an object and its context, and witness it find its voice through contemplative, literary prose.

Inspired by the anthropomorphic tradition of "Death of a Cigarette," where a single Lucky Strike cigarette narrates its journey from Virginia tobacco fields through D-Day at Omaha Beach, this application brings that same depth of character to any object you choose.

---

## 🎯 Features

- **No API Key Required** - Users can generate narratives instantly
- **Literary Quality** - Contemplative, philosophical prose in the object's voice
- **Beautiful Interface** - Literary aesthetic with book-inspired design
- **Mobile Responsive** - Works seamlessly on all devices
- **Example Prompts** - Inspired by objects from the book
- **Fast & Global** - Powered by Vercel's global CDN

---

## 🚀 Quick Start (Local Development)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/voice-of-voiceless.git
cd voice-of-voiceless

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:5173 to view the app.

---

## 📦 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Inline styles (no external CSS framework)
- **Icons:** Lucide React
- **API:** Anthropic Claude (Sonnet 4.5)
- **Deployment:** Vercel (Serverless)
- **Domain:** Cloudflare DNS

---

## 🌍 Deployment

This app is designed for serverless deployment on Vercel with a custom domain.

### Quick Deployment (45 minutes):

1. **Purchase Domain**
   - Recommended: Cloudflare (~$10/year)
   - See: `QUICK-START.md`

2. **Deploy to Vercel**
   - Connect GitHub repository
   - Add `ANTHROPIC_API_KEY` environment variable
   - Deploy automatically

3. **Connect Domain**
   - Configure DNS in Cloudflare
   - Point to Vercel

**📚 Complete Guide:** See [QUICK-START.md](QUICK-START.md) for step-by-step instructions

---

## 📖 Documentation

### Getting Started:
- **[QUICK-START.md](QUICK-START.md)** - Deploy in 45 minutes (START HERE) ⭐
- **[SERVERLESS-DEPLOYMENT.md](SERVERLESS-DEPLOYMENT.md)** - Complete deployment guide
- **[DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md)** - Overview of all documentation

### Strategic Planning:
- **[DEPLOYMENT-PLAN.md](DEPLOYMENT-PLAN.md)** - Timeline, costs, launch strategy
- **[EXECUTIVE-SUMMARY.md](EXECUTIVE-SUMMARY.md)** - Decision summary & checklist

### Alternative Approach:
- **[VPS-DEPLOYMENT-GUIDE.md](VPS-DEPLOYMENT-GUIDE.md)** - Self-hosted option (not recommended)

---

## 💰 Cost Structure

### Setup (One-Time):
- Domain: ~$10/year
- SSL Certificate: Free (Let's Encrypt via Vercel)

### Monthly Operating:
- Hosting: $0 (Vercel free tier)
- API (Anthropic): $180-300 (variable, based on usage)

**Total Monthly:** $180-300

---

## 🔐 Security

- ✅ API keys stored securely in environment variables
- ✅ HTTPS/SSL automatically configured
- ✅ CORS properly configured
- ✅ No sensitive data exposed to client
- ✅ Rate limiting available (optional)

---

## 🎨 Customization

### Adding Examples

Edit `src/ObjectVoiceApp.tsx`:

```typescript
const examples = [
  { obj: 'your object', ctx: 'context here' },
  // Add more...
];
```

### Changing Prompt

Edit `api/generate.js` to modify the narrative style and instructions.

### Styling

All styles are inline in the React component. Modify colors, fonts, and layouts directly in `ObjectVoiceApp.tsx`.

---

## 🧪 Testing

### Local Testing:
```bash
npm run dev
# Test at http://localhost:5173
```

### Production Testing:
```bash
npm run build
npm run preview
# Test production build locally
```

---

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

This is a personal project tied to the book "Death of a Cigarette." While it's not accepting contributions, feel free to fork and adapt for your own projects!

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- Inspired by "Death of a Cigarette" by Timothy Webber
- Powered by Anthropic's Claude AI
- Icons by Lucide React
- Hosted on Vercel

---

## 📬 Contact

For questions about the book: [Your contact info]

For technical issues: See documentation in the project

---

## 🗺️ Roadmap

### Phase 1 (Pre-Launch) ✅
- [x] Build core application
- [x] Create serverless API backend
- [x] Write comprehensive documentation
- [x] Set up deployment pipeline

### Phase 2 (Launch)
- [ ] Purchase custom domain
- [ ] Deploy to production
- [ ] Beta testing with readers
- [ ] Coordinate with book launch

### Phase 3 (Post-Launch)
- [ ] Gather user feedback
- [ ] Add narrative sharing features
- [ ] Create gallery of featured narratives
- [ ] Consider premium features

### Future Ideas
- Voice narration of generated text
- Save/bookmark favorite narratives
- Community voting on best narratives
- Multi-language support
- Mobile app version

---

## 📊 Project Structure

```
voice-of-voiceless/
├── api/
│   └── generate.js          # Serverless API function
├── src/
│   ├── ObjectVoiceApp.tsx   # Main React component
│   └── main.tsx             # App entry point
├── public/                  # Static assets
├── docs/                    # Documentation
│   ├── QUICK-START.md
│   ├── SERVERLESS-DEPLOYMENT.md
│   ├── DEPLOYMENT-PLAN.md
│   └── ...
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── vercel.json              # Vercel deployment config
└── README.md                # This file
```

---

## 🎭 About "Death of a Cigarette"

"Death of a Cigarette" is a novel that tells the story of a single Lucky Strike cigarette—nicknamed Chance—carried by a soldier from Virginia tobacco fields through D-Day at Omaha Beach and beyond. The cigarette remains unlit throughout the war, becoming a symbol of luck, memory, and the objects we carry through life's battles.

This application extends that narrative tradition, allowing anyone to explore what silent objects might say if given voice.

---

## 🚀 Ready to Deploy?

**Everything is prepared and ready to go!**

1. Read [QUICK-START.md](QUICK-START.md)
2. Follow the 45-minute deployment guide
3. Go live with your custom domain!

**Questions?** Check the [DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md)

---

**Built with ❤️ for readers of "Death of a Cigarette"**

*"Sometimes the bravest act is simply to bear witness"*
