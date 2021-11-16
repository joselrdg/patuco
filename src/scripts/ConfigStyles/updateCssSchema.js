const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const pathBase = `${process.cwd()}/patuco`;
const pathSchema = `${pathBase}/patucoSchema.css`;
const baseCss = require("../../templates/styles/baseCss.js");

const queryParams = () => {
  const message = {
    item: {
      name: "type",
      type: "list",
      message: "Quiere actualizar .css schema?: ",
      choices: ["Actualizar", "Cancelar"],
    },
  };
  const qs = [message.item];
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

const updateSchema = async () => {
  const fileStr = await prepareStr();
  if (!fs.existsSync(pathBase)) {
    fs.mkdirSync(pathBase, 0777);
  }
  try {
    fs.writeFileSync(pathSchema, fileStr, { mode: 0o777 });
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`
          ------ CREADO CORRECTAMENTE ------\n
          Se ha creado el siguiente elemento\n
          - Archivo: ${chalk.blue.bold("patucoSchema.css")}\n
          - Ruta: ${chalk.blue.bold(pathSchema)}\n
          ----------------------------------\n
        `);
  }
};

const updateCssSchema = (async () => {
  const option = await queryParams("typeClass");
  switch (option.type) {
    case "Actualizar":
      await updateSchema();
      break;
    case "Cancelar":
      break;
    default:
      break;
  }
})();

module.exports.updateCssSchema = updateCssSchema;
