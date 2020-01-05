export const USAGE = `
  <h1>Server Error</h1>
  <p>Invalid usage.</p>
  <h3>Gravatar</h3>
  <ul>
    <li><code>[GET] /g/milan@sulc.dev</code></li>
    <li><code>[GET] /g/milan@sulc.dev?s=128&d=retro</code></li>
  </ul>
  <h3>Initials</h3>
  <ul>
    <li><code>[GET] /i/MS</code></li>
    <li><code>[GET] /i/MS?s=128&tc=black&bc=yellow</code></li>
  </ul>
  <h3>Gravatar+Initials</h3>
  <ul>
    <li><code>[GET] /gi/milan@sulc.dev?t=MS</code></li>
    <li><code>[GET] /gi/milan@sulc.dev?t=MS&s=128&tc=black&bc=yellow</code></li>
  </ul>
`;
