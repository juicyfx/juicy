export function isDev(): boolean {
  return process.env.NOW_REGION === undefined || process.env.NOW_REGION === 'dev1';
}

export function trimEmoji(str: string): string {
  return str.replace(/\p{Emoji}/gu, '').trim();
}
