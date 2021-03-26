import { VercelRequest, VercelResponse } from '@vercel/node';
import { getImage } from "../_lib/chrome";
import { createTemplate, createTemplateChristmas } from '../_lib/templates/github';
import { fetchRepository } from '../_lib/github';
import { trimEmoji, dayjs } from '../_lib/utils';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url);

  if (req.query.r) {
    generateImage(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?r=juicyfx/juicy</p>`);
  }
}

async function generateImage(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const r = <string>req.query.r;
    const repository = await fetchRepository(r);

    const title = repository.full_name;
    const description = trimEmoji(repository.description);
    const avatar = repository.owner.avatar_url;

    const today = new Date();
    const christmas = dayjs(today).isBetween(`${today.getFullYear()}-12-20`, `${today.getFullYear() + 1}-01-05`);

    const template = christmas ? createTemplateChristmas(title, description, avatar) : createTemplate(title, description, avatar);
    const file = await getImage({ content: template });

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.setHeader('Cache-Control', `max-age=${60 * 60}, s-maxage=${60 * 60 * 24}, stale-while-revalidate, public`);
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}
