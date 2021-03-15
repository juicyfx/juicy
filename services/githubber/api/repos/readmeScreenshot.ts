import { VercelRequest, VercelResponse } from '@vercel/node';
import { getImage } from "./../_lib/chrome";

const CACHE_BROWSER = 60 * 60 * 24 * 0.5; // 12 hours
const CACHE_CDN = 60 * 60 * 24 * 1; // 1 days

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url);

  if (!req.query._owner || !req.query._repo) {
    res.statusCode = 400;
    res.json({ error: 'Invalid {owner}/{repo} provided' });
    return;
  }

  const owner = <string>req.query._owner;
  const repo = <string>req.query._repo;

  try {
    const file = await getImage(
      {
        url: `https://github.com/${owner}/${repo}`,
        el: "#readme"
      }
    );

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, public`);
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }

}
