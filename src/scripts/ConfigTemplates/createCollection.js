const queryParams = require("../common/queryParams.js");
const pathExists = require("../common/pathExists.js");
const pathTemplates = require("../constants/patucoConfig.js").path.userTemplate;

const txt = require("./translations/createCollectionTxt.js");

const createCollection = async (path) => {
  console.log(path);
  if (pathExists.pathExists(pathTemplates)) {
    const option = await queryParams("addProp", txt.c.option, [
      ".createCollection",
    ]);
  } else {
    console.log(chalk.bold.italic.red(txt.c.ipath));
    config.config();
  }
};

module.exports = createCollection;
