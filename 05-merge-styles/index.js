const fs = require('fs');
const path = require('path');

async function buildBundleCss(source, target) {
  await fs.promises.writeFile(path.resolve(target, 'bundle.css'), '');
  console.log(`Started action buildBundle in path: ${source} to target: ${target}`)
  for (item of await fs.promises.readdir(source)) {
    const itemStat = await fs.promises.stat(path.resolve(source, item));
    if (await itemStat.isFile()) {
      if (path.parse(item).ext === '.css') {
        console.log(`Found file: ${item}`);
        const data = await fs.promises.readFile(path.resolve(source, item));
        await fs.promises.appendFile(path.resolve(target, 'bundle.css'), data);
      }
    }
  }
  console.log(`Ended buildBundle in file path: ${path.resolve(target, 'bundle.css')}`);
}

buildBundleCss(path.resolve(__dirname, './styles'), path.resolve(__dirname, './project-dist'));
