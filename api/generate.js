/**
 * Voice of the Voiceless - Serverless API
 * Copyright (c) 2025 Timothy Webber
 * All Rights Reserved
 * 
 * Inspired by "Death of a Cigarette: A Story of Survival, Memory, and Legacy"
 * Published September 13, 2025
 * Copyright Registration: 1-15005430801
 * 
 * CONFIDENTIAL AND PROPRIETARY
 * This prompt engineering methodology is a trade secret and proprietary to Timothy Webber.
 * The specific instructions, structure, and style directives below are protected by
 * copyright and trade secret law.
 * 
 * Unauthorized use, copying, modification, or disclosure is strictly prohibited.
 */

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

  // Get request data
  const { object, context } = req.body;
  
  if (!object || !object.trim()) {
    return res.status(400).json({ error: 'Object is required' });
  }

  // Build the proprietary prompt (CONFIDENTIAL)
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
