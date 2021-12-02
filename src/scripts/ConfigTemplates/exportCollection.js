const queryParams = require("../common/queryParams.js");
const filewalker = require("../common/filewalker.js");
const pathBase = process.cwd();
const pathExists = require("../common/pathExists.js");
const pathTemplates = require("../constants/patucoConfig.js").path.userTemplate;
const copyFolderRecursive = require("../common/copyFolderRecursive.js");

const txt = require("./translations/exportCollectionTxt.js");

const writeFiles = async (source, target, type) => {
  console.log("Writing");
  try {
    copyFolderRecursive(source, target);
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`
  ${txt.c.createdOk}\n
----------------------------------\n`);
  }
};

const exportCollection = async (type, source) => {
  if (pathExists.pathExists(pathTemplates)) {
    // const source = await filewalker(path, {
    //   type: "directories",
    //   directoryFilter: ["!.git", "!*modules"],
    // });
    const basedir = await filewalker(pathBase, {
      type: "directories",
      directoryFilter: ["!.git", "!*modules"],
    });
    const target = await queryParams("addProp", txt.q.dir, [
      pathBase,
      ...basedir.map((e) => e.path),
    ]);
    // if (target.type === "/") {
    //   target.type = pathBase;
    // }
    await writeFiles(source, target.type, type);
    console.log("Tarea completada");
  } else {
    console.log(chalk.bold.italic.red(txt.c.ipath));
    config.config();
  }
};

module.exports = exportCollection;
