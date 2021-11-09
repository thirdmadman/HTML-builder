const fs = require('fs');
const { resolve, parse } = require('path');

async function getFilesInfoInPath(folderPath) {
  const items = await fs.promises.readdir(folderPath);
  if (items.length) {
    for (let item of items) {
      const fileInfo = await fs.promises.stat(resolve(folderPath, item));
      if (fileInfo.isFile()) {
        console.log(`${parse(item).name} - ${parse(item).ext.slice(1)} - ${fileInfo.size > 1024 ? (fileInfo.size / 1024).toFixed(2) + 'kb' : fileInfo.size + 'b'}`);
      }
    }
  }
}

getFilesInfoInPath(resolve(__dirname, './secret-folder'));
