import { Octokit } from "@octokit/rest";

if (!process.env.GITHUB_TOKEN) {
  console.error('Missing env GITHUB_TOKEN');
  process.exit(255);
}

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN, userAgent: 'JuicyFx (Githubber)' });

octokit.hook.after("request", async (response, options) => {
  console.log(`[GITHUB] [${options.method}] ${options.url}: ${response.status}`);
  console.log(`[GITHUB] X-RateLimit-Limit: ${response.headers['x-ratelimit-limit']}`);
  console.log(`[GITHUB] X-RateLimit-Remaining: ${response.headers['x-ratelimit-remaining']}`);
});
