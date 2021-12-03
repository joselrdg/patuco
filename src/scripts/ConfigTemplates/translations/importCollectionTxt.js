const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const others = {
  en: {
    c: common,
    q: {
      selectdir: "Select file or directory to import",
      enterpath: "Enter path to file or directory manually",
      ienterpath: "Enter the path to the file or directory to import",
      importdir: "Import directory",
      importfile: "Import file",
    },
  },
  es: {
    c: common,
    q: {
      selectdir: "Seleccionar archivo o directorio a importar",
      enterpath: "Introducir ruta al archivo o directorio manualmente",
      ienterpath: "Introduce la ruta al archivo o directorio a importar",
      importdir: "Importar directorio",
      importfile: "Importar archivo",
    },
  },
};

module.exports = others[language];
