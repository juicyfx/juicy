import { NowRequest, NowResponse } from '@now/node';
import { getPdf } from "./utils/chromium";
import * as errors from "./utils/errors";
import { parsePdfOptions } from "./utils/request";
import { isValidUrl } from "./utils/validator";

export default async function handler(req: NowRequest, res: NowResponse) {
    console.log("HTTP", req.url);

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
