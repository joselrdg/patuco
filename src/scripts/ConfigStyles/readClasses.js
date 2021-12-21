const inquirer = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");

const userTemplatePath = require("../constants/patucoConfig.js").path
  .userTemplate;

const patuPath = require("../constants/patucoConfig.js").path.patucoModule;

const userCss = fs.existsSync(`${userTemplatePath}/classes/base.js`)
  ? require(`${userTemplatePath}/classes/base.js`)
  : {};

const baseCss = require("../../templates/styles/baseCss.js");

const txt = require("./translations/readClasses.js");

const groupKeys = Object.keys(baseCss);

const back = txt.c.back;

const queryParams = (type, choices = [], ms) => {
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
    input: {
      name: "type",
      type: "input",
      message: ms,
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

const isStored = async (store, name) => {
  const selected = { key: "", item: {} };
  for (const key in store) {
    const element = store[key];
    if (
      element.some((c) => {
        if (c.name === name) {
          selected.item = c;
          return true;
        }
      })
    ) {
      selected.key = key;
    }
  }
  if (selected.key !== "") {
    return selected;
  } else {
    return undefined;
  }
};

const askForData = async (store) => {
  const keys = Object.keys(store);
  const rq = await queryParams("select", keys);
  if (rq.type === "name") {
    const nwname = await queryParams("input", [], txt.query.iname);
    store.name = nwname.type;
  } else if (rq.type === "items") {
    const addp = await queryParams("select", [
      txt.query.addprop,
      txt.query.editprop,
      txt.query.deletep,
    ]);
    if (addp.type === txt.query.editprop) {
      const nw = await queryParams("select", store.items);
      const nwitem = await queryParams("input", [], txt.query.istyle);
      for (let i = 0; i < store.items.length; i++) {
        if (nw.type === store.items[i]) {
          store.items[i] = nwitem.type;
          break;
        }
      }
    } else if (addp.type === txt.query.addprop) {
      const nwitem = await queryParams("input", [], txt.query.istyle);
      store.items.push(nwitem.type);
    } else {
      const nw = await queryParams("select", store.items);
      store.items.forEach((ep, i) => {
        if (ep === nw.type) {
          store.items.splice(i, 1);
        }
      });
    }
  }
};

const storeData = async (path, item, key) => {
  if (fs.existsSync(path)) {
    try {
      fs.writeFileSync(path, item, { mode: 0o777 });
    } catch (err) {
      console.error(err);
      readClasses();
    } finally {
      console.log(`
     ${txt.c.createdOk}\n
     ${txt.c.created}\n
     - ${txt.c.file}: ${chalk.green.bold(key)}\n
     - ${txt.c.path}: ${chalk.green.bold(path)}\n
     ----------------------------------\n`);
      readClasses();
    }
  }
};

const edit = async (names) => {
  const selection = await queryParams("select", names);
  const datauser = await isStored(userCss, selection.type);
  if (datauser) {
    const keyU = datauser.key;
    await askForData(datauser.item);
    const usrPath = `${userTemplatePath}/classes/${keyU}.js`;
    if (fs.existsSync(usrPath)) {
      const str = `const ${keyU} = ${JSON.stringify(userCss[keyU], null, 2)}
      
module.exports = ${keyU};`;
      await storeData(usrPath, str, keyU);
    }
  } else {
    const cmp = "";
    if (
      selection.type[0] === "c" &&
      selection.type[0] === "m" &&
      selection.type[0] === "p"
    ) {
      cmp = "cmp";
    }
    const datapatu = await isStored(baseCss, selection.type);
    const keyp = datapatu.key;
    await askForData(datapatu.item);
    const patPath = `${patuPath}/src/templates/styles/${cmp}${keyp}.js`;
    if (fs.existsSync(patPath)) {
      const ptStr = `const ${keyp} = ${JSON.stringify(baseCss[keyp], null, 2)}

module.exports = ${datapatu.key};`;
      await storeData(patPath, ptStr);
    }
  }
};

const readGroup = async (typeClass) => {
  const names = [];
  for (let i = 0; i < typeClass.length; i++) {
    const items = typeClass[i].items;
    const name = typeClass[i].name;
    names.push(name);
    const pseudoElements = typeClass[i].pseudoElement;
    const template = typeClass[i].template;
    name && console.log(`\n- Class: ${chalk.blue.bold(name)}`);
    if (items) {
      typeClass.map((e) => e.name);
      items.forEach((s) => {
        console.log(chalk.green(`  ${s}`));
      });
    }
    if (pseudoElements) {
      console.log("\n  - Pseudo-Elements:");
      pseudoElements.forEach((ps) => {
        console.log(chalk.blue.bold(`   ${ps.type}`));
        ps.items.forEach((psE) => {
          console.log(chalk.green(`   ${psE}`));
        });
      });
    }
    if (template) {
      console.log("\n  - Template:");
      console.log(chalk.green(template));
    }
    console.log("\n");
  }
  if (names.length > 0) {
    const editq = await queryParams("select", [txt.query.edit, back]);
    if (editq.type === txt.query.edit) {
      await edit(names);
    } else {
      readClasses();
    }
  } else {
    console.log(chalk.red.italic("\n    No se encontraron clases\n"));
    readClasses();
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
};

const readClasses = async () => {
  const typeClass = await queryParams("typeClass");
  if (typeClass.type === chalk.bold.italic.bgBlackBright(txt.query.search)) {
    const search = await queryParams("search");
    await searchClass(search.type, baseCss);
  } else if (typeClass.type === back) {
    const configStyles = require("./index.js");
    configStyles.configStyles();
  } else {
    const option = await queryParams("options");
    console.log("option.type");
    await options(typeClass.type, option.type, baseCss);
  }
};

module.exports = { readClasses };
