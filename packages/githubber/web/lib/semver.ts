import semver from "semver";

export function parse(v: string): semver.SemVer | null {
  const parsed = semver.parse(v);

  if (parsed !== null) return parsed;

  const patchy = parse(`${v}.0`);
  if (patchy) return patchy;

  const minory = parse(`${v}.0.0`);
  if (minory) return minory;

  return null;
}

export function next(v: string, next: semver.ReleaseType): string | null {
  const version = parse(v);

  if (!version) return null;

  return semver.inc(version, next);
}
