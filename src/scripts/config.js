const inquirer = require("inquirer");
const readdirp = require("readdirp");
const chalk = require("chalk");
const fs = require("fs");
const pathBase = `${process.cwd()}/patuco/patucoSchema.css`;
const start = require("../index");
const patucoConfig = require("./constants/patucoConfig.js");

const txt = require("./translations/config.js");
const back = chalk.bold.italic.magentaBright("Volver");

function filewalker(
  dir = "/home/jose/.nvm/versions/node/v16.2.0/lib/node_modules",
  dirFilter = ["!.git"],
  type = "files",
  filFilter = "patucoConfig.js"
) {
  if (dir === "") {
    dir = "/home/jose/.nvm/versions/node/v16.2.0/lib/node_modules";
  }
  return new Promise((resolve) => {
    const data = [];
    readdirp(dir, {
      directoryFilter: dirFilter,
      fileFilter: filFilter,
      type: type,
      alwaysStat: true,
    })
      .on("data", (entry) => {
        const {
          path,
          stats: { size },
        } = entry;
        data.push(`${dir}/${path}`);
      })
      //   .on("warn", (error) => console.error("non-fatal error"))
      .on("error", (error) => console.error("fatal error", error))
      .on("end", () => resolve(data));
  });
}

const queryParams = (type, choices = []) => {
  const message = {
    // dat: {
    //   name: "type",
    //   type: "list",
    //   message:
    //     "Quieres actualizar el archivo patucoSchema.css en tu proyecto o el modulo patucostrap: ",
    //   choices: [
    //     `Actualizar en ${pathBase}`,
    //     "Actualizar el modulo patucostrap",
    //   ],
    // },
    pathOk: {
      name: "type",
      type: "list",
      message: txt.query.pathOk,
      choices: choices,
    },
    typeClass: {
      name: "type",
      type: "list",
      message: txt.query.typeClass,
      choices: [
        txt.query.sconfigmodule,
        txt.query.sconfigtm,
        txt.query.sconfiglan,
        back,
      ],
    },
    language: {
      name: "type",
      type: "list",
      message: txt.query.language,
      choices: [txt.query.lanen, txt.query.lanes, back],
    },
    configPaths: {
      name: "type",
      type: "list",
      message: txt.c.select,
      choices: [txt.query.searchdir, txt.query.searchdirhand, back],
    },
    path: {
      name: "type",
      type: "input",
      message: txt.query.path,
    },
    patucoPath: {
      name: "type",
      type: "input",
      message: txt.query.patucoPath,
    },
    dirFilter: {
      name: "type",
      type: "input",
      message: txt.query.dirFilter,
    },
    templatesPath: {
      name: "type",
      type: "input",
      message: txt.query.templatesPath,
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

const writeArr = async (data) => {
  if (
    !fs.existsSync(data.patucoConfigOk) ||
    !fs.existsSync(data.patucoModuleOk)
  ) {
    console.log(
      chalk.green.bold(`${txt.query.iwriteArr}
 - ${data.patucoModuleOk}
 - ${data.patucoConfigOk}
 `)
    );
  } else {
    const fileStr = `const patucoConfig = {
  path: {
    patucoModule: "${data.patucoModuleOk}",
    patucoConfig: "${data.patucoConfigOk}",
    baseCss: "${data.patucoModuleOk}/src/templates/styles/baseCss.js",
    userTemplate: ${
      data.userTemplateOk === undefined ? undefined : `"${data.userTemplateOk}"`
    }
  },
  language: "${data.languageOk}",
};

module.exports = patucoConfig;`;
    try {
      fs.writeFileSync(data.patucoConfigOk, fileStr, { mode: 0o777 });
    } catch (err) {
      console.error(err);
      init();
    } finally {
      console.log(`\n${txt.c.updatedOk}\n`);
    }
  }
};

const updateFile = async (key, path) => {
  const data = {
    patucoConfigOk: patucoConfig.path.patucoConfig,
    patucoModuleOk: patucoConfig.path.patucoModule,
    userTemplateOk:
      patucoConfig.path.userTemplate === "undefined"
        ? undefined
        : patucoConfig.path.userTemplate,
    languageOk: patucoConfig.language,
  };
  switch (key) {
    case "patucoConfig":
      const pathPatucoModuleOk = path.replace(
        "/src/scripts/constants/patucoConfig.js",
        ""
      );
      data.patucoConfigOk = path;
      data.patucoModuleOk = pathPatucoModuleOk;
      break;
    case "language":
      data.languageOk = path === "Ingles" || path === "English" ? "en" : "es";
      break;
    case "templatesPath":
      data.userTemplateOk = path;
      break;

    default:
      break;
  }

  // await
  writeArr(data);
  // init();
};

const createDirFilter = async (dirFilter) => {
  const filterArr = dirFilter.type.split(",");
  const arr = ["!.git"];
  for (let i = 0; i < filterArr.length; i++) {
    const element = filterArr[i].replace(/^ | $/, "");
    element !== "" && arr.push(element);
  }
  return arr;
};

const findPath = async () => {
  const path = await queryParams("patucoPath");
  if (!fs.existsSync(path.type) && path.type !== "") {
    console.error(txt.c.pathnoexist);
    return configPaths();
  }
  const dirFilter = await createDirFilter(await queryParams("dirFilter"));
  console.log(txt.c.searching);
  const pathsArr = await filewalker(path.type, dirFilter);
  if (pathsArr.length > 0) {
    const pathOk = await queryParams("pathOk", pathsArr);
    // return pathOk.type;
    return updateFile("patucoConfig", pathOk.type);
  } else {
    console.log(txt.c.patupathnoexist);
    return configPaths();
  }
};

const configPaths = async () => {
  const options = await queryParams("configPaths");
  switch (options.type) {
    case back:
      init();
      break;
    case txt.query.searchdir:
      findPath();
      // await updateFile("patucoConfig", pathOk);
      break;
    case txt.query.searchdirhand:
      const pathQuery = await queryParams("path");
      const path = `${pathQuery}/patucostrap`;
      if (!fs.existsSync(path)) {
        console.error(txt.c.patupathnoexist);
        configPaths();
      }
      break;
    default:
      break;
  }
};

const configLanguage = async () => {
  const language = await queryParams("language");
  language.type === back ? init() : await updateFile("language", language.type);
};

const configTemplates = async () => {
  const templatesPath = await queryParams("templatesPath");
  if (fs.existsSync(templatesPath.type)) {
    const path = `${templatesPath.type}/patucoTemplates`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, 0777);
      console.log(chalk.green.bold(txt.query.templcreate));
    }
    await updateFile("templatesPath", path);
  } else {
    console.log(chalk.red.bold(`\n${txt.c.nodir} '${templatesPath.type}'`));
    init();
  }
};

const init = async () => {
  console.log(`
  ${chalk.cyan.bold(`- ${txt.c.module}:`)} ${chalk.italic[
    patucoConfig.path.patucoModule ? "green" : "red"
  ](patucoConfig.path.patucoModule)}\n
  ${chalk.cyan.bold(`- ${txt.c.templates}:`)} ${chalk.italic[
    patucoConfig.path.userTemplate ? "green" : "red"
  ](patucoConfig.path.userTemplate)}\n
  ${chalk.cyan.bold(`- ${txt.c.language}:`)} ${chalk.green(
    patucoConfig.language === "es" ? txt.query.lanes : txt.query.lanen
  )}\n`);
  const mm = () => {
    if (!patucoConfig.path.patucoModule) {
      console.log(`${txt.c.patupathnoexist}\n${txt.c.nopatupath}`);
      return false;
    } else return true;
  };
  const options = await queryParams("typeClass");
  switch (options.type) {
    case txt.query.sconfigmodule:
      await configPaths();
      break;
    case txt.query.sconfigtm:
      mm() ? await configTemplates() : init();
      break;
    case txt.query.sconfiglan:
      mm() ? await configLanguage() : init();
      break;
    case back:
      start.start();
      break;
    default:
      break;
  }
};

const config = async () => {
  await init();
};

module.exports = { config };
