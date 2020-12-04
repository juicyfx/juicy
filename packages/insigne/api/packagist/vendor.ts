import { NowRequest, NowResponse } from '@vercel/node';
import { fetchVendorStats } from '../_lib/packagist';
import { numerize } from '../_lib/utils';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  if (!req.query.v) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?r=juicyfx/juicy</p>`);
    return;
  }

  try {
    const badgen = await generateBadgen(req);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(badgen))
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><p>${e.message}</p>`);

    console.error(e);
    console.error(e.message);
  }
}

async function generateBadgen(req: NowRequest): Promise<Badgen> {
  const v = <string>req.query.v;
  const d = <string>req.query.d;

  try {
    var stats = await fetchVendorStats(v);
  } catch (e) {
    return {
      'subject': 'N/A',
      'status': 'error',
      'color': 'red',
    }
  }

  if (d === 'dd') {
    return {
      'subject': 'downloads',
      'status': `${numerize(stats.downloads.daily)}/day`,
      'color': 'blue',
    };
  }


  if (d === 'dm') {
    return {
      'subject': 'downloads',
      'status': `${numerize(stats.downloads.monthly)}/month`,
      'color': 'blue',
    };
  }

  return {
    'subject': 'downloads',
    'status': `${numerize(stats.downloads.total)}`,
    'color': 'blue',
  };
}
