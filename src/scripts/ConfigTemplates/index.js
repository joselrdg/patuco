const chalk = require("chalk");
const queryParams = require("../common/queryParams.js");
const pathExists = require("../common/pathExists.js");
const filewalker = require("../common/filewalker.js");
const createCollection = require("./createCollection.js");
const exportCollection = require("./exportCollection.js");
const importCollection = require("./importCollection.js");
const pathTemplates = require("../constants/patucoConfig.js").path.userTemplate;
const patucoModule = require("../constants/patucoConfig.js").path.patucoModule;
const patucoLayoutsPath = `${patucoModule}/src/templates/layouts`;
const pathLayouts = `${pathTemplates}/layouts`;
const start = require("../../index.js");

const txt = require("./translations/indexTxt.js");

const createDir = (name, newPath) => {
  if (pathExists.pathExists(newPath)) {
    console.log(chalk.red.italic(txt.q.direxists));
  } else {
    pathExists.createDirectory(newPath);
    console.log(`
${txt.c.createdOk}\n
${txt.c.created}\n
- ${txt.c.file}: ${chalk.blue.bold(name)}\n
- ${txt.c.path}: ${chalk.blue.bold(newPath)}\n
----------------------------------\n`);
  }
};

const optionsCollection = async (patuco, path, depth, end) => {
  if (end) {
    await exportCollection("file", path);
    configTemplates();
  } else {
    const albumDir = await filewalker(path, { type: "directories", depth });
    const albumFile = await filewalker(path, { type: "files", depth });
    const options = patuco
      ? [chalk.green.italic(txt.q.exportcollection)]
      : [
          chalk.green.italic(txt.q.exportcollection),
          chalk.green.italic(txt.q.createcollection),
          chalk.green.italic(txt.q.importcollection),
        ];
    const optcolle = await queryParams("addProp", txt.c.option, [
      ...options,
      ...albumDir.map((e) => e.path),
      ...albumFile.map((e) => e.path),
      txt.c.back,
    ]);
    if (optcolle.type === txt.c.back) {
      configTemplates();
    } else if (optcolle.type === chalk.green.italic(txt.q.exportcollection)) {
      await exportCollection("dir", path);
      configTemplates();
    } else if (optcolle.type === chalk.green.italic(txt.q.createcollection)) {
      await createCollection(path);
      configTemplates();
    } else if (optcolle.type === chalk.green.italic(txt.q.importcollection)) {
      await importCollection(path);
      configTemplates();
    } else {
      if (albumDir.some((e) => e.path === optcolle.type)) {
        console.log("some true");
        optionsCollection(patuco, `${path}/${optcolle.type}`);
      } else {
        console.log("some false");
        optionsCollection(patuco, `${path}/${optcolle.type}`, undefined, true);
      }
    }
  }
};

const configTemplates = async () => {
  if (pathExists.pathExists(pathTemplates)) {
    pathExists.createDirectory(pathLayouts);
    const directoriesUser = await filewalker(pathLayouts, {
      type: "directories",
      depth: 0,
    });
    const directoriesPatuco = await filewalker(patucoLayoutsPath, {
      type: "directories",
      depth: 0,
    });
    const choices = [
      chalk.green.italic(txt.q.createdir),
      chalk.blue.italic("Layouts patuco"),
      ...directoriesUser.map((e) => e.path),
      txt.c.back,
    ];
    const option = await queryParams("addProp", txt.c.option, choices);
    if (option.type === txt.c.back) {
      start.start();
    } else if (option.type === chalk.blue.italic("Layouts patuco")) {
      const optionDirPatu = await queryParams(
        "addProp",
        txt.c.option,
        directoriesPatuco.map((e) => e.path),
        txt.c.back
      );
      if (optionDirPatu.type === txt.c.back) {
        configTemplates();
      } else {
        optionsCollection(
          true,
          `${patucoLayoutsPath}/${optionDirPatu.type}`,
          0
        );
      }
    } else if (option.type === chalk.green.italic(txt.q.createdir)) {
      const dirname = await queryParams("input", txt.q.dirname);
      if (dirname.type === "") {
        console.log(txt.c.haveadd);
        configTemplates();
      } else {
        const newPath = `${pathLayouts}/${dirname.type}`;
        createDir(dirname.type, newPath);
        configTemplates();
      }
    } else {
      optionsCollection(false, `${pathLayouts}/${option.type}`, 0);
    }
  } else {
    console.log(chalk.bold.italic.red(txt.c.ipath));
    config.config();
  }
};

module.exports = { configTemplates };
