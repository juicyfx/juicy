import {NowRequest, NowResponse} from '@vercel/node';
import {fetchLastTag, fetchRepoCompare} from '../_lib/github';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  if (!req.query.r) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Client Error</h1><p>Provide ?r=juicyfx/juicy</p>`);
    return;
  }

  res.setHeader("Content-Type", "application/json");
  const r = <string>req.query.r;

  try {
    var resTag = await fetchLastTag(r);
  } catch (e) {
    res.statusCode = 404;
    res.json({unreleased: -1});
    return;
  }

  try {
    var comparedRes = await fetchRepoCompare(r, resTag[0].name, 'master');
  } catch (e) {
    res.statusCode = 400;
    res.json({unreleased: -1});
    return;
  }

  res.statusCode = 200;
  res.json({unreleased: String(comparedRes.ahead_by)});
}
