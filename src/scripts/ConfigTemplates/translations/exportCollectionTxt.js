const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const others = {
  en: {
    c: common,
    q: {
      dir: "Select the destination directory where the files will be copied:",
    },
  },
  es: {
    c: common,
    q: {
      dir: "Seleccione el directorio de destino en el que se copiaran los archivos:",
    },
  },
};

module.exports = others[language];
