const language = require("../../constants/patucoConfig.js").language;
const common = require("./common.js");
const setClasses = {
  en: {
    c: common,
    query: {
      create: "Create a new project",
      select: "Select a project or create a new one: ",
      collection: "Enter the name of the class collection: ",
      inname: "\nYou need to enter a name\n",
      inum: "\nYou cannot use numbers or special characters. Javascript does not allow it on imports.\n",
      iexists: "\nA collection with that name already exists\n",
      iadd: "You can keep adding styles to the project:",
    },
  },
  es: {
    c: common,
    query: {
      create: "Crear un nuevo proyecto",
      select: "Selecciona un proyecto o crear uno nuevo: ",
      collection: "Introduce el nombre de la colección de clases: ",
      inname: "\nEs necesario introducir un nombre\n",
      inum: "\nNo se pueden utilizar números ni caracteres especiales. Javascript no lo permite en las importaciones.\n",
      iexists: "\nYa existe una colección con ese nombre\n",
      iadd: "Puedes seguir añadiendo stilos al proyecto:",
    },
  },
};

module.exports = setClasses[language];
