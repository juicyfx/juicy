import { IncomingMessage, RequestOptions, OutgoingHttpHeaders } from 'http';
import https from 'https';
import * as URL from 'url';

export async function requestGithubber({ url, method = 'GET' }: { url: string, method: string }): Promise<HttpResponse> {
  console.log(url);
  const res = await request({ url, method });

  return res;
};

export async function requestPackagist({ url, method = 'GET' }: { url: string, method: string }): Promise<HttpResponse> {
  console.log(url);
  const res = await request({ url, method });

  return res;
};

export async function requestBadgen({ url, method = 'GET' }: { url: string, method: string }): Promise<HttpResponse> {
  const res = await request({ url, method });

  return res;
};

async function request({ url, method = 'GET', headers = {} }: { url: string, method: string, headers?: OutgoingHttpHeaders }): Promise<HttpResponse> {
  const parsed = URL.parse(url);

  const params: RequestOptions = {
    method,
    host: parsed.host,
    port: parsed.port,
    path: parsed.path || '/',
    headers: {
      ...headers,
      "User-Agent": "JuicyFx (Insigne)",
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(params, (res: IncomingMessage) => {
      const data: any = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
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
