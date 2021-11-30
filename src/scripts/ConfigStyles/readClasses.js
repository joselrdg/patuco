const inquirer = require("inquirer");
const chalk = require("chalk");

const baseCss = require("../../templates/styles/baseCss.js");

const txt = require("./translations/readClasses.js");

const groupKeys = Object.keys(baseCss);

const back = txt.c.back;

const queryParams = (type, choices = []) => {
  const message = {
    typeClass: {
      name: "type",
      type: "list",
      message: txt.query.select,
      choices: [
        chalk.bold.italic.bgBlackBright(txt.query.search),
        ...groupKeys.filter((i) => i !== "root"),
        back,
      ],
    },
    search: {
      name: "type",
      type: "input",
      message: txt.query.isearch,
    },
    options: {
      name: "type",
      type: "list",
      message: txt.c.select,
      choices: [txt.query.see, txt.query.seaname, txt.query.seaprop],
    },
    select: {
      name: "type",
      type: "list",
      message: txt.c.select,
      choices: choices.filter((e) => e !== undefined),
    },
  };
  const qs = [message[type]];
  return inquirer.prompt(qs);
};

const readStyles = (styles) => {
  let str = "";
  if (styles) {
    for (let index = 0; index < styles.length; index++) {
      str = str + `  ${chalk.green.bold(styles[index])}`;
    }
  }
  return str;
};

const readGroup = async (typeClass) => {
  for (let i = 0; i < typeClass.length; i++) {
    const items = typeClass[i].items;
    const name = typeClass[i].name;
    name &&
      console.log(`\n- ${txt.c.name}: ${chalk.blue.bold(name)}
${readStyles(items)}\n`);
  }
};

const searchClass = async (word) => {
  const regex = new RegExp(word, "g");
  const classArr = [];
  for (const key in baseCss) {
    for (let i = 0; i < baseCss[key].length; i++) {
      if (regex.test(baseCss[key][i].name)) {
        classArr.push(baseCss[key][i]);
      } else {
        if (baseCss[key][i].items) {
          for (let index = 0; index < baseCss[key][i].items.length; index++) {
            if (regex.test(baseCss[key][i].items[index])) {
              classArr.push(baseCss[key][i]);
            }
          }
        }
      }
    }
  }
  readGroup(classArr);
};

const selectQuery = (typeClass, type) => {
  const queryArr = [];
  for (let i = 0; i < typeClass.length; i++) {
    if (type === "name") {
      queryArr.push(typeClass[i].name);
    } else if (type === "items") {
      const array = typeClass[i].items;
      if (array !== undefined) {
        for (let index = 0; index < array.length; index++) {
          queryArr.push(array[index]);
        }
      }
    }
  }
  return queryArr;
};

const readFilter = async (arr, type, filter) => {
  if (type === "name") {
    return arr.filter((e) => e.name === filter);
  } else if (type === "items") {
    const arrProperties = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].items !== undefined)
        for (let index = 0; index < arr[i].items.length; index++) {
          arr[i].items[index] === filter && arrProperties.push(arr[i]);
        }
    }
    return arrProperties;
  }
};

const options = async (typeClass, option) => {
  switch (option) {
    case txt.query.see:
      await readGroup(baseCss[typeClass]);
      break;
    case txt.query.seaname:
      const name = await queryParams(
        "select",
        selectQuery(baseCss[typeClass], "name")
      );
      const dataN = await readFilter(baseCss[typeClass], "name", name.type);
      await readGroup(dataN);
      break;
    case txt.query.seaprop:
      const classItems = await queryParams(
        "select",
        selectQuery(baseCss[typeClass], "items")
      );
      const dataP = await readFilter(
        baseCss[typeClass],
        "items",
        classItems.type
      );
      await readGroup(dataP);
      break;
    default:
      break;
  }
  readClasses();
};

const readClasses = async () => {
  const typeClass = await queryParams("typeClass");
  if (typeClass.type === chalk.bold.italic.bgBlackBright(txt.query.search)) {
    const search = await queryParams("search");
    await searchClass(search.type, baseCss);
    readClasses();
  } else if (typeClass.type === back) {
    const configStyles = require("./index.js");
    configStyles.configStyles();
  } else {
    const option = await queryParams("options");
    await options(typeClass.type, option.type, baseCss);
  }
};

module.exports = { readClasses };
