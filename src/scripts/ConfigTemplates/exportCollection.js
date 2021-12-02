const queryParams = require("../common/queryParams.js");
const filewalker = require("../common/filewalker.js");
const pathBase = process.cwd();
const pathExists = require("../common/pathExists.js");
const pathTemplates = require("../constants/patucoConfig.js").path.userTemplate;

const txt = require("./translations/exportCollectionTxt.js");

const exportCollection = async (type, path) => {
  if (pathExists.pathExists(pathTemplates)) {
    const basedir = await filewalker(
      pathBase,
      "directories",
      undefined,
      undefined,
      ["!.git", "!*modules"]
    );
    console.log(basedir);
    const option = await queryParams("addProp", txt.c.option, [
      ".exportCollection",
    ]);
  } else {
    console.log(chalk.bold.italic.red(txt.c.ipath));
    config.config();
  }
};

module.exports = exportCollection;
