import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    if (!id) {
      return res.redirect('/');
    }

    const originalUrl = await kv.get(`short:${id}`);
    
    if (!originalUrl) {
      return res.redirect('/');
    }

    // 301 리다이렉트
    res.writeHead(301, { Location: originalUrl });
    res.end();
  } catch (error) {
    console.error('Redirect error:', error);
    res.redirect('/');
  }
}