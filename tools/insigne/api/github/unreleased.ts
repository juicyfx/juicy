import { NowRequest, NowResponse } from '@now/node';
import { fetchLastTag, fetchRepoCompare } from '../_lib/github';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  if (req.query.r) {
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
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?r=juicyfx/juicy</p>`);
  }
}

async function generateBadgen(req: NowRequest): Promise<Badgen> {
  const r = <string>req.query.r;

  try {
    var tagRes = await fetchLastTag(r);
  } catch (e) {
    return {
      'subject': 'unreleased',
      'status': 'N/A',
      'color': 'red',
    }
  }

  try {
    var comparedRes = await fetchRepoCompare(r, tagRes[0].name, 'master');
  } catch (e) {
    return {
      'subject': 'unreleased',
      'status': 'error',
      'color': 'red',
    }
  }

  return {
    'subject': 'unreleased',
    'status': String(comparedRes.ahead_by),
    'color': 'blue',
  };
}
