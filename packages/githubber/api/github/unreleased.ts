import { NowRequest, NowResponse } from '@vercel/node';
import { octokit } from '../_lib/github';

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  if (!req.query._owner || !req.query._repo) {
    res.statusCode = 400;
    res.json({ error: 'Invalid {owner}/{repo} provided' });
    return;
  }

  const owner = <string>req.query._owner;
  const repo = <string>req.query._repo;

  const resTags = await octokit.repos.listTags({
    owner,
    repo,
    per_page: 1
  });

  if (resTags.status !== 200 || Array.from(resTags.data).length <= 0) {
    res.statusCode = 404;
    res.json({ unreleased: -1 });
    return;
  }

  const comparedRes = await octokit.repos.compareCommits({
    owner,
    repo,
    base: resTags.data[0].name,
    head: 'HEAD'
  });

  if (resTags.status !== 200) {
    res.statusCode = 400;
    res.json({ unreleased: -1 });
    return;
  }

  res.statusCode = 200;
  res.json({ unreleased: String(comparedRes.data.ahead_by) });
}
