const fs = require("fs");
const pathBase = process.cwd();
const baseCss = require("../templates/styles/baseCss.js");

const comment = "// Created which PatucoStrap";

const createStr = async (item) => {
  const name = item.name ? item.name : "sinnombre";
  let description = '"description": Propiedades:\n';

  if (item.items) {
    for (let index = 0; index < item.items.length; index++) {
      const property = item.items[index];
      description += property + "\n";
    }
  }
  if (item.pseudoElement) {
    for (let index = 0; index < item.pseudoElement.length; index++) {
      const object = item.pseudoElement[index];
      for (const key in object) {
        const property = object[key];
        description += property + "\n";
      }
    }
  }
  if (item.template) {
    description += item.template + "\n";
  }
  let str = `
    "${name}": {
        "prefix": "${name}",
        "body": [
            "${name}",
        ],
        "description": "${description}"
    }
`;
  return str;
};

const updateSchema = async (path) => {
  const fileStr = await prepareStr();
  try {
    fs.writeFileSync(path, fileStr, { mode: 0o777 });
  } catch (err) {
    console.error(err);
    updateCssSchema();
  } finally {
    console.log(`
     ${txt.c.createdOk}\n
     ${txt.c.created}\n
     - ${txt.c.file}: ${chalk.green.bold("patucoSchema.css")}\n
     - ${txt.c.path}: ${chalk.green.bold(path)}\n
     ----------------------------------\n`);
  }
  configStyles.configStyles();
};

const createSnippetsVS = async () => {
  fs.writeFileSync(`${pathBase}/patuco.code-snippets\n\n`, comment, {
    mode: 0o777
  });
  for (const key in baseCss) {
    const gruopClasses = baseCss[key];
    for (let index = 0; index < gruopClasses.length; index++) {
      const element = gruopClasses[index];
      const data = await createStr(element);
      console.log(data);
    }
  }
};

module.exports = { createSnippetsVS };
