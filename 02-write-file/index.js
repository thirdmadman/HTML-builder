const { createWriteStream } = require('fs');
var path = require('path');
const { exit } = require('process');
const process = require('process');

const fileStream = createWriteStream(path.resolve(__dirname, 'text.txt'));
console.log(
  `${'='.repeat(
    20
  )}\nWelcome to nodeJS comandline text writer.\nTo exit use combination "CTRL + C" or type "exit" on new line\nInput your text here\n${'='.repeat(20)}`
);

const handle = () => {
  fileStream.close();
  console.log(`\n${'='.repeat(20)}\nExiting...`);
  exit();
};

process.stdin.on('data', (data) => {
  if (data.toString().trim() == 'exit') return handle();
  fileStream.write(data.toString().trim() + '\n');
});

process.on('SIGTERM', handle);
process.on('SIGINT', handle);
