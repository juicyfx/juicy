import { NowRequest } from "@vercel/node";

const COLORS = [
  '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#EC407A', '#E91E63',
  '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#FF5252', '#FF1744', '#D50000', '#FF4081',
  '#F50057', '#C51162', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A',
  '#4A148C', '#E040FB', '#D500F9', '#AA00FF', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1',
  '#512DA8', '#4527A0', '#311B92', '#7C4DFF', '#651FFF', '#6200EA', '#7986CB', '#5C6BC0',
  '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E', '#536DFE', '#3D5AFE', '#304FFE',
  '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#448AFF', '#2979FF', '#2962FF', '#0288D1',
  '#0277BD', '#01579B', '#0097A7', '#00838F', '#006064', '#009688', '#00897B', '#00796B',
  '#00695C', '#004D40', '#0091EA', '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#558B2F',
  '#33691E', '#827717', '#E65100', '#F4511E', '#E64A19', '#D84315', '#BF360C', '#A1887F',
  '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#757575', '#616161',
  '#424242', '#212121', '#78909C', '#607D8B', '#546E7A', '#455A64', '#37474F', '#263238',
  '#FF3D00', '#DD2C00',
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

export function prepareAvatarlessInitialsOptions(req: NowRequest): AvatarlessOptions {
  const text = <string>req.query._initials || <string>req.query.t || undefined;
  const size = Math.max(DEFAULT_MIN_SIZE, parseInt(<string>req.query.s || String(DEFAULT_SIZE)));
  const bgColor = <string>req.query.bc || suggestColor(String(text));
  const textColor = <string>req.query.tc || 'white';
  const textSize = Math.floor(size / DEFAULT_SIZE * 140);

  return {
    text,
    size,
    bgColor,
    textColor,
    textSize
  }
}

export function prepareAvatarlessEmailOptions(req: NowRequest): AvatarlessOptions {
  const text = <string>req.query.t || undefined;
  const size = Math.max(DEFAULT_MIN_SIZE, parseInt(<string>req.query.s || String(DEFAULT_SIZE)));
  const bgColor = <string>req.query.bc || suggestColor(String(text));
  const textColor = <string>req.query.tc || 'white';
  const textSize = Math.floor(size / DEFAULT_SIZE * 140);

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
