const fs = require('fs');
const path = require('path');
const emojis = require('emoji.json');

const URL = 'https://macmoji.vercel.app';

(async () => {

  const readme = ['# macmoji', '', ''];

  for (emoji of emojis) {
    const code = emoji.codes.split(' ').join('-');
    readme.push(`<div><a href="${URL + '/' + code}" target="_blank"><img src="${URL + '/' + code}" width="32" title="${emoji.char} (${code})"></a> → ${emoji.char} (${code})</div>`);
  }

  fs.writeFileSync(path.resolve(__dirname, '..', `macmoji.md`), readme.join('\n'));
})();
