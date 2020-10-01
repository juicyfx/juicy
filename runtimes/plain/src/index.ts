import { FileBlob, BuildOptions } from "@vercel/build-utils";

export async function build(options : BuildOptions): Promise<any> {
  console.log('▲', options);

  const data = <string>options.config.text || 'Plain text';
  const result = new FileBlob({ data });

  return { [options.entrypoint]: result };
};
