const fs = require('fs');
const path = require('path');
const emojis = require('emoji.json');

const URL = 'https://macmoji.vercel.app';

(async () => {

  const readme = ['# macmoji', '', ''];

  for (emoji of emojis) {
    Array.from(emoji.codes.split(' ')).forEach(code => {
      readme.push(`- ![](${URL + '/' + code}) → ${emoji.char} | ${code}`);
    })
  }

  fs.writeFileSync(path.resolve(__dirname, '..', `macmoji.md`), readme.join('\n'));
})();
