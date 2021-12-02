const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const index = {
  en: {
    c: common,
    q: {
      createdir: "Create a new album",
      dirname: "Enter the name of the directory to create:",
      direxists: "\nA directory with that name already exists\n",
      createcollection: "Create a new collection",
      importcollection: "Import collection",
      exportcollection: "Export collection",

      components: "Components",
      views: "Views",
      layouts: "Layouts",
      models: "Models",
      others: "Common",
    },
  },
  es: {
    c: common,
    q: {
      createdir: "Crear un nuevo álbum",
      dirname: "Introduce el nombre del directorio a crear:",
      direxists: "\nYa existe un directorio con ese nombre\n",
      createcollection: "Crear una nueva colección",
      importcollection: "Importar colección",
      exportcollection: "Exportar colección",

      components: "Componentes",
      views: "Vistas",
      layouts: "Diseños",
      models: "Modelos",
      others: "Comunes",
    },
  },
};

module.exports = index[language];
