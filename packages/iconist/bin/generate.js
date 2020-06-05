const fs = require('fs');
const path = require('path');
const app = require('../dist/_lib/app');
const manager = require('../dist/_lib/manager');

const URL = 'https://iconist-f3l1x.juicyfx1.now.sh';

(async () => {

  for (vendor of app.VENDORS) {
    const result = await manager.browse({
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
