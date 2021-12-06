const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const index = {
  en: {
    c: common,
    q: {
      iextension:
        "Enter the filename, such as 'index.js', or '*' followed by the extension, such as '* .jsx' of the files you want to search. If you don't enter any value, all files will be scanned:",
    },
  },
  es: {
    c: common,
    q: {
      iextension:
        "Introduce el nombre del archivo, como por ejemplo 'index.js', o  '*'  seguida de la extension, como por ejemplo  '*.jsx' de los archivos en los que quieres buscar. Si no introduces ningún valor se analizaran todos los archivos:",
    },
  },
};

module.exports = index[language];
