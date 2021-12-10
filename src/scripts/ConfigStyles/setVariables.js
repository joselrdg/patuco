const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const requireUncached = require("../common/requireUncached.js");
const configStyles = require("./index.js");
const pathBase = process.cwd();
const pathVariables = `${pathBase}/patuco/variables.js`;
const variables = require(fs.existsSync(pathVariables)
  ? pathVariables
  : "../../templates/styles/variables.js");

const pathUserVar =
  require("../../scripts/constants/patucoConfig.js").path.userTemplate +
  "/variables";

const userVariables = require(fs.existsSync(pathUserVar)
  ? pathUserVar + "/CSSvariables.js"
  : "../../templates/styles/uservar.js");

const patucoVar = require("../../templates/styles/patucoVariables.js");
const userPatucoVar = fs.existsSync(pathUserVar + "/PATUvariables.js")
  ? require(pathUserVar + "/PATUvariables.js")
  : [];

const savedPaths = require("../constants/patucoConfig.js").path;

const txt = require("./translations/setVariables.js");
const back = txt.c.back;

// preguntar si quires guardar en templates para futuros proyectos. split patbase y preguntar su quiere guardar con el nombre del
// del ultimo array o introducir nombre
const upgrade = {
  ...variables,
};

const upgradeUserVar = {
  ...userVariables,
};

const queryParams = (type, value = []) => {
  const message = {
    variables: {
      name: "type",
      type: "list",
      message: txt.query.selectv,
      choices: value,
    },
    task: {
      name: "type",
      type: "list",
      message: txt.c.select,
      choices: [
        txt.query.search,
        txt.query.edit,
        txt.query.create,
        txt.query.set,
        back,
      ],
    },
    search: {
      name: "type",
      type: "list",
      message: txt.c.select,
      choices: ["Patuco variables", "CSS variables", back],
    },
    optsave: {
      name: "type",
      type: "list",
      message: txt.c.select,
      choices: [txt.query.optsave, back],
    },
    select: {
      name: "type",
      type: "list",
      message: txt.c.select,
      choices: [txt.query.editvalue, txt.query.dupli, txt.query.editkey, back],
    },
    namevarp: {
      name: "type",
      type: "input",
      message: txt.query.namevarp,
    },
    caracteres: {
      name: "type",
      type: "input",
      message: txt.query.caracteres,
    },
    namevar: {
      name: "type",
      type: "input",
      message: txt.query.namevar,
    },
    value: {
      name: "type",
      type: "input",
      message: txt.query.value,
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
      message: `${txt.query.ivalue} ${value}:`,
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
  console.log(
    chalk.bold.italic.blue("\n -->" + key + ": ") +
      chalk.green(upgrade[key] ? upgrade[key] : upgradeUserVar[key] + "\n")
  );
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
    if (variables[key] !== undefined) {
      upgrade[key] = add.type;
    } else {
      upgradeUserVar[key] = add.type;
    }
  }
};

const prepareFontVariablesStr = (groupVar) => {
  let fontVariablesStr = "";
  for (const key in groupVar) {
    fontVariablesStr =
      fontVariablesStr +
      `   "${key}": ${
        key === "fonts"
          ? `[\n"${groupVar[key].join('",\n"')}"\n]`
          : `"${groupVar[key]}"`
      },\n`;
  }
  return fontVariablesStr;
};

const loadVariables = async () => {
  const userPath = pathUserVar + "/CSSvariables.js";
  const path = `${pathBase}/patuco`;
  const str = `const variables = {
      ${prepareFontVariablesStr(upgrade)}};
  
module.exports = variables;
  `;
  const userStr = `const uservar = {
    ${prepareFontVariablesStr(upgradeUserVar)}};

module.exports = uservar;
`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, 0777);
  }
  if (!fs.existsSync(pathUserVar)) {
    fs.mkdirSync(pathUserVar, 0777);
  }
  try {
    fs.writeFileSync(pathVariables, str, { mode: 0o777 });
    fs.writeFileSync(userPath, userStr, { mode: 0o777 });
  } catch (err) {
    console.error(err);
  } finally {
    requireUncached(savedPaths.baseCss);
    // requireUncached(userPath);
    console.log(`
  ${txt.c.createdOk}\n
  ${txt.c.created}\n
  - ${txt.c.file}: ${chalk.blue.bold("variables.js")}\n
  - ${txt.c.path}: ${chalk.blue.bold(pathVariables)}\n
  - ${txt.c.file}: ${chalk.blue.bold("CSSvariables.js")}\n
  - ${txt.c.path}: ${chalk.blue.bold(userPath)}\n
  ----------------------------------\n`);
  }
};

const storePatucoVar = async () => {
  const userPath = pathUserVar + "/PATUvariables.js";
  const path = `${pathBase}/patuco`;
//   const str = `const variables = {
//       ${prepareFontVariablesStr(upgrade)}};
  
// module.exports = variables;
//   `;
  console.log();
};

const searchPatucoVar = async () => {
  const variablesTotal = [...patucoVar, ...userPatucoVar];
  console.log(chalk.cyan("\n------------- Album -----------------\n"));
  console.log(variablesTotal);
  console.log(chalk.cyan("\n---------------------------------\n"));
  const albums = variablesTotal.map((e) => e.name);
  const albs = await queryParams("variables", albums);
  let filter = variablesTotal.filter((f) => f.name === albs.type)[0];
  console.log(chalk.blue("\n------------- Grupo -----------------\n"));
  console.log(filter);
  console.log(chalk.blue("\n---------------------------------\n"));
  let query = filter.name;
  const prevKeyQuery = { obj: {}, key: "" };
  let end = false;
  while (!end) {
    const keys = Object.keys(filter);
    if (typeof filter === "object") {
      prevKeyQuery.obj = filter;
      const opt = await queryParams("variables", keys);
      query += "-" + opt.type;
      prevKeyQuery.key = opt.type;
      console.log(chalk.green("\n------------- Grupo -----------------\n"));
      console.log(filter[opt.type]);
      console.log(chalk.green("\n---------------------------------\n"));
      filter = filter[opt.type];
    } else {
      end = true;
    }
  }
  const select = await queryParams("select");
  if (select.type === txt.query.editvalue) {
    const value = await queryParams("value");
    prevKeyQuery.obj[prevKeyQuery.key] = value.type;
  } else if (select.type === txt.query.dupli) {
    const namevarpdu = await queryParams("namevarp");
    prevKeyQuery.obj[namevarpdu.type] = prevKeyQuery.obj[prevKeyQuery.key];
  } else if (select.type === txt.query.editkey) {
    const namevarp = await queryParams("namevarp");
    prevKeyQuery.obj[namevarp.type] = prevKeyQuery.obj[prevKeyQuery.key];
    delete prevKeyQuery.obj[prevKeyQuery.key];
  }
  console.log(chalk.green("\n---------------------------------\n"));
  console.log(prevKeyQuery.obj);
  console.log(chalk.green("\n---------------------------------\n"));
  const optsave = await queryParams("optsave");
  if (optsave.type === txt.query.optsave) {
    await storePatucoVar();
  }
};

const search = async (type) => {
  if (type === "CSS variables") {
    const crtquery = await queryParams("caracteres");
    const caracteres = crtquery.type;
    const data = [];
    const variablesTotal = { ...upgrade, ...upgradeUserVar };
    for (const key in variablesTotal) {
      if (
        key.includes(caracteres) ||
        variablesTotal[key].includes(caracteres)
      ) {
        if (!data.some((e) => e.name === key)) {
          data.push({ name: key, value: variablesTotal[key] });
          console.log(
            chalk.bold.italic.blue("  --" + key + ": ") +
              chalk.green(variablesTotal[key] + "\n")
          );
        }
      }
    }
    const key = await queryParams(
      "variables",
      data.map((e) => e.name)
    );
    await edit(key.type);
  } else {
    await searchPatucoVar();
  }
};

const typeOfVariables = async () => {};

const init = async () => {
  const task = await queryParams("task");
  switch (task.type) {
    case txt.query.search:
      const srch = await queryParams("search");
      if (srch.type !== back) {
        await search(srch.type);
      }
      break;
    case txt.query.edit:
      const srchEdit = await queryParams("search");
      if (srchEdit.type !== back) {
        if (srchEdit.type === "CSS variables") {
          const key = await queryParams("variables", [
            ...Object.keys(variables),
            ...Object.keys(userVariables),
          ]);
          await edit(key.type);
        }
      }
      break;
    case txt.query.create:
      const srchcrea = await queryParams("search");
      console.log(userVariables);

      if (srchcrea.type !== back) {
        if (srchcrea.type === "CSS variables") {
          const namevar = await queryParams("namevar");
          const valuevar = await queryParams("value");
          upgradeUserVar[`${namevar.type}`] = valuevar.type;
        }
      }
      break;
    case txt.query.set:
      await loadVariables();
      break;
    case back:
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
