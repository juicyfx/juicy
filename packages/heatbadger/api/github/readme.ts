import { NowRequest, NowResponse } from '@vercel/node';
import { getImage } from "../_lib/chrome";
import { createTemplate } from '../_lib/templates/github';
import { fetchRepository } from '../_lib/github';
import { trimEmoji } from '../_lib/utils';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  if (req.query.r) {
    generateImage(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?r=juicyfx/juicy</p>`);
  }
}

async function generateImage(req: NowRequest, res: NowResponse): Promise<void> {
  try {
    const r = <string>req.query.r;
    const repository = await fetchRepository(r);

    const title = repository.full_name;
    const description = trimEmoji(repository.description);
    const avatar = repository.owner.avatar_url;

    const template = createTemplate(title, description, avatar);
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
