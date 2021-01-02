import { NowRequest, NowResponse } from '@vercel/node';
import { fetchPackage } from '../_lib/packagist';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  // Optimistic CORS
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", '*');
  res.setHeader("Access-Control-Allow-Headers", '*');

  // OPTIONS request
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
  }

  if (!req.query.vendor || !req.query.package) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Usage /stats/[org]/[package]</p>`);
  }

  try {
    const data = await fetchPackage(<string>req.query.vendor, <string>req.query.package);
    const stats = data.package.downloads;

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader('Cache-Control', `max-age=${60 * 60}, s-maxage=${60 * 60 * 2}, stale-while-revalidate, public`);
    res.end(JSON.stringify(stats))
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}

