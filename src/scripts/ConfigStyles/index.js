const inquirer = require("inquirer");
const chalk = require("chalk");
const start = require("../../index.js");
// const readClasses = require("./readClasses.js");
const setVariables = require("./setVariables");
// const updateCssSchema = require("./updateCssSchema.js");
// const createCSS = require("./createCss.js");
const createClasses = require("./createClasses.js");
const createMediaQ = require("./createMediaQ.js");


const patucoModulePath = require("../constants/patucoConfig.js").path
  .patucoModule;
const readClassesPath = `${patucoModulePath}/src/scripts/ConfigStyles/readClasses.js`;
const updateCssSchemaPath = `${patucoModulePath}/src/scripts/ConfigStyles/updateCssSchema.js`;
const createCSSPath = `${patucoModulePath}/src/scripts/ConfigStyles/createCss.js`;
const requireUncached = require("../requireUncached.js");

const back = chalk.bold.italic.magentaBright("Volver");

const queryParams = () => {
  const qs = [
    {
      name: "type",
      type: "list",
      message: "Selecciona una opción: ",
      choices: [
        "Ver/Editar clases",
        "Crear clases",
        "Configurar variables",
        "Configurar animaciones",
        "Configurar media queries",
        "Actualizar .css schema",
        "Crear archivo .css en tu proyecto",
        back,
      ],
    },
  ];
  return inquirer.prompt(qs);
};

const setOptions = (data) => {
  switch (data.type) {
    case "Configurar variables":
      setVariables.setVariables();
      break;
    case "Crear clases":
      createClasses.createClasses();
      break;
    case "Ver/Editar clases":
      const readClasses = requireUncached(readClassesPath);
      readClasses.readClasses();
      break;
    case "Actualizar .css schema":
      const updateCssSchema = requireUncached(updateCssSchemaPath);
      updateCssSchema.updateCssSchema();
      break;
    case "Crear archivo .css en tu proyecto":
      const createCSS = requireUncached(createCSSPath);
      createCSS.createCSS();
      break;
    case "Configurar media queries":
      createMediaQ.createMediaQ();
      break;
    case "Configurar animaciones":
      require("./animations.js");
      break;
    case back:
      start.start();
      break;
    default:
      break;
  }
};

const configStyles = async () => {
  setOptions(await queryParams());
};

// module.exports.configStyles = configStyles;

module.exports = { configStyles };
