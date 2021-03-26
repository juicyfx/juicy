import { VercelRequest, VercelResponse } from '@vercel/node';
import { parse } from 'url';
import convert from 'xml-js';
import fetch from 'node-fetch';

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  const { query = {} } = parse(req.url!, true);

  if (!query.ico) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Missing ?ico parameter');
    return;
  }

  try {
    const response = await fetch(`https://wwwinfo.mfcr.cz/cgi-bin/ares/darv_std.cgi?ico=${query.ico}`);
    const text = await response.text();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(convert.xml2json(text, { compact: true, spaces: 4 }));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(e.message);
  }
};
