const { parse } = require('url');
const { getScreenshot } = require('../utils/chromium');
const { getInt, isValidUrl } = require('../utils/validator');

export default async function handler(req: IncomingMessage, res: ServerResponse) {
    try {
        const { query = {} } = parse(req.url, true);
        const { url, type = 'png', quality, fullPage } = query;
        const qual = getInt(quality);
        if (!isValidUrl(url)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`);
        } else {
            const file = await getScreenshot(url, type, qual, fullPage);
            res.statusCode = 200;
            res.setHeader('Content-Type', `image/${type}`);
            res.end(file);
        }
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
        console.error(e.message);
    }
};
