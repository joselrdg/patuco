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
    },
  },
  es: {
    c: common,
    query: {
      welcome: "Bienvenido a",
      styles: "Estilos",
      components: "Plantillas",
      settings: "Ajustes",
    },
  },
};

module.exports = index[language];
