const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const updateCssSchema = {
  en: {
    c: common,
    query: {
      upgrade: "Do you want to update the CSS templates ?: ",
      updateon:
        "Do you want to update the patucoSchema.css file in your project or the patucostrap module: ",
      updateonpath: "Update in",
      updateonmodule: "Update the patucostrap module",
      exists: "The file /patuco/patucoSchema.css exists in your project ...",
    },
  },
  es: {
    c: common,
    query: {
      upgrade: "Quieres actualizar la plantillas de CSS?: ",
      updateon:
        "Quieres actualizar el archivo patucoSchema.css en tu proyecto o el modulo patucostrap: ",
      updateonpath: "Actualizar en",
      updateonmodule: "Actualizar el módulo patucostrap",
      exists: "Existe el archivo /patuco/patucoSchema.css en tu proyecto...",
    },
  },
};

module.exports = updateCssSchema[language];
