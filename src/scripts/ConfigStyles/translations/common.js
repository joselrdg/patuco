const chalk = require("chalk");
const language = require("../../constants/patucoConfig.js");

const common = {
  en: {
    exit: chalk.italic.redBright("Exit"),
    back: chalk.bold.italic.magentaBright("Back"),
    select: "Choose an option: ",
    continue: "Continue",
    update: "Update",
    haveadd: chalk.red.italic("\nYou have to enter a value\n"),
    updated: "The following items have been updated:",
    file: "File",
    path: "Path",
    ipath:
      "\nNo stored path found.\nPlease configure the path to your templates\n",
    createdOk: chalk.green.bold("------ CREATED CORRECTLY ------"),
    created: "The following item has been created",
    name: "Name",
  },
  es: {
    exit: chalk.italic.redBright("Salir"),
    back: chalk.bold.italic.magentaBright("Volver"),
    select: "Selecciona una opción: ",
    continue: "Continuar",
    update: "Actualizar",
    haveadd: chalk.red.italic("\nTienes que introducir un valor\n"),
    updated: "Se han actualizado los siguientes elementos:",
    file: "Archivo",
    path: "Ruta",
    ipath:
      "\nNo se encotro ruta almacenada.\nConfigura la ruta a tus plantillas\n",
    createdOk: chalk.green.bold("------ CREADO CORRECTAMENTE ------"),
    created: "Se ha creado el siguiente elemento",
    name: "Nombre",
  },
};

module.exports = common[language.language];
