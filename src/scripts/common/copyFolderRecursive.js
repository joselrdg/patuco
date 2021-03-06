const fs = require("fs");
const path = require("path");

function copyFileSync(source, target) {
  let targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
  console.log(`\n- Copied file: ${targetFile}`);
}

function copyFolderRecursive(source, target) {
  let files = [];
  //check if folder needs to be created or integrated
  const targetFolder = path.join(target, path.basename(source));

  if (!fs.existsSync(targetFolder) && fs.lstatSync(source).isDirectory()) {
    fs.mkdirSync(targetFolder);
    console.log(`\n- Created directory: ${targetFolder}`);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursive(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  } else {
    copyFileSync(source, target);
  }
}

module.exports = copyFolderRecursive;
