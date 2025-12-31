import { kv } from '@vercel/kv';

function generateShortId() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Generate unique short ID
    let shortId;
    let attempts = 0;
    
    do {
      shortId = generateShortId();
      const existing = await kv.get(`short:${shortId}`);
      if (!existing) break;
      attempts++;
    } while (attempts < 10);

    if (attempts >= 10) {
      return res.status(500).json({ error: 'Could not generate unique ID' });
    }

    // Store in KV with 7 days expiry
    await kv.setex(`short:${shortId}`, 60 * 60 * 24 * 7, url);

    const shortUrl = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}/s/${shortId}`;

    res.status(200).json({
      shortUrl,
      shortId,
      originalUrl: url
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
