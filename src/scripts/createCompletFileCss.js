const inquirer = require("inquirer");

const queryParams = (type, choices = []) => {
  const qs = [
    {
      name: "type",
      type: "list",
      message: "Actualizar el archivo base '.css': ",
      choices: ["Actualizar", "Cancelar"],
    },
  ];
  return inquirer.prompt(qs);
};

const createCompletFileCss = (async () => {
  console.log("createCompletFileCss");
  const direcPath = await queryParams("typeClass");
})();

module.exports.createCompletFileCss = createCompletFileCss;
