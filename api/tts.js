const AWS_LAMBDA_URL = process.env.AWS_LAMBDA_URL || 'https://3hepd6fwqnejouzr4jxfwxk2cu0shvee.lambda-url.us-east-1.on.aws';

function splitTextIntoChunks(text, maxLen = 170) {
  if (!text) return [];
  const sentences = text.split(/([।॥\n.!?]+|\s{2,})/g).filter(Boolean);
  const chunks = [];
  let current = '';

  for (const part of sentences) {
    if ((current + part).length <= maxLen) {
      current += part;
    } else {
      if (current.trim()) chunks.push(current.trim());
      if (part.length > maxLen) {
        const words = part.split(/\s+/);
        let sub = '';
        for (const w of words) {
          if ((sub + ' ' + w).length <= maxLen) {
            sub = sub ? sub + ' ' + w : w;
          } else {
            if (sub.trim()) chunks.push(sub.trim());
            sub = w;
          }
        }
        current = sub;
      } else {
        current = part;
      }
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.length > 0 ? chunks : [text.slice(0, maxLen)];
}

async function fetchGoogleTTSChunk(chunk, lang) {
  const targetLang = (lang === 'mr' || lang === 'marathi') ? 'mr' : (lang === 'hi' || lang === 'hindi') ? 'hi' : 'en';
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${targetLang}&client=tw-ob&q=${encodeURIComponent(chunk)}`;
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'audio/mpeg, audio/*; q=0.9, */*; q=0.5'
    }
  });

  if (!response.ok) {
    throw new Error(`TTS service returned HTTP ${response.status}`);
  }

  const arrayBuf = await response.arrayBuffer();
  return Buffer.from(arrayBuf);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle query parameter whether accessed via req.query or req.url
  let text = req.query?.text;
  let lang = req.query?.lang || 'mr';

  if (!text && req.url) {
    try {
      const parsedUrl = new URL(req.url, 'http://localhost');
      text = parsedUrl.searchParams.get('text');
      lang = parsedUrl.searchParams.get('lang') || lang;
    } catch (_) {}
  }

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Missing text parameter' });
  }

  // Try Amazon Polly for Hindi/English
  if (lang === 'hi' || lang === 'en') {
    try {
      const pollyRes = await fetch(`${AWS_LAMBDA_URL}/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang })
      });
      const pollyData = await pollyRes.json();
      if (pollyData && pollyData.audioBase64) {
        const audioBuf = Buffer.from(pollyData.audioBase64, 'base64');
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Length', audioBuf.length);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.status(200).send(audioBuf);
      }
    } catch (pollyErr) {
      console.warn('Polly error, falling back to local TTS engine:', pollyErr.message);
    }
  }

  try {
    const chunks = splitTextIntoChunks(text.trim());
    const audioBuffers = [];

    for (const chunk of chunks) {
      if (!chunk.trim()) continue;
      const buf = await fetchGoogleTTSChunk(chunk.trim(), lang);
      audioBuffers.push(buf);
    }

    if (audioBuffers.length === 0) {
      throw new Error('No audio produced');
    }

    const combinedAudio = Buffer.concat(audioBuffers);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', combinedAudio.length);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.status(200).send(combinedAudio);
  } catch (err) {
    console.warn('TTS streaming error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
