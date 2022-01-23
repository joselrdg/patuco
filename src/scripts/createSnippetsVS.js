const chalk = require("chalk");
const fs = require("fs");
const pathBase = process.cwd();
const baseCss = require("../templates/styles/baseCss.js");
const txt = require("./translations/config.js");

const comment = "// PatucoStrap  snippets\n\n{";

const createStr = async (item) => {
  const name = item.name ? item.name : "sinnombre";
  let description = "";

  if (item.items) {
    for (let index = 0; index < item.items.length; index++) {
      const property = item.items[index];
      description += " -- " + property;
    }
  } else if (item.pseudoElement) {
    description += "Pseudoelements: ";
    for (let index = 0; index < item.pseudoElement.length; index++) {
      const object = item.pseudoElement[index];
      for (const key in object) {
        const property = object[key];
        if (property.items) {
          for (let i = 0; i < property.items.length; i++) {
            const element = property.items[i];
            description += " -- " + element;
          }
        }
      }
    }
  }
  // if (item.template) {
  //   description += item.template + "\n";
  // }
  let str = `
    "${name}": {
        "prefix": "${name}",
        "body": [
            "${name}",
        ],
        "description": "${description}"
    },
`;
  return str;
};

const writeFile = async (path, data) => {
  try {
    fs.writeFileSync(path, data, { mode: 0o777 });
  } catch (err) {
    console.error(err);
    return;
  } finally {
    console.log(`
     ${txt.c.createdOk}\n
     ${txt.c.created}\n
     - ${txt.c.file}: ${chalk.green.bold("patuco.code-snippets")}\n
     - ${txt.c.path}: ${chalk.green.bold(path)}\n
     Copy in VS\n
     /home/<tuNombre>/.config/Code/User/snippets/patuco.code-snippets\n
     ----------------------------------\n`);
  }
};

const createSnippetsVS = async () => {
  const path = `${pathBase}/patuco.code-snippets`;

  let file = comment;
  for (const key in baseCss) {
    const gruopClasses = baseCss[key];
    for (let index = 0; index < gruopClasses.length; index++) {
      const element = gruopClasses[index];
      const data = await createStr(element);
      file += data;
    }
  }
  await writeFile(path, file + "}");
};

module.exports = { createSnippetsVS };
