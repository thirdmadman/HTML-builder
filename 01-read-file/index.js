
var fs = require('fs');
var path = require('path');
const readFileToConsole = (pathToFile) => {
  let out = '';
  const filePath = path.resolve(__dirname,pathToFile);
  const fileStream = fs.createReadStream(filePath, 'utf8');
  fileStream.on('data', (chunk) => out += chunk).on('end', () => console.log(out));
};


readFileToConsole('./text.txt');