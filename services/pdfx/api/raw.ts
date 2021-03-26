import { VercelRequest, VercelResponse } from '@vercel/node';
import { getPdf } from "./_lib/chrome";
import { parsePdfOptions } from "./_lib/request";
import * as errors from "./_lib/errors";
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

  if (req.query.raw) {
    fromRaw(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(errors.USAGE);
  }
}

async function fromRaw(req: VercelRequest, res: VercelResponse) {
  try {
    const raw: string = Array.isArray(req.query.raw) ? req.query.raw.join() : req.query.raw;
    const file = await getPdf({ raw }, parsePdfOptions(req.query));
    res.statusCode = 200;
    res.setHeader("Content-Type", `application/pdf`);
    res.end(file, 'binary');
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}
