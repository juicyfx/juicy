import { request } from "./http";

export async function fetchBadge(url: string): Promise<[GithubRepoTag]> {
  const res = await request({ url: `https://badgen.net/https//${url}/`, method: 'GET' });

  if (res.statusCode !== 200) {
    throw new Error(`Badgen errored`);
  }

  const data = JSON.parse(res.data.toString('utf-8'));

  return data;
}
