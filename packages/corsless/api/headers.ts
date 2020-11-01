import http from "http";
import https from "https";
import _url from "url";
import { NowRequest, NowResponse } from '@vercel/node';

export default async function handler(req: NowRequest, res: NowResponse) {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", '*');
  res.setHeader("Access-Control-Allow-Headers", '*');

  // Validation
  if (!req.query.url) {
    res.statusCode = 400;
    res.end('Invalid URL');
    return;
  }

  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    try {
      const subres = await httpGet(<string>req.query.url);
      res.end(JSON.stringify(subres));
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.end(e.message);
    }
  }
}

function httpGet(url: string): Promise<{ statusCode?: number, headers: { [key: string]: string | string[] | undefined } }> {
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
        resolve({
          statusCode: res.statusCode,
          headers: res.headers
        });
      })
      .on("error", e => {
        console.error(e);
        reject(e);
      });
  });
}
