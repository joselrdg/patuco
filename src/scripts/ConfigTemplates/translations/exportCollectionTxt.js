const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const others = {
  en: {
    c: common,
    q: {
      dir: "Seleccione el directorio en el que copiar los archivos. Si seleccionas '/' se copiaran en el direcctorio en el que te encuentras:",
    },
  },
  es: {
    c: common,
    q: {
      dir: "Seleccione el directorio en el que copiar los archivos. Si seleccionas '/' se copiaran en el direcctorio en el que te encuentras:",
    },
  },
};

module.exports = others[language];
