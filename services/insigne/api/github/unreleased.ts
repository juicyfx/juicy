import { VercelRequest, VercelResponse } from '@vercel/node';
import { fetchUnreleased } from '../_lib/githubber';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url);

  if (!req.query.r) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?r=juicyfx/juicy</p>`);
    return;
  }

  try {
    const badgen = await generateBadgen(req);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(badgen))
  } catch (e: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}

async function generateBadgen(req: VercelRequest): Promise<Badgen> {
  const r = <string>req.query.r;

  try {
    const unreleased = await fetchUnreleased(r);

    return {
      'subject': 'unreleased',
      'status': String(unreleased.unreleased),
      'color': 'blue',
    };
  } catch (e: unknown) {
    return {
      'subject': 'unreleased',
      'status': 'N/A',
      'color': 'red',
    }
  }

}
