const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("./scripts/constants/patucoConfig.js").path;
const txt = require("./scripts/translations/index.js");

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
      message: txt.c.select,
      choices: [
        txt.query.styles,
        txt.query.components,
        // "Views",
        // "Layouts",
        // "Models",
        "Javascript",
        txt.query.settings,
        txt.c.exit,
      ],
    },
  ];
  return inquirer.prompt(qs);
};

const createFile = (data) => {
  switch (data.type) {
    case txt.query.styles:
      const configStyles = require("./scripts/ConfigStyles/index.js");
      configStyles.configStyles();
      break;
    case txt.query.components:
      const configTemplates = require("./scripts/ConfigTemplates/index.js");
      configTemplates.configTemplates();
      break;
    case txt.query.settings:
      const config = require("./scripts/config.js");
      config.config();
      break;
    default:
      break;
  }
};

const start = async () => {
  const a = `\n                         +               *
           *                    ___ _               +
                               |x  | |          
                   +           /x  | |     
                              /x  __)_)       +
          *               __./x /| / /
                         (_____/ |/|/                  *
        
                +                         *
          `;
  const b = `                     +                 *
            +                                         *
                        *              
                                          +\n`;

  console.log(chalk.bold.cyan(b));
  msn(`\n\n
'shoehorn'`);
  console.log(chalk.bold.cyan(a));

  msn(`\n\n
'  patuco'`);
  console.log(chalk.bold.cyan(b));
  console.log(
    chalk.bold.green(
      chalk.bold.yellow("                 *  ") + txt.query.welcome
    ) +
      " " +
      chalk.bold.magenta("PATUCO") +
      chalk.bold.yellow("  *\n")
  );

  if (
    !fs.existsSync(path.patucoConfig) ||
    !fs.existsSync(path.patucoModule) ||
    !fs.existsSync(path.baseCss)
  ) {
    console.log(chalk.bold.italic.red(txt.c.select));
    const config = require("./scripts/config.js");
    config.config();
  } else {
    createFile(await queryParams());
  }
};

module.exports = { start };
