export function createTemplate(title: string, description: string, avatar: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HEADBADGER</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.2/dist/tailwind.min.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700">
    <style>
    * { font-family: 'Ubuntu', sans-serif; }
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

export function createTemplateChristmas(title: string, description: string, avatar: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HEADBADGER</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.2/dist/tailwind.min.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700">
    <style>
      * { font-family: 'Ubuntu', sans-serif; }
      body {
        background: url('https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-1.2.1&auto=format&w=3600&q=100') center center;
        background-size: cover;
      }
      .text-shadow {
        text-shadow: 1px 1px 1px black;
      }
    </style>
</head>
<body class="h-screen">
  <div class="h-full flex flex-col items-center justify-between relative py-4">
      <div class="text-shadow absolute top-0 left-0 m-10 font-bold text-white text-4xl">MERRY<br>CHRISTMAS</div>
      <div class="text-shadow absolute top-0 right-0 m-10 font-bold text-white text-4xl">PF 2021</div>
      <div><img style="height: 180px;" src="${avatar}"></div>
      <div class="text-shadow font-bold text-white ${cssTitle(title)}">${title}</div>
      <div class="text-shadow text-gray-300 font-medium text-2xl text-center">${description}</div>
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
