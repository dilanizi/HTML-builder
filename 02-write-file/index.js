const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, '02-write-file', 'text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('Введите текст (или "exit" для завершения): ');

fs.open(filePath, 'a+', (err, fd) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  rl.prompt();

  rl.on('line', (input) => {
    if (input === 'exit') {
      console.log('Прощайте!');
      rl.close();
      process.exit(0);
    }

    fs.appendFile(fd, input + '\n', (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      console.log(`"${input}" был записан в файл.`);
      rl.prompt();
    });
  });

  rl.on('SIGINT', () => {
    console.log('Прощайте!');
    rl.close();
    process.exit(0);
  });
});
