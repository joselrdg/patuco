const language = require("../constants/patucoConfig.js").language;
const common = require("../ConfigStyles/translations/common.js");
const index = {
  en: {
    c: common,
    query: {
      styles: "Styles",
      components: "Components",
      settings: "Settings",
    },
  },
  es: {
    c: common,
    query: {
      styles: "Estilos",
      components: "Componentes",
      settings: "Ajustes",
    },
  },
};

module.exports = index[language];
