import { request } from "./http";

// https://api.github.com/repos/juicyfx/juicy
export async function fetchRepository(repo: string): Promise<any> {
  const res = await request({ url: `https://api.github.com/repos/${repo}`, method: 'GET' });

  if (res.statusCode !== 200) {
    throw new Error(`Repository ${repo} not found`);
  }

  const data = JSON.parse(res.data.toString('UTF-8'));

  return data;
}
