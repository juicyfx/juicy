import { VercelRequest, VercelResponse } from '@vercel/node';
import { getImage } from "./../_lib/chrome";
import { queryNumber } from './../_lib/utils';

const CACHE_BROWSER = 60 * 60 * 24 * 2;
const CACHE_CDN = 60 * 60 * 24 * 7;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url);

  if (req.query._p) {
    const template = await generateTemplate(req, res);
    generateImage(req, res, template);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?_p=Some text</p>`);
  }
}

async function generateTemplate(req: VercelRequest, res: VercelResponse): Promise<string> {
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

    if (req.query.raw) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(template);
    }

    return template;
  } catch (e: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);

    return e.message;
  }

}

async function generateImage(req: VercelRequest, res: VercelResponse, template: string): Promise<void> {
  const width = queryNumber(req, 'width', 320);
  const height = queryNumber(req, 'height', 800);
  const wait = queryNumber(req, 'wait', 5000);

  try {
    const file = await getImage(
      {
        content: template,
        wait
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
  } catch (e: any) {
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
  <div id="fb-root"></div>
  <script src="https://connect.facebook.net/cs_CZ/sdk.js#xfbml=1&version=v11.0&autoLogAppEvents=1"></script>
  <div
    class="fb-page"
    data-href="https://www.facebook.com/${ctx.page}/"
    data-color-scheme="${ctx.theme}"
    data-hide-cover="false"
    data-show-facepile="true"
    data-show-posts="true"
    data-width="${ctx.width}"
    data-height="${ctx.height}"
    style="overflow:hidden"
  >
  </div>
</body>
</html>
`;
};
