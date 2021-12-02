const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const others = {
  en: {
    c: common,
    q: {
      gitignore: ".gitIgnore",
    },
  },
  es: {
    c: common,
    q: {
      components: "Componentes",
    },
  },
};

module.exports = others[language];