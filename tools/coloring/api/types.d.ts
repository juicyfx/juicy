declare module 'htm';
declare module 'vhtml';

interface ColorGroup {
  color: string,
  colors: Color[],
}

interface Color {
  original: string,
  color: string,
  isLight: boolean,
}
