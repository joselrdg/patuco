const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const requireUncached = require("../requireUncached.js");

const pathBase = process.cwd();
const pathVariables = `${pathBase}/patuco/variables.js`;
const variables = require(fs.existsSync(pathVariables)
  ? pathVariables
  : "../../templates/styles/variables.js");

const back = chalk.bold.italic.bgBlackBright("Volver");

const savedPaths = require("../constants/patucoConfig.js").path;

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
      message: "Selecciona variable: ",
      choices: Object.keys(variables),
    },
    task: {
      name: "type",
      type: "list",
      message: "Selecciona opción: ",
      choices: ["Editar variables", "Set variables", back],
    },
    optionsFonts: {
      name: "type",
      type: "list",
      message: "Selecciona: ",
      choices: ["Añadir fuente", "Borrar fuente"],
    },
    add: {
      name: "type",
      type: "input",
      message: `Inserta un valor para ${value}: `,
    },
    addFont: {
      name: "type",
      type: "input",
      message: "Inserta url: ",
    },
    deleteFont: {
      name: "type",
      type: "list",
      message: "Selecciona la fuente que sera eliminada: ",
      choices: upgrade.fonts,
    },
    dir: {
      name: "type",
      type: "list",
      message: "Donde buscar el directorio patucostrap: ",
      choices: [
        "node_modules",
        "/home/.nvm/versions/node",
        "/home",
        "Añadir ruta",
      ],
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

const edit = async (key) => {
  if (key === "fonts") {
    const options = await queryParams("optionsFonts");
    switch (options.type) {
      case "Añadir fuente":
        const url = await queryParams("addFont");
        upgrade.fonts.push(`@import url('${url.type}')`);
        break;
      case "Borrar fuente":
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
    //mirar sii es naecaria esta actualizacion
    // requireUncached(`${savedPaths.patucoModule}/src/templates/styles/root.js`);
    requireUncached(savedPaths.baseCss);
    console.log(`
  ------ CREADO CORRECTAMENTE ------\n
  Se ha creado el siguiente elemento\n
  - Tipo: ${chalk.blue.bold("variables.js")}\n
  - Ruta: ${chalk.blue.bold(pathVariables)}\n
  ----------------------------------\n`);
  }
};

const init = async () => {
  const task = await queryParams("task");
  switch (task.type) {
    case "Editar variables":
      const key = await queryParams("variables");
      await edit(key.type);
      break;
    case "Set variables":
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
