const fs = require('fs');
const path = require('path');

const sourceFolder = './04-copy-directory/files';
const targetFolder = './04-copy-directory/files-copy';

// Функция для копирования файлов
function copyFile(source, target) {
  fs.copyFileSync(source, target);
  console.log(`${source} has been copied to ${target}`);
}

// Функция для удаления файлов
function deleteFile(target) {
  fs.unlinkSync(target);
  console.log(`${target} has been deleted`);
}

// Функция для копирования директорий
function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }
  fs.readdirSync(source).forEach(function(file) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFolderRecursive(sourcePath, targetPath);
    } else {
      copyFile(sourcePath, targetPath);
    }
  });
}

// Копирование исходной директории в целевую директорию
copyFolderRecursive(sourceFolder, targetFolder);

// Отслеживание изменений в исходной директории
fs.watch(sourceFolder, { recursive: true }, (eventType, filename) => {
  const sourcePath = path.join(sourceFolder, filename);
  const targetPath = path.join(targetFolder, filename);
  if (eventType === 'rename') {
    if (fs.existsSync(sourcePath)) {
      if (fs.lstatSync(sourcePath).isDirectory()) {
        copyFolderRecursive(sourcePath, targetPath);
      } else {
        copyFile(sourcePath, targetPath);
      }
    } else {
      deleteFile(targetPath);
    }
  } else if (eventType === 'change') {
    if (fs.existsSync(sourcePath) && !fs.lstatSync(sourcePath).isDirectory()) {
      copyFile(sourcePath, targetPath);
    }
  }
});
