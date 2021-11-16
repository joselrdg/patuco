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
      ],
    },
  ];
  return inquirer.prompt(qs);
};

const createFile = (data) => {
  switch (data.type) {
    case "Style":
      require("./scripts/ConfigStyles/index.js");
      break;

    default:
      break;
  }
};

const start = async () => {
  const a = `                                +
    *                  ___ _  
                      |x  | |            *
             +        /x  | |
                     /x  __)_)    +
    *            __./x /| / /
                (_____/ |/|/                    *
  
  `;
  const b = `
  +                                         *
              *              +\n`

  console.log(chalk.bold.cyan(a));

  msn(`\n\n
'PATUCO'`);
  console.log(chalk.bold.cyan(b));

  createFile(await queryParams());
};

module.exports = { start };
