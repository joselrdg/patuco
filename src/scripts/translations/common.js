const chalk = require("chalk");
const language = require("../constants/patucoConfig.js");

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
    updatedOk: chalk.green.bold("------ UPDATED SUCCESSFULLY ------"),
    created: "The following item has been created",
    name: "Name",
    pathnoexist: chalk.red.bold("The entered path does not exist."),
    patupathnoexist: chalk.red.bold("The patucostrap directory was not found"),
    searching: chalk.bgCyan.bold("\nSearching..."),
    nodir: "Directory not found:",
    module: "Module",
    templates: "Templates",
    language: "Language",
    nopatupath: "Configure the path of the patucostrap module.",
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
    updatedOk: chalk.green.bold("------ ACTUALIZADO CORRECTAMENTE ------"),
    created: "Se ha creado el siguiente elemento",
    name: "Nombre",
    pathnoexist: chalk.red.bold("La ruta introducida no existe."),
    patupathnoexist: chalk.red.bold("\nNo se encontró el directorio patucostrap\n"),
    searching: chalk.bgCyan.bold("\nBuscando...\n"),
    nodir: "No se ha encontrado el directorio:",
    module: "Módulo",
    templates: "Plantillas",
    language: "Idioma",
    nopatupath: "Configura la ruta del módulo patucostrap.",
  },
};

module.exports = common[language.language];
