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

  try {
    const tags = await getTags(owner, repo);
    res.json({ tags });
  } catch (e) {
    res.statusCode = 404;
    res.json({ error: `Cannot list tags for ${owner}/${repo}` });
  }
}

async function getTags(owner: string, repo: string): Promise<string[]> {
  const resTags = await octokit.repos.listTags({
    owner,
    repo,
    per_page: 100
  });

  return resTags.data.map(t => t.name);
}
