const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const setVariables = {
  en: {
    c: common,
    query: {
      selectv: "Select variable: ",
      search: "Search variable",
      edit: "Edit variables",
      editkey: "Edit key",
      editvalue: "Edit valor",
      create: "Create variables",
      caracteres:
        "Enter part of the name or value of an existing CSS variable:",
      set: "Set variables",
      addfont: "Add font",
      deletefont: "Delete font",
      ivalue: "Insert a value for",
      ipath: "Inserta url: ",
      sdeletefont: "Select the font to be removed: ",
      namevar:
        "Enter the name of the variable, if you want it to be a recursive variable the name must have the following structure varname_-0 / varname-k-id_-0:",
      value: "Enter the value of the variable:",
      namevarp: "Enter a Key for the variable:",
      dupli: "Duplicate variable",
      optsave: "Update stored data",
    },
  },
  es: {
    c: common,
    query: {
      selectv: "Selecciona variable: ",
      search: "Buscar variable",
      edit: "Editar variables",
      editkey: "Editar key",
      editvalue: "Editar valor",
      create: "Crear variables",
      caracteres:
        "Introduce parte del nombre o valor de una variable CSS existente:",
      set: "Establecer variables",
      addfont: "Añadir fuente",
      deletefont: "Borrar fuente",
      ivalue: "Inserta un valor para",
      ipath: "Inserta url: ",
      sdeletefont: "Selecciona la fuente que sera eliminada: ",
      namevar:
        "Introduce el nombre de la variable, si queres que sea una variable recursiva el nombre tiene que tener la siguiente estructura nombrevar_-0  /  nombrevar-k-id_-0:",
      value: "Introduce el valor de la variable:",
      namevarp: "Introduce una Key para la variable:",
      dupli: "Duplicar variable",
      optsave: "Actualizar datos almacenados",
    },
  },
};

module.exports = setVariables[language];
