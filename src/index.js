const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");

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
      choices: [
        "Style",
        "Components",
        "Views",
        "Layouts",
        "Models",
        "Javascript",
        "Config",
        chalk.italic.redBright("Salir\n"),
      ],
    },
  ];
  return inquirer.prompt(qs);
};

const createFile = (data) => {
  switch (data.type) {
    case "Style":
      const configStyles = require("./scripts/ConfigStyles/index.js");
      configStyles.configStyles()
      break;
    case "Config":
      const config = require("./scripts/config.js");
      config.config();
      break;

    default:
      break;
  }
};

const start = async () => {
  const a = `\n                 +               *
   *                    ___ _               +
                       |x  | |          
           +           /x  | |     
                      /x  __)_)       +
  *               __./x /| / /
                 (_____/ |/|/                  *

  `;
  const b = `                     +
  +                                         *
              *              
                                +\n`;

  console.log(chalk.bold.cyan(a));

  msn(`\n\n
'PATUCO'`);
  console.log(chalk.bold.cyan(b));

  createFile(await queryParams());
};

module.exports = { start };
