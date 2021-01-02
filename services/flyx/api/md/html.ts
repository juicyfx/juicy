import { NowRequest, NowResponse } from '@vercel/node';
import * as http from "./../_lib/http";
import { createTemplate } from "./../_lib/template";

const CACHE_BROWSER = 60 * 60 * 24; // 24h
const CACHE_CDN = 60 * 60 * 1; // 1h

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  if (req.query.github) {
    await handleGithub(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?github={path-to-file}</p>`);
  }
}

async function handleGithub(req: NowRequest, res: NowResponse): Promise<void> {
  try {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, public`);
    res.end(await convertFile(`https://raw.githubusercontent.com/${<string>req.query.github}`));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}

async function convertFile(file: string): Promise<string> {
  const response = await http.request({ url: file });
  const result = createTemplate(response.data.toString());
  return result;
}
