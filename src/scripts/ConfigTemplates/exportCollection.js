const queryParams = require("../common/queryParams.js");
const filewalker = require("../common/filewalker.js");
const pathBase = process.cwd();
const pathExists = require("../common/pathExists.js");
const pathTemplates = require("../constants/patucoConfig.js").path.userTemplate;

const txt = require("./translations/exportCollectionTxt.js");

const writeFiles = async (path) => {
  console.log("Writing");
};

const exportCollection = async (type, path) => {
  console.log(path);
  if (pathExists.pathExists(pathTemplates)) {
    const filestocopy = await filewalker(pathBase, {
      type: "directories",
      directoryFilter: ["!.git", "!*modules"],
    });
    const basedir = await filewalker(pathBase, {
      type: "directories",
      directoryFilter: ["!.git", "!*modules"],
    });
    console.log(basedir);
    // const filestocopy =  await filewalker(
    //   pathBase,
    //   "directories",
    //   undefined,
    //   undefined,
    //   ["!.git", "!*modules"]
    // );
    // const basedir = await filewalker(
    //   pathBase,
    //   "directories",
    //   undefined,
    //   undefined,
    //   ["!.git", "!*modules"]
    // );
    // console.log(basedir);
    const option = await queryParams(
      "addProp",
      txt.q.dir,
      basedir.map((e) => e.path)
    );
    if (type === "dir") {
    }
  } else {
    console.log(chalk.bold.italic.red(txt.c.ipath));
    config.config();
  }
};

module.exports = exportCollection;
