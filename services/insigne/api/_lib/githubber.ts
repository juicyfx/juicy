import { requestGithubber } from "./http";

export async function fetchUnreleased(repo: string): Promise<GithubberUnreleased> {
  const res = await requestGithubber({ url: `https://githubber.vercel.app/repos/${repo}/unreleased`, method: 'GET' });

  if (res.statusCode !== 200) {
    throw new Error(`Repository ${repo} not found for tag`);
  }

  const data = JSON.parse(res.data.toString('utf-8'));

  return data;
}
