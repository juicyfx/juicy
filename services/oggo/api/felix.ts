import { VercelRequest, VercelResponse } from '@vercel/node';
import { getImage } from "./_lib/chrome";

const CACHE_BROWSER = 60 * 60 * 24 * 2;
const CACHE_CDN = 60 * 60 * 24 * 7;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url);

  if (req.query.t) {
    generateImage(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?t=Some text</p>`);
  }
}

async function generateImage(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const text = <string>req.query.t;

    const template = createTemplate(text);
    const file = await getImage(
      {
        content: template
      },
      {
        defaultViewport: {
          deviceScaleFactor: 2,
          width: 1280,
          height: 640,
        }
      }
    );

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, public`);
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}

function createTemplate(text: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OGGO</title>
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
    <style>
    * { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="h-screen bg-gray-200">
  <div class="h-full flex flex-col items-center justify-center px-16">
  <div class="mb-16" style="height: 35%;"><img class="h-full" src="https://avatars.githubusercontent.com/f3l1x"></div>
  <div class="text-4xl mb-16 font-bold text-center">${text}</div>
  <div class="font-bold">
    Milan <div class="text-blue-500 inline">Felix</div> Šulc
    <div class="inline px-2">•</div>
    <div class="text-blue-500 inline">f3l1x.io</div>
    <div class="inline px-2">•</div>
    <div class="text-blue-500 inline">@xf3l1x</div>
  </div>
</body>
</html>
`;
};
