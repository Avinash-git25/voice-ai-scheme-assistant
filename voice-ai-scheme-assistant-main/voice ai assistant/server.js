// Zero-Dependency Development Server & Multilingual TTS Streamer
// Supports native Marathi (mr) and Hindi (hi) audio generation for VoiceScheme AI

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg'
};

function splitTextIntoChunks(text, maxLen = 170) {
  if (!text) return [];
  // Split on sentence terminators, punctuation, and clause pauses
  const sentences = text.split(/([।॥\n.!?]+|\s{2,})/g).filter(Boolean);
  const chunks = [];
  let current = '';

  for (const part of sentences) {
    if ((current + part).length <= maxLen) {
      current += part;
    } else {
      if (current.trim()) chunks.push(current.trim());
      if (part.length > maxLen) {
        // Break long clause by comma or word spaces
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

const AWS_LAMBDA_URL = process.env.AWS_LAMBDA_URL || 'https://3hepd6fwqnejouzr4jxfwxk2cu0shvee.lambda-url.us-east-1.on.aws';

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Handle AWS Cloud Health / Status Endpoint
  if (pathname === '/api/aws-status') {
    try {
      const awsRes = await fetch(`${AWS_LAMBDA_URL}/health`);
      const awsData = await awsRes.json();
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ status: 'connected', aws: awsData, lambdaUrl: AWS_LAMBDA_URL }));
      return;
    } catch (e) {
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ status: 'offline', error: e.message, lambdaUrl: AWS_LAMBDA_URL }));
      return;
    }
  }

  // Handle AWS Bedrock Slot Extraction Proxy
  if (pathname === '/api/extract-slots' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const awsRes = await fetch(`${AWS_LAMBDA_URL}/extract-slots`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body
        });
        const awsData = await awsRes.json();
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify(awsData));
      } catch (err) {
        console.warn('AWS extract-slots proxy error:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Handle Text-To-Speech Endpoint (AWS Polly + Native Vernacular Fallback)
  if (pathname === '/api/tts') {
    const text = parsedUrl.searchParams.get('text');
    const lang = parsedUrl.searchParams.get('lang') || 'mr';

    if (!text || text.trim() === '') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing text parameter' }));
      return;
    }

    // Try Amazon Polly for Hindi/English or when requested
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
          res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': audioBuf.length,
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*'
          });
          res.end(audioBuf);
          return;
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
      res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': combinedAudio.length,
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(combinedAudio);
      return;
    } catch (err) {
      console.warn('TTS streaming error:', err.message);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // Handle Static Files
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`VoiceScheme AI Server running at http://localhost:${PORT}`);
  console.log(`Multilingual TTS Endpoint active at http://localhost:${PORT}/api/tts`);
});
