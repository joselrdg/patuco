const queryParams = require("../common/queryParams.js");
const filewalker = require("../common/filewalker.js");
const copyFolderRecursive = require("../common/copyFolderRecursive.js");
const pathBase = process.cwd();
const pathExists = require("../common/pathExists.js");
const pathTemplates = require("../constants/patucoConfig.js").path.userTemplate;

const txt = require("./translations/importCollectionTxt.js");

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

const importCollection = async (target) => {
  if (pathExists.pathExists(pathTemplates)) {
    const option = await queryParams("addProp", txt.c.option, [
      txt.q.selectdir,
      txt.q.enterpath,
    ]);
    if (option.type === txt.q.enterpath) {
      const source = await queryParams("input", txt.q.ienterpath);
      if (dirname.type === "") {
        console.log(txt.c.haveadd);
        importCollection();
      } else if (pathExists.pathExists(source.type)) {
        await writeFiles(source.type, target);
      } else {
        console.log(txt.c.pathnoexist);
      }
    } else {
      const optiondir = await queryParams("addProp", txt.c.option, [
        txt.q.importdir,
        txt.q.importfile,
      ]);
      const base = await filewalker(pathBase, {
        directoryFilter: ["!.git", "!*modules"],
        type: optiondir.type === txt.q.importdir ? "directories" : "files",
      });
      const source = await queryParams("addProp", txt.q.dir, [
        "/",
        ...base.map((e) => e.path),
      ]);
      await writeFiles(source.type === "/" ? pathBase : source.type, target);
    }
  } else {
    console.log(chalk.bold.italic.red(txt.c.ipath));
    config.config();
  }
};

module.exports = importCollection;
