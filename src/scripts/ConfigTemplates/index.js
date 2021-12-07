const chalk = require("chalk");
const config = require("../config.js");
const queryParams = require("../common/queryParams.js");
const pathExists = require("../common/pathExists.js");
const filewalker = require("../common/filewalker.js");
const exportCollection = require("./exportCollection.js");
const importCollection = require("./importCollection.js");
const injectComponent = require("./injectComponent.js");
const injectComponentAuto = require("./injectComponentAuto.js");
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

const previousDir = [];
const optionsCollection = async (patuco, path, depth, end) => {
  if (end) {
    const optionFile = await queryParams("addProp", txt.c.option, [
      txt.q.injectfile,
      txt.q.exportcollection,
    ]);
    if (optionFile.type === txt.q.exportcollection) {
      await exportCollection("file", path);
    } else {
      console.log(chalk.yellow.bold.italic(txt.q.diranalyzed));
      await injectComponent(path);
    }
    configTemplates();
  } else {
    const albumDir = await filewalker(path, { type: "directories", depth });
    const albumFile = await filewalker(path, { type: "files", depth });
    const options = patuco
      ? [chalk.green.italic(txt.q.exportcollection)]
      : [
          chalk.green.italic(txt.q.exportcollection),
          chalk.green.italic(txt.q.importcollection),
          chalk.green.italic(txt.q.createcollection),
        ];
    const optcolle = await queryParams("addProp", txt.c.option, [
      ...options,
      ...albumDir.map((e) => e.path),
      ...albumFile.map((e) => e.path),
      txt.c.back,
    ]);
    if (optcolle.type === txt.c.back) {
      if (previousDir.length < 1) {
        configTemplates();
      } else {
        const prev = previousDir[previousDir.length - 1];
        previousDir.pop();
        optionsCollection(patuco, prev);
      }
    } else if (optcolle.type === chalk.green.italic(txt.q.exportcollection)) {
      await exportCollection("dir", path);
      configTemplates();
    } else if (optcolle.type === chalk.green.italic(txt.q.createcollection)) {
      if (!patuco) {
        const dirname = await queryParams("input", txt.q.dirname);
        if (dirname.type === "") {
          console.log(txt.c.haveadd);
          optionsCollection(patuco, path);
        } else {
          await createDir(dirname.type, `${path}/${dirname.type}`);
          optionsCollection(patuco, path);
        }
      } else {
        console.log("No se puede crear dir");
        optionsCollection(patuco, path);
      }
    } else if (optcolle.type === chalk.green.italic(txt.q.importcollection)) {
      await importCollection(path);
      configTemplates();
    } else {
      if (albumDir.some((e) => e.path === optcolle.type)) {
        previousDir.push(path);
        optionsCollection(patuco, `${path}/${optcolle.type}`);
      } else {
        previousDir.push(path);
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
      chalk.yellow.italic(txt.q.injectauto),
      chalk.green.italic(txt.q.createdir),
      chalk.blue("Layouts patuco"),
      ...directoriesUser.map((e) => e.path),
      txt.c.back,
    ];
    const option = await queryParams("addProp", txt.c.option, choices);
    if (option.type === txt.c.back) {
      start.start();
    } else if (option.type === chalk.yellow.italic(txt.q.injectauto)) {
      console.log(chalk.yellow.bold.italic(txt.q.diranalyzed));
      await injectComponentAuto();
      configTemplates();
    } else if (option.type === chalk.blue("Layouts patuco")) {
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
