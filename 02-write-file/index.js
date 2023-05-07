const fs = require('fs');
const readline = require('readline');

const filePath = './02-write-file/output.txt';

fs.access('./02-write-file', (err) => {
  if (err) {
    fs.mkdir('./02-write-file', (err) => {
      if (err) {
        console.error(`Ошибка при создании папки: ${err.message}`);
        process.exit(1);
      }
      start();
    });
  } else {
    start();
  }
});

function start() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.setPrompt('Введите текст (для выхода наберите exit): ');
  rl.prompt();

  rl.on('line', (input) => {
    if (input === 'exit') {
      console.log('Выход');
      rl.close();
      process.exit(0);
    }
    fs.appendFile(filePath, input + '\n', (err) => {
      if (err) {
        console.error(`Ошибка при записи в файл: ${err.message}`);
        rl.close();
        process.exit(1);
      }
      console.log(`Текст "${input}" добавлен в файл ${filePath}`);
      rl.prompt();
    });
  });

  rl.on('close', () => {
    console.log('Выход');
    process.exit(0);
  });
}
