const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const outputFile = path.join(__dirname, 'project-dist', 'bundle.css');

const cssFiles = fs.readdirSync(stylesFolder)
  .filter(file => path.extname(file) === '.css')
  .map(file => path.join(stylesFolder, file));

const cssContents = cssFiles.map(file => fs.readFileSync(file)).join('\n');

fs.writeFileSync(outputFile, cssContents);
