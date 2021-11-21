const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const pathBase = process.cwd();
// const baseCss = require("../../templates/styles/baseCss.js");

const pathSchemaUser = `${pathBase}/patuco/style/patucoSchema.css`;
const patucoConfig = require("../constants/patucoConfig.js").path.patucoModule;
const pathStyleCfg = `${patucoConfig}/style/patucoSchema.css`;

const baseCssPath = require("../constants/patucoConfig.js").path.baseCss;

// const baseCssPath = `${patucoModulePath}/src/templates/styles/baseCss.js`;
const requireUncached = require("../requireUncached.js");

const baseCss = requireUncached(baseCssPath);

const back = chalk.bold.italic.magentaBright("Volver");

const queryParams = (item) => {
  const message = {
    option: {
      name: "type",
      type: "list",
      message: "Quiere actualizar .css schema?: ",
      choices: ["Actualizar", back],
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
      message:
        "Quieres actualizar el archivo patucoSchema.css en tu proyecto o el modulo patucostrap: ",
      choices: [
        `Actualizar en ${pathBase}`,
        "Actualizar el modulo patucostrap",
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

const prepareStr = async () => {
  let str = "";
  for (const key in baseCss) {
    str = str + `\n\n/* ${key} */\n\n`;
    const arr = baseCss[key];
    for (let index = 0; index < arr.length; index++) {
      const target = arr[index].target ? ` ${arr[index].target}` : "";
      const queryCss = createQueryCss(arr[index]);
      let stylesStr = "";
      if (arr[index].other) {
        str = str + arr[index].other;
      } else if (arr[index].items) {
        stylesStr = await prepareStylesStr(arr[index].items);
        str =
          str +
          `.${arr[index].name}${target}${queryCss} {
  ${stylesStr}}\n\n`;
      }
    }
  }
  return str;
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
 ------ CREADO CORRECTAMENTE ------\n
 Se ha creado el siguiente elemento\n
 - Archivo: ${chalk.blue.bold("patucoSchema.css")}\n
 - Ruta: ${chalk.blue.bold(path)}\n
 ----------------------------------\n`);
  }
  updateCssSchema();
};

const filterSelect = async () => {
  console.log(
    chalk.red.italic(
      "Existe el archivo /patuco/style/patucoSchema.css en tu proyecto..."
    )
  );
  const dat = await queryParams("pathConfig");
  dat.type !== "Actualizar el modulo patucostrap"
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
  if (option.type === "Actualizar") {
    const pathConfig = await queryParams("pathConfig");
    if (pathConfig.type !== "Actualizar el modulo patucostrap") {
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
