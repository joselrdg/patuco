const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const config = require("../config.js");
const pathUser = require("../constants/patucoConfig.js").path.userTemplate;

const back = chalk.bold.italic.magentaBright("Volver\n");

const queryParams = (type, choices = []) => {
  const message = {
    init: {
      name: "type",
      type: "list",
      message: "Selecciona el directorio a analizar: ",
      choices: ["Añadir clase", back],
    },
    typeFile: {
      name: "file",
      type: "input",
      message:
        "Escribe las extensiones de los archivos separadas por ',' si no escribes nada se analizaran todos los archivos: ",
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

const createClasses = async () => {
  const exists = fs.existsSync(pathUser);
  if (pathUser && exists) {
    const queryInit = await queryParams("init");
    if (queryInit === "Añadir clase") {
    } else {
      const configStyles = require("./index.js");
      configStyles.configStyles();
    }
  } else if (pathUser && !exists) {
    console.log(
      chalk.bold.italic.red(
        "\nNo se encotro el direcctorio el el path guardado.\nConfigura el path de tus plantillas\n"
      )
    );
    config.config();
  } else {
    console.log(
      chalk.bold.italic.red(
        "\nNo se encotro ruta almacenada.\nConfigura la ruta a tus plantillas\n"
      )
    );
    config.config();
  }
  // const direcPath = await queryParams("typeClass");
};

module.exports = { createClasses };
