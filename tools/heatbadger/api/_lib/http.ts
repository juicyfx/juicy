import { IncomingMessage, RequestOptions } from 'http';
import https from 'https';
import * as URL from 'url';

export async function request({ url, method = 'GET' }: { url: string, method: string }): Promise<HttpResponse> {
  const parsed = URL.parse(url);

  const params: RequestOptions = {
    method,
    host: parsed.host,
    port: parsed.port,
    path: parsed.path || '/',
    headers: {
      "User-Agent": "JuicyFx (Headbadger)",
    }
  };

  if (process.env.GITHUB_TOKEN) {
    params.headers!['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  return new Promise((resolve, reject) => {
    const req = https.request(params, (res: IncomingMessage) => {
      const data: any = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        console.log(`[GITHUB] X-RateLimit-Limit: ${res.headers['x-ratelimit-limit']}`);
        console.log(`[GITHUB] X-RateLimit-Remaining: ${res.headers['x-ratelimit-remaining']}`);

        resolve({
          statusCode: res.statusCode!,
          headers: res.headers,
          data: Buffer.concat(data),
        });
      });
    });

    req.on('error', reject);

    req.end();
  });
};
