const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const pathBase = process.cwd();
const baseCss = require("../../templates/styles/baseCss.js");

const pathSchemaUser = `${pathBase}/patuco/style/patucoSchema.css`;
const patucoConfig = require("../constants/patucoConfig.js").path.patucoModule;
const pathStyleCfg = `${patucoConfig}/style/patucoSchema.css`;

const userTemplatePath = require("../constants/patucoConfig.js").path
  .userTemplate;
const mediaQueriesArr = require(fs.existsSync(
  `${userTemplatePath}/mediaQueries/mediaQueries.js`
)
  ? `${userTemplatePath}/mediaQueries/mediaQueries.js`
  : "../../templates/styles/mediaQueries.js");

const querysUsed = [];
const groupQureryStr = [];

const txt = require("./translations/updateCssSchema.js");
const back = txt.c.back;

const queryParams = (item) => {
  const message = {
    option: {
      name: "type",
      type: "list",
      message: txt.query.upgrade,
      choices: [txt.c.update, back],
    },
    // pathConfig: {
    //   name: "type",
    //   type: "list",
    //   message:
    //     "¿Quieres guardar el archivo 'patucoSchema.css' en tu proyecto?: ",
    //   choices: ["Guardar", "Ir a configuraciones"],
    // },
    pathConfig: {
      name: "type",
      type: "list",
      message: txt.query.updateon,
      choices: [
        `${txt.query.updateonpath} ${pathBase}`,
        txt.query.updateonmodule,
      ],
    },
  };
  const qs = [message[item]];
  return inquirer.prompt(qs);
};

const prepareStylesStr = async (arr) => {
  let str = "";
  for (let index = 0; index < arr.length; index++) {
    str = str + `${arr[index]};\n`;
  }
  return str;
};

const createQueryCss = (query) => {
  let str = "";
  if (query.hover) {
    str = ":hover";
  }
  //  else if (query.after) {
  //   str = "::after";
  // } else if (query.before) {
  //   str = "::before";
  // }
  return str;
};

const createPseudoElements = async (uniqueClass) => {
  const pseudoElements = uniqueClass.pseudoElement;
  let pseudoElementsStr = "";
  for (let index = 0; index < pseudoElements.length; index++) {
    const element = pseudoElements[index];
    let stylesStr = `.${uniqueClass.name}::${element.type} {\n`;
    for (let index = 0; index < element.items.length; index++) {
      const styleElement = element.items[index];
      stylesStr = stylesStr + `  ${styleElement};\n`;
    }
    stylesStr = stylesStr + "}\n\n";
    pseudoElementsStr = pseudoElementsStr + stylesStr;
  }

  return pseudoElementsStr;
};

const prepareClassesQueryStr = async (query, classStr) => {
  mediaQueriesArr.forEach((element) => {
    if (element.name === query) {
      const isQuerySaved = querysUsed.findIndex((e) => e === query);
      if (isQuerySaved > -1) {
        groupQureryStr[isQuerySaved].str =
          groupQureryStr[isQuerySaved].str + classStr;
      } else {
        console.log(chalk.bold.yellow(`\nMedia query: ${query}\n`));
        querysUsed.push(element.name);
        groupQureryStr.push({
          name: element.name,
          str: `${element.str} {\n${classStr}`,
        });
      }
    }
  });
};

const createMediaQueriesStr = async () => {
  let mediaQueriesStr = "";
  groupQureryStr.forEach((element) => {
    mediaQueriesStr = mediaQueriesStr + `${element.str}\n}\n`;
  });
  return mediaQueriesStr;
};

const prepareStr = async () => {
  let str = "";
  for (const key in baseCss) {
    str = str + `\n\n/* ${key} */\n\n`;
    const arr = baseCss[key];
    for (let index = 0; index < arr.length; index++) {
      const uniqueClass = arr[index];
      const target = uniqueClass.target ? ` ${uniqueClass.target}` : "";
      const pseudoClass = uniqueClass.pseudoClass
        ? `:${uniqueClass.pseudoClass}`
        : "";
      const pseudoElementsStr = (await uniqueClass.pseudoElement)
        ? await createPseudoElements(uniqueClass)
        : "";
      let stylesStr = "";
      if (uniqueClass.template) {
        str = str + uniqueClass.template;
      } else if (uniqueClass.items) {
        stylesStr = await prepareStylesStr(uniqueClass.items);

        if (uniqueClass.query) {
          const classStr = `.${uniqueClass.name}${target}${pseudoClass} {
${stylesStr}}\n\n${pseudoElementsStr}`;
          await prepareClassesQueryStr(uniqueClass.query, classStr);
        } else {
          str =
            str +
            `.${uniqueClass.name}${target}${pseudoClass} {
    ${stylesStr}}\n\n ${pseudoElementsStr}`;
        }
      }
    }
  }

  const mediaQueryStr = await createMediaQueriesStr();

  return str + mediaQueryStr;
};

const updateSchema = async (path) => {
  const fileStr = await prepareStr();
  try {
    fs.writeFileSync(path, fileStr, { mode: 0o777 });
  } catch (err) {
    console.error(err);
    updateCssSchema();
  } finally {
    console.log(`
 ${txt.c.createdOk}\n
 ${txt.c.created}\n
 - ${txt.c.file}: ${chalk.blue.bold("patucoSchema.css")}\n
 - ${txt.c.path}: ${chalk.blue.bold(path)}\n
 ----------------------------------\n`);
  }
  updateCssSchema();
};

const filterSelect = async () => {
  console.log(chalk.red.italic(txt.query.exists));
  const dat = await queryParams("pathConfig");
  dat.type !== txt.query.updateonmodule
    ? updateSchema(pathSchemaUser)
    : updateSchema(pathStyleCfg);
};

const createDirUser = async () => {
  !fs.existsSync(`${pathBase}/patuco`) &&
    (await fs.mkdirSync(`${pathBase}/patuco`, 0777));
  !fs.existsSync(`${pathBase}/patuco/style`) &&
    (await fs.mkdirSync(`${pathBase}/patuco/style`, 0777));
  updateSchema(pathSchemaUser);
};

const updateCssSchema = async () => {
  const option = await queryParams("option");
  if (option.type === txt.c.update) {
    const pathConfig = await queryParams("pathConfig");
    if (pathConfig.type !== txt.query.updateonmodule) {
      // const newSavePr = fs.existsSync(pathSchemaUser) ? false : true;
      // newSavePr ? createDirUser() : await updateSchema(pathSchemaUser);
      !fs.existsSync(`${pathBase}/patuco`) &&
        (await fs.mkdirSync(`${pathBase}/patuco`, 0777));
      !fs.existsSync(`${pathBase}/patuco/style`) &&
        (await fs.mkdirSync(`${pathBase}/patuco/style`, 0777));
      updateSchema(pathSchemaUser);
    } else {
      const savePr = fs.existsSync(pathSchemaUser) ? true : false;
      savePr ? filterSelect(savePr) : updateSchema(pathStyleCfg);
    }
  } else {
    const configStyles = require("./index.js");
    configStyles.configStyles();
  }
};

module.exports = { updateCssSchema };
