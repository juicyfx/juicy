import { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import * as http from './http';
import { prepareAvatarlessInitialsOptions, prepareAvatarlessEmailOptions, prepareGravatarOptions } from './utils';
import { SILHOUETTE_PERSON } from './icons';

const CACHE_BROWSER = 60 * 60 * 24 * 14; // 14 days
const CACHE_CDN = 60 * 60 * 24 * 20; // 20 days

export function pipeLogging(req: VercelRequest, _res: VercelResponse): void {
  console.log("[HTTP]", req.url);
  console.log("[HTTP]", req.query);
}

export function pipeCORS(req: VercelRequest, res: VercelResponse): void {
  // Optimistic CORS
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Methods", '*');
  res.setHeader("Access-Control-Allow-Headers", '*');

  // OPTIONS request
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
  }
}

export function pipeRequirements(req: VercelRequest, res: VercelResponse, keys: string[]): void {
  keys.forEach(k => {
    if (!req.query[k]) {
      res.statusCode = 400;
      res.end('Invalid usage, take a look at readme');
    }
  })
}

export async function pipeGravatar(req: VercelRequest, res: VercelResponse): Promise<void> {
  const options = prepareGravatarOptions(req);
  options.default = '404';

  const gravatar = await createGravatar(options);

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, stale-while-revalidate, public`);
  res.write(gravatar);
  res.end();
}

export async function pipeGravatarOnly(req: VercelRequest, res: VercelResponse): Promise<void> {
  const options = prepareGravatarOptions(req);
  const gravatar = await createGravatar(options);

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, stale-while-revalidate, public`);
  res.write(gravatar);
  res.end();
}

export function pipeAvatarlessInitials(req: VercelRequest, res: VercelResponse): void {
  const options = prepareAvatarlessInitialsOptions(req);
  const svg = createAvatarless(options);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, stale-while-revalidate, public`);
  res.end(svg.trim());
}

export function pipeAvatarlessEmail(req: VercelRequest, res: VercelResponse): void {
  const options = prepareAvatarlessEmailOptions(req);
  const svg = createAvatarless(options);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', `max-age=${CACHE_BROWSER}, s-maxage=${CACHE_CDN}, stale-while-revalidate, public`);
  res.end(svg.trim());
}

async function createGravatar(options: GravatarOptions): Promise<Buffer> {
  const emailHash = crypto.createHash('md5').update(options.email).digest("hex")

  // OK = https://secure.gravatar.com/avatar/5e2b985cb929bbc49ce9cded5e92bb90.png?default=retro&size=64
  // 404 = https://secure.gravatar.com/avatar/oh-boy.png?default=404&size=64
  const url = `https://secure.gravatar.com/avatar/${emailHash}.png?default=${options.default}&size=${options.size}`;

  // Make request to gravatar API
  const gr = await http.request({ url, method: 'GET' });

  if (gr.statusCode !== 200) {
    console.error(`[GRAVATAR] Invalid status code for ${url}`);
    throw new Error('Gravatar not OK');
  } else {
    return gr.data;
  }
}

function createAvatarless(options: AvatarlessOptions): string {
  console.log('[AVATARLESS] Fallback to avatarless')

  const tmp: { [key: string]: string | undefined; } = {};

  // If text is provided, use custom text with font
  // Otherwise use siluette
  if (options.text !== undefined) {
    tmp.text = `
      <text
        fill="${options.textColor}"
        font-size="${options.textSize}"
        x="50%"
        y="50%"
        text-anchor="middle"
        dominant-baseline="central"
        font-family="Verdana,DejaVu Sans,sans-serif">
      ${options.text}
      </text>
    `;
  } else {
    tmp.text = SILHOUETTE_PERSON;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${options.size}" height="${options.size}">
      <rect x="0" y="0" width="${options.size}" height="${options.size}" fill="${options.bgColor}"/>
      ${tmp.text}
    </svg>
  `;

  return svg.trim();
}
