import { NowRequest, NowResponse } from '@now/node';
import { getPdf } from "./utils/chromium";
import { parsePdfOptions } from "./utils/request";
import * as errors from "./utils/errors";

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

    if (req.method === "POST") {
        fromPost(req, res);
    } else {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/html");
        res.end(errors.USAGE);
    }
}

async function fromPost(req: NowRequest, res: NowResponse) {
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
            { ...parsePdfOptions({...req.query, ...rest}) }
        );

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
