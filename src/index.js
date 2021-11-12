const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const fs = require("fs");
const pathBase = process.cwd();

const msn = (msn) => {
  console.log(
    chalk.bold.cyan(
      figlet.textSync(msn, {
        font: "ANSI Shadow",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};

const queryParams = () => {
  const qs = [
    {
      name: "type",
      type: "list",
      message: "Selecciona el tipo de elemento a crear: ",
      choices: ["Style", "Components", "Views", "Layouts", "Models", "Javascript"],
    },
  ];
  return inquirer.prompt(qs);
};

const createFile = (data) => {
  switch (data.type) {
    case "Style":
      require('./scripts/createCss.js');
      break;
  
    default:
      break;
  }
};

const start = async () => {
  msn(`
---------
'PATUCO'
---------`);
  createFile(await queryParams());
};

module.exports = { start };
