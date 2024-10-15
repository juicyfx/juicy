import { VercelRequest, VercelResponse } from '@vercel/node';
import { IncomingMessage } from "http";
import https from "https";

const CACHE_BROWSER = 60 * 60 * 24 * 10; // 10 day
const CACHE_CDN = 60 * 60 * 24 * 5; // 5 days
const CACHE_SWR = 60 * 60 * 24 * 2; // 2 days
const INSTAHOST_URL = process.env.INSTAHOST_URL || 'http://localhost:8000';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url);

  // Apply optimistic CORS
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", '*');
  res.setHeader("Access-Control-Allow-Headers", '*');

  // OPTIONS request
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return
  }

  if (req.query._user) {
    try {
      const result = await fetch(`${INSTAHOST_URL}/photos.php?_user=${<string>req.query._user}`);

      if (!result) {
        throw `No data from instagram`;
      }

      const output = {
        photos: result.map((row: any) => ({
          permalink: row.link,
          url: row.displaySrc,
          preview: row.thumbnailSrc,
          square: row.thumbnails.find(() => true).src
        }))
      };

      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, stale-while-revalidate=${CACHE_SWR}, public`);
      res.send(JSON.stringify(output));
    } catch (e: any) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end(JSON.stringify({ message: e.message, code: e.code }));
    }
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end('Invalid usage, take a look at readme');
  }
}

async function fetch(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res: IncomingMessage) => {
      const data: any = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        resolve(JSON.parse(Buffer.concat(data).toString()));
      });
    });

    req.on('error', reject);

    req.end();
  });
}
