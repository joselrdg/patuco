const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const index = {
  en: {
    c: common,
    q: {
      iextension:
        "Enter the filename, such as 'index.js', or '*' followed by the extension, such as '* .jsx' of the files you want to search. If you don't enter any value, all files will be scanned:",
      itemplates:
        "Enter '*' followed by the extension, such as '* .html' of the templates you want to search for. If you don't enter any value, all templates will be searched: ",
      component: "\nThe component: ",
      inject: "\nIt will be injected into: ",
      nocomponent: "\n   No components found\n",
    },
  },
  es: {
    c: common,
    q: {
      iextension:
        "Introduce el nombre del archivo, como por ejemplo 'index.js', o  '*'  seguida de la extension, como por ejemplo  '*.jsx' de los archivos en los que quieres buscar. Si no introduces ningún valor se analizaran todos los archivos:",
      itemplates:
        "Introduce '*'  seguido de la extension, como por ejemplo  '*.html' de las plantillas que quieres buscar. Si no introduces ningún valor se buscaran todas las plantillas:",
      component: "\n  - El componente: ",
      inject: "\n  - Será inyectado en: ",
      nocomponent: "\n   No se encontraron componentes\n",
    },
  },
};

module.exports = index[language];
