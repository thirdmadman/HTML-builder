const fs = require('fs');
const path = require('path');

async function cpR(source, target) {
  const sourceStat = await fs.promises.stat(source);
  if (await sourceStat.isFile()) {
    await fs.promises.copyFile(source, target);
  } else {
    await fs.promises.mkdir(target);
    for (item of await fs.promises.readdir(source)) {
      cpR(path.resolve(source, item), path.resolve(target, item));
    }
  }
}
//!IMPORTANT - THIS IS NOT "fsPromises.cp()"
async function cp(source, target) {
  await fs.promises.rm(target, { recursive: true, force: true });
  cpR(source, target);
}

cp(path.resolve(__dirname, 'files'), path.resolve(__dirname, 'files-copy'));
