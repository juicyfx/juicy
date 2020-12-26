import { requestGithub } from "./http";

export async function fetchLastTag(repo: string): Promise<[GithubRepoTag]> {
  const res = await requestGithub({ url: `https://api.github.com/repos/${repo}/tags?per_page=1`, method: 'GET' });

  if (res.statusCode !== 200) {
    throw new Error(`Repository ${repo} not found for tag`);
  }

  const data = JSON.parse(res.data.toString('utf-8'));

  return data;
}

export async function fetchRepoCompare(repo: string, rev1: string, rev2: string): Promise<GithubRepoCompare> {
  const res = await requestGithub({ url: `https://api.github.com/repos/${repo}/compare/${rev1}...${rev2}`, method: 'GET' });

  if (res.statusCode !== 200) {
    throw new Error(`Repository ${repo} not found for comparing`);
  }

  const data = JSON.parse(res.data.toString('utf-8'));

  return data;
}
