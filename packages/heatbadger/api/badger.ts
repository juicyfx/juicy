import { NowRequest, NowResponse } from '@vercel/node';
import { getImage } from "./_lib/chrome";
import { createTemplate } from './_lib/templates/github';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  if (req.query.title) {
    generateImage(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?title=<string></p>`);
  }
}

async function generateImage(req: NowRequest, res: NowResponse): Promise<void> {
  try {
    const title: string = Array.isArray(req.query.title) ? req.query.title.join() : req.query.title;
    const description: string = Array.isArray(req.query.description) ? req.query.description.join() : req.query.description;
    const template = createTemplate(title, description, '');
    const file = await getImage(template);

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.setHeader('Cache-Control', `max-age=${60*60}, s-maxage=${60*60}, stale-while-revalidate, public`);
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}
