const { parse } = require('url');
const { getPdf } = require('../utils/chromium');
const { isValidUrl } = require('../utils/validator');

module.exports = async function (req, res) {
    const { query = {} } = parse(req.url, true);

    if (query.url) {
        fromUrl(req, res);
    } else if (query.raw) {
        fromRaw(req, res);
    } else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Server Error</h1><p>Input input given. Use <code>?url=https://example.com</code> or <code>?raw=hello!</code> </p>');

    }
};

async function fromUrl(req, res) {
    try {
        const { query = {} } = parse(req.url, true);
        const { url, format = 'A4' } = query;
        if (!isValidUrl(url)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`);
        } else {
            const file = await getPdf({ url }, { format });
            res.statusCode = 200;
            res.setHeader('Content-Type', `application/pdf`);
            res.end(file);
        }
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
        console.error(e.message);
    }
}

async function fromRaw(req, res) {
    try {
        const { query = {} } = parse(req.url, true);
        const { raw, format = 'A4' } = query;
        if (!raw) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>Bad Request</h1><p>No raw source</p>`);
        } else {
            const file = await getPdf({ raw }, { format });
            res.statusCode = 200;
            res.setHeader('Content-Type', `application/pdf`);
            res.end(file);
        }
    } catch (e) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
        console.error(e.message);
    }
}
