/**
 * Voice of the Voiceless - Serverless API
 * Copyright (c) 2025 Timothy Webber
 * All Rights Reserved
 */

// Simple in-memory rate limiting
// Note: Resets on each deployment, but good enough for soft launch
const usageTracker = new Map();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  
  for (const [ip, data] of usageTracker.entries()) {
    if (now - data.firstUse > oneDay) {
      usageTracker.delete(ip);
    }
  }
}, 60 * 60 * 1000);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get IP address
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || 
             req.headers['x-real-ip'] || 
             'unknown';

  // Check usage
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const freeLimit = 3;

  let usage = usageTracker.get(ip);
  
  if (!usage) {
    usage = { count: 0, firstUse: now };
    usageTracker.set(ip, usage);
  }

  // Reset if more than 24 hours
  if (now - usage.firstUse > oneDay) {
    usage = { count: 0, firstUse: now };
    usageTracker.set(ip, usage);
  }

  // Check if limit reached
  if (usage.count >= freeLimit) {
    return res.status(429).json({ 
      error: 'free_limit_reached',
      message: 'You\'ve reached your 3 free narratives for today.',
      remaining: 0,
      resetIn: Math.ceil((oneDay - (now - usage.firstUse)) / 1000 / 60 / 60), // hours
      upgradeUrl: 'mailto:tim@swptcw.com?subject=Voice%20of%20the%20Voiceless%20Access'
    });
  }

  const { object, context } = req.body;
  
  if (!object || !object.trim()) {
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

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API Error:', errorData);
      return res.status(500).json({ 
        error: 'Unable to generate narrative. Please try again.',
        details: errorData.error?.message || 'API request failed'
      });
    }

    const data = await response.json();
    const narrative = data.content[0].text;

    // Increment usage counter
    usage.count++;
    usageTracker.set(ip, usage);

    // Return success with usage info
    return res.status(200).json({ 
      narrative,
      object,
      context: context || null,
      usage: {
        used: usage.count,
        remaining: freeLimit - usage.count,
        limit: freeLimit
      }
    });

  } catch (error) {
    console.error('Error generating narrative:', error);
    return res.status(500).json({ 
      error: 'Unable to generate narrative. Please try again.',
      message: error.message 
    });
  }
}
