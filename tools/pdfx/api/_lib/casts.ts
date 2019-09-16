export function toBoolean(input: any): boolean {
  if (input === undefined) return false;
  if (input === null) return false;
  if ((typeof input) === "string") {
    switch (input.toLowerCase().trim()) {
      case "true": case "yes": case "1": return true;
      case "false": case "no": case "0": case null: return false;
      default: return Boolean(input);
    }
  }
  if ((typeof input) === "number") {
    switch (input) {
      case 1: return true;
      case 0: case null: return false;
      default: return Boolean(input);
    }
  }
  return Boolean(input);
}
