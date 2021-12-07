const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const index = {
  en: {
    c: common,
    q: {
      createdir: "Create a new album",
      dirname: "Enter the name of the directory to create:",
      direxists: "\nA directory with that name already exists\n",
      createcollection: "Create dir",
      importcollection: "Import",
      exportcollection: "Export",
      injectfile: "Inject file",
      diranalyzed: "\n   The directory you are in will be analyzed\n",
      injectauto: "Inject components automatically",
      iextension:
        "Enter extension to filter by file type such as 'js' or 'html'. If you don't enter any value, all files will be scanned:",

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
      createcollection: "Crear dir",
      importcollection: "Importar",
      exportcollection: "Exportar",
      injectfile: "Inyectar archivo",
      diranalyzed: "\n   Se analizará el directorio en el que te encuentras\n",
      injectauto: "Inyectar componentes automáticamente",
      iextension:
        "Introduce extension para filtrar por tipo de archivo como por ejemplo 'js' o 'html'. Si no introduces ningún valor se analizaran todos los archivos.",

      components: "Componentes",
      views: "Vistas",
      layouts: "Diseños",
      models: "Modelos",
      others: "Comunes",
    },
  },
};

module.exports = index[language];
