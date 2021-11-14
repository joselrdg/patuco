const inquirer = require("inquirer");
let end = false;

const queryParams = () => {
  const qs = [
    {
      name: "type",
      type: "list",
      message: "Selecciona una opción: ",
      choices: [
        "Configurar variables",
        "Crear clases",
        "Ver clases",
        "Crear archivo .css",
        "Animaciones",
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
    case "Crear archivo .css":
      require("./createCss.js");
      break;
    case "Animaciones":
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
  while (!end) {
    setOptions(await queryParams());
  }
})();

module.exports.configStyles = configStyles;

module.exports = { configStyles };
