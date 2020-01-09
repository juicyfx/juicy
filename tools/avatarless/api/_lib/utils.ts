import { NowRequest } from "@now/node";

const COLORS = [
  "#fccbc7", "#fbb4af", "#f99d97", "#f8877f", "#f77066", "#f55a4e", "#f7a9c4", "#f492b3", "#f27ba3",
  "#f06493", "#ee4c83", "#d88be5", "#d176e1", "#ca61dc", "#bda7e3", "#ae94dd", "#9f80d7", "#916dd1",
  "#abb4e2", "#98a2db", "#8591d5", "#7280ce", "#b2dbfb", "#9acffa", "#82c4f8", "#6ab8f7", "#51adf6",
  "#39a1f4", "#92dcfe", "#79d4fd", "#60ccfd", "#47c4fd", "#2ebcfc", "#14b4fc", "#6eefff", "#54ecff",
  "#3be9ff", "#21e6ff", "#08e3ff", "#00d3ed", "#00bcd4", "#30ffec", "#16ffe9", "#00fce4", "#00e2cd",
  "#00c9b6", "#b5dfb7", "#a3d7a5", "#92cf94", "#80c883", "#6ec071", "#5cb860", "#4caf50", "#d5e9bd",
  "#c8e3aa", "#bcdc97", "#b0d683", "#a4d070", "#97c95d", "#8bc34a", "#7eb73d", "#71a436", "#eef3bb",
  "#e8efa5", "#e3eb90", "#dde77a", "#d8e464", "#d2e04f", "#cddc39", "#c6d626", "#b1c022", "#9daa1e",
  "#89951a", "#fffbd4", "#fff8ba", "#fff5a1", "#fff387", "#fff06e", "#ffee54", "#ffeb3b", "#ffe821",
  "#ffe608", "#edd500", "#d4be00", "#baa700", "#a19100", "#ffe7a0", "#ffe186", "#ffda6d", "#ffd453",
  "#ffce3a", "#ffc720", "#ffc107", "#ecb100", "#d39e00", "#b98b00", "#ffd699", "#ffcc80", "#ffc166",
  "#ffb74d", "#ffad33", "#ffa21a", "#ff9800", "#e68900", "#cc7a00", "#ffcbbb", "#ffb8a1", "#ffa588",
  "#ff916e", "#ff7e55", "#ff6a3b", "#ff5722", "#c2a398", "#b89588", "#af8778", "#a57868", "#eaeaea",
  "#dedede", "#d1d1d1", "#c4c4c4", "#b7b7b7", "#ababab", "#9e9e9e", "#919191", "#848484", "#b7c6cd",
  "#a8bac3", "#99aeb8", "#8aa2ae", "#7a96a3", "#6b8a99"
]

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
