export function createTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>ZEIT</title>
    <style>
        #badge {
          max-width: 350px;
          padding: 30px;
        }

        .badge {
            color: #5a1ab5;
            border: 1px solid #5a1ab5;
            box-shadow: 8px 8px 0px 0px #5a1ab5;
        }

        .badge .inner {
            padding: 15px;
        }
    </style>
</head>
<body>
<div id="badge">
  <div class="badge">
    <div class="inner">
      ${content}
    </div>
  </div>
</div>
</body>
</html>
`;
};
