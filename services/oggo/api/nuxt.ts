import { VercelRequest, VercelResponse } from '@vercel/node';
import { getImage } from "./_lib/chrome";

const CACHE_BROWSER = 60 * 60 * 24 * 2;
const CACHE_CDN = 60 * 60 * 24 * 7;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url);

  if (req.query.module && req.query.text) {
    generateImage(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Error</h1><p>url/nuxt/?module={module}&color={color}&text={text}`);
  }
}

async function generateImage(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const template = createTemplate({
      module: <string>req.query.module,
      color: <string>req.query.color || '00000',
      text: <string>req.query.text,
    });

    const file = await getImage(
      {
        content: template
      },
      {
        defaultViewport: {
          deviceScaleFactor: 1,
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

function createTemplate(ctx: { module: string, color: string, text: string }): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NUXT</title>
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700');
      * { font-family: 'Quicksand', sans-serif; }
    </style>
</head>
<body class="h-screen bg-white antialiased">
  <div class="h-full flex flex-col items-center justify-center px-12 py-8">
    <div class="w-full grid grid-cols-2">
      <div><img class="h-24" src="https://nuxtjs.org/logos/nuxt-icon.png" /></div>
      <div class="text-right"><img class="h-24 inline-block" src="https://raw.githubusercontent.com/nuxt-community/${ctx.module}-module/master/docs/static/icon.png" /></div>
    </div>
    <div class="h-full w-full flex flex-col items-center justify-center tracking-wider">
      <div style="font-size: 3.5rem;" class="font-semibold text-center">nuxt<span>/</span><span style="color: #${ctx.color}">${ctx.module}</span></div>
      <div style="font-size: 2.5rem;" class="text-center">${ctx.text}</div>
    </div>
    <div class="w-full grid grid-cols-2">
      <div><img class="h-24" src="https://raw.githubusercontent.com/nuxt-community/${ctx.module}-module/master/docs/static/icon.png" /></div>
      <div class="text-right"><img class="h-24 inline-block" src="https://nuxtjs.org/logos/nuxt-icon.png" /></div>
    </div>
  </div>
</body>
</html>
`;
};
