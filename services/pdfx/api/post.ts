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

  if (req.method === "POST") {
    fromPost(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(errors.USAGE);
  }
}

async function fromPost(req: VercelRequest, res: VercelResponse) {
  try {
    let data: string;
    let rest: object = {};
    const bodyType = typeof req.body;

    if (!req.body) {
      throw Error(`No request body given. Body type ${bodyType}.`);
    }

    if (bodyType === 'string') {
      data = req.body;
    } else if (bodyType === 'object') {
      ({ data, ...rest } = req.body);
    } else if (Buffer.isBuffer(req.body)) {
      data = Buffer.toString();
    } else {
      throw Error(`Unsupported request body of type ${typeof req.body}`);
    }

    const file = await getPdf(
      { raw: data },
      { ...parsePdfOptions({ ...req.query, ...rest }) }
    );

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

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});
