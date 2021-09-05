import { VercelRequest, VercelResponse } from '@vercel/node';
import { getImage } from "./../_lib/chrome";
import { queryNumber } from './../_lib/utils';

const CACHE_BROWSER = 60 * 60 * 24 * 2;
const CACHE_CDN = 60 * 60 * 24 * 7;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("HTTP", req.url);

  if (req.query._t) {
    generateImage(req, res);
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?_t=tweet_id</p>`);
  }
}

async function generateImage(req: VercelRequest, res: VercelResponse): Promise<void> {
  const width = queryNumber(req, 'width', 320);
  const height = queryNumber(req, 'height', 300);

  try {
    const template = createTemplate({
      tweet: <string>req.query._t,
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
  } catch (e: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}

function createTemplate(ctx: TwitterTweetContext): string {
  return `
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Socky/Twitter</title>
</head>
<body style="margin: 0; padding: 0; background: ${ctx.theme === 'dark' ? '#000000' : '#fffff'}">
  <div style="margin-top: -10px; margin-bottom: -10px">
    <blockquote data-lang="cs" data-width=${ctx.width} data-theme="${ctx.theme}" class="twitter-tweet"><a href="https://twitter.com/xf3l1x/status/${ctx.tweet}?ref_src=twsrc%5Etfw"></a></blockquote>
  </div>
  <script src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</body>
</html>
`;
};
