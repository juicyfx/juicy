import { NowRequest, NowResponse } from '@vercel/node';
import { octokit } from './_lib/github';
import emoji from "node-emoji";

export default async function handler(req: NowRequest, res: NowResponse) {
  console.log("HTTP", req.url);

  if (!req.query._owner || !req.query._repo) {
    res.statusCode = 400;
    res.json({ error: 'Invalid {owner}/{repo} provided' });
    return;
  }

  const owner = <string>req.query._owner;
  const repo = <string>req.query._repo;
  const version = <string>req.query.version;
  const head = <string>req.query.head || 'HEAD';
  const base = <string>req.query.base || await getLastTag(owner, repo);

  if (base === null) {
    res.json({ release: 'First bump! 👊' });
    return;
  }

  const resCompared = await octokit.repos.compareCommits({
    owner,
    repo,
    base,
    head,
  });

  if (resCompared.status !== 200) {
    res.statusCode = 400;
    res.json({ error: `Cannot compare ${base}...HEAD` });
    return;
  }

  const changes = resCompared.data.commits.map(c => {
    return `  - ${c.commit.message} [${c.sha}] (@${c.committer?.login})`;
  });

  const notes = `
Bumped! ${emoji.random().emoji}

Diff: https://github.com/${owner}/${repo}/compare/${base}...${version || head}

Changes:
${changes.join("\n")}
  `;

  res.json({ release: notes.trim() });
}

async function getLastTag(owner: string, repo: string): Promise<string | null> {
  const resTags = await octokit.repos.listTags({
    owner,
    repo,
    per_page: 1
  });

  if (resTags.status !== 200 || Array.from(resTags.data).length <= 0) {
    return null;
  }

  return resTags.data[0].name;
}
