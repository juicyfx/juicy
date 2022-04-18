import http, { IncomingMessage } from "http";
import https from "https";
import _url from "url";
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", '*');
  res.setHeader("Access-Control-Allow-Headers", '*');

  const proxyUrl = req.url?.replace("/proxy/", "");
  if (!proxyUrl) {
    res.statusCode = 400;
    res.end('Invalid URL');
    return;
  }

  try {
    const subres = await proxy(proxyUrl);
    subres.pipe(res);
  } catch (e: any) {
    console.error(e);
    res.statusCode = 500;
    res.end(e.message);
  }
}

function proxy(url: string): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const parsed = _url.parse(url);

    const options = {
      hostname: parsed.hostname,
      path: parsed.path,
      headers: { "User-Agent": "Corsless" },
    };

    const api = parsed.protocol === 'https:' ? https : http;

    api
      .get(options, res => {
        resolve(res);
      })
      .on("error", e => {
        console.error(e);
        reject(e);
      });
  });
}
