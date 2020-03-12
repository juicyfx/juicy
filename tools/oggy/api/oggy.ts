import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './_libs/parser';
import { getScreenshot } from './_libs/chrome';
import { getHtml } from './_libs/template';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const parsedReq = parseRequest(req);
    const html = getHtml(parsedReq);
    const { fileType } = parsedReq;
    const screenshot = await getScreenshot(html, fileType);
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/${fileType}`);
    res.setHeader('Cache-Control', `public, immutable, no-transform, max-age=31536000`);
    res.end(screenshot);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);
    console.error(e);
  }
}
