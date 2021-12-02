const language = require("../constants/patucoConfig.js").language;
const common = require("../translations/common.js");
const config = {
  en: {
    c: common,
    query: {
      pathOk: "Select a path: ",
      typeClass: "Select to configure: ",
      sconfigmodule: "Configure the path to the patucostrap module",
      sconfigtm: "Configure the path of user templates",
      sconfiglan: "Configure language.",
      language: "Select a language: ",
      lanen: "English",
      lanes: "Spanish",
      searchdir: "Search directory 'patucostrap' automatically",
      searchdirhand: "Enter the path to the module manually",
      path: "Write the path to the global node_modules folder where the 'patucostrap' directory is located: ",
      patucoPath:
        "Write the path that you create closest to the global node_modules folder where the 'patucostrap/src/scripts/constants/patucoConfig.js' file is located.\nYou can try '/home/yourName/.nvm/versions/node'.\nIf you do not enter any value, it will be searched from' /home': ",
      dirFilter:
        "Enter directories with a '!' or '! *' in front, example '! .git',! * modules' in which you DO NOT want to search.\nOr the one of the directories in which you DO search example '/yourName' .\nSeparated by commas !: ",
      templatesPath:
        "Write the path to the directory where you want to save your templates: ",
      iwriteArr:
        "Something went wrong ... Check that the following paths are correct:",
      templcreate: "\nThe directory '/ patucoTemplates' has been created ",
    },
  },
  es: {
    c: common,
    query: {
      pathOk: "Selecciona una ruta: ",
      typeClass: "Selecciona para configurar: ",
      sconfigmodule: "Configurar la ruta al módulo patucostrap",
      sconfigtm: "Configurar la ruta de las plantillas del usuario",
      sconfiglan: "Configurar idioma",
      language: "Selecciona un idioma: ",
      lanen: "Ingles",
      lanes: "Español",
      searchdir: "Buscar directorio 'patucostrap' automáticamente",
      searchdirhand: "Introducir la ruta al módulo manualmente",
      path: "Escribe el path a la carpeta node_modules global donde se encuentra el directorio 'patucostrap': ",
      patucoPath:
        "Escribe el path que creas más cercano a la carpeta node_modules global donde se encuentra el archivo 'patucostrap/src/scripts/constants/patucoConfig.js'.\nPuedes probar con '/home/tuNombre/.nvm/versions/node'.\nSi no introduces ningun valor se buscara desde '/home': ",
      dirFilter:
        "Introduce directorios con un '!' o '!*' delante, ejemplo '!.git', !*modules' en los que NO quieres buscar.\nO el de los direcctorios en los que SI buscar ejemplo '/tuNombre'.\nSeparados por comas!: ",
      templatesPath:
        "Escribe la ruta al directorio donde quieres guardar tus plantillas: ",
      iwriteArr:
        "Algo salio mal... Comprueba que sean conrrectas las siguientes rutas:",
      templcreate: "\nSe ha creado el directorio '/patucoTemplates'",
    },
  },
};

module.exports = config[language];
