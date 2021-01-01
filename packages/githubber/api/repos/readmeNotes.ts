import { NowRequest, NowResponse } from '@vercel/node';
import _ from "lodash";
import semver from "semver";
import * as Eta from "eta"
import path from "path";
import { octokit } from '../_lib/github';
import { generateTable } from "../_lib/markdown";
import { filterMajorVersions, formatVersion } from "../_lib/semver";

export default async function handler(req: NowRequest, res: NowResponse): Promise<void> {
  if (!req.query._owner || !req.query._repo) {
    res.statusCode = 400;
    res.json({ error: 'Invalid {owner}/{repo} provided' });
    return;
  }

  const owner = <string>req.query._owner;
  const repo = <string>req.query._repo;

  // Fetch composer.json
  let composer;
  try {
    composer = await getComposer(owner, repo);
    if (!composer) {
      res.statusCode = 400;
      res.json({ error: `Invalid data for composer.json` });
      return;
    }
  } catch (e) {
    res.statusCode = 400;
    res.json({ error: `Cannot get composer.json` });
    return;
  }

  // Fetch versions
  const versions = await getVersions(owner, repo);

  // Prepend dev version if branch-alias is defined
  const branchAlias = _.get(composer, 'extra.branch-alias.dev-master');
  if (branchAlias) {
    versions.unshift({
      State: 'dev',
      Version: '^' + formatVersion(branchAlias),
      Branch: 'master',
      Nette: '3.0+',
      PHP: composer?.require?.['php'] || '*',
    });
  }

  // Generate readme
  const readme = await generateNotes({
    owner,
    repo,
    composer,
    versions
  });

  res.json({ readme });
}

async function getComposer(owner: string, repo: string, ref: string = 'HEAD'): Promise<Composer.Composer | null> {
  const resContent = await octokit.repos.getContent({
    owner,
    repo,
    ref,
    path: 'composer.json',
  });

  if (Array.isArray(resContent.data) || !('content' in resContent.data)) {
    return null;
  }

  return JSON.parse(Buffer.from(resContent.data.content, 'base64').toString('utf-8'));
}

async function getVersions(owner: string, repo: string): Promise<ReadmeVersion[]> {
  const tags = await getTags(owner, repo);
  const majors = filterMajorVersions(tags);

  const versions = [];

  for await(const major of majors) {
    const composer = await getComposer(owner, repo, major);
    if (!composer) continue;

    const v = semver.parse(formatVersion(major));

    versions.push({
      State: 'stable',
      Version: `^${v?.major}.${v?.minor}.0`,
      Branch: 'master',
      Nette: '3.0+',
      PHP: composer.require && composer.require['php'] || '*',
    });
  }

  return versions;
}

async function getTags(owner: string, repo: string): Promise<string[]> {
  const resTags = await octokit.repos.listTags({
    owner,
    repo,
    per_page: 100
  });

  return resTags.data.map(t => t.name);
}

async function generateNotes(input: ReadmeNotes): Promise<string> {
  const authors = input.composer.authors?.map(author => {
    return {
      username: author.name
    }
  }) || [];

  const output = await Eta.renderFile(path.join(__dirname, '../_templates/readme.eta'), {
    input,
    authors,
    versions: generateTable(input.versions),
  }) as string;

  return output.trim() + "\n";
}

