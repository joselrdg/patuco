const language = require("../../constants/patucoConfig.js").language;
const common = require("./common.js");
const setVariables = {
  en: {
    c: common,
    query: {
      selectv: "Select variable: ",
      edit: "Edit variables",
      set: "Set variables",
      addfont: "Add font",
      deletefont: "Delete font",
      ivalue: "Insert a value for",
      ipath: "Inserta url: ",
      sdeletefont: "Select the font to be removed: ",
    },
  },
  es: {
    c: common,
    query: {
      selectv: "Selecciona variable: ",
      edit: "Editar variables",
      set: "Establecer variables",
      addfont: "Añadir fuente",
      deletefont: "Borrar fuente",
      ivalue: "Inserta un valor para",
      ipath: "Inserta url: ",
      sdeletefont: "Selecciona la fuente que sera eliminada: ",
    },
  },
};

module.exports = setVariables[language];
