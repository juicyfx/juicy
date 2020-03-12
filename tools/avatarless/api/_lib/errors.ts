export const USAGE = `
  <h1>Avatarless</h1>
  <h3>Gravatar</h3>
  <ul>
    <li>[GET] <a href="/g/milan@sulc.dev">/g/milan@sulc.dev</a></li>
    <li>[GET] <a href="/g/notfound@sulc.dev">/g/notfound@sulc.dev</a></li>
    <li>[GET] <a href="/g/notfound@sulc.dev?s=128&d=retro">/g/notfound@sulc.dev?s=128&d=retro</a></li>
  </ul>
  <h3>Initials</h3>
  <ul>
    <li>[GET] <a href="/i/MS">/i/MS</a></li>
    <li>[GET] <a href="/i/MS?s=128&tc=black&bc=yellow">/i/MS?s=128&tc=black&bc=yellow</a></li>
  </ul>
  <h3>Gravatar+Initials</h3>
  <ul>
    <li>[GET] <a href="/gi/milan@sulc.dev">/gi/milan@sulc.dev</a></li>
    <li>[GET] <a href="/gi/notfound@sulc.dev">/gi/notfound@sulc.dev</a></li>
    <li>[GET] <a href="/gi/notfound@sulc.dev?t=MS">/gi/notfound@sulc.dev?t=MS</a></li>
    <li>[GET] <a href="/gi/notfound@sulc.dev?t=MS&s=128&tc=black&bc=yellow">/gi/notfound@sulc.dev?t=MS&s=128&tc=black&bc=yellow</a></li>
  </ul>
`;
