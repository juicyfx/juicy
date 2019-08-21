import { NowRequest, NowResponse } from '@now/node';
import { getPdf } from "./_lib/utils/chromium";
import * as errors from "./_lib/utils/errors";
import { parsePdfOptions } from "./_lib/utils/request";
import { isValidUrl } from "./_lib/utils/validator";
import { installFonts } from './_lib/utils/fonts';

export default async function handler(req: NowRequest, res: NowResponse) {
    console.log("HTTP", req.url);

    // Setup env HOME (e.q. for fonts)
    if (process.env.HOME === undefined) {
      process.env.HOME = '/tmp';
    }

    // Optimistic CORS
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Methods", '*');
    res.setHeader("Access-Control-Allow-Headers", '*');

    // OPTIONS request
    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
    }

    // Install deps
    await installFonts();

    if (req.query.url) {
        fromUrl(req, res);
    } else {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/html");
        res.end(errors.USAGE);
    }
}
async function fromUrl(req: NowRequest, res: NowResponse) {
    try {
        const url: string = Array.isArray(req.query.url) ? req.query.url.join() : req.query.url;

        if (!isValidUrl(url)) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "text/html");
            res.end(
                `<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`
            );
        } else {
            const file = await getPdf({ url }, parsePdfOptions(req.query));
            res.statusCode = 200;
            res.setHeader("Content-Type", `application/pdf`);
            res.end(file);
        }
    } catch (e) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/html");
        res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

        console.error(e);
        console.error(e.message);
    }
}
