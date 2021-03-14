import { NowRequest, NowResponse } from '@vercel/node';
import { IncomingMessage } from "http";
import https from "https";

const CACHE_BROWSER = 60 * 60 * 24 * 5; // 5 day
const CACHE_CDN = 60 * 60 * 24 * 5; // 5 days
const HOST = process.env.INSTAFETCH_HOST || 'http://localhost:8000';

export default async function handler(req: NowRequest, res: NowResponse) {
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
      const result = await fetch(`${HOST}/?_user=${<string>req.query._user}`);

      if (!result) {
        throw `No data from instagram`;
      }

      const output = {
        photos: result.map((row: any) => ({
          permalink: row.link,
          url: row.imageHighResolutionUrl,
          preview: row.imageThumbnailUrl,
          square: row.squareImages.find(() => true)
        }))
      };

      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, public`);
      res.send(JSON.stringify(output));
    } catch (e) {
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
