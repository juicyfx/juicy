export function formatVersion(version: string): string {
    return version
        .replace(/^v/, '')
        .replace(/x/, '0')
        .replace(/\-dev$/, '');
}

export function filterMajorVersions(versions: string[]): string[] {
    const majors: { [key: string]: string } = {};

    for (const version of versions) {
        const match = version.match(/v?(\d).+/);
        if (!match) continue;

        if (!majors[match[1]]) {
            majors[match[1]] = version;
        }
    }

    return Object.values(majors);
}
