import markdownit from "markdown-it";

export function createTemplate(text: string): string {
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true
  });

  const result = md.render(text);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://unpkg.com/github-markdown-css@4.0.0/github-markdown.css" rel="stylesheet" />
</head>
<style>
body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
</style>
</head>
<body>
  <article class="markdown-body">${result}</article>
</body>
</html>
`;
};
