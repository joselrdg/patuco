const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const requireUncached = require("../requireUncached.js");

const pathBase = process.cwd();
const pathVariables = `${pathBase}/patuco/variables.js`;
const variables = require(fs.existsSync(pathVariables)
  ? pathVariables
  : "../../templates/styles/variables.js");

const savedPaths = require("../constants/patucoConfig.js").path;

const txt = require("./translations/setVariables.js");
const back = txt.c.back;

// preguntar si quires guardar en templates para futuros proyectos. split patbase y preguntar su quiere guardar con el nombre del
// del ultimo array o introducir nombre
const upgrade = {
  ...variables,
};

const queryParams = (type, value = []) => {
  const message = {
    variables: {
      name: "type",
      type: "list",
      message: txt.query.selectv,
      choices: Object.keys(variables),
    },
    task: {
      name: "type",
      type: "list",
      message: txt.c.select,
      choices: [txt.query.edit, txt.query.set, back],
    },
    optionsFonts: {
      name: "type",
      type: "list",
      message: txt.c.select,
      choices: [txt.query.addfont, txt.query.deletefont],
    },
    add: {
      name: "type",
      type: "input",
      message: `${txt.query.ivalue} ${value}: `,
    },
    addFont: {
      name: "type",
      type: "input",
      message: txt.query.ipath,
    },
    deleteFont: {
      name: "type",
      type: "list",
      message: txt.query.sdeletefont,
      choices: upgrade.fonts,
    },
    // dir: {
    //   name: "type",
    //   type: "list",
    //   message: "Donde buscar el directorio patucostrap: ",
    //   choices: [
    //     "node_modules",
    //     "/home/.nvm/versions/node",
    //     "/home",
    //     "Añadir ruta",
    //   ],
    // },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

const edit = async (key) => {
  if (key === "fonts") {
    const options = await queryParams("optionsFonts");
    switch (options.type) {
      case txt.query.addfont:
        const url = await queryParams("addFont");
        upgrade.fonts.push(`@import url('${url.type}')`);
        break;
      case txt.query.deletefont:
        const font = await queryParams("deleteFont");
        upgrade.fonts = upgrade.fonts.filter((item) => item !== font.type);
        break;
      default:
        break;
    }
  } else {
    const add = await queryParams("add", key);
    upgrade[key] = add.type;
  }
};

const prepareFontVariablesStr = () => {
  let fontVariablesStr = "";
  for (const key in upgrade) {
    fontVariablesStr =
      fontVariablesStr +
      `   "${key}": ${
        key === "fonts"
          ? `[\n"${upgrade[key].join('",\n"')}"\n]`
          : `"${upgrade[key]}"`
      },\n`;
  }
  return fontVariablesStr;
};

const loadVariables = async (key) => {
  const path = `${pathBase}/patuco`;
  const str = `const variables = {
      ${prepareFontVariablesStr()}};
  
module.exports = variables;
  `;

  if (!fs.existsSync(path)) {
    console.log("!fs.existsSync(path)");
    fs.mkdirSync(path, 0777);
  }
  try {
    fs.writeFileSync(pathVariables, str, { mode: 0o777 });
  } catch (err) {
    console.error(err);
  } finally {
    requireUncached(savedPaths.baseCss);
    console.log(`
  ${txt.c.createdOk}\n
  ${txt.c.created}\n
  - ${txt.c.file}: ${chalk.blue.bold("variables.js")}\n
  - ${txt.c.path}: ${chalk.blue.bold(pathVariables)}\n
  ----------------------------------\n`);
  }
};

const init = async () => {
  const task = await queryParams("task");
  switch (task.type) {
    case txt.query.edit:
      const key = await queryParams("variables");
      await edit(key.type);
      break;
    case txt.query.set:
      await loadVariables();
      break;
    case back:
      const configStyles = require("./index.js");
      configStyles.configStyles();
      break;
    default:
      break;
  }
  task.type !== back && setVariables();
};

const setVariables = async () => {
  init();
};

module.exports = { setVariables };
