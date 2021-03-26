import { VercelRequest, VercelResponse } from '@vercel/node';
import path from "path";
import fs from "fs";
import util from "util";

const CACHE_BROWSER = 60 * 60 * 24 * 2;
const CACHE_CDN = 60 * 60 * 24 * 7;

const readFile = util.promisify(fs.readFile);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url);

  if (req.query.emoji) {
    generateImage(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Invalid emoji given</p>`);
  }
}

async function generateImage(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const emoji: string = Array.isArray(req.query.emoji) ? req.query.emoji.join() : req.query.emoji;
    const file = await getImage(emoji);

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, public`);
    res.write(file);
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}

export async function getImage(emoji: string): Promise<Buffer> {
  return await readFile(path.resolve('node_modules', `@obr/macmoji/dist/${emoji.toUpperCase()}.png`));
}
