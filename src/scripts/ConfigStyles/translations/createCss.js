const language = require("../../constants/patucoConfig.js").language;
const common = require("../../translations/common.js");
const createCss = {
  en: {
    c: common,
    query: {
      selectdir:
        "Select the directory where the optimized css file for your project will be saved: ",
      selctdirr: "Select a directory to analyze:",
      iext: "Write the file extensions separated by ','.\nIf you don't write anything, all files will be analyzed: ",
      iupdate: "Update the .css file in your project?: ",
      ideleteone: "Remove the",
      ideletetwo: "file from your project?\nThe",
      ideletethree: "file will be kept for future modifications: ",
      sdelete: "Remove",
      scontinue: "Continue without deleting",
      ivariable: "Variable found:",
      imq: "Media query used:",
      exists: "The file exists:",
      total: "Total classes found:",
      rest: "Total classes without repeating:",
      forget: "Don't forget to import the new css file:",
      deletedfile: "\nDeleted file",
      animation: "Animation found:",
      tsclass: "Search between classes",
      tsfile: "Search the entire archive",
      foundclass: "Found class:",
    },
  },
  es: {
    c: common,
    query: {
      selectdir:
        "Selecciona el directorio donde se guardara el archivo css optimizado para tu proyecto: ",
      selctdirr: "Selecciona un directorio para analizarlo: ",
      iext: "Escribe las extensiones de los archivos separadas por ','.\nSi no escribes nada se analizaran todos los archivos: ",
      iupdate: "Actualizar el archivo .css en tu proyecto?: ",
      ideleteone: "Eliminar el archivo",
      ideletetwo: "de tu proyecto?\nEl archivo",
      ideletethree: "se mantendra para futuras modificaciones: ",
      sdelete: "Eliminar",
      scontinue: "Continuar sin eliminar",
      ivariable: "Encontrada la variable:",
      imq: "Media query usada:",
      exists: "Existe el archivo:",
      total: "Total clases encontradas:",
      rest: "Total de clases sin repetir:",
      forget: "No olvides importar el nuevo archivo css:",
      deletedfile: "\nArchivo borrado",
      animation: "Se encontro la animación:",
      tsclass: "Buscar entre clases",
      tsfile: "Buscar en el archivo completo",
      foundclass: "Encontrada clase:",
    },
  },
};

module.exports = createCss[language];
