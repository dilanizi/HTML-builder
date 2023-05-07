const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const filesOnly = [];

  const checkFile = (fileName, callback) => {
    const filePath = path.join(secretFolderPath, fileName);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        callback(err);
        return;
      }
      if (stats.isFile()) {
        filesOnly.push(fileName);
      }
      callback();
    });
  };

  const checkAllFiles = (index) => {
    if (index === files.length) {
      printFilesInfo();
      return;
    }
    checkFile(files[index], (err) => {
      if (err) {
        console.error(err);
        return;
      }
      checkAllFiles(index + 1);
    });
  };

  const printFilesInfo = () => {
    filesOnly.forEach(fileName => {
      const filePath = path.join(secretFolderPath, fileName);
      const { name, ext } = path.parse(filePath);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        const fileSize = (stats.size / 1024).toFixed(3);
        console.log(`${name}-${ext.substr(1)}-${fileSize}kb`);
      });
    });
  };

  checkAllFiles(0);
});
