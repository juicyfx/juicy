import { NowRequest, NowResponse } from '@now/node';
import path from "path";
import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  if (req.query.emoji) {
    generateImage(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Invalid emoji given</p>`);
  }
}

async function generateImage(req: NowRequest, res: NowResponse): Promise<void> {
  try {
    const emoji: string = Array.isArray(req.query.emoji) ? req.query.emoji.join() : req.query.emoji;
    const file = await getImage(emoji);

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.setHeader('Cache-Control', `max-age=${60 * 60}, s-maxage=${60 * 60}, stale-while-revalidate, public`);
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
  return await readFile(path.resolve('node_modules', `@obr/macmoji/dist/${emoji}.png`));
}
