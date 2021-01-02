import { NowRequest, NowResponse } from '@vercel/node';
import _ from "lodash";
import semver from "semver";
import * as Eta from "eta"
import path from "path";
import { octokit } from '../_lib/github';
import { generateTable } from "../_lib/markdown";
import { filterMajorVersions, formatVersion } from "../_lib/semver";
import { Flow } from "../_lib/flow";

interface FlowContext {
  owner: string,
  repo: string,
  composer: Composer.Composer,
  versions: ReadmeVersion[]
}

export default async function handler(req: NowRequest, res: NowResponse): Promise<void> {
  return Flow.from<FlowContext>(req, res)
    // Catch'em all
    .catch(({ req, app }, { exception }) => {
      console.error({ url: req.url });
      console.error(exception);
      app.json(500, { error: `Error occurred` });
    })

    // Logger
    .pass(({ req }) => {
      console.log("HTTP", req.url)
    })

    // Validate required data
    .validate(({ app, req, ctx }) => {
      if (!req.query._owner || !req.query._repo) {
        app.json(400, { error: 'Invalid {owner}/{repo} provided' });
      }

      ctx.owner = <string>req.query._owner;
      ctx.repo = <string>req.query._repo;
    })

    // Fetch composer.json
    .use(async ({ app, ctx }) => {
      try {
        const composer = await getComposer(ctx.owner, ctx.repo);

        if (!composer) {
          app.json(400, { error: `Invalid data for composer.json` });
        } else {
          ctx.composer = composer;
        }
      } catch (e) {
        app.json(400, { error: `Cannot get composer.json` });
      }
    })

    // Fetch versions
    .use(async ({ ctx }) => {
      const versions = await getVersions(ctx.owner, ctx.repo);

      // Prepend dev version if branch-alias is defined
      const branchAlias = _.get(ctx.composer, 'extra.branch-alias.dev-master');
      if (branchAlias) {
        versions.unshift({
          State: 'dev',
          Version: '^' + formatVersion(branchAlias),
          Branch: 'master',
          Nette: '3.0+',
          PHP: ctx.composer?.require?.['php'] || '*',
        });
      }

      ctx.versions = versions;
    })

    // Generate readme
    .use(async ({ app, ctx }) => {
      const readme = await generateNotes({
        owner: ctx.owner,
        repo: ctx.repo,
        composer: ctx.composer,
        versions: ctx.versions
      });

      app.json(200, { readme });
    })

    // Run workflow
    .run();
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

