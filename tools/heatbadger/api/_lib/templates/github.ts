export function createTemplate(title: string, description: string, avatar: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HEADBADGER</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.1.2/tailwind.min.css"/>
    <style>
    html,body {
      font-family: 'Inter', sans-serif;
      font-style:  200;
      font-weight: 200;
    }
    </style>
</head>
<body class="h-screen">
  <div class="h-full flex flex-col items-center justify-between">
      <div><img style="height: 180px;" src="${avatar}"></div>
      <div class="font-bold ${cssTitle(title)}">${title}</div>
      <div class="text-gray-600 font-medium text-2xl text-center">${description}</div>
  </div>
</body>
</html>
`;
};

function cssTitle(str: string): string {
  if (str.length >= 27) {
    return 'text-4xl'
  }
  if (str.length >= 24) {
    return 'text-5xl'
  }
  return 'text-6xl';
}
