import http, { IncomingMessage } from "http";
import https from "https";
import _url, { UrlWithStringQuery } from "url";
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

  const parsedUrl = parseUrl(proxyUrl);
  if (!parsedUrl) {
    res.statusCode = 400;
    res.end('Malformed URL');
    return;
  }

  try {
    const subres = await proxy(parsedUrl);
    subres.pipe(res);
  } catch (e: any) {
    console.error(e);
    res.statusCode = 500;
    res.end(e.message);
  }
}

function proxy(url: UrlWithStringQuery): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    if (url.protocol === null) {
      url.protocol = 'https:';
    }


    const options = {
      hostname: url.hostname,
      path: url.path,
      headers: { "User-Agent": "Corsless" },
    };


    const api = url.protocol === 'https:' ? https : http;

    api
      .get(options, res => {
        resolve(res);
      })
      .on("error", e => {
        reject(e);
      });
  });
}

function parseUrl(url: string): UrlWithStringQuery | null {
  const match = url.match(/^(?:(https?:)?\/\/)?(([^\/?]+?)(?::(\d{0,5})(?=[\/?]|$))?)([\/?][\S\s]*|$)/i);

  if (!match) {
    return null;
  }

  if (!match[1]) {
    if (/^https?:/i.test(url)) {
      // The pattern at top could mistakenly parse "http:///" as host="http:" and path=///.
      return null;
    }

    // Scheme is omitted.
    if (url.lastIndexOf('//', 0) === -1) {
      // "//" is omitted.
      url = '//' + url;
    }

    url = (match[4] === '443' ? 'https:' : 'http:') + url;
  }

  const parsed = _url.parse(url);
  if (!parsed.hostname) {
    // "http://:1/" and "http:/notenoughslashes" could end up here.
    return null;
  }

  return parsed;
}
