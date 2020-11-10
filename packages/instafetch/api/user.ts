import { NowRequest, NowResponse } from '@vercel/node';
import Nanogram from "nanogram.js";
// @ts-ignore
import { XMLHttpRequest } from "xmlhttprequest";

// polyfill
if (!globalThis.XMLHttpRequest) {
  globalThis.XMLHttpRequest = XMLHttpRequest;
}

const CACHE_BROWSER = 60 * 60 * 24 * 1; // 2 day
const CACHE_CDN = 60 * 60 * 24 * 7; // 7 days

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
      const nanogram = new Nanogram();
      // @ts-ignore
      nanogram.INSTAGRAM_HOSTNAME = 'https://instaproxy.felix.workers.dev/';

      const response = await nanogram.getMediaByUsername(<string>req.query._user);
      const output: any = {
        ...response,
        photos: response.profile?.edge_owner_to_timeline_media.edges
          .map(edge => ({
            permalink: `https://www.instagram.com/p/${edge.node.shortcode}`,
            url: edge.node.display_url,
            preview: edge.node.thumbnail_src
          })) || []
      };

      if (response.ok) {
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, public`);
      }

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
