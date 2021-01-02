import { NowRequest, NowResponse } from '@vercel/node';
import { octokit } from '../_lib/github';
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
  let base: string | null = <string>req.query.base;

  // Fallback, detect base from last tag
  if (!base) {
    try {
      base = <string>req.query.base || await getLastTag(owner, repo);
    } catch (e) {
      res.statusCode = 404;
      res.json({ error: `Cannot fetch last tak for ${owner}/${repo}` });
      return;
    }
  }

  if (base === null) {
    res.json({ release: 'First bump! 👊' });
    return;
  }

  // Compare branches
  let resCompared;
  try {
    resCompared = await octokit.repos.compareCommits({ owner, repo, base, head, });
  } catch (e) {
    res.statusCode = 400;
    res.json({ error: `Cannot compare ${base}...HEAD` });
    return;
  }

  // Prepare changes
  const changes = resCompared.data.commits.map(c => {
    const author = c.author ? `(@${c.author?.login})` : '';
    return `  - ${formatMessage(c.commit.message)} [${c.sha}] ${author}`.trimRight();
  });

  const release = generateNotes({
    owner,
    repo,
    base,
    head: version || head,
    changes
  });

  res.json({ release });
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

function generateNotes(input: ReleaseNotes): string {
  return `
Bumped! ${emoji.random().emoji}

Diff: https://github.com/${input.owner}/${input.repo}/compare/${input.base}...${input.head}

Changes:
${input.changes.join("\n")}
  `.trim();
}

function formatMessage(message: string): string {
  return message.replace(/\n+/g, `, `).trim();
}
