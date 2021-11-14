const inquirer = require("inquirer");
const baseCss = require("../../templates/styles/baseCss.js");

const queryParams = (type, choices = []) => {
  const message = {
    typeFile: {
      name: "file",
      type: "input",
      message:
        "Escribe las extensiones de los archivos separadas por ',' si no escribes nada se analizaran todos los archivos: ",
    },
    typeClass: {
      name: "type",
      type: "list",
      message: "Selecciona el directorio a analizar: ",
      choices: ["class", "className"],
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};


const setVariables = (async () => {
  console.log('setVariables')
  const direcPath = await queryParams("typeClass");
})();

module.exports.setVariables = setVariables;
