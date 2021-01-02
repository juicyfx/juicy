export function numerize(num: number, digits: number = 1): string {
  const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  const floor = Math.floor(Math.abs(num).toString().length / 3);
  const value = +(num / Math.pow(1000, floor))
  return value.toFixed(value > 1 ? digits : 2) + units[floor - 1];
}
