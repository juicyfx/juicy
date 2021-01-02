const fs = require('fs');
const path = require('path');
const app = require('../dist/_lib/app');
const browser = require('../dist/_lib/handler/browse-handler');

const URL = 'https://iconist.vercel.app';

(async () => {

  for (vendor of app.VENDORS) {
    const result = await browser.browse({
      url: URL,
      vendor,
    });

    const readme = [`# ${vendor}`, '', ''];

    result.icons.forEach(icon => {
      readme.push(`- ![](${icon}) → ${icon}`);
    })

    fs.writeFileSync(path.resolve(__dirname, '../docs', `${vendor}.md`), readme.join('\n'));
  }
})();
