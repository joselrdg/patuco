const language = require("../constants/patucoConfig.js").language;
const common = require("../translations/common.js");
const index = {
  en: {
    c: common,
    query: {
      welcome: "Welcome to",
      styles: "Styles",
      components: "Templates",
      settings: "Settings",
      import: "Import in",
    },
  },
  es: {
    c: common,
    query: {
      welcome: "Bienvenido a",
      styles: "Estilos",
      components: "Plantillas",
      settings: "Ajustes",
      import: "Importar en",
    },
  },
};

module.exports = index[language];
