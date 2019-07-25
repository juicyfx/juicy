import { NowRequest, NowResponse } from '@now/node';
import { getPdf } from "./utils/chromium";
import { parsePdfOptions } from "./utils/request";
import * as errors from "./utils/errors";

export default async function handler(req: NowRequest, res: NowResponse) {
    console.log("HTTP", req.url);

    if (req.query.raw) {
        fromRaw(req, res);
    } else {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/html");
        res.end(errors.USAGE);
    }
}

async function fromRaw(req: NowRequest, res: NowResponse) {
    try {
        const raw: string = Array.isArray(req.query.raw) ? req.query.raw.join() : req.query.raw;
        const file = await getPdf({ raw }, parsePdfOptions(req.query));
        res.statusCode = 200;
        res.setHeader("Content-Type", `application/pdf`);
        res.end(file);
    } catch (e) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/html");
        res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

        console.error(e);
        console.error(e.message);
    }
}
