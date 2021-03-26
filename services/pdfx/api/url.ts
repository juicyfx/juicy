import { VercelRequest, VercelResponse } from '@vercel/node';
import { getPdf } from "./_lib/chrome";
import * as errors from "./_lib/errors";
import { parsePdfOptions } from "./_lib/request";
import { isValidUrl } from "./_lib/validator";
import { installFonts } from './_lib/fonts';
import { applyCors } from './_lib/http';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url);

  // Setup HOME dir, if it's not
  if (process.env.HOME === undefined) {
    process.env.HOME = '/tmp';
  }

  // Apply HTTP Men-in-the-middle
  applyCors(req, res);

  // Install deps
  await installFonts();

  if (req.query.url) {
    fromUrl(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(errors.USAGE);
  }
}

async function fromUrl(req: VercelRequest, res: VercelResponse) {
  try {
    const url: string = Array.isArray(req.query.url) ? req.query.url.join() : req.query.url;

    const options = {};

    if (typeof req.body === 'object') {
      Object.assign(options, req.body);
    }

    if (!isValidUrl(url)) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`
      );
    } else {
      const file = await getPdf(
        { url },
        { ...parsePdfOptions({ ...req.query, ...options }) }
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", `application/pdf`);
      res.end(file, 'binary');
    }
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}
