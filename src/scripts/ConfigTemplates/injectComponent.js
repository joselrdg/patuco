const fs = require("fs");
const chalk = require("chalk");
const queryParams = require("../common/queryParams.js");
const filewalker = require("../common/filewalker.js");
const copyFolderRecursive = require("../common/copyFolderRecursive.js");
const pathBase = process.cwd();
const pathExists = require("../common/pathExists.js");
const pathTemplates = require("../constants/patucoConfig.js").path.userTemplate;

const txt = require("./translations/injectComponentTxt.js");

const writeFiles = async (file, component, fileComponentName, targetFile) => {
  console.log("Writing...");
  try {
    const dataFile = file.replace(fileComponentName, component);
    fs.writeFileSync(targetFile, dataFile);
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`
  ${txt.c.createdOk}\n
----------------------------------\n`);
  }
};

const injectComponent = async (path) => {
  if (pathExists.pathExists(path)) {
    const fileComponentName = `<_p(${path.split("/").pop()})p_>`;
    const component = await fs.readFileSync(path, "utf-8");
    console.log(component);
    const options = { type: "files", directoryFilter: ["!.git"] };
    const filter = await queryParams("input", txt.q.iextension);
    if (filter.type !== "") {
      options.fileFilter = filter.type;
    }
    const files = await filewalker(pathBase, options);
    for (let i = 0; i < files.length; i++) {
      const filePath = pathBase + "/" + files[i].path;
      const file = await fs.readFileSync(filePath, "utf-8");
      if (file.includes("<_p()p_>")) {
        console.log(
          "\nComponente: " +
            chalk.blue.bold("<_p()p_>") +
            "\nEncontrado en: " +
            chalk.green.italic(filePath) +
            "\n"
        );
        await writeFiles(file, component, "<_p()p_>", filePath);
      } else if (file.includes(fileComponentName)) {
        console.log(
          "\nComponente: " +
            chalk.blue.bold(fileComponentName) +
            "\nEncontrado en: " +
            chalk.green.italic(filePath) +
            "\n"
        );
        await writeFiles(file, component, fileComponentName, filePath);
      }
    }
  } else {
    console.log("No existe el path: " + path);
  }
};

module.exports = injectComponent;
