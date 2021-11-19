const inquirer = require("inquirer");
const chalk = require("chalk");
const start = require("../../index.js");
const readClasses = require("./readClasses.js");
const setVariables = require("./setVariables");
const updateCssSchema = require("./updateCssSchema.js");
const createCSS = require("./createCss.js");
const createClasses = require("./createClasses.js");

const back = chalk.bold.italic.magentaBright("Volver");

const queryParams = () => {
  const qs = [
    {
      name: "type",
      type: "list",
      message: "Selecciona una opción: ",
      choices: [
        "Ver clases",
        "Crear clases",
        "Configurar variables",
        "Configurar animaciones",
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
    case "Ver clases":
      readClasses.readClasses();
      break;
    case "Actualizar .css schema":
      updateCssSchema.updateCssSchema();
      break;
    case "Crear archivo .css en tu proyecto":
      createCSS.createCSS();
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
