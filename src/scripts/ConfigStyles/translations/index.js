const language = require("../../constants/patucoConfig.js");
const common = require("./common.js");
const index = {
  en: {
    c: common,
    query: {
      choices: {
        view: "View and edit classes",
        classes: "Create classes",
        setvar: "Set variables",
        setanim: "Set animations",
        setmq: "Set media queries",
        setTp: "Configure .css template",
        createCss: "Create .css file in your project",

      },
    },
  },
  es: {
    c: common,
    query: {
      choices: {
        view: "Ver y editar clases",
        classes: "Crear clases",
        setvar: "Configurar variables",
        setanim: "Configurar animaciones",
        setmq: "Configurar media queries",
        setTp: "Actualizar plantilla .css",
        createCss: "Crear archivo .css en tu proyecto",
      },
    },
  },
};

module.exports = index[language.language];
