import { VercelRequest, VercelResponse } from '@vercel/node';
import { getImage } from "./../_lib/chrome";
import { queryNumber } from './../_lib/utils';

const CACHE_BROWSER = 60 * 60 * 24 * 2;
const CACHE_CDN = 60 * 60 * 24 * 7;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url);

  if (req.query._p) {
    generateImage(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?_p=Some text</p>`);
  }
}

async function generateImage(req: VercelRequest, res: VercelResponse): Promise<void> {
  const width = queryNumber(req, 'width', 320);
  const height = queryNumber(req, 'height', 800);

  try {
    const template = createTemplate({
      page: <string>req.query._p,
      tabs: <string>req.query.tabs || 'timeline',
      theme: <string>req.query.theme || 'light',
      width,
      height,
    });
    const file = await getImage(
      {
        content: template,
        wait: queryNumber(req, 'wait', 3000)
      },
      {
        defaultViewport: {
          deviceScaleFactor: 1.5,
          width,
          height,
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

function createTemplate(ctx: FacebookPageContext): string {
  return `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Socky/Facebook</title>
</head>
<body style="margin: 0; padding: 0">
  <iframe
    src="https://www.facebook.com/plugins/page.php?href=https://facebook.com/${ctx.page}&tabs=${ctx.tabs}&width=${ctx.width}&height=${ctx.height}&colorscheme=${ctx.theme}&locale=cs_CZ"
    width="${ctx.width}"
    height="${ctx.height}"
    style="border:none;overflow:hidden"
    scrolling="no"
    frameborder="0"
  ></iframe>
</body>
</html>
`;
};
