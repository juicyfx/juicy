import { NowRequest } from "@now/node";

const COLORS = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722'
];

const DEFAULT_MIN_SIZE = 16;
const DEFAULT_SIZE = 256;

export function suggestColor(text: string): string {
  const index = stringCodes(text) % COLORS.length;

  return COLORS[index];
}

function stringCodes(text: string): number {
  return text
    .split('')
    .map(x => x.charCodeAt(0))
    .reduce((a, b) => a + b);
}

export function prepareAvatarlessOptions(req: NowRequest): AvatarlessOptions {
  const text = <string>req.query._initials || <string>req.query.t || 'N/A';
  const size = Math.max(DEFAULT_MIN_SIZE, parseInt(<string>req.query.s || String(DEFAULT_SIZE)));
  const bgColor = <string>req.query.bc || suggestColor(text);
  const textColor = <string>req.query.tc || 'white';
  const textSize = Math.floor(size / DEFAULT_SIZE * 95);

  return {
    text,
    size,
    bgColor,
    textColor,
    textSize
  }
}

export function prepareGravatarOptions(req: NowRequest): GravatarOptions {
  const email = <string>req.query._email;
  const size = Math.max(DEFAULT_MIN_SIZE, parseInt(<string>req.query.s || String(DEFAULT_SIZE)));
  const d = <string>req.query.d || 'retro';

  return {
    email,
    size,
    default: d
  }
}
