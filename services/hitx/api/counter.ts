import { NowRequest, NowResponse } from '@vercel/node';
import * as db from "./_lib/db";
import * as http from "./_lib/http";

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  const title = <string>req.query.t || 'hits';
  const color = <string>req.query.c || 'blue';

  if (req.query.id) {
    try {
      const hits = await db.getHits(<string>req.query.id);
      const badge = `https://badgen.net/badge/${title}/${hits.data.hits}/${color}`;
      const badgeRes = await http.request({ url: badge });

      res.statusCode = 200;
      res.setHeader("Content-Type", "image/svg+xml;charset=utf8");
      res.setHeader("Cache-Control", "max-age=1, s-maxage=1, stale-while-revalidate");
      res.end(badgeRes.data);
    } catch (e) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

      console.error(e);
      console.error(e.message);
    }
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?id=key</p>`);
  }
}
