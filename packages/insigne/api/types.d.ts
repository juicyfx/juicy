interface HttpResponse {
  statusCode: number,
  data: Buffer,
  headers: import('http').IncomingHttpHeaders
}

interface GithubRepoTag {
  name: string,
}

interface GithubRepoCompare {
  ahead_by: number,
  behind_by: number,
  total_commits: number,
}

interface Badgen {
  subject: string,
  status: string,
  color: string,
}
