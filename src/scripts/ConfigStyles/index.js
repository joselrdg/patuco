const inquirer = require("inquirer");

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
        "Salir",
      ],
    },
  ];
  return inquirer.prompt(qs);
};

const setOptions = (data) => {
  switch (data.type) {
    case "Configurar variables":
      require("./setVariables.js");
      break;
    case "Crear clases":
      require("./createClasses.js");
      break;
    case "Ver clases":
      require("./readClasses.js");
      break;
    case "Actualizar .css schema":
      require("./updateCssSchema.js");
      break;
    case "Crear archivo .css en tu proyecto":
      require("./createCss.js");
      break;
    case "Configurar animaciones":
      require("./animations.js");
      break;
    case "Salir":
      end = true;
      break;
    default:
      break;
  }
};

const configStyles = (async () => {
  setOptions(await queryParams());
})();

module.exports.configStyles = configStyles;

module.exports = { configStyles };
