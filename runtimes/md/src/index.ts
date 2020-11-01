import { FileBlob, BuildOptions } from "@vercel/build-utils";
import unified from 'unified';
// @ts-ignore
import unifiedStream from 'unified-stream';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import doc from 'rehype-document';
// @ts-ignore
import format from 'rehype-format';
import html from 'rehype-stringify';

export const version = 2;

export async function build({ files, entrypoint, config = {} }: BuildOptions): Promise<any> {
  const stream = files[entrypoint].toStream();
  const options = config || {};

  const title = <string>options.title || undefined;
  const language = <string>options.language || 'en';
  const meta = <[]>options.meta || undefined;
  const css = <string>options.css || undefined;
  const js = <string>options.js || undefined;

  const processor = unified()
    .use(markdown)
    .use(remark2rehype)
    .use(doc, {
      title,
      language,
      meta,
      css,
      js
    })
    .use(format)
    .use(html);

  const result = await FileBlob.fromStream({
    stream: stream.pipe(unifiedStream(processor)),
  });

  const replacedEntrypoint = entrypoint.replace(/\.[^.]+$/, '.html');

  return { [replacedEntrypoint]: result };
};
