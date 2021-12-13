const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const readClasses = {
  en: {
    c: common,
    query: {
      select:
        "Select a collection of classes or search by class or property name: ",
      search: "Search by class or property name",
      isearch:
        "Write characters that may be contained in the name of a class, a property or the value of a property. If you do not enter a value, all classes will be printed: ",
      see: "See all classes",
      seaname: "Search by name",
      seaprop: "Search by property",
      edit: "Edit classes",
      iname: "Enter the new name:",
      istyle: "Enter the new property",
      deletep: "Delete property",
      editprop: "Edit a property",
      addprop: "Add a property",
    },
  },
  es: {
    c: common,

    query: {
      select:
        "Selecciona una colección de clases o busca por nombre de clase o propiedad: ",
      search: "Buscar por nombre de clase o propiedad",
      isearch:
        "Escribe caracteres que puedan estar contenidos en el nombre de una clase, una propiedad o el valor de una propiedad. Si no intruduces un valor se imprimiran todas las clase: ",
      see: "Ver todas las clases",
      seaname: "Buscar por nombre",
      seaprop: "Buscar por propiedad",
      edit: "Editar clases",
      iname: "Introduce el nuevo nombre:",
      deletep: "Eliminar propiedad",
      istyle: "Introduce la nueva propiedad",
      editprop: "Editar una propiedad",
      addprop: "Añadir una propiedad",
    },
  },
};

module.exports = readClasses[language];
