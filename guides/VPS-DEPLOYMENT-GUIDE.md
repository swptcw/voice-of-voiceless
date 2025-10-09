# VPS Hosting & Domain Setup Plan
## Voice of the Voiceless

---

## Domain Acquisition Strategy

### Recommended Domain Options

**Primary Choice:**
- `voice-of-voiceless.com` - Most descriptive, SEO-friendly
- `voiceofthevoiceless.com` - Cleaner, no hyphens
- `voice-of-voiceless.app` - Modern .app extension

**Alternative Options:**
- `voiceless.app` - Short and memorable
- `grantvoice.app` - Action-oriented
- `objectvoice.com` - Direct and clear
- `narrative-breath.com` - Literary reference from the app

**Domain Registrars (Recommended):**

1. **Namecheap** (namecheap.com)
   - Pros: Affordable, free WHOIS privacy, good support
   - Cost: ~$12-15/year for .com
   - Cost: ~$20-25/year for .app

2. **Cloudflare Registrar** (cloudflare.com)
   - Pros: At-cost pricing, built-in DNS, best security
   - Cost: ~$9-10/year for .com
   - Cost: ~$15-20/year for .app
   - Recommended for best value

3. **Google Domains → Squarespace Domains** (domains.squarespace.com)
   - Pros: Simple interface, reliable
   - Cost: ~$12/year for .com

---

## Domain Purchase Checklist

### Before Purchase
- [ ] Check domain availability on all registrars
- [ ] Compare prices including renewal costs
- [ ] Verify WHOIS privacy is included/available
- [ ] Check for any special requirements (.app requires HTTPS)

### Purchase Process
1. **Create account** with chosen registrar
2. **Search for domain** - try multiple options
3. **Add to cart** with these settings:
   - ✅ Auto-renewal ON (don't lose your domain)
   - ✅ WHOIS privacy/protection ENABLED
   - ✅ 1-2 year registration (multi-year can save money)
   - ❌ Decline upsells (hosting, email, etc.)

4. **Complete purchase** - use secure payment method
5. **Save confirmation** - store receipt and login credentials

### After Purchase
- [ ] Set up DNS (covered in VPS section below)
- [ ] Enable two-factor authentication on registrar account
- [ ] Set calendar reminder for renewal (even with auto-renewal)
- [ ] Configure email forwarding (optional: contact@voice-of-voiceless.com)

---

## VPS Hosting Selection

### Recommended VPS Providers

#### **Option 1: DigitalOcean** (digitalocean.com) ⭐ RECOMMENDED
**Why:** Best balance of price, performance, and ease of use

**Pricing:**
- Basic Droplet: $6/month (1GB RAM, 25GB SSD)
- Recommended: $12/month (2GB RAM, 50GB SSD) - Better for Node.js

**Pros:**
- Simple interface
- Excellent documentation
- One-click Node.js setup
- Built-in monitoring
- Free bandwidth allowance (1TB+)
- Snapshots for backups

**Cons:**
- Requires some technical knowledge
- No managed services at basic tier

---

#### **Option 2: Linode (Akamai)** (linode.com)
**Pricing:**
- Nanode: $5/month (1GB RAM, 25GB SSD)
- Standard: $12/month (2GB RAM, 50GB SSD)

**Pros:**
- Slightly cheaper than DigitalOcean
- Excellent performance
- Good documentation

**Cons:**
- Interface less intuitive than DO
- Smaller community

---

#### **Option 3: Vultr** (vultr.com)
**Pricing:**
- Basic: $6/month (1GB RAM, 25GB SSD)
- Standard: $12/month (2GB RAM, 50GB SSD)

**Pros:**
- Good global presence
- Competitive pricing
- Simple interface

**Cons:**
- Support not as strong as DO

---

### VPS Specifications Needed

**Minimum Requirements:**
- 1GB RAM
- 1 CPU Core
- 25GB SSD Storage
- Ubuntu 22.04 LTS

**Recommended for Production:**
- 2GB RAM (handles traffic spikes better)
- 2 CPU Cores
- 50GB SSD Storage
- Ubuntu 22.04 LTS

---

## VPS Setup Guide (Step-by-Step)

### Phase 1: Create & Secure VPS

#### Step 1: Create Droplet/VPS
1. Sign up for DigitalOcean (or chosen provider)
2. Create new Droplet:
   - **Image:** Ubuntu 22.04 LTS
   - **Plan:** Basic ($12/month recommended)
   - **Datacenter:** Closest to your target audience (US East for USA)
   - **Authentication:** SSH Key (more secure than password)
   - **Hostname:** voice-of-voiceless

3. Wait 1-2 minutes for creation
4. Note your IP address (e.g., 167.99.123.45)

#### Step 2: Initial Server Security
```bash
# SSH into your server (from your local terminal)
ssh root@YOUR_SERVER_IP

# Update system packages
apt update && apt upgrade -y

# Create new user (never use root for apps)
adduser voiceapp
usermod -aG sudo voiceapp

# Set up firewall
ufw allow OpenSSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable

# Exit and reconnect as new user
exit
ssh voiceapp@YOUR_SERVER_IP
```

#### Step 3: Install Required Software
```bash
# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x

# Install PM2 (process manager to keep app running)
sudo npm install -g pm2

# Install Nginx (web server/reverse proxy)
sudo apt install -y nginx

# Install Certbot (for free SSL certificates)
sudo apt install -y certbot python3-certbot-nginx
```

---

### Phase 2: Deploy Application

#### Step 1: Transfer Your App to VPS

**Option A: Using Git (Recommended)**
```bash
# On VPS: Create app directory
mkdir -p ~/apps
cd ~/apps

# Clone from GitHub (if you've uploaded it)
git clone https://github.com/YOUR_USERNAME/voice-of-voiceless.git
cd voice-of-voiceless

# Or create Git repo first from your local machine:
# (On your local machine)
cd C:\Users\swptc\Documents\voice-of-voiceless
git init
git add .
git commit -m "Initial commit"
# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/voice-of-voiceless.git
git push -u origin main
```

**Option B: Using SCP (Direct File Transfer)**
```bash
# From your local Windows machine (PowerShell)
# Navigate to your project folder
cd C:\Users\swptc\Documents\voice-of-voiceless

# Transfer files (replace YOUR_SERVER_IP)
scp -r * voiceapp@YOUR_SERVER_IP:~/apps/voice-of-voiceless/
```

#### Step 2: Build Production Version
```bash
# On VPS
cd ~/apps/voice-of-voiceless

# Install dependencies
npm install

# Build for production
npm run build

# This creates a 'dist' folder with optimized files
```

#### Step 3: Set Up Backend API Server

Create a simple Express server to handle API requests:

```bash
# On VPS: Create backend directory
mkdir -p ~/apps/voice-backend
cd ~/apps/voice-backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express cors dotenv @anthropic-ai/sdk
```

Create `server.js`:
```bash
nano server.js
```

Paste this code:
```javascript
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Rate limiting storage (in-memory, resets on restart)
const rateLimits = new Map();
const RATE_LIMIT = 5; // requests per day
const RATE_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting middleware
const rateLimit = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  
  if (!rateLimits.has(ip)) {
    rateLimits.set(ip, { count: 0, resetTime: now + RATE_WINDOW });
  }
  
  const userLimit = rateLimits.get(ip);
  
  // Reset if window expired
  if (now > userLimit.resetTime) {
    userLimit.count = 0;
    userLimit.resetTime = now + RATE_WINDOW;
  }
  
  if (userLimit.count >= RATE_LIMIT) {
    return res.status(429).json({ 
      error: 'Rate limit exceeded. Try again tomorrow.' 
    });
  }
  
  userLimit.count++;
  next();
};

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// API endpoint
app.post('/api/generate', rateLimit, async (req, res) => {
  try {
    const { object, context } = req.body;
    
    if (!object) {
      return res.status(400).json({ error: 'Object is required' });
    }
    
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

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        { role: 'user', content: prompt }
      ]
    });
    
    res.json({ narrative: message.content[0].text });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate narrative. Please try again.' 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Create `.env` file:
```bash
nano .env
```

Add your API key:
```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

Secure the .env file:
```bash
chmod 600 .env
```

#### Step 4: Start Backend with PM2
```bash
# Start the backend server
pm2 start server.js --name voice-backend

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
# Follow the command it outputs

# Check status
pm2 status
pm2 logs voice-backend
```

---

### Phase 3: Configure Nginx & Domain

#### Step 1: Point Domain to VPS

**On your domain registrar (Cloudflare/Namecheap):**

1. Go to DNS settings
2. Add these records:

```
Type: A
Name: @
Value: YOUR_VPS_IP_ADDRESS
TTL: Auto or 3600

Type: A
Name: www
Value: YOUR_VPS_IP_ADDRESS
TTL: Auto or 3600
```

3. Save changes (may take 1-24 hours to propagate)

#### Step 2: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/voice-of-voiceless
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name voice-of-voiceless.com www.voice-of-voiceless.com;

    # Serve frontend static files
    location / {
        root /home/voiceapp/apps/voice-of-voiceless/dist;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/voice-of-voiceless /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Step 3: Set Up SSL Certificate (HTTPS)

```bash
# Get free SSL certificate from Let's Encrypt
sudo certbot --nginx -d voice-of-voiceless.com -d www.voice-of-voiceless.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (recommended: YES)

# Test auto-renewal
sudo certbot renew --dry-run
```

---

### Phase 4: Update Frontend to Use Backend

Update the frontend to call your backend instead of direct API:

```bash
# On VPS
cd ~/apps/voice-of-voiceless/src
nano ObjectVoiceApp.tsx
```

Change the API call from:
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
    messages: [{ role: 'user', content: prompt }]
  })
});
```

To:
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
```

Remove all API key handling code, then rebuild:
```bash
cd ~/apps/voice-of-voiceless
npm run build
```

---

## Complete Setup Checklist

### Domain Setup
- [ ] Purchase domain from registrar
- [ ] Enable WHOIS privacy
- [ ] Set up DNS A records pointing to VPS IP
- [ ] Wait for DNS propagation (check with: `nslookup your-domain.com`)

### VPS Initial Setup
- [ ] Create VPS/Droplet
- [ ] SSH into server
- [ ] Create non-root user
- [ ] Set up firewall (UFW)
- [ ] Install Node.js, PM2, Nginx
- [ ] Install Certbot for SSL

### Application Deployment
- [ ] Transfer app files to VPS
- [ ] Install dependencies
- [ ] Build production version
- [ ] Create backend server
- [ ] Add API key to .env file
- [ ] Start backend with PM2
- [ ] Configure PM2 to start on boot

### Web Server Configuration
- [ ] Configure Nginx
- [ ] Test Nginx configuration
- [ ] Restart Nginx
- [ ] Obtain SSL certificate with Certbot
- [ ] Test HTTPS access

### Testing
- [ ] Visit http://your-domain.com (should redirect to HTTPS)
- [ ] Visit https://your-domain.com (should load app)
- [ ] Test generating a narrative
- [ ] Test rate limiting (try 6+ requests)
- [ ] Check PM2 logs: `pm2 logs`
- [ ] Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

---

## Ongoing Maintenance

### Daily (First Week)
```bash
# Check server status
pm2 status

# Check API usage/costs
# Visit console.anthropic.com

# Monitor server resources
htop  # or: top

# Check logs
pm2 logs voice-backend --lines 50
```

### Weekly
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Check disk space
df -h

# Check memory usage
free -h

# Restart app if needed
pm2 restart voice-backend
```

### Monthly
```bash
# Review Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Check SSL certificate expiry
sudo certbot certificates

# Review API costs
# Visit console.anthropic.com/settings/billing

# Create backup
sudo tar -czf ~/backup-$(date +%Y%m%d).tar.gz ~/apps/
```

---

## Backup Strategy

### Automated Backups with DigitalOcean
1. Enable weekly snapshots ($1.20/month for $12 Droplet)
2. Go to Droplet → Backups → Enable

### Manual Backups
```bash
# Create backup of application
cd ~
tar -czf backup-voice-$(date +%Y%m%d).tar.gz apps/

# Download to local machine
# (Run from your local PowerShell)
scp voiceapp@YOUR_SERVER_IP:~/backup-voice-*.tar.gz C:\Users\swptc\Documents\backups\
```

### Database Backup (if you add user accounts later)
```bash
# For future: if using PostgreSQL/MongoDB
# PostgreSQL example:
pg_dump voicedb > backup-db-$(date +%Y%m%d).sql
```

---

## Cost Summary

### One-Time Setup Costs
- Domain registration: $10-25/year
- SSL Certificate: $0 (Let's Encrypt is free)
- **Total One-Time: $10-25**

### Monthly Costs
- VPS Hosting: $12/month (recommended tier)
- Anthropic API: $180-300/month (estimated, 300 requests/day)
- Backups: $1.20/month (optional)
- **Total Monthly: ~$195-315**

### Annual Cost Estimate
- **Year 1: ~$2,350-3,800**
  - Includes domain renewal
  - Based on moderate traffic

### Cost Optimization Tips
1. Start with $6/month VPS, upgrade if needed
2. Implement strict rate limiting (3 requests/day instead of 5)
3. Add CAPTCHA after first request
4. Consider adding optional donations
5. Monitor usage weekly and adjust

---

## Troubleshooting Guide

### Domain Not Resolving
```bash
# Check DNS propagation
nslookup your-domain.com

# If still not working after 24 hours:
# 1. Verify DNS records in registrar
# 2. Try different DNS server: nslookup your-domain.com 8.8.8.8
# 3. Clear local DNS cache (Windows):
ipconfig /flushdns
```

### SSL Certificate Issues
```bash
# If Certbot fails:
sudo certbot certonly --standalone -d your-domain.com

# Check certificate
sudo certbot certificates

# Force renewal
sudo certbot renew --force-renewal
```

### App Not Loading
```bash
# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx

# Check if Nginx is listening
sudo netstat -tulpn | grep nginx
```

### Backend API Not Working
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs voice-backend

# Restart backend
pm2 restart voice-backend

# Check if backend is listening
sudo netstat -tulpn | grep 3001

# Test backend directly
curl http://localhost:3001/health
```

### High Memory Usage
```bash
# Check memory
free -h

# Check top processes
htop

# Restart backend to clear memory
pm2 restart voice-backend

# If still high, upgrade VPS tier
```

---

## Security Best Practices

### SSH Security
```bash
# Disable password authentication (use SSH keys only)
sudo nano /etc/ssh/sshd_config
# Set: PasswordAuthentication no
sudo systemctl restart sshd

# Change default SSH port (optional but recommended)
# In /etc/ssh/sshd_config, change Port 22 to Port 2222
# Update firewall: ufw allow 2222/tcp
```

### Application Security
```bash
# Keep .env file secure
chmod 600 ~/apps/voice-backend/.env

# Never commit .env to Git
echo ".env" >> .gitignore

# Use environment variables for secrets
# Never hardcode API keys in source code
```

### Server Security
```bash
# Install and configure fail2ban (prevents brute force)
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Keep system updated
sudo apt update && sudo apt upgrade -y

# Set up automatic security updates
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure -plow unattended-upgrades
```

---

## Monitoring & Analytics

### Server Monitoring
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs -y

# Check resource usage
htop  # Interactive process viewer
df -h  # Disk space
free -h  # Memory usage
```

### Application Monitoring
```bash
# PM2 monitoring
pm2 monit  # Real-time monitoring

# Set up PM2 web interface (optional)
pm2 web
# Access at: http://YOUR_SERVER_IP:9615
```

### Analytics Options
1. **Google Analytics** - Add to index.html
2. **Plausible** - Privacy-friendly analytics
3. **Custom logging** - Track API usage in backend

---

## Scaling Strategy (Future)

### When Traffic Grows

**Vertical Scaling (Easier)**
- Upgrade to larger VPS tier
- DigitalOcean makes this seamless with snapshots

**Horizontal Scaling (More Complex)**
- Add load balancer
- Multiple VPS instances
- Shared database
- CDN for static assets

### Cost Optimization at Scale
- Negotiate API pricing with Anthropic (volume discounts)
- Implement caching for common requests
- Add Redis for rate limiting (more efficient)
- Consider dedicated server vs VPS

---

## Emergency Contacts & Resources

### Support Channels
- **DigitalOcean Support:** community.digitalocean.com
- **Nginx Documentation:** nginx.org/en/docs
- **Certbot Support:** certbot.eff.org
- **Anthropic Support:** support.anthropic.com

### Useful Commands Quick Reference
```bash
# Server management
sudo reboot  # Restart server
sudo shutdown -h now  # Shutdown server

# PM2 management
pm2 list  # List all processes
pm2 restart all  # Restart all processes
pm2 stop all  # Stop all processes
pm2 delete all  # Remove all processes

# Nginx management
sudo systemctl status nginx  # Check status
sudo systemctl restart nginx  # Restart
sudo nginx -t  # Test configuration

# Logs
pm2 logs --lines 100  # Last 100 lines
sudo tail -f /var/log/nginx/access.log  # Follow Nginx access log
sudo tail -f /var/log/nginx/error.log  # Follow Nginx error log
```

---

## Next Steps

### Immediate Actions (Today)
1. [ ] Research domain availability
2. [ ] Decide on VPS provider
3. [ ] Get Anthropic API key if not already done
4. [ ] Review this document thoroughly

### Before Book Launch (4-8 weeks)
1. [ ] Purchase domain
2. [ ] Set up VPS
3. [ ] Deploy application
4. [ ] Test thoroughly
5. [ ] Create monitoring routine

### Launch Day
1. [ ] Point domain to VPS (if not done already)
2. [ ] Final testing
3. [ ] Monitor closely for first 24 hours
4. [ ] Be ready to adjust rate limits

---

**Document Version:** 1.0
**Last Updated:** October 2025
**Estimated Setup Time:** 4-6 hours (first time)
**Difficulty Level:** Intermediate (requires some command-line comfort)

**Note:** If any step seems overwhelming, consider hiring a DevOps consultant for initial setup (~$100-200). Once configured, maintenance is straightforward.
