const queryParams = require("../common/queryParams.js");
const pathExists = require("../common/pathExists.js");
const pathTemplates = require("../constants/patucoConfig.js").path.userTemplate;

const txt = require("./translations/importCollectionTxt.js");

const importCollection = async (path) => {
  console.log(path);
  if (pathExists.pathExists(pathTemplates)) {
    const option = await queryParams("addProp", txt.c.option, [
      ".importCollection",
    ]);
  } else {
    console.log(chalk.bold.italic.red(txt.c.ipath));
    config.config();
  }
};

module.exports = importCollection;
