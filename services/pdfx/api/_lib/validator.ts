import { URL } from "url";

export function getInt(str: string) {
  return /[0-9]+/.test(str) ? parseInt(str) : undefined;
}

export function getUrlFromPath(str: string) {
  let url = str.slice(1);
  if (!url.startsWith("http")) {
    return "https://" + url;
  }
  return url;
}

export function isValidUrl(str: string) {
  try {
    const url = new URL(str);
    return url.hostname.includes(".");
  } catch (e) {
    console.error(e.message);
    return false;
  }
}
